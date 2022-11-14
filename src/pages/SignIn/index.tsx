import { FormEvent, useContext, useState } from "react";
import "./signin.css";

import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export function SignIn() {

    const { signIn, loadingAuth }: any = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            await signIn(email, password);

            navigate("/dashboard")
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Sistema Logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="email" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="******" value={password} onChange={ (e) => setPassword(e.target.value) } />
                    <button type="submit">{loadingAuth ? "Carregando..." : "Acessar"}</button>
                </form>

                <Link to="/register">Criar uma conta!</Link>
            </div>
        </div>
    );
}

export default SignIn;