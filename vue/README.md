# Vue Demo Applications

This repository contains several Vue.js demo applications:

- **BookingHotel**: A hotel booking application
- **PhotoGallary**: A photo gallery application
- **Weather**: A weather forecast application
- **mealplanner**: A meal planning application

## Automatic Deployment

This repository is configured with a GitHub Actions workflow that automatically deploys changes to a VPS when code is pushed to the repository. The workflow detects which directories have changes and only deploys the affected applications.

### How It Works

1. When code is pushed to the main branch, the workflow is triggered.
2. It detects which directories have changes (BookingHotel, PhotoGallary, Weather, mealplanner).
3. It connects to the VPS via SSH and runs the build.sh script with the appropriate parameters based on which directories have changes.

For example:
- If changes are made to the BookingHotel directory, only the BookingHotel application will be deployed.
- If changes are made to multiple directories, all affected applications will be deployed.

### Configuration

To use the automatic deployment feature, you need to set up GitHub secrets for your VPS connection details. See the [GitHub Workflow README](.github/workflows/README.md) for detailed instructions on how to set up these secrets.

## Manual Deployment

You can also manually deploy the applications using the build.sh script:

```bash
# Deploy all applications
./build.sh

# Deploy specific applications
./build.sh booking gallery weather meal

# Get help
./build.sh --help
```

## Development

Each application is a separate Vue.js project with its own dependencies and build process. To work on a specific application, navigate to its directory and run the standard npm commands:

```bash
cd BookingHotel
npm install
npm run dev
```