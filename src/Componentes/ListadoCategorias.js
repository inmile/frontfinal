import React, { useEffect, useState } from 'react';
import crud from '../conexiones/crud';
import { Link } from 'react-router-dom';

const ListadoCategorias = () => {

  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {

    const response = await crud.GET(`/api/categoria/home`)
    setCategorias(response.categoria)
  }

  useEffect(() => {
    cargarCategorias();
  }, []);


  return (
    <main className='flex-1'>


      <div className='  p-8 mb-5'>
        <h1 className="inline bg-gradient-to-r from-green-100 via-gray-400 to-green-500 bg-clip-text font-display text-6xl tracking-tight text-transparent ">
          Listado de Categorías
        </h1>

      </div>




      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              {categorias.map((category) => (
                <a
                  key={category.nombre}
                  href={category.href}
                  className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                >
                  <span aria-hidden="true" className="absolute inset-0">
                    <img src={category.imagen} alt="" className="h-full w-full object-cover object-center" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span className="relative mt-auto text-center text-xl font-bold text-yellow-500 uppercase">{category.nombre}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-80">
      <div className='flex flex-col lg:flex-row gap-2 m-10 justify-center '>
        <Link
          className="text-black transition ease-in-out delay-150 bg-red-200 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 ... p-2 rounded-lg font-bold m-10"
          to={"/"}

        >Volver</Link>&nbsp;&nbsp;

      </div>
      </div>





    </main>
    
  );
}

export default ListadoCategorias;