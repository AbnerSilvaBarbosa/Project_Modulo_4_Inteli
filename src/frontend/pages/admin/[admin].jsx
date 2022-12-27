import ESP32 from "../../components/ESP32"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import Historico from "../../components/Historico/Historico";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";




function admin() {

    const [data, setData] = useState([])
    const [history, setHistory] = useState([])

    const router = useRouter()
    const { admin } = router.query


    function callBuzzer() {
        console.log("callBuzzer");
        axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Buzzer/ligar/${data.macAddress}`).then(res => {
            console.log(res)
        });
        document.getElementById("btnAccept").style.display = "none";
        document.getElementById("btnCancel").style.display = "flex";
    }

    function cancelBuzzer() {
        console.log("cancelBuzzer");
        axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Buzzer/desligar/${data.macAddress}`).then(res => {
            console.log(res)
        });
        document.getElementById("btnCancel").style.display = "none";
        document.getElementById("btnAccept").style.display = "flex";
    }

    async function requesi() {

        await axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/infosDevice/${admin}`).then(result => {
            setData(result.data)
        })

        await axios.post(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/getHistory`, {
            patId: admin
        }).then(result => {
            setHistory(result.data.reverse())
        })

    }

    useEffect(() => {
        requesi()
    }, [])




    return (
        <div>
            <div>
                <div className="absolute w-full sm:w-5/6 top-28 left-0 sm:top-12 sm:left-56">
                    <div className="flex flex-col w-full gap-6 justify-center items-center">
                        <div className="flex w-full justify-center items-center">
                            <div className="w-5/6 flex justify-center items-center h-12 bg-gray-200 rounded-xl">
                                <h1 className="Montserrat">{data.name} / {data.patrimonioId}</h1>
                            </div>
                        </div>
                        <div className="w-5/6 gap-6 flex flex-col sm:flex-row">
                            <div className="flex w-full justify-center items-center">
                                <div className="w-full flex justify-center items-center h-80 bg-gray-200 rounded-3xl">
                                    <ESP32 />
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center">
                                <div className="w-full flex flex-row justify-center items-center h-44 sm:h-80 bg-gray-200 rounded-3xl">
                                    <div className="w-full flex justify-center border-r-4 border-ipt">
                                        <div className="flex flex-col gap-6 justify-center items-center">
                                            <div className="flex flex-row items-center gap-2">
                                                <FontAwesomeIcon icon={faBuilding} size="lg" />
                                                <label className="Montserrat font-semibold">Prédio {data.predio}</label>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <FontAwesomeIcon icon={faDoorOpen} size="lg" />
                                                <label className="Montserrat font-semibold">Sala {data.sala}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center border-ipt">
                                        <img src="/batGood.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="btnAccept" className="flex w-5/6 justify-center items-center">
                            <button className="w-full bg-green-btn hover:bg-green-600 h-12 rounded-xl font-bold Montserrat transition duration-300" onClick={() => { callBuzzer() }}>Chame o equipamento</button>
                        </div>
                        <div id='btnCancel' className="hidden w-5/6 justify-center items-center">
                            <button className="w-full bg-red-btn hover:bg-red-600 h-12 rounded-xl font-bold Montserrat transition duration-300" onClick={() => { cancelBuzzer() }}>Cancele o chamado do equipamento</button>
                        </div>
                        <h1 className="Montserrat font-bold text-ipt text-xl">Histórico</h1>
                        {history.length != 0 ? <Historico history={history} /> : <p>Sem historico registrado ....</p>}

                    </div>

                </div>
            </div>

        </div>
    )
}

export const getServerSideProps = async ctx => {
    let cookieToken = ctx.req.cookies['token'];
  
    await axios.get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/User/Infos`, {
      headers: { Authorization: `Bearer ${cookieToken}` }
    }).then(response => {}).catch(error => {
      ctx.res.writeHead(302, {
        Location: '/'
      });
      ctx.res.end();
    });
  
    return { props: {} };
  };

export default admin