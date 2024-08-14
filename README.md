# CASTLE - Cleaning Service App

![Screenshot from 2024-08-14 20-08-49](https://github.com/user-attachments/assets/f84ee949-e222-47f5-9aa1-34762f65d992)


**CASTLE** is a Progressive Web App (PWA) designed for managing cleaning services. Users can log in, post photos, complete checklists, and supervisors can monitor tasks, track time, and provide notifications.

### Features

- Progressive Web App (PWA): Installable on mobile devices, works offline, and provides a native app-like experience.
- User Authentication: Secure login functionality.
- Task Management: Users can upload photos and complete checklists related to cleaning services.
- Supervisory Tools: Supervisors can track hours, monitor tasks, and send notifications.

## Live Demo

Check out the live version of the app here: [CASTLE](https://castle-servicios.vercel.app/)

## Installation
### Prerequisites

- `Node.js` and `npm` installed on your machine.

## Local Setup

Clone the Repository:

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies:

``` 
npm install
```

### Run the Development Server:

```
npm start
```

The app will be available at http://localhost:3000 by default.

### Build for Production:

```
npm run build
```

This will create an optimized production build in the build directory.

## Deploying to Vercel

1. Push Your Code to GitHub:
    Ensure your latest code is committed and pushed to GitHub.

2. Deploy with Vercel:
    - Go to Vercel and create a new project.
    - Link your GitHub repository.
    - Set the Build Command to npm run build.
    - Set the Output Directory to build.
    - Deploy your project.

## PWA Features

- Manifest Configuration: The app includes a manifest.json file that defines the app name, icons, start URL, display mode, and theme colors.

- Service Worker: The app is configured with a service worker to enable offline functionality and caching.
