import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import "../SignIn/signin.css";
import logo from '../../assets/logo.png';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        alert("CHEGGOU");
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo Sistema de Called" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/">Já tem uma conta? Entre!!!</Link>
            </div>
        </div>
    );
}