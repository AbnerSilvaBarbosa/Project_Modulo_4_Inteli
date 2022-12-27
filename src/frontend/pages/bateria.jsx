import StatusdaBateria from '../components/Bateria/Bateria';
import styles from '../styles/Predios.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBatteryQuarter,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
//import Image from "./Icone-bateria-Png.png"
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Bateria({ data }) {
  const [text, setText] = useState(0);
  const [datas, setData] = useState([]);

  async function chamadaDB() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/equipamentosRegistrados`)
      .then(result => {
        setData(result.data);
      })
  }

  useEffect(() => {
    chamadaDB();
  }, []);

  const handleOnChange = event => {
    let inputValue = event.target.value;

    if (inputValue) {
      if (text > inputValue.length) {
        setData(datas.filter(e => String(e.patrimonioId).includes(inputValue)));
        setText(text - 1);
      } else {
        setText(text + 1);
        setData(datas.filter(e => String(e.patrimonioId).includes(inputValue)));
      }

      setText(inputValue.length);
    } else {
      setText(0);
      chamadaDB();
    }
  };

  return (
    <div className="text-center">
      {' '}
      {/*abertura da div principal que está centralizando o conteúdo*/}
      <div className="relative pt-8">
        <h1 className="Montserrat font-bold text-2xl text-black lg:pl-28">
          Status da Bateria
        </h1>
        <div className="">
          <FontAwesomeIcon
            className="absolute lg:pl-32 pt-7 h-7 sm:pl-5 mr-5"
            icon={faMagnifyingGlass}
          ></FontAwesomeIcon>
          <input
            type="text"
            onChange={handleOnChange}
            className={styles.input}
            placeholder="Digite o número do prédio"
          />
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <div>
          <StatusdaBateria props={datas} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

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



export default Bateria;
