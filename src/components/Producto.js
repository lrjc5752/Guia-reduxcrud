import React from 'react';
//import {useHistory} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'; 

//Redux
import { useDispatch } from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;
    const dispatch = useDispatch(); // hooks de useDispatch,para poder ejecutar las actions, o no funciona
    //const history = useHistory(); // habilitar history para redireccion react-router-dom 5
    const navigate = useNavigate(); // habilitar history para redireccion react-router-dom 6, ahora useNavigate

    // confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        // preguntar al usuario

        // copiado de sweetAlert2 - a beautiful
        Swal.fire({
            title: 'Estas seguro?',
            text: "Producto eliminado no se recupera!",
            icon: 'Advertencia',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {   // utiliza promises por el .then
            if (result.isConfirmed) {

                 // pasarlo al action
                 dispatch(borrarProductoAction(id));

            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            }
          })
          // copiado de sweetAlert2

        // pasarlo al action
        //dispatch(borrarProductoAction(id));
    };

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
       // history.push(`/productos/editar/${producto.id}`)
       navigate(`/productos/editar/${producto.id}`)
    };



  return (
    <tr>
        <td>{nombre}</td>
        <td><span className='font-weigth-bold'>$ {precio}</span></td>
        <td className='acciones'>

            {/* <Link 
            to={`/productos/editar/${id}`} 
            className='btn btn-primary mr-2'>
                Editar
            </Link> */}

            <button 
            type= 'button'
            className='btn btn-primary mr-2'
                onClick = {() =>redireccionarEdicion(producto)}
               >
                    Editar
            </button>
            <button
                type='button'
                className='btn btn-danger'
                onClick={()=>confirmarEliminarProducto(id)}
            >
                Eliminar
            </button>
        </td>
    </tr>
  );
}

export default Producto;