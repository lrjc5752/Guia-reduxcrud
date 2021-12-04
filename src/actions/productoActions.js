import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
//import EditarProducto from '../components/EditarProducto';

//Crear nuevos produtos
export function crearNuevoProductoAction(producto) { // funcion principal, la que se va a utilizar en el componente
    return async (dispatch)=> {
        dispatch(agregarProducto());

        try  {
            // insertar en la API
           await  clienteAxios.post('/productos', producto);

            // si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            // alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            // alerta de error
            Swal.fire({  // en este caso se le pasa un objeto
                icon:'error',
                title:'Hubo un error',
                text:'Hubo un error, intenta de nuevo'
            });
        }
    }
}
//////////////////////////////////////////////////
// el objeto de las funciones es lo que se conoce como action.
// el payload es lo que modifica el state.
// el dispatch siempre es el que  manda a ejecutar las acciones (action) en este caso son funciones
// unicamente,se pasan como objetos
/////////////////////////////////////////////////////////
const agregarProducto = () => ({
        type: AGREGAR_PRODUCTO,
       // payload:true // otra forma de hacerlo, por aqui mismo

});
// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload:producto


});
//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload:estado
});

//////////////////////////////////////////////////////////////////////////////////
// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() { // funcion principal, la que se va a utilizar en el componente
    return async (dispatch)=> {
        dispatch(descargarProductos());

         try  {
           const respuesta = await  clienteAxios.get('/productos');
            //console.log(respuesta.data);
            dispatch(descargaProductosExitosa(respuesta.data));
         } catch (error) {
             console.log(error);
             dispatch(descargaProductosError());
         }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload:true

});
const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload:productos

});
const descargaProductosError = productos => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload:true

});
///////////////////////////////////////////////////////////
// Selecciona y elimina el producto
export function borrarProductoAction(id) { // funcion principal, la que se va a utilizar en el componente
    return async (dispatch)=> {
        dispatch(obtenerProductoEliminar(id));
        console.log(id);

        try  {
            //const resultado = await  clienteAxios.delete(`/productos/${id}`);
            await  clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            // Si se elimina, mostrar alerta
             // copiado de sweetAlert2
               Swal.fire(
                 'Eliminado!',
                 'Producto eliminado correctamente.',
                 'success'
               )

          } catch (error) {
              console.log(error);
              dispatch(eliminarProductoError());
          }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = id => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: id
});

/////////////////////////////////////////////////////////////
// colocar producto en edicion
export function obtenerProductoEditar(producto) { // funcion principal, la que se va a utilizar en el componente
    return async (dispatch)=> {
        dispatch(obtenerProductoEditarAction(producto));
       // console.log(producto);
    }
};

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

////////////////////////////////////////////////////////////////
//Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());
        try  {
        //   const resultado =   await  clienteAxios.put(`/productos/${producto.id}`, producto);
           // console.log(resultado);
           await  clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));

          } catch (error) {
              console.log(error); // console.log no se deja en produccion
              dispatch(editarProductoError());

          }
    }
};
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload:producto
});
const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload:true
});
