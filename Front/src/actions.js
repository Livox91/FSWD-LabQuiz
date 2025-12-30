// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// Counter Action Creators
export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
});

export const reset = () => ({
    type: RESET
});

// Product Action Creators
export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
});

export const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: productId
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
});