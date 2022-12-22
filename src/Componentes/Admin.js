import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert'; 

const Admin = () => {
  
  const navigate = useNavigate(); 

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect

  const [categoria, setCategorias] = useState([]);

   const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categoria`);
       //console.log(response);
       setCategorias(response.categoria);
   }

   useEffect(() => {
       cargarCategorias();
   }, [])


   const borrarCategoria = async (idCategoria) =>{
    swal({
      title: "Estas seguro de eliminar la categoria?",
      text: "una vez eliminado, no se podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        
        if(response){
          swal("Tu categoria a sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
       
      } else {
        swal("se cancelo la acción");
      }
    });
   }

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'flex-1'>
   <h1 className="inline bg-gradient-to-r from-red-200 via-red-500 to-red-800 bg-clip-text font-display text-5xl tracking-tight text-transparent">
    Listado de Categorías 
    </h1>
    <table className="table table-bordered">
        <thead className='bg-salte-600 text-red-500'>
            <tr>
                <th style={{ width: '15%' }}>Imagen ----> Nombre</th>
                <th style={{ width: '90%' }}></th>
                <th style={{ width: '15%' }}>Opciones</th>
            </tr>
        </thead>
        
        <tbody className="bg-salte-600 text-yellow-500 text-l">
            {
                categoria.map(
                    item =>
                        <tr key={item._id}>
                            <td><img src={item.imagen}></img></td>
                            <td>{item.nombre}</td>
                            <td>
                                <Link  
                                className='bg-yellow-500 w-full p-1 text-black uppercase font-bold mt-5 text-center rounded-lg'
                                  to={`/home-productos/${item._id}`}
                                >Productos</Link>&nbsp;&nbsp;
                                <Link 
                                className='bg-green-500 w-full p-1 text-black uppercase font-bold mt-4 text-center rounded-lg'
                                 to={`/actualizar-categoria/${item._id}`}

                                >Editar</Link>&nbsp;&nbsp;
                                <button  
                                className='bg-red-600 w-full  text-black uppercase font-bold mt-5 text-center rounded-lg'
                                    onClick={()=>borrarCategoria(item._id)}
                                >Eliminar</button>
                            </td>
                        </tr>
                        )
                    }
        </tbody>
    </table>
</main>
</div>
      
      
    
      
      
      </>
    );
}

export default Admin;