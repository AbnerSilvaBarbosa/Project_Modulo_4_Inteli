import ContainerEquipamentos from '../../components/ContainerEquipamentos/ContainerEquipamentos';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stylePredio from '../../styles/Predios.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';

function equipamentos() {



  const [text, setText] = useState('');
  const [datas, setData] = useState([]);

  const router = useRouter()
  const { equipamentos } = router.query

  async function chamadaDB() {

    const predioSala = String(equipamentos).split('_');
    await axios.post(`${process.env.NEXT_PUBLIC_URL_SANDBOX}/Device/getEquipamentoSala`, {
      predio: predioSala[1],
      sala: predioSala[0]
    }).then(response => {
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
    <div className="text-center mt-5">
      <h1 className="Montserrat font-bold text-2xl">Equipamentos</h1>
      <div className="justify-center flex">
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
      </div>
      <div className="flex justify-center">
        <div className="w-3/4">
          <ContainerEquipamentos props={datas}></ContainerEquipamentos>
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


export default equipamentos;
