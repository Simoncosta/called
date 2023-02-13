import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../SignIn/signin.css";
import logo from '../../assets/logo.png';
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');

    const { signUp }: any = useContext(AuthContext);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(nome !== '' && email !== '' && password !== '') {
            signUp(email, password, nome);
            
            navigate('/dashboard');
        } else {
            alert("Algum campo vazio.");
        }
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