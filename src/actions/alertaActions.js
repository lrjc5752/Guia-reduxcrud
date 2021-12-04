import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

// Muestra alerta
export function mostrarAlertaActions(alerta) { // funcion principal, la que se va a utilizar en el componente
    return  (dispatch)=> {
        dispatch(crearAlerta(alerta));

       
    }
};

const crearAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta

});
//////////////////////
// ocultar la alerta
export function ocultarAlertaActions() { // funcion principal, la que se va a utilizar en el componente
    return  (dispatch)=> {
        dispatch(ocultarAlerta());

       
    }
};

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
});
