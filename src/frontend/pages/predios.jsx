import Predio from '../components/Predio/Predios';
import styles from '../styles/Predios.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Predios() {
  const [text, setText] = useState('');
  const [datas, setData] = useState([]);

  async function chamadaDB() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/getPredios`)
      .then(response => {
        setData(response.data);
      });
  }

  useEffect(() => {
    chamadaDB();
  }, []);

  const handleOnChange = event => {
    let inputValue = event.target.value;

    if (inputValue) {
      if (text > inputValue.length) {
        setData(datas.filter(e => String(e.predio).includes(inputValue)));
        setText(text - 1);
      } else {
        setText(text + 1);
        setData(datas.filter(e => String(e.predio).includes(inputValue)));
      }

      setText(inputValue.length);
    } else {
      setText(0);
      chamadaDB();
    }
  };

  if ((datas.length == 0) & (text == '')) {
    return (
      <div className="flex justify-center">
        <div className="flex justify-center mt-80 bg-ipt w-96 h-32 items-center text-2xl">
          <h1 className="text-white">Carregando....</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center justify-center ">
      <h1 className="Montserrat font-bold text-2xl text-black lg:pl-28">
        Prédios
      </h1>
      <div className="relative">
        <FontAwesomeIcon
          className="absolute lg:pl-32 pt-7 h-7 sm:pl-5"
          icon={faMagnifyingGlass}
        ></FontAwesomeIcon>
        <input
          type="text"
          className={styles.input}
          onChange={handleOnChange}
          placeholder="Digite o número do prédio"
        />
      </div>
      <div>
        <Predio props={datas} />
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

export default Predios;
