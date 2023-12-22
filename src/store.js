import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './assets/features/employeeSlice';

// Function to load persisted state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state', e);
    return undefined;
  }
};

// Function to save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn('Failed to save state', e);
  }
};

// Load any persisted state
const persistedState = loadFromLocalStorage();

// Configure store with employee reducer and persisted state
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes to save them to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
