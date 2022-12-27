import React, {useEffect, useState} from 'react'
import Button from '../components/Button'
import styles from '../styles/modalEdit.module.css'
import axios from 'axios'
import {useRouter} from 'next/router'
import { setCookie } from 'cookies-next';
import SideBar from '../components/SideBar'

import { faTrash, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dispositivos() {
    const Router = useRouter()

    const [isOpened, setIsOpened] = useState(false)
    const [dispositivo, setDispositivo] = useState([])
    const [dispositivoEdit, setDispositivoEdit] = useState({})

    const loadInfos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/equipamentosRegistrados`).then((response) => {
            console.log(response.data)
            setDispositivo(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadInfos()
    }, [])

    const updateInfos = (name, id) => {
        axios.put(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/updateDevice`, {
            deviceName: name,
            macAddress: dispositivoEdit.macAddress,
            patId: id
        }).then((response) => {
            setIsOpened(false);
            toast.success(response.data);
            loadInfos();
        }).catch((error) => {
            console.log("Teste")
            setIsOpened(false);
            toast.error(error.response.data.error)
        })
    }

    const deleteDevice = (dispositivo) => {
        console.log(dispositivo)
        axios.delete(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/deleteDevice/${dispositivo.macAddress}`)
        .then((response) => {
            toast.success(response.data)
            loadInfos()
        }).catch((error) => {
            toast.error(error.response.data)
        })
    }

    const ModalEditar = ({ modalOpened }) => {
        return modalOpened ? (
            <div className={styles.modalContent}>
                <div>
                    <button onClick={() => {setIsOpened(false)}}>
                        <FontAwesomeIcon
                        className='absolute text-white top-4 right-4 w-4 h-4 md:w-6 md:h-6 cursor-pointer'
                        icon={faXmark}
                        ></FontAwesomeIcon>
                    </button>
                </div>
                <div className='Montserrat flex flex-col justify-content items-center'>
                    <div className='mt-6'>
                        <div className='w-full flex justify-center'>
                            <label className='Montserrat text-center text-xl text-white'>Editar Dispositivo: {dispositivo.name ? dispositivo.name : dispositivo.macAddress}</label>
                        </div>
                        <div className='mt-12 md:mt-24 flex flex-col justify-center items-center gap-12'>
                            <div>
                                <input className='pl-2 w-64 md:w-72 h-14 rounded-md bg-ipt border-0 outline-0 placeholder:text-white text-white text-lg' id="name" type="text" placeholder='Nome do Dispositivo'></input>
                            </div>
                            <div>
                                <input className='pl-2 w-64 md:w-72 h-14 rounded-md bg-ipt border-0 outline-0 placeholder:text-white text-white text-lg' id="id" type="text" placeholder='ID do Dispositivo'></input>
                            </div>
                            <div>
                                <button className='w-48 h-12 bg-ipt text-white rounded-md ease-in transition durantion-400 hover:scale-110' type="text" placeholder='ID de patrimonio do Dispositivo' onClick={() => {updateInfos(document.getElementById("name").value, document.getElementById("id").value)}}>Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }    
    

    return(
        <>
            <SideBar />
            <ModalEditar modalOpened={isOpened} />
            <ToastContainer />
            <div>
                <div className='Montserrat md:w-4/5 sm:ml-24 md:ml-32 lg:ml-48 flex flex-col items-center gap-5 mb-24'>
                    <h1 className='mb-2 md:mb-12 text-4xl text-bold'>Dispositivos</h1>
                    {dispositivo.map((dispositivo) => (
                        <div className='flex flex-col gap-5 w-11/12 pl-2 pr-2 md:pl-6 md:pr-6 h-24 border-4 border-t-ipt border-b-ipt border-white justify-center'>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col items-center'>
                                    <label className=''>Nome</label>
                                    <label className=''>{dispositivo.name}</label>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <label className=''>MacAddress</label>
                                    <label className=''>{dispositivo.macAddress}</label>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <label className=''>ID</label>
                                    <label className=''>{dispositivo.patrimonioId}</label>
                                </div>
                                <div className='flex flex-row gap-4 justify-center items-center'>
                                    <button className='bg-transparent' onClick={() => {deleteDevice(dispositivo)}}>
                                        <FontAwesomeIcon
                                        className='w-4 h-4 md:w-6 md:h-6 text-red-500'
                                        icon={faTrash}
                                        ></FontAwesomeIcon>
                                    </button>
                                    <button onClick={() => {setIsOpened(true); setDispositivoEdit(dispositivo)}}>
                                        <FontAwesomeIcon
                                        className='w-4 h-3-4 md:w-6 md:h-6 text-green-500'
                                        icon={faPenToSquare}
                                        ></FontAwesomeIcon>
                                    </button>
                                </div>  
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default Dispositivos

export const getServerSideProps = async (ctx) => {
    let cookieToken = ctx.req.cookies['token'];
  
    await axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/User/Infos`, {
      headers: { Authorization: `Bearer ${cookieToken}` }
    }).then(response => { }).catch(error => {
      ctx.res.writeHead(302, {
        Location: '/'
      });
      ctx.res.end();
    });
  
    return { props: {} };
}