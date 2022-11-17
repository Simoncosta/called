import { useState } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import "./dashboard.css";

export function Dashboard() {

    const [chamados, setChamados] = useState([])

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
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
