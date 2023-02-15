import { useContext, useState } from "react"
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

import "./dashboard.css";

export default function Dashboard() {

    const { signOut }: any = useContext(AuthContext);
    const [chamados, setChamados] = useState(["1"]);

    return (
        <>
            <Header />

            <div className="content">
                <Breadcrumbs name="Chamados">
                    <FiMessageSquare size={25} />
                </Breadcrumbs>

                {
                    chamados.length === 0 ?
                    (
                        <div className="container dashboard">
                            <span>Nenhum chamado registrado</span>
                            <Link to="/new" className="new">
                                <FiPlus size={25} color="#FFF" />
                                Novo Chamado
                            </Link>
                        </div>
                    ) :
                    (
                        <>
                            <Link to="/new" className="new">
                                <FiPlus size={25} color="#FFF" />
                                Novo Chamado
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Assunto</th>
                                        <th>Status</th>
                                        <th>Cadastrado em</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Cliente">Sujeito</td>
                                        <td data-label="Assunto">Suporte</td>
                                        <td data-label="Status">
                                            <span className="badge" style={{ backgroundColor: '#5CB85C' }}>Em Aberto</span>
                                        </td>
                                        <td data-label="Cadastrado">01/01/2023</td>
                                        <td data-label="#">
                                            <button className="action" style={{ backgroundColor: '#5BC0DE' }}>
                                                <FiSearch color="#FFF" size={17} />
                                            </button>
                                            <button className="action" style={{ backgroundColor: '#F0AD4E'}}>
                                                <FiEdit2 color="#FFF" size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )
                }

            </div>
        </>
    )
}