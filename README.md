# .github

Repository containing workflow templates and other guidelines

## Workflows

### Build & Deploy via GitHub Actions

#### 1. Dockerize your Application

Create a Dockerfile for all your services that you want to deploy.

#### 2. Setup Build and Push Docker Image Workflow

> [!IMPORTANT]
> We want to maintain a consistent workflow for our docker images accross all repositories and maintain it at a central place. Therefore, we provide a workflow that you can call in your repository without the need to copy the workflow file!

Create a new GitHub Actions workflow file (e.g., .github/workflows/build-and-push.yml) in your repository with the following content:

```yaml
name: Build and Push Docker Image

on: # Adjust the triggers, conditions, etc. to your needs
  pull_request:
  push:
    branches: [main]

jobs:
  # You can also build and push multiple images in parallel using a matrix
  build-and-push-workflow:
    uses: ls1intum/.github/.github/workflows/build-and-push-docker-image.yml@main
    with:
      image-name: ls1intum/<repository-name>/<your-image-name> # Defaults to the repository name = <owner>/<repository-name>
      docker-file: path/to/your/Dockerfile # Defaults to Dockerfile
    secrets: inherit
```

#### 3. Create a Docker Compose File

Include the images from the registry and have `IMAGE_TAG` as a placeholder for the image tag that you want to deploy, a name for the file could be `docker-compose.prod.yml`.

```yaml
services:
  <service-name-1>:
    image: "ghcr.io/ls1intum/<repository-name>/<your-image-name>:${IMAGE_TAG}"
    ...
    environment:
      - SECRET_1=${SECRET_1}
      - ENV_VAR_1=${ENV_VAR_1}
      - ENV_VAR_2=${ENV_VAR_2}
    ...
...
```

#### 4. Setup Deploy Docker Compose Workflow

```yaml
name: Deploy to Development

on:
  workflow_dispatch: # For manual triggers via the GitHub Actions UI
    inputs:
      image-tag:
        type: string
        description: "Image tag to deploy (default: pr-<number> if PR exists, latest for default branch)"

jobs:  
  prepare-env:
    runs-on: ubuntu-latest
    environment: Development # Replace with your environment from the GitHub Environments
    outputs:
      # Define the environment variables that you want to pass to the docker-compose deployment
      env-vars: |
        SECRET_1=${{ vars.SECRET_1 }}
        ENV_VAR_1=${{ vars.ENV_VAR_1 }}
        ENV_VAR_2=${{ vars.ENV_VAR_2 }}
    steps:
      - name: Do nothing
        run: echo "Nothing to do here"

  deploy:
    needs: prepare-env
    uses: ls1intum/.github/.github/workflows/deploy-docker-compose.yml@main
    with:
      environment: Development # Replace with your environment 
      docker-compose-file: "./docker-compose.prod.yml" # Path to your docker-compose file
      main-image-name: ls1intum/<image-name> # For checking if images with image tag exist
      image-tag: ${{ inputs.image-tag }}
      env-vars: ${{ needs.prepare-env.outputs.env-vars }}
    secrets: inherit
```

#### 5. Setup Deployment User on Virtual Machine

**Prerequisites:** VM exists at `VM_HOST` and is accessible via SSH

1. SSH into the VM: `ssh <your-user>@<VMHost>`
2. Create new user called `github_deployment` with: `sudo adduser github_deployment --disabled-password`, you can leave all fields empty
3. Check if docker is installed: `sudo docker info`, if not install with [these instructions](https://docs.docker.com/engine/install/ubuntu/#installation-methods)
4. Add `github_deployment` to the docker group: `sudo usermod -aG docker github_deployment`
5. Switch to `github_deployment` user: `sudo su github_deployment`
6. Generate a new SSH key on VM: `ssh-keygen -t ed25519 -C "github_deployment@<VMHost>"`, leave passphrase empty
7. Copy the public key to the authorized keys: `cp /home/github_deployment/.ssh/id_ed25519.pub > /home/github_deployment/.ssh/authorized_keys`
8. Copy the private key to your clipboard: `cat /home/github_deployment/.ssh/id_ed25519`

#### 6. Setup GitHub Secrets, Variables, and Other Settings

1. Go to your repository settings: https://github.com/ls1intum/repository-name/settings
2. Click `Environments` then `New environment`, if not already created
3. Setup the following **secret**:
   - `VM_SSH_PRIVATE_KEY`: Paste the private key from the VM
4. Setup the following **variables**:
   - `VM_HOST`: The hostname of the VM, without protocol (e.g., `artemis.cit.tum.de`)
   - `VM_USERNAME`: `github_deployment`, the user you created on the VM
5. Set required reviewers (people or teams) that should approve the workflow run before it can be deployed to the environment

#### 7. Deploy

1. Go to the `Actions` tab in your repository
2. Click on the `Deploy to Development` workflow
3. Click on `Run workflow` and enter the image tag you want to deploy, leave empty for default (`pr-<number>` if PR exists, `latest` for default branch)
4. Wait for the workflow to finish, approve the deployment if required
