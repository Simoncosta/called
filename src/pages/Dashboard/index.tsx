import { useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import "./dashboard.css";

export function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {

        loadChamados();

        return () => {

        }
    }, []);

    function togglePostModal(item: any) {
        setShowModal(!showModal);

        setDetail(item);
    }

    async function loadChamados() {

        await fetch(`http://localhost:3000/called`)
            .then(res => res.json())
            .then(async result => {
                updateState(result);
            })
            .catch(console.log);  

    }

    async function updateState(result: any) {
        const isCollectionEmpty = result.siz === 0;

        if(!isCollectionEmpty) {
            let list: any = [];

            result.forEach((doc: any) => {
                list.push({
                    id: doc.id,
                    assunto: doc.assunto,
                    cliente: doc.customer,
                    status: doc.status,
                    cadastradoem: doc.created,
                })
            })

            setChamados(list);
        }
    }

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
                                {chamados?.map((called: any) => {
                                    return(
                                        <tr key={called.id}>
                                            <td data-label="Cliente">{called.cliente}</td>
                                            <td data-label="Assunto">{called.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ 
                                                    backgroundColor: called.status == "Atendido" ? "#AAAAAA" : "#5cb85c"
                                                }}>
                                                    {called.status}
                                                </span>
                                            </td>
                                            <td data-label="Cadastrado">{called.cadastradoem.substr(0, 10)}</td>
                                            <td data-label="#">
                                                <button style={{ backgroundColor: "#5BC0DE" }} onClick={() => togglePostModal(called)}>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <button style={{ backgroundColor: "#F0AD4E" }}>
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {showModal && (
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}

        </div>
    );
}

export default Dashboard;
