function Historico({ history }) {

    return (
        <div className="flex flex-wrap gap-6 w-5/6 mb-6 justify-center items-center">
            {history.map((ele) => (
                <div key={ele.local} className="w-full sm:w-5/12 flex flex-row justify-between items-center h-16 bg-gray-200 rounded-xl border-l-8 border-ipt">
                    <h1 className="ml-2 Montserrat font-bold">{new Date(ele.data).getDay()} {new Date(ele.data).toLocaleString("default",{month:"short"})}</h1>
                    <h1 className="Montserrat font-bold text-xl">{new Date(ele.data).getHours()}:{new Date(ele.data).getMinutes()}</h1>
                    <div className="flex flex-col mr-2">
                        <h1 className="Montserrat font-bold">P: {ele.local.split("_")[1]}</h1>
                        <h1 className="Montserrat font-bold">S: {ele.local.split("_")[0]}</h1>
                    </div>
                </div>
            ))}

        </div>
    )




}


export default Historico