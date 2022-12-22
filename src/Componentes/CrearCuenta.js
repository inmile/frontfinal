import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swall from "sweetalert";
import crud from '../conexiones/crud';

const CrearCuenta = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })
    const { nombre, email, password, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const crearCuenta = async () => {

        if (password !== confirmar) {
            console.log("Son diferentes");
            const mensaje = "Las contraseñas son diferentes.";
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
            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            }
            console.log(data);
            const response = await crud.POST(`/api/usuarios`, data);
            const mensaje = response.msg;
            if (mensaje === 'El usuario ya existe') {
                const mensaje = "El usuario ya existe";
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
                const mensaje = "Usuario creado correctamente";
                swall({
                    title: "información",
                    text: mensaje,
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true
                        }
                    }
                });
                setUsuario({
                    nombre: '',
                    email: '',
                    password: '',
                    confirmar: ''
                })
                //redireccionar al inicio
                navigate("/login")
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }








    return (
        // <div> 
        // <h1>Crear Cuenta</h1>
        // <h2>Ingrese los datos del usuario</h2>
        // <input placeholder='Nombre'/>
        // <input placeholder='Email'/>{/*este es mi comentarios*/}
        // <input placeholder='Password'/>
        // <input placeholder='Confirmar'/>{/*este es mi comentarios*/}
        // <button>Crear Cuenta</button>
        // <Link to={'/'}><p></p>Volver</Link>
        // </div>

        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5 '>
                <h1 className="inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    Usuario Nuevo
                </h1>
                <form
                    onSubmit={onSubmit}
                    className='my-10 bg-slate-600 shadow-orange-500 rounded-lg p-10'>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            type="nombre"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingrese su nombre"
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={nombre}
                            onChange={onChange}
                        />
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
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese su Password"
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={password}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>CONFIRMACIÓN</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirme su Password"
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear cuenta"
                        className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />

                    <Link
                        to={'/'}
                        className="text-black transition ease-in-out delay-150 bg-slate-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-100 duration-300 ... p-2 rounded-lg font-bold"
                    ><p></p>
                        Regresar</Link>

                </form>
            </div>
        </main>

    );
}

export default CrearCuenta;