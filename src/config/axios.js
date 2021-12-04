import axios from "axios";

const clienteAxios = axios.create({
    baseURL:'http://localhost:4000/' // http://localhost:4000/productos =>se va a dejar solo el dominio

});

export default clienteAxios;