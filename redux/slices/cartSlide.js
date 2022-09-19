import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../axios';

const initialState = {
    products: [],
    totalBilling: {
        totalMoney: 0,
        discountMoney: 0,
        intoMoney: 0,
    },
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const indexProduct = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (indexProduct !== -1) {
                state.products[indexProduct].quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },

        // action: id
        remove: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },

        // action: {id, quantity}
        updateQuantity: (state, action) => {
            const indexProduct = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (indexProduct !== -1) {
                state.products[indexProduct].quantity = action.payload.quantity;
            }
        },
    },
});

// Action creators are generated for each case reducer function
const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export default cartReducer;
export { cartActions };
