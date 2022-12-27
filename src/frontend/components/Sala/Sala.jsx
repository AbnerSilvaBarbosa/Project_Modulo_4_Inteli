import Link from "next/link"

function Sala({ numeroSala, numeroPredio }) {
        
    return (
            <div className="flex flex-col justify-center lg:items-center">
                {numeroSala.map((element) => (
                    <Link href={`/equipamentos/${element}_${numeroPredio}`} key={element}>
                        <div  className="flex justify-center items-center border-solid border-2 border-black rounded-lg h-11 m-2   lg:w-96 cursor-pointer hover:p-6 transition-all duration-700 ease-in delay-10 hover:shadow-cyan-700 hover:shadow-lg">
                            <h1>Sala {element}</h1>
                        </div>
                    </Link>
                ))}
            </div>
    )
}

export default Sala