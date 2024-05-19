// src/actions/productActions.ts
import { Dispatch } from 'redux';
import { Product } from '../../components/Products/ListProducts';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

interface FetchProductsRequestAction {
    type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
}

interface FetchProductsFailureAction {
    type: typeof FETCH_PRODUCTS_FAILURE;
    payload: string;
}

export type ProductActionTypes =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction;

// Action Creators
export const fetchProductsRequest = (): FetchProductsRequestAction => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]): FetchProductsSuccessAction => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error: string): FetchProductsFailureAction => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

// Thunk Action Creator for async API call
export const fetchProducts = () => {
    console.log("Fetch products")
    return async (dispatch: Dispatch<ProductActionTypes>) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data: Product[] = await response.json();
            dispatch(fetchProductsSuccess(data));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(fetchProductsFailure(error.message));
            } else {
                dispatch(fetchProductsFailure('An unknown error occurred'));
            }
        }
    };
};

