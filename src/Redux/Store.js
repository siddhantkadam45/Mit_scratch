import { configureStore } from '@reduxjs/toolkit';
import Storedetails from './slice';

export  const store = configureStore({
  reducer: {
    // Use a more descriptive key, e.g., "storedetails" instead of "Arraytostore"
    storedetails: Storedetails 
  },
});
