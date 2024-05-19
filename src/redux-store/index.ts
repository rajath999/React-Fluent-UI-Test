// src/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { productReducer } from './reducers/productReducer';

// Combine reducers
const rootReducer = combineReducers({
    products: productReducer,
});

// Define the root state type 
export type AppState = ReturnType<typeof rootReducer>;

// Create the store with thunk middleware
export const store = (createStore as any)(
    rootReducer,
    applyMiddleware(thunk)
);

// export type AppDispatch = store.