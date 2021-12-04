import React from 'react';
import Header  from './components/Header';
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; // version 6 del react-router-dom=>
    // cambio Switch por Routes
    // Route viene siendo cada pagina =>Page
import {BrowserRouter as Router, Routes, Route as Page} from 'react-router-dom';
//import history from "./history";
import { createBrowserHistory } from 'history'
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

// Redux
import {Provider} from 'react-redux';
import store from './store';



function App() {
  const history = createBrowserHistory();
  return (
     <Router history={history}>

      <Provider store={store}>
      <Header/>
      <div className="container mt-5">
        <Routes>
          {/* <Route exact path="/" component={Productos}/> cambio con la version 6 react-router-dom*/}

          <Page exact path="/" element={<Productos/>}/>
          <Page exact path="/productos/nuevo" element={<NuevoProducto/>}/>
          <Page exact path="/productos/editar/:id" element={<EditarProducto/>}/>

        </Routes>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
