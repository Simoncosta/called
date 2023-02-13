import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./signin.css";
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

import { ToastContainer, toast } from 'react-toastify';

export default function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn }: any = useContext(AuthContext);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email, password);

            navigate('/dashboard');
        } else {
            toast.warning('Preencha todos os campos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="container-center">
            <ToastContainer />
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