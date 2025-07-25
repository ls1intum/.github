# .github

Repository containing workflow templates and other guidelines

## Workflows

### Build & Deploy via GitHub Actions

#### 1. Dockerize your Application

Create a Dockerfile for all your services that you want to deploy.

#### 2. Setup Build and Push Docker Image Workflow

> [!IMPORTANT]
> We want to maintain a consistent workflow for our docker images across all repositories and maintain it at a central place. Therefore, we provide a workflow that you can call in your repository without the need to copy the workflow file!

Create a new GitHub Actions workflow file (e.g., .github/workflows/build-and-push.yml) in your repository with the following content:

```yaml
name: Build and Push Docker Image

on: # Adjust the triggers, conditions, etc. to your needs, see examples below
  pull_request:
  push:
    branches: [main]

jobs:
  # You can also build and push multiple images in parallel using a matrix (see examples)
  build-and-push-workflow:
    uses: ls1intum/.github/.github/workflows/build-and-push-docker-image.yml@main
    with:
      image-name: ls1intum/<repository-name>/<your-image-name> # Defaults to the repository name = <owner>/<repository-name>
      docker-file: path/to/your/Dockerfile # Defaults to Dockerfile
    secrets: inherit
```

**Examples:**

- `Hades` repository: [build.yml](https://github.com/ls1intum/hades/blob/main/.github/workflows/build.yml)
- `Hephaestus` repository: [build-and-push-docker.yml](https://github.com/ls1intum/Hephaestus/blob/develop/.github/workflows/build-and-push-docker.yml)
- `Apollon_standalone` repository: [build-and-push.yml](https://github.com/ls1intum/Apollon_standalone/blob/main/.github/workflows/build-and-push.yml)


#### 3. Create a Docker Compose File

Include the images from the registry and have `IMAGE_TAG` as a placeholder for the image tag that you want to deploy, i.e. `latest`, `pr-233`, etc. A name for the compose file could be `compose.prod.yaml`.

```yaml
services:
  <service-name-1>:
    image: "ghcr.io/ls1intum/<repository-name>/<your-image-name>:${IMAGE_TAG}"
    ...
    environment:
      - SECRET_1=${SECRET_1}
      - VAR_1=${VAR_1}
      - VAR_2=${VAR_2}
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
  deploy:
    uses: ls1intum/.github/.github/workflows/deploy-docker-compose.yml@main
    with:
      environment: Development # Replace with your environment 
      docker-compose-file: "./docker-compose.prod.yml" # Path to your docker-compose file
      main-image-name: ls1intum/<image-name> # For checking if images with image tag exist
      image-tag: ${{ inputs.image-tag }}
      env-file-name: .env.test1 # (Optional) Path to the .env file, defaults to .env
      remove-volumes: false # (Optional) Remove volumes after stopping the services
    secrets: inherit
```

**Examples:**

- `Hephaestus` repository: [deploy-prod.yml](https://github.com/ls1intum/Hephaestus/blob/develop/.github/workflows/deploy-prod.yml)

#### 5. Setup Deployment User on Virtual Machine

**Prerequisites:** VM exists at `VM_HOST` and is accessible via SSH

1. SSH into the VM: `ssh <your-user>@<VMHost>`
2. Create new user called `github_deployment` with: `sudo adduser github_deployment --disabled-password`, you can leave all fields empty
3. Check if docker is installed: `sudo docker info`, if not install with [these instructions](https://docs.docker.com/engine/install/ubuntu/#installation-methods)
4. Add `github_deployment` to the docker group: `sudo usermod -aG docker github_deployment`
5. Create the deployment directory `/opt/github` and give `github_deployment` access: `sudo mkdir /opt/github && sudo chown github_deployment:github_deployment /opt/github`
6. Switch to `github_deployment` user: `sudo su github_deployment`
> <details>
> <summary>Note on fixing “access denied” when switching to deployment user</summary>
>
> If, when you run:
> ```bash
> sudo su github_deployment
> ```
> you see an error like:
> ```bash
> su: cannot open session: Permission denied
> pam_access(su:session): access denied for user `github_deployment' from `pts/…'
> ```
> then PAM is blocking `github_deployment` because of an `/etc/security/access.conf` rule. Some VMs ship with this file empty (no restrictions), while others have existing allow/deny rules—either way, you need to ensure there is a `+` line permitting our deployment user before any `deny all`.
> 
> > ⚠️ **Warning:** Following the steps below introduces security risks, since it grants the deployment user broad access to the system. You should carefully consider the implications and, if possible, restrict `github_deployment` to only the specific commands or directories it truly needs.
> 
> - Open `/etc/security/access.conf` (as root):
> ```bash
> sudo vi /etc/security/access.conf
> ```
> - Add the following line:
> ```bash
> # Allow github_deployment user to access the system
> +:github_deployment : ALL
> ```
> - The file should look like this:
> ```bash
> # login restriction for pam_access
> # ldap admin/user group login
> +:(asevm90-admin) (asevm90-user):ALL
> # allow local root user and root/login group logins
> +:root (login) (root):ALL
> # Allow github_deployment user to login
> +:github_deployment : ALL
> # deny rest
> -:ALL:ALL
> ```
> - Save and exit.
> - Retry
> ```bash
> sudo su github_deployment
> ```
>   
>
> </details>

7. Generate a new SSH key on VM: `ssh-keygen -t ed25519 -C "github_deployment@<VMHost>"`, leave passphrase empty
8. Copy the public key to the authorized keys: `cat /home/github_deployment/.ssh/id_ed25519.pub > /home/github_deployment/.ssh/authorized_keys`
9. Copy the private key to your clipboard: `cat /home/github_deployment/.ssh/id_ed25519`

#### 6. Setup GitHub Secrets, Variables, and Other Settings

1. Go to your repository settings: https://github.com/ls1intum/repository-name/settings
2. Click `Environments` then `New environment`, if not already created
3. Setup the following **secret**:
   - `VM_SSH_PRIVATE_KEY`: Paste the private key from the VM
4. Setup the following **variables**:
   - `VM_HOST`: The hostname of the VM, without protocol (e.g., `artemis.cit.tum.de`)
   - `VM_USERNAME`: `github_deployment`, the user you created on the VM
5. Set required reviewers (people or teams) that should approve the workflow run before it can be deployed to the environment. Note: Approval is needed if you are reading a protected environment
6. Add your sensitive secrets to `Environment secrets` and your insensitive variables to `Environment variables`
   - Caution: Variables will be **visible in the logs**, secrets will be **automatically censored by GitHub**

#### 7. Deploy

1. Go to the `Actions` tab in your repository
2. Click on the `Deploy to Development` workflow
3. Click on `Run workflow` and enter the image tag you want to deploy, leave empty for default (`pr-<number>` if PR exists, `latest` for default branch)
4. Wait for the workflow to finish, approve the deployment if required
