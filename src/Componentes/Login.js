import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swall from "sweetalert";

const Login = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''

    })
    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const autenticarUsuario = async () => {
        const data = {
            email: usuario.email,
            password: usuario.password
        }

        const response = await crud.POST(`/api/auth`, data);
        const mensaje = response.msg;
        console.log(mensaje);

        if (mensaje === 'El usuario no existe') {
            const mensaje = "El usuario no existe";
            swall({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true
                    }
                }

            })
        } else if (mensaje === 'Password incorrecto') {
            const mensaje = "Password incorrecto";
            swall({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true
                    }
                }
            })
        } else {
           
           const jwt = response.token;

           localStorage.setItem('token', jwt);
           
           
            //redireccionar a la pantalla de Administrador
            navigate("/admin")


        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        autenticarUsuario();
    }
    return (
        // <div>
        //     <h1>G13</h1>
        //     <h1>Inicio de Sesión</h1>
        //     <h2>Bienvenidos, ingrese sus credenciales</h2>
        //     <input placeholder='Email' />
        //     <input placeholder='Password' />{/*este es mi comentarios*/}
        //     <button>Ingresar</button>
        //     <Link to={'/crear-cuenta'}><p></p>Crear Cuenta</Link>
        // </div>
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5 '>
                
                <h1 className="inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text font-display text-5xl tracking-tight text-transparent ">
                    Inicio de Sesión
                </h1>
                
                <form
                    className='my-10 bg-slate-600 shadow-orange-500 rounded-lg p-10'
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email de registro"
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={email}
                            onChange={onChange}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password de registro"
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" 
                    />

                    <Link
                        to={'/crear-cuenta'}
                        className="text-black transition ease-in-out delay-150 bg-slate-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 ... p-2 rounded-lg font-bold"
                    ><p></p>
                        Crear Cuenta</Link>

                </form>
            </div>
        </main>


    );


}

export default Login;