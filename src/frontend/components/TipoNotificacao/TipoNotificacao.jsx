import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import {
  faWifi,
  faBatteryQuarter,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

function TipoNotificacao() {
  return (
    <div className="flex flex-row justify-center gap-10">
      <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-80 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
        <h1>Conectividade</h1>
        <div className="px-4">
          <FontAwesomeIcon icon={faWifi} size="lg" />
        </div>
      </div>
      <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-80 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
        <h1>Saída do IPT</h1>
        <div className="px-4">
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
        </div>
      </div>
      <div className="flex justify-center items-center border-solid border-2 border-black rounded-md h-10 w-80 m-2  cursor-pointer hover:p-6 hover:shadow-cyan-700 hover:shadow-lg">
        <h1>Bateria</h1>
        <div className="px-4">
          <FontAwesomeIcon icon={faBatteryQuarter} size="lg" />
        </div>
      </div>
    </div>
  );
}

export default TipoNotificacao;
