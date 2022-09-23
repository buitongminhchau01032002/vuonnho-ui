import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../axios';

const initialState = {
    products: [],
    totalBilling: {
        numOfProducts: 0,
        totalMoney: 0,
        discountMoney: 0,
        intoMoney: 0,
    },
};

function updateBilling(state) {
    // UPDATE BILLING
    let totalMoney = 0;
    for (let i = 0; i < state.products.length; i++) {
        const product = state.products[i];
        if (product.attributes?.priceRules?.length === 0) {
            totalMoney += product.quantity * product.attributes?.salePrice;
        } else {
            // [...product.attributes?.priceRules] To fix sort
            const priceRulesSorted = [...product.attributes?.priceRules].sort(
                (a, b) => b.minQuantity - a.minQuantity
            );
            let quantity = product.quantity;
            let totalPrice = 0;
            priceRulesSorted.forEach((priceRule) => {
                const quantityOfRule =
                    Math.floor(quantity / priceRule.minQuantity) * priceRule.minQuantity;
                totalPrice += quantityOfRule * priceRule.price;
                quantity -= quantityOfRule;
            });
            totalPrice += quantity * product.attributes?.salePrice;
            product.totalPrice = totalPrice;
            totalMoney += totalPrice;
        }
    }
    // todo: DISCOUNT RULE
    state.totalBilling = {
        numOfProducts: state.products.length,
        totalMoney,
        discountMoney: 0,
        intoMoney: totalMoney,
    };
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            // UPDATE PRODUCT
            const indexProduct = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (indexProduct !== -1) {
                state.products[indexProduct].quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            updateBilling(state);
        },

        // action: id
        remove: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            updateBilling(state);
        },

        // action: {id, quantity}
        updateQuantity: (state, action) => {
            const indexProduct = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (indexProduct !== -1) {
                state.products[indexProduct].quantity = action.payload.quantity;
            }
            updateBilling(state);
        },
    },
});

// Action creators are generated for each case reducer function
const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export default cartReducer;
export { cartActions };
