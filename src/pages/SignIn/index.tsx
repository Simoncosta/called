import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import "./signin.css";
import logo from '../../assets/logo.png';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        alert("CHEGGOU");
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo Sistema de Called" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Acessar</button>
                </form>

                <Link to="/register">Criar um conta!</Link>
            </div>
        </div>
    );
}