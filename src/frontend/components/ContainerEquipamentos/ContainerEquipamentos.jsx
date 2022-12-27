import Card from "../buscaId/Card";
import EquipamentosBloco from "../EquipamentosBloco/EquipamentosBloco";


const mock = [{ nome: "Notebook", ID: "123F", link: "/" }, { nome: "Equipamento 2", ID: "534T", link: "/" }, { nome: "Equipamento 3", ID: "123H", link: "/" }, { nome: "Equipamento 4", ID: "190K", link: "/" }, { nome: "Equipamento 5", ID: "200F", link: "/" }, { nome: "Equipamento 7", ID: "300A", link: "/", status: false },]

function ContainerEquipamentos({ props }) {
    return (
        <div >
            <Card mock={props}></Card>

        </div>
    )
}

export default ContainerEquipamentos;