import mock from './mock';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Notificacao({ data }) {
  const [mock, setMock] = useState([]);

  function proccessData() {
    let datas = data;

    datas.filter(element => {
      if (element.created_at == element.updated_at) {
        return element;
      }
    });

    return datas;
  }
  function setText( element) {
    return (
      element.name +
      ' foi criado na sala ' +
      element.sala +
      ' do prédio ' +
      element.predio
    );
  }
  useEffect(() => {
    setMock(proccessData());
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center text-left lg:items-center">
          {mock.map(element => (
            <Link
              href={`/admin/${element.patrimonioId}`}
              key={element.patrimonioId}
            >
              <div className="text-sm flex p-4 justify-left items-center border-solid border-2 border-black rounded-2xl h-9 m-2 lg:w-96 cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
                <h1>{setText( element)}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notificacao;
