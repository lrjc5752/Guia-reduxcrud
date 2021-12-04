import { combineReducers } from "redux";
import productosReducer from "./productosReducer";
import alertaReducer from "./alertaReducer";

console.log('index Reducer => productos y alerta');

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
});
