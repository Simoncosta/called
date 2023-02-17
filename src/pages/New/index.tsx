import { FormEvent, useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

import "./new.css"

interface Customer {
    id: string;
    nomeCia: string;
}

export default function New() {

    const { id } = useParams();

    const { user }: any = useContext(AuthContext);

    const [load, setLoad] = useState(true);
    const [customers, setCustomers] = useState<Array<Customer>>();
    const [customerSelected, setCustomerSelected] = useState("");
    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");

    const [idCalled, setIdCalled] = useState(false);

    useEffect(() => {
        async function loadCustomer() {
            await fetch(`http://localhost:3000/customers`)
                .then(res => res.json())
                .then(result => {
                    let list: any = [];

                    result.forEach((element: any) => {
                        list.push({
                            id: element.id,
                            nomeCia: element.nomeCia
                        })
                    })

                    if (list.length === 0) {
                        toast.warning("NENHUMA EMPRESA ENCONTRADA");
                        return;
                    }

                    setCustomers(list);

                    if (id) {
                        loadId(list);
                    }
                })
                .finally(() => {
                    setLoad(false);
                })
                .catch(err => {
                    toast.error("Error");
                })
        }

        loadCustomer();
    }, []);

    async function loadId(list: any) {
        await fetch(`http://localhost:3000/called?id=${id}`)
            .then(res => res.json())
            .then(result => {
                setAssunto(result[0].assunto);
                setStatus(result[0].status);
                setComplemento(result[0].complemento);

                let index = list.filter((item: any) => item.id === Number(result[0].customerId))
                    .map((item: any) => {
                        return item.id
                    });

                setCustomerSelected(index[0]);
                setIdCalled(true);
            })
    }


    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (idCalled) {
            await fetch(`http://localhost:3000/called/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "customer": customers?.find((result: any) => result.id === Number(customerSelected))?.nomeCia,
                    "customerId": customerSelected,
                    "assunto": assunto,
                    "status": status,
                    "complemento": complemento
                })
            })
            .then(res => res.json())
            .then(() => {
                alert("Atualizado o chamado com sucesso!")
            })
            .catch(() => {
                alert("Algum erro");
            })

            return;
        } else {
            await fetch(`http://localhost:3000/called`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": Date.now(),
                    "customer": customers?.find((result: any) => result.id === Number(customerSelected))?.nomeCia,
                    "customerId": customerSelected,
                    "assunto": assunto,
                    "status": status,
                    "complemento": complemento,
                    "userId": user.id,
                    "created": new Date(),
                })
            })
                .then(res => res.json())
                .then(() => {
                    toast.success("Chamado criado com sucesso");

                    setComplemento("");
                    setCustomerSelected("");
                })
                .catch(() => {
                    toast.error("Algo deu errado");
                });
        }
    }

    return (
        <div>
            <ToastContainer />
            <Header />
            <div className="content">
                <Breadcrumbs name="Novo Chamado">
                    <FiPlus size={25} />
                </Breadcrumbs>

                <div className="container">
                    <form onSubmit={handleRegister} className="form-profile">
                        <label>Cliente</label>
                        {
                            load ? (
                                <input type="text" disabled={true} placeholder="Carregando..." />
                            ) : (
                                <select value={customerSelected} onChange={(e) => setCustomerSelected(e.target.value)}>
                                    {customers?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nomeCia}</option>
                                    ))}
                                </select>
                            )
                        }

                        <label>Assunto</label>
                        <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                            <option value="Suporte"
                            >Suporte</option>
                            <option value="Visita Tecnica"

                            >Visita Tecnica</option>
                            <option value="Financeiro"

                            >Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto"
                                checked={status === 'Aberto'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Em Progresso"
                                checked={status === 'Em Progresso'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Atendimento"
                                checked={status === 'Atendimento'}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <span>Em Atendimento</span>
                        </div>

                        <label>Complemento</label>
                        <textarea placeholder="Descreva seu problema (opcional)"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">{id !== undefined ? "Atualizar" : "Criar"}</button>
                    </form>
                </div>

            </div>
        </div>
    );
}