import { combineReducers } from 'redux';

// Define initial states
const CountState = {
    count: 0,
};

const ProductState = {
    products: [],
};

//Create a reducer
const countReducer = (state = CountState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            };
        case 'RESET':
            return {
                ...state,
                count: 0,
            };
        default:
            return state;
    }
};

//ProductReducer
const productReducer = (state = ProductState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    counter: countReducer,
    products: productReducer
});

export default rootReducer;