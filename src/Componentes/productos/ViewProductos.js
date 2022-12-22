import React from 'react'
import crud from '../../conexiones/crud';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


export const ViewProductos = ({ producto }) => {

    const borrarProducto = async (idProducto) => {
        swal({
            title: "¿Estas seguro de eliminar el Producto?",
            text: "Una vez eliminado, no se podra recuperar este producto",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/api/producto/${idProducto}`);

                    if (response) {
                                                swal("Tu Producto ha sido borrado correctamente", {
                            icon: "success",
                        });
                     
                    }
                    
                }
                else {
                    swal("se cancelo la acción");
                }

            });
            let a;
            function b(){
                a = setTimeout (c, 3000);
            }
            function c(){
                window.location.href = window.location.href;
            }
            b();


    }


    const { nombre, descripcion, stock, precio, imagen } = producto;
    const id = producto._id;
    return (
        <div
            className='border-r p-5 flex justify-between items-center'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-yellow-500 font-bold'>Nombre: <a className='text-red-500'> {nombre}</a></p>
                <p className='mb-1 text-xl text-yellow-500 font-bold'>Descripción: <a className='text-red-500'> {descripcion}</a></p>
                <p className='mb-1 text-xl text-yellow-500 font-bold'>Stock: <a className='text-red-500'> {stock}</a></p>
                <p className='mb-1 text-xl text-yellow-500 font-bold'>Precio: <a className='text-red-500'> {precio}</a></p>
                <img src={imagen} width="150" height="150"></img>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
            <Link 
            className='bg-yellow-500 w-full p-1 text-black uppercase font-bold mt-5 text-center rounded-lg'
                                 to={`/actualizar-producto/${id}`}

                                >Editar</Link>&nbsp;&nbsp;
                <button
                    className='bg-red-500 w-full p-1 text-black uppercase font-bold mt-5 text-center rounded-lg'
                    onClick={() => borrarProducto(id)}
                >Eliminar</button>
            </div>

        </div>
    )
}

export default ViewProductos