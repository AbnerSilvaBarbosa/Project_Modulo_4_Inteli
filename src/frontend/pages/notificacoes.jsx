import SideBar from '../components/SideBar';
import Link from 'next/link';
import Notificacao2 from '../components/Notificacao/notificacao2';
import Notificacao from '../components/Notificacao/notificacao1';
import Notificacao3 from '../components/Notificacao/notificacao3';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  faWifi,
  faBatteryQuarter,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Notificacoes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function get() {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/equipamentosRegistrados`,
          {}
        )
        .then(response => {
          console.log(response.data);
          response.data.map(element => {
            setData(
              data.push({
                name: element.name,
                sala: element.sala,
                predio: element.predio,
                created_at: element.created_at,
                updated_at: element.updated_at,
                patrimonioId: element.patrimonioId,
                batery: element.batery
              })
            );
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    get();
  }, []);
  return (
    <div className="justify-center grid-row lg:pl-32">
      <div className="text-center justify-center mt-6 mb-3">
        <h1 className="Montserrat font-bold text-2xl text-black">
          Painel de Notificações
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 justify-center ">
        <div className="lg:pl-8 flex flex-col items-center ">
          <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-64 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
            <h1>Conectividade</h1>
            <div className="px-4">
              <FontAwesomeIcon icon={faWifi} size="lg" />
            </div>
          </div>
          <Notificacao2 data={data}></Notificacao2>
        </div>
        <div className="lg:pl-8 flex flex-col items-center">
          <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-64 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
            <h1>Saída do IPT</h1>
            <div className="px-4">
              <FontAwesomeIcon icon={faLocationDot} size="lg" />
            </div>
          </div>
          <div className="lg:pl-8 flex flex-col items-center"></div>

          <Notificacao3 data={data}></Notificacao3>
        </div>
        <div className="lg:pl-8 flex flex-col items-center">
          <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-64 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
            <h1>Bateria</h1>
            <div className="px-4">
              <FontAwesomeIcon icon={faBatteryQuarter} size="lg" />
            </div>
          </div>
          <Notificacao data={data}></Notificacao>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ctx => {
  let cookieToken = ctx.req.cookies['token'];

  await axios
    .get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/User/Infos`, {
      headers: { Authorization: `Bearer ${cookieToken}` }
    })
    .then(response => {})
    .catch(error => {
      ctx.res.writeHead(302, {
        Location: '/'
      });
      ctx.res.end();
    });

  return { props: {} };
};

export default Notificacoes;
