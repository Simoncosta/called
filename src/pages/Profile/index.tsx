import { FormEvent, useContext, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { FiSettings, FiUpload } from "react-icons/fi";

import avatar from '../../assets/avatar.png'
import { AuthContext } from "../../contexts/auth";

import "./profile.css"
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {

    const { user, signOut, setUser, storageUser }: any = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    async function handleSave(e: FormEvent) {
        e.preventDefault();

        if(nome !== '') {
            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "nome": nome,
                })
            })
            .then(res => res.json())
            .then(() => {
                let data = {
                    ...user,
                    nome: nome
                }

                setUser(data);
                storageUser(data);

                toast.success("Alterado com sucesso.")
            })
            .catch((err: any) => {
                alert(err.message);
            })
        }
    }

    return (
        <div>
            <ToastContainer />
            <Header />

            <div className="content">
                <Breadcrumbs name="Meu Perfil">
                    <FiSettings size={24} />
                </Breadcrumbs>

                <div className="container">
                    <form onSubmit={handleSave} className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" /><br />
                            <img src={avatar} alt="" />
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="email" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                        <button className="logout-btn" onClick={() => signOut()}>
                            Sair
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}