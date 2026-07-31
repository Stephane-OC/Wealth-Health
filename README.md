<div align="center">
  <img src="src/assets/img/Wealth_Health.webp" alt="Wealth Health logo" width="60" />
  <h1>Wealth Health - HRnet Application</h1>
  <p>A modern employee management application built with React and Vite.</p>
  <p><a href="https://stephane-oc.github.io/Wealth-Health/">View the live application</a></p>
</div>

## Overview

HRnet is an employee record management application designed for Wealth Health. It allows HR personnel to create employee profiles and browse the current employee directory through a responsive and searchable interface.

The project was migrated from Create React App to Vite to provide a faster development environment, a modern build system, and a cleaner dependency tree.

## Features

- **Employee creation:** Add employees through a detailed form with validated personal, address, and employment information.
- **Employee directory:** View all registered employees in an interactive AG Grid table.
- **Search and sorting:** Quickly filter and sort employee records.
- **Pagination:** Navigate efficiently through larger employee datasets.
- **Persistent data:** Save and restore Redux state through the browser's `localStorage`.
- **Dynamic loading screen:** Provide visual feedback during page navigation.
- **Responsive interface:** Adapt the navigation and application layout to desktop and mobile screens.
- **Light and dark themes:** Preserve the selected visual theme between sessions.

## Technologies Used

- **React:** Builds the component-based user interface.
- **Vite:** Provides the development server and production build workflow.
- **Redux Toolkit and React Redux:** Manage global employee and loading states.
- **AG Grid:** Displays employee records with sorting, filtering, and pagination.
- **React Select and React Date Picker:** Provide enhanced form controls.
- **Font Awesome:** Supplies interface icons.
- **UUID:** Generates unique employee identifiers.
- **ElaSpark UI:** Provides responsive, animated modals and customizable buttons.

## Requirements

- Node.js `20.19.0` or later
- npm

## Setup and Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Stephane-OC/Wealth-Health.git
cd Wealth-Health
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm start` | Starts the Vite development server using the legacy command alias. |
| `npm run build` | Creates the optimized production build in `dist` and generates the GitHub Pages fallback. |
| `npm run preview` | Serves the production build locally for verification. |
| `npm run deploy` | Builds and deploys the `dist` directory to GitHub Pages. |

## Main Components

- **`SaveEmployeeForm`:** Renders the form used to create employee records.
- **`EmployeeList`:** Displays employee data through AG Grid.
- **`Header`:** Provides responsive navigation and theme controls.
- **`LoadingScreen`:** Displays visual feedback during navigation.
- **`AppLink`:** Handles lightweight client-side navigation without an additional routing dependency.

## State Management and Persistence

The Redux store combines two feature slices:

- **`employeeSlice`:** Manages employee records.
- **`loadingSlice`:** Controls the dynamic loading screen.

The store is synchronized with `localStorage`. Its state is serialized after each update and rehydrated when the application starts, allowing employee records to persist across browser sessions.

## Styling

The application combines custom CSS with AG Grid community styles and ElaSpark UI components. It includes responsive navigation as well as persistent light and dark themes.

## Deployment

The application is configured for deployment to GitHub Pages under the `/Wealth-Health/` base path:

```bash
npm run deploy
```

The production workflow generates both `index.html` and a matching `404.html` fallback so that direct application links remain available on GitHub Pages.

## Migration and Security

The project was migrated from Create React App to Vite. CRA-specific packages such as `react-scripts` and `web-vitals` were removed, direct dependencies were updated, and the npm lockfile was regenerated.

The migrated production build was validated successfully, and `npm audit` reported zero known vulnerabilities at the time of migration.

## Author

Developed by [Stephane-OC](https://github.com/Stephane-OC).