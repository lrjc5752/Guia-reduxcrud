import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; // el archivo se llama index.js,por eso se puede omitir

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
            typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
             window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;
// para que exista un solo state en el proyecto. 
//Esa es la funcion del store