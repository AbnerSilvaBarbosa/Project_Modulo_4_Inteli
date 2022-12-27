import Link from 'next/link';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Card({ mock }) {
  return (
    <div className="flex justify-center">
      <div className="grid  lg:grid-cols-3 lg:gap-20 md:grid-cols-1 justify-items-center lg:w-100 md:w-90 lg:pl-28">
        {mock.map(element => (
          <div
            key={element.patrimonioId}
            className="flex flex-col rounded-lg border-2 border-black w-80 shadow-md lg:mb-0 mb-4 items-center"
          >
            <div className="flex  m-4 rounded-md bg-ipt w-24 p-2 text-white items-center justify-center">
              <p className="ml-2 text-2xl ">Id: {element.patrimonioId}</p>
            </div>

            <div className="flex flex-col gap-2 text-2xl items-center justify-center m-4">
              {element.predio == '404' && element.sala == '404' ? (
                <h1>Objeto está fora do IPT</h1>
              ) : (
                <>
                  <h1>Predio - {element.predio}</h1>
                  <h1>Sala - {element.sala}</h1>
                </>
              )}
            </div>

            <div className="text-2xl text-center">
              <p>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> -{' '}
                <span>{element.updated_at.slice(4, -4)}</span>
              </p>
            </div>

            <div className="flex justify-center">
              <Link href={`/admin/${element.patrimonioId}`}>
                <button className="bg-blue-500 hover:scale-125 duration-200 rounded-lg mt-4  mb-4 p-2 hover:bg-blue-400">
                  Ver detalhes
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
