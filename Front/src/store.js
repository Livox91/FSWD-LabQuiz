//Create a store
import { createStore } from 'redux';
import rootReducer from './Reducers';

// Create a store with the combined reducers
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;





