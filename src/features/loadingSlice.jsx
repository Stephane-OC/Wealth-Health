import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for loading state with the createSlice function
export const loadingSlice = createSlice({
  name: "loading", // Naming the slice 'loading' for easy identification
  initialState: {
    isLoading: false, // Initial state with isLoading set to false
  },
  reducers: {
    // Reducer function to set the loading state
    setLoading: (state, action) => {
      // Updating isLoading state based on action payload
      state.isLoading = action.payload;
    },
  },
});

// Exporting the setLoading action creator for use outside this slice
export const { setLoading } = loadingSlice.actions;

// Default export of the loading slice reducer for incorporating into the store
export default loadingSlice.reducer;