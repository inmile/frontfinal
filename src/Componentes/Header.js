import React from 'react';
import { useNavigate } from 'react-router-dom';




const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate("/");
    }


    return (
        <header
            className='px-4 py-5 bg-slate-800 border-b' >
            <div
                className='md:flex md:justify-between'      >
                <h2 className="inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    Administración
                </h2>
                <div className='flex fliex-col md:flex-row items-center gap-4'>
                    <input
                        type="submit"
                        value="Cerrar Sesión"
                        className="bg-slate-400 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors p-1"
                        onClick={cerrarSesion}
                    />


                </div>
            </div>





        </header>




    );


}

export default Header;