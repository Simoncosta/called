import { useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import "./dashboard.css";

export function Dashboard() {

    const [chamados, setChamados] = useState([1])

    return(
        <div>

            <Header />

            <div className="content">
                <Breadcrumbs name="Chamados">
                    <FiMessageSquare size={25} />
                </Breadcrumbs>

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            Novo Chamado
                        </Link>
                    </div>
                ):(
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            Novo Chamado
                        </Link>
                    
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cleinte">Sujeito</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{ backgroundColor: "#5cb85c"}}>Em Aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">01/01/2022</td>
                                    <td data-label="#">
                                        <button style={{ backgroundColor: "#5BC0DE" }}>
                                            <FiSearch color="#FFF" size={17} />
                                        </button>
                                        <button style={{ backgroundColor: "#F0AD4E" }}>
                                            <FiEdit2 color="#FFF" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
