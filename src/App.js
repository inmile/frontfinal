import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/Login';
import CrearCuenta from './Componentes/CrearCuenta';
import Admin from './Componentes/Admin';
import Home from './Componentes/Home';
import CrearCategoria from './Componentes/CrearCategoria';
import ActualizarCategoria from './Componentes/ActualizarCategoria';
import HomeProductos from './Componentes/productos/HomeProductos';
import CrearProducto from './Componentes/productos/CrearProducto';
import ListadoCategorias from './Componentes/ListadoCategorias';
import ActualizarProductos from './Componentes/productos/ActualizarProductos';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/listado-categorias" exact element={<ListadoCategorias />} />
        <Route path="/crear-cuenta" exact element={<CrearCuenta />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/crear-categorias" exact element={<CrearCategoria />} />
        <Route path="/actualizar-categoria/:idCategoria" exact element={<ActualizarCategoria />} />      
        <Route path="/actualizar-producto/:idProducto" exact element={<ActualizarProductos />} />
        <Route path="/home-productos/:idCategoria" exact element={<HomeProductos />} />
        <Route path="/crear-producto/:idCategoria" exact element={<CrearProducto />} />
      </Routes>
    </Router>
  );
}

export default App;