# .github
Repository containing workflow templates and other guidelines

# Workflows

### Build and Push Docker Image
Create a new GitHub Actions workflow file (e.g., .github/workflows/build-and-push.yml) in your repository with the following content:
```yaml
name: Build and Push Docker Image

... # Add your own triggers, conditions, etc.

jobs:
  build-and-push-workflow:
    uses: ls1intum/.github/.github/workflows/build-and-push-docker-image.yml@main
    with:
      image-name: your-image-name # Defaults to the repository name
      docker-file: path/to/your/Dockerfile # Defaults to Dockerfile
    secrets: inherit
```