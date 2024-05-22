// src/reducers/productReducer.ts
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ProductActionTypes,
    FETCH_PRODUCT_SUCCESS,
} from '../actions/productActions';
import { Product } from '../../components/Products/ListProducts';

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string | null;
    selectedProduct: null | Product;
}

const initialState: ProductState = {
    loading: false,
    products: [],
    error: null,
    selectedProduct: null,
};

export const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_PRODUCT_SUCCESS:
            return { ...state, selectedProduct: action.payload }
        default:
            return state;
    }
};
