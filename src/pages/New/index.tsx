import { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import "./new.css";

export default function New() {

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        alert("SHOOW");
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
                        <select>
                            <option key={1} value={1}>
                                IT ROCKET
                            </option>
                        </select>

                        <label>Assunto</label>
                        <select>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnina">Visita Tecnina</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto" />
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Em Progresso" />
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Atendido" />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            placeholder="Descreva seu problema (opcional)."
                        />

                        <button type="submit">Salvar</button>

                    </form>
                </div>
                
            </div>
        </div>
    );
}