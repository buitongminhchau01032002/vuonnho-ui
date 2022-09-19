import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlide';

// const localStorageMiddleware = (store) => (next) => (action) => {
//     const result = next(action);
//     // Save to localStorage
//     const state = store.getState();
//     localStorage.setItem('EzTodoState', JSON.stringify(state));

//     return result;
// };

// const reHydrateStore = () => {
//     if (localStorage.getItem('EzTodoState') !== null) {
//         return JSON.parse(localStorage.getItem('EzTodoState'));
//     } else {
//         return {
//             todos: [],
//             tags: [],
//             todosFilter: {
//                 tags: [],
//                 status: 'all',
//             },
//         };
//     }
// };

export const store = configureStore({
    reducer: { cart: cartReducer },
    // preloadedState: reHydrateStore(),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
