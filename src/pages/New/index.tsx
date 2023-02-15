import { FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";

import "./new.css"

interface Customer {
    id: string;
    nomeFantasia: string;
}

export default function New() {

    const [load, setLoad] = useState(true);
    const [customers, setCustomers] = useState<Array<Customer>>();
    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");

    useEffect(() => {
        async function loadCustomer() {
            await fetch(`http://localhost:3000/customers`)
            .then(res => res.json())
            .then(result => {
                let list: any = [];

                result.forEach((element: any) => {
                    list.push({
                        id: element.id,
                        nomeFantasia: element.nomeCia
                    })
                })

                if(list.length === 0) {
                    alert("NENHUMA EMPRESA ENCONTRADA");
                    return;
                }

                setCustomers(list);
            })
            .finally(() => {
                setLoad(false);
            })
            .catch(err => {
                alert("Error");
            })
        }
        
        loadCustomer();
    }, []);

    function handleRegister(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <div>
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
                                <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                                    {customers?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nomeFantasia}</option>
                                    ))}
                                </select>
                            )
                        }

                        <label>Assunto</label>
                        <select>
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

                        <button type="submit">Salvar</button>
                    </form>
                </div>

            </div>
        </div>
    );
}