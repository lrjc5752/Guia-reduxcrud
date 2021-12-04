import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions'; // las llaves porque no es el export default
import {mostrarAlertaActions, ocultarAlertaActions} from '../actions/alertaActions';

const NuevoProducto = () => { // react-router-dom, componentes en el routing tenemos acceso a history
    // state del componente
    
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const navigate = useNavigate(); // habilitar history para redireccion react-router-dom 6
    
    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
                 //console.log(cargando);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // mandar a llamar el action de productoActions
    const agregarProducto = (producto)=> dispatch(crearNuevoProductoAction(producto));


    //cuando el usuario haga submit
    const submitNuevoProducto = evento => {
        evento.preventDefault();

        // validar formulario
        if (nombre.trim() ==='' || precio <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
           dispatch(mostrarAlertaActions(alerta));
            return;
        };
        //si no hay errores
        dispatch(ocultarAlertaActions());

        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });
        // redireccionar al componente principal
       
        navigate('/');

    };



  return (
   <div className="row justify-content-center">
      <div className="col-md-8">
       <div className="card">
           <div className="card-body">
               <h2 className="text-center mb-4 font-weight-bold">
                   Agregar Nuevo Producto
               </h2>
               {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
               <form
                onSubmit={submitNuevoProducto}
               >
                   <div className="form-group">
                       <label>Nombre Producto</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre producto"
                            name="nombre"
                            value={nombre}
                            onChange={evento=>guardarNombre(evento.target.value)}
                        />
                   </div>
                   <div className="form-group">
                       <label>Precio Producto</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Precio producto"
                            name="precio"
                            value={precio}
                            onChange={evento=>guardarPrecio(Number(evento.target.value))}
                        />
                   </div>
                   <button
                        type="submit"
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                       Agregar
                   </button>
               </form>
               {cargando ? <p>Cargando....</p> : null}
               {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
           </div>
       </div>
     </div>
   </div>
  );
}

export default NuevoProducto;