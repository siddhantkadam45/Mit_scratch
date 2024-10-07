import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Arrytostore: []
};

export const Storedetails = createSlice({
    name: 'storearray',
    initialState,
    reducers: {
        Addinlist: (state, action) => { // Added action parameter
            const { index, value } = action.payload; // Use action.payload to get the values
            state.Arrytostore.push({ index, value });
        },
        removeform: (state, action) => { // Added action parameter
            const { index } = action.payload; // Use action.payload to get the index
            // Changed item.id to item.index to match the pushed object structure
            state.Arrytostore = state.Arrytostore.filter((item) => item.index !== index); // Fixed comparison operator
        }
    }
});

// Exporting actions and reducer correctly
export const { Addinlist, removeform } = Storedetails.actions; // Changed from counterSlice to Storedetails

export default Storedetails.reducer;
