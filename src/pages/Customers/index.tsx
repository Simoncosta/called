import { FormEvent, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");

    async function handleAdd(e: FormEvent) {
        e.preventDefault();

        if(nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
            await fetch(`http://localhost:3000/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": Date.now(),
                    "nomeCia": nomeFantasia,
                    "cnpj": cnpj,
                    "endereco": endereco
                })
            })
            .then(res => res.json())
            .then(result => {
                toast.success("Cliente cadastrado com sucesso!");

                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
            })
            .catch((err: any) => {
                toast.error("Deu algum erro")
            })
        } else {
            toast.error("Preencha todos os campos")
        }
    }

    return(
        <div>
            <ToastContainer />
            <Header />
            <div className="content">
                <Breadcrumbs name="Clientes">
                    <FiUsers size={24} />
                </Breadcrumbs>

                <div className="container">
                    <form onSubmit={handleAdd} className="form-profile customers">
                        <label>Nome Fantasia</label>
                        <input required type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome da sua Empresa" />

                        <label>CNPJ</label>
                        <input required type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Nome da sua Empresa" />
                        
                        <label>Endereço</label>
                        <input required type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Nome da sua Empresa" />
                    
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}