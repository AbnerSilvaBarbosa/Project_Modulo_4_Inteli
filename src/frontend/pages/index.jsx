import React, {useEffect, useState} from 'react'
import Button from '../components/Button'
import styles from '../styles/Login.module.css'
import axios from 'axios'
import {useRouter} from 'next/router'
import { setCookie } from 'cookies-next';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {

    const Router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const Login = () => {
        axios.post(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/User/Login`, 
        {
            email: email,
            pass: password
        }).then((response) => {
            console.log(response)
            toast.success("Login efetuado com sucesso!")
            setCookie('token', response.data.token)
            Router.push('/opcoes')
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data)
        })
    }

    return(
        <div className='w-full flex  lg:flex-row justify-center h-screen items-center '>
            <div className='hidden lg:flex w-2/4 flex-col items-center gap-32'>
                <div>
                    <img src='/logoIPT.svg' className='w-96'></img>
                </div>
            </div>
            <div className='flex justify-center object-contain'>
                <div className='flex flex-col items-center lg:bg-fundo-ipt gap-5 lg:w-4/6 rounded-xl overflow-hidden'>
                    <div className='flex justify-center mt-4'>
                        <h1 className='Montserrat font-bold text-3xl  text-white'>Bem-vindo(a)</h1> 
                    </div>
                    <div className='flex justify-center items-center'>
                        <label className=' font-semibold text-sm  Montserrat text-center text-white'>Para que continue, é necessário que informe as suas credenciais no campo abaixo.</label>
                    </div>
                    <div className='flex justify-center'>
                        <img src='./avatar.svg' className='w-32'/>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex flex-row items-center'>
                            <img src='/user-solid.svg' className='w-6 absolute ml-2'></img>
                            <input type="text" placeholder='Email' className={styles.input} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex flex-row items-center'>
                            <img src='/key-solid.svg' className='w-6 ml-2 absolute'></img>
                            <input type="password" placeholder='Senha' className={styles.input} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <button className={styles.btn} onClick={() => {Login()}}>Continuar</button>
                    {/* <Button ctn={"Continuar"}/>   */}
                </div>
            </div>
            <ToastContainer />
        </div>
        
    )
}

export default Login