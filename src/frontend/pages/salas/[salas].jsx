import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Sala from '../../components/Sala/Sala';
import stylePredio from '../../styles/Predios.module.css';
import { faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function sala() {

  const router = useRouter();
  const { salas } = router.query;

  const [text, setText] = useState('');
  const [datas, setData] = useState([]);

  async function chamadaDB() {
    await axios.post(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/getSalas`, {
      number: salas
    }).then(element => {
      setData(element.data);
    });
  }

  useEffect(() => {
    chamadaDB();
  }, []);

  const handleOnChange = event => {
    let inputValue = event.target.value;
    if (inputValue) {
      if (text > inputValue.length) {
        setData(datas.filter(e => String(e).includes(inputValue)));
        setText(text - 1);
      }
      setText(inputValue.length);
    } else {
      setText(0);
      chamadaDB();
    }
  };

  if (datas.length == 0 & text == '') {
    return (
      <div className='flex justify-center'>
        <div className='flex justify-center mt-80 bg-ipt w-96 h-32 items-center text-2xl'>
          <h1 className='text-white'>Carregando....</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center text-center">
      <div>
        <h1 className="Montserrat font-bold text-2xl">Salas</h1>
        <div className="relative">
          <FontAwesomeIcon
            className="absolute lg:pl-3 pt-7 h-7 pl-5"
            icon={faMagnifyingGlass}
          ></FontAwesomeIcon>
          <input
            type="text"
            onChange={handleOnChange}
            className={stylePredio.inputSala}
            placeholder="Digite a sala que deseja"
          />
        </div>
        <div>
          <Sala numeroSala={datas} numeroPredio={salas} />
        </div>
      </div>
    </div>
  );
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


export default sala;