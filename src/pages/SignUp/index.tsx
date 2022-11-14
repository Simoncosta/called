import { FormEvent, useContext, useState } from "react";

import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export function SignUp() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const { signUp, loadingAuth }: any = useContext(AuthContext);
    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        if(nome !== '' && email !== '' && password !== '') {
            await signUp(email, password, nome);

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
                    <h1>Cadastrar uma conta</h1>
                    <input type="text" placeholder="Seu nome" value={nome} onChange={ (e) => setNome(e.target.value) } />
                    <input type="email" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="******" value={password} onChange={ (e) => setPassword(e.target.value) } />
                    <button type="submit">{loadingAuth ? "Carregando..." : "Cadastrar"}</button>
                </form>

                <Link to="/">Já tem uma conta? Entre!!</Link>
            </div>
        </div>
    );
}

export default SignUp;