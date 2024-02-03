![Wealth Health Logo](src/assets/img/Wealth_Health.webp)

# Wealth Health - HRnet Application

The HRnet application serves as a comprehensive platform for managing employee records, allowing HR personnel to view, add, and manage employee details with ease.

## Features

- **View Current Employees**: Enables access to a complete list of employees in a table view with sorting and quick search capabilities.

- **Create Employee**: Facilitates adding new employees through a detailed form, capturing essential information.

- **Modern UI Elements**: Integrates the `elaspark-ui` library for responsive, animated modals, and customizable buttons, adding elegance and interactivity.

## Technologies Used

- **`React`**: Builds the user interface.

- **`React-router-dom`**: Manages SPA navigation.

- **`Redux`**: Handles global state management.

- **`AG Grid`**: Renders complex data grids.

- **`React-select`** and **`React-date-picker`**: Enhance form inputs.

- **`UUID`**: Generates unique identifiers.

- **`elaspark-ui`**: Provides modern modals and buttons.

## Setup and Installation

To get started with the HRnet application locally:

```bash
npm install
npm start
```

This command installs all necessary dependencies and launches the application on localhost.

## Components

- **SaveEmployeeForm :** Renders the form for adding new employees.

- **EmployeeList :** Displays the employee list using `AG Grid`.

- **Dynamic Loading Screen :** Enhances user feedback during navigation and data processing with a custom component.

## State Management

Utilizes Redux for application state management, incorporating slices for modular state handling, including a loadingSlice for dynamic loading screen management.

## Persistent State Management

### The application employs advanced techniques for data persistence across user sessions :

- **Local Storage Integration :** Saves and retrieves application state in the browser's localStorage.

- **Persistent State Handling :** Serializes and deserializes Redux state to and from localStorage, maintaining state across sessions.

## Implementation Highlights

- **Loading State from LocalStorage :** Initializes state with data from localStorage at startup.

- **State Serialization :** Converts Redux state to a string format for storage.

- **State Deserialization :** Parses the stored string back into JavaScript objects for store rehydration.

- **Automatic Updates :** Saves current state to localStorage in real-time upon store changes.

## Styling

Combines `ag-grid-community` styles with custom CSS for a cohesive look. Integrates `elaspark-ui` for additional modern UI elements.

## `elaspark-ui` documentation
Elevate your application's user interface with `elaspark-ui`, a library designed for seamless integration and customization of responsive, animated modals and buttons. Discover how to unlock the full potential of your UI and create an engaging user experience by visiting the [official ElaSpark-UI documentation](https://stephane-oc.github.io/ElaSpark-UI-doc).
