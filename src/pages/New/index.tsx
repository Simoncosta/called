import { FormEvent, useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import "./new.css";

interface Customers {
    id: string;
    nomeFantasia: string;
}

export default function New() {

    const { id } = useParams();

    const { user }: any = useContext(AuthContext);

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState<Customers[]>();
    const [customersSelected, setCustomersSelected] = useState("");

    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");

    const [idCustomers, setIdCustomers] = useState(false);

    useEffect(() => {
        async function loadCustomers() {
            await fetch(`http://localhost:3000/customers`)
            .then(res => res.json())
            .then(async result => {
                let list: any = [];

                result.forEach((element: any) => {
                   list.push({
                    id: element.id,
                    nomeFantasia: element.nameCompany
                   }) 
                });

                if(list.length === 0) {
                    toast.warning("NENHUMA EMPRESA ENCONTRADA.");
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(list);
                setLoadCustomers(false);

                if(id) {
                    loadId(list);
                }
            })
            .catch(console.log);  
        }

        loadCustomers();
    }, [])

    async function loadId(list: any) {
        await fetch(`http://localhost:3000/called?id=${id}`)
            .then(res => res.json())
            .then(async result => {
                setAssunto(result[0].assunto);
                setStatus(result[0].status);
                setComplemento(result[0].complemento);

                let index = list.filter((item: any) => item.id === result[0].customersId)
                .map((item: any) => {
                    return item.id
                });

                setCustomersSelected(index[0]);
                setIdCustomers(true);
            })
            .catch(() => {
                console.log("ERRO NO ID PASSADO")
            });  
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(idCustomers) {
            await fetch(`http://localhost:3000/called/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    "id": Date.now(), 
                    "customer": customers?.find((customer: any) => customer.id === Number(customersSelected))?.nomeFantasia,
                    "customersId": customers?.find((customer: any) => customer.id === Number(customersSelected))?.id,
                    "assunto": assunto,
                    "status": status,
                    "complemento": complemento,
                    "userId": user.id,
                    "created": new Date(),
                })
                })
                .then(res => res.json())
                .then(() => {

                    toast.success("Atualizado Chamado com sucesso!");
                })
                .catch(console.log);

            return;
        }

        await fetch("http://localhost:3000/called", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "id": Date.now(), 
                "customer": customers?.find((customer: any) => customer.id === Number(customersSelected))?.nomeFantasia,
                "customersId": customers?.find((customer: any) => customer.id === Number(customersSelected))?.id,
                "assunto": assunto,
                "status": status,
                "complemento": complemento,
                "userId": user.id,
                "created": new Date(),
            })
            })
            .then(res => res.json())
            .then(result => {
                toast.success("Chamado criado com sucesso!");

                setComplemento("");
                setCustomersSelected("");
            })
            .catch(console.log);
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Breadcrumbs name="Novo Chamado">
                    <FiPlus size={25} />
                </Breadcrumbs>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Cliente</label>
                        {loadCustomers ? (
                            <input type="text" disabled={true} placeholder="Carregando..." />
                        ) : (
                            <select value={customersSelected} onChange={(e) => setCustomersSelected(e.target.value)}>
                                <option defaultValue="">Selecione um valor</option>
                                {customers?.map((item) => {
                                    return(
                                        <option key={item.id} value={item.id}>
                                            {item.nomeFantasia}
                                        </option>
                                    );
                                })}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnina">Visita Tecnina</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto" 
                            checked={ status === 'Aberto'}
                            onChange={(e) => setStatus(e.target.value)}/>
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Em Progresso" 
                            checked={ status === 'Em Progresso'}
                            onChange={(e) => setStatus(e.target.value)}/>
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Atendido" 
                            checked={ status === 'Atendido'}
                            onChange={(e) => setStatus(e.target.value)}/>
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            placeholder="Descreva seu problema (opcional)."
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">Salvar</button>

                    </form>
                </div>
                
            </div>
        </div>
    );
}