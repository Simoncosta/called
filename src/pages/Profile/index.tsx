import { FormEvent, useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../assets/avatar.png";

import "./profile.css";
import { toast } from "react-toastify";

export default function Profile() {

    const { user, signOut, setUser, storageUser }: any = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarURL);

    const [imageAvatar, setImageAvatar] = useState({});

    function handleFile(e: FormEvent) {
        const target = e.target as HTMLInputElement;

        if(target.files) {
            const image = target.files[0];

            if(image.type === "image/png" || image.type === "image/jpeg") {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(target.files[0]));
            } else {
                alert("Envie uma imagem do tipo NPG ou JPEG");
                setImageAvatar({});
                return null;
            }
        }
    }

    async function handleSave(e: FormEvent) {
        e.preventDefault();

        if(imageAvatar === null && nome !== "") {
            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    "name": nome,
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

                    toast.success("Alterado com sucesso.");
                })
                .catch(console.log);
        } 
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Breadcrumbs name="Meu Perfil">
                    <FiSettings size={24} />
                </Breadcrumbs>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            { avatarUrl === null || avatarUrl === undefined ? 
                            <img src={avatar} width="250" height="250" alt="Perfil do usuário" />
                            :
                            <img src={avatarUrl} width="250" height="250" alt="Perfil do usuário" />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                        <button type="submit" className="logout-btn" onClick={ () => signOut() }>
                            Sair
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}