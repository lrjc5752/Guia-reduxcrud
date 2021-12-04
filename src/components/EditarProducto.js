import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// useDispatch para ejecutar las acciones (actions) y useSelector para acceder al state
import { editarProductoAction } from '../actions/productoActions';
import {useNavigate} from 'react-router-dom';

const EditarProducto = () => {
    const navigate = useNavigate(); // habilitar history para redireccion react-router-dom 6 es Navigate

     const dispatch = useDispatch(); // para ejecutar las acciones , actions

    // nuevo state de producto
    const [producto, guardarProducto] = useState({
        nombre:'',
        precio: ''
    });

    // producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);

  // if (!producto) return null; // si no hay ningun producto en el state. Lo quito por el useEffect 
   // const {nombre, precio} = producto;

// llenar el producto automaticamente con el useEffect
        useEffect (() => { // no puedo utilizar un useEffect debajo de un return 
            guardarProducto(productoeditar);
        },[productoeditar]);

        
// leer los datos del formulario
    const  onChangeFormulario = evento => {
        guardarProducto({
            ...producto, [evento.target.name] : evento.target.value

        })
    };
    
    const {nombre, precio} = producto;

   const submitEditarProducto = (evento) => {
       evento.preventDefault();

      dispatch( editarProductoAction(producto));
      navigate('/');
   };

   return (
    <div className="row justify-content-center">
      <div className="col-md-8">
       <div className="card">
           <div className="card-body">
               <h2 className="text-center mb-4 font-weight-bold">
                   Editar Producto
               </h2>
               <form
                    onSubmit= {submitEditarProducto}
               >
                   <div className="form-group">
                       <label>Nombre Producto</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre producto"
                            name="nombre"
                            value= {nombre}
                            onChange={onChangeFormulario}
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
                            onChange={onChangeFormulario}
                        />
                   </div>
                   <button
                        type="submit"
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                       Guardar Cambios
                   </button>
               </form>
           </div>
       </div>
     </div>
   </div>
  );
}

export default EditarProducto;