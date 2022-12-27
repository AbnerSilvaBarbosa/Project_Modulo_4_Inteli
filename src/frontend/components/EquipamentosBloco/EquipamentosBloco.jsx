import Link from "next/link"

function EquipamentosBloco({ nome, ID, link, status }) {

    return (
        <div className="flex flex-col rounded-lg border-2 border-black w-80 shadow-md lg:mb-0 mb-4 items-center">

            <div className="flex  m-4 rounded-md bg-ipt w-24 p-2 text-white items-center justify-center">
                <p className="ml-2 text-2xl ">ID: {ID}</p>
            </div>

            <div className="flex flex-col gap-2 text-2xl items-center justify-center m-4">
                <h1>Predio - {element.predio}</h1>
                <h1>Sala - {element.sala}</h1>
            </div>

            <div className="mt-5">
                <h1><span className="font-bold">Nome:</span> {nome}</h1>
                <h1><span className="font-bold">ID:</span>  {ID}</h1>
            </div>

            <Link href={`/admin/${ID}`}>
                <button className="bg-blue-500 hover:scale-125 duration-200 rounded-lg mt-4  mb-4 p-2 hover:bg-blue-400">Ver detalhes</button>
            </Link>



        </div>
    )
}

export default EquipamentosBloco