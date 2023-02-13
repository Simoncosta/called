import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");

    return(
        <div>
            <Header />
            <div className="content">
                <Breadcrumbs name="Clientes">
                    <FiUsers size={24} />
                </Breadcrumbs>

                <div className="container">
                    <form className="form-profile customers">
                        <label>Nome Fantasia</label>
                        <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome da sua Empresa" />

                        <label>CNPJ</label>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Nome da sua Empresa" />
                        
                        <label>Endereço</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Nome da sua Empresa" />
                    
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}