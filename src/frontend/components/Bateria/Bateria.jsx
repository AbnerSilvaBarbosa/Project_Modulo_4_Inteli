//import mock from "./mock" //jest - manual mocks are used to stub out functionality with mock data (This  ensures your tests will be fast and not flaky.)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBattery,
  faBatteryThreeQuarters,
  faBatteryQuarter,
  faBatteryEmpty
} from '@fortawesome/free-solid-svg-icons';
//import Image from "./Icone-bateria-Png.png"
import Link from 'next/link';

function StatusdaBateria({ props }) {
  function bat(element) {
    let batery = element.batery;
    if (batery => 75) {
      return 'faBattery';
    } else if (batery => 50) {
      return 'faBatteryThreeQuarters';
    } else if (batery => 25) {
      return 'faBatteryQuarter';
    } else {
      return 'faBatteryEmpty';
    }
  }
  return (
    <div className="flex justify-center">
      <div className="grid  lg:grid-cols-3 lg:gap-20 md:grid-cols-1 justify-items-center lg:w-100 md:w-90 lg:pl-28">
        {props.map(element => (
          <div
            key={element.patrimonioId}
            className="flex flex-col rounded-lg border-2 border-black w-80 shadow-md lg:mb-0 mb-4 items-center"
          >
            <div className="flex  m-4 rounded-md bg-ipt w-24 p-2 text-white items-center justify-center hover:scale-125 duration-200">
              <Link href={`/admin/${element.patrimonioId}`}>
                <button className="ml-2 text-xl">
                  Id: {element.patrimonioId}
                </button>
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-xl items-center justify-center m-4">
              <h1>Prédio - {element.predio}</h1>
              <h1>Sala - {element.sala}</h1>
            </div>

            <div className="text-2xl text-center">
              <div className='flex justify-center gap-2 items-center'>
                <FontAwesomeIcon icon={faBatteryEmpty}></FontAwesomeIcon> 
                <span>{element.batery} %</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href={`/admin/${element.patrimonioId}`}>
                <button className="bg-blue-500 text-white hover:scale-125 duration-200 rounded-lg mt-4  mb-4 p-2  hover:bg-blue-400">
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

export default StatusdaBateria;
