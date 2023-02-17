import { useContext, useEffect, useState } from "react"
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/auth";

import "./dashboard.css";

export default function Dashboard() {

    const { signOut }: any = useContext(AuthContext);
    const [chamados, setChamados] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {
        loadCalled();
    }, []);

    async function loadCalled() {
        await fetch(`http://localhost:3000/called`)
            .then(res => res.json())
            .then(result => {
                updateState(result);
            })
            .catch(() => {
                alert("Error");
            })
    }

    function updateState(result: any) {
        const isCollectionEmpty = result.size === 0;

        if (!isCollectionEmpty) {
            let list: any = [];

            result.forEach((item: any) => {

                list.push({
                    id: item.id,
                    assunto: item.assunto,
                    cliente: item.customer,
                    status: item.status,
                    cadastradoEm: item.created,
                    complemento: item.complemento
                })
            });

            setChamados(list);
        }
    }

    function togglePostModal(item: any) {
        setShowModal(!showModal);

        setDetail(item);
    }

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
                                        {chamados.map((called: any) => (
                                            <tr>
                                                <td data-label="Cliente">{called.cliente}</td>
                                                <td data-label="Assunto">{called.assunto}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{ backgroundColor: '#5CB85C' }}>{called.status}</span>
                                                </td>
                                                <td data-label="Cadastrado">{called.cadastradoEm}</td>
                                                <td data-label="#">
                                                    <button
                                                        className="action"
                                                        style={{ backgroundColor: '#5BC0DE' }}
                                                        onClick={() => togglePostModal(called)}
                                                    >
                                                        <FiSearch color="#FFF" size={17} />
                                                    </button>
                                                    <Link 
                                                        to={`/new/${called.id}`}
                                                        className="action" 
                                                        style={{ backgroundColor: '#F0AD4E' }}
                                                    >
                                                        <FiEdit2 color="#FFF" size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )
                }

                {
                    showModal && (
                        <Modal
                            conteudo={detail}
                            close={togglePostModal}
                        />
                    )
                }

            </div>
        </>
    )
}