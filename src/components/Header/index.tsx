import { useContext } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png"
import { AuthContext } from "../../contexts/auth";
import { FiHome, FiSettings, FiUser } from 'react-icons/fi'

import "./header.css"

export default function Header() {

    const { user }: any = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarURL ?? avatar} alt="Avatar Profile" />
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24} />
                Chamados
            </Link>
            <Link to="/customers">
                <FiUser color="#FFF" size={24} />
                Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={24} />
                Configurações
            </Link>
        </div>
    );
}