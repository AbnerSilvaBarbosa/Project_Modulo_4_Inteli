import Link from "next/link"
import cell from "../../public/cell.png"
import wifi from "../../public/wifi.png"
import Image from "next/image"
import {faBuilding} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ModalPredio({ visible, number, quantidade, tempo, links, onClose }) {


    if (visible == false) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-5 rounded w-96 h-96 flex flex-col content-around items-center border-4 border-black">
                <button onClick={onClose} className="bg-red-600 w-20 h-10 mb-5 rounded hover:bg-red-400">X</button>

                <div className="bg-blue-600 rounded-full w-32 h-32 flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                    <h1 className="text-3xl text-white">Predio <span className="text-white">{number}</span></h1>
                </div>

                <div>

                    <div className="flex text-center items-center gap-5 text-2xl mt-2">
                        <Image src={cell} width={37} height={49}></Image>
                        <span className="text-green-400"> {quantidade} </span>
                        <p>Dispositivos</p>
                    </div>


                    <div className="flex items-center gap-5 mt-5 text-2xl">
                        <Image src={wifi} width={37} height={49}></Image>
                        <h1>{tempo} minutos</h1>
                    </div>
                </div>
                <Link href={links != null ? links : "/"}>
                    <button className="bg-transparent border-4 border-blue-400 rounded-lg mt-4 p-2 hover:border-transparent hover:bg-green-500">Ver detalhes</button>
                </Link>
            </div>
        </div>
    )
}

export default ModalPredio