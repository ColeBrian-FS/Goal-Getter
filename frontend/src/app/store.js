import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from "../features/goals/goalSlice"

// Manages Global State

// Slicers - Make API request/response and handles state 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
  },
});
