import { FormEvent, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");

    async function handleAdd(e: FormEvent) {
        e.preventDefault();

        if(nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
            await fetch("http://localhost:3000/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "id": Date.now(), 
                "nameCompany": nomeFantasia,
                "cnpj": cnpj, 
                "address": endereco,
            })
            })
            .then(res => res.json())
            .then(result => {
                toast.success("Cliente cadastrado com sucesso!");

                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
            })
            .catch(console.log); 
        } else {
            toast.error("Preencha todos os campos");
        }
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Breadcrumbs name="Clientes">
                    <FiUsers size={24} />
                </Breadcrumbs>

                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da sua Empresa" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                        
                        <label>CNPJ</label>
                        <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        
                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                    
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}