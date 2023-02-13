import { createContext, useEffect, useState } from "react";
import { hash, compare } from 'bcryptjs';

export const AuthContext = createContext({});

interface User {
    id: string;
    nome: string;
    email: string;
    avatarURL?: string;
}

export default function AuthProvider({ children }: any) {

    const [user, setUser] = useState<User | null>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('called');

            if (storageUser) {
                console.log("EXISTE")
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [])

    async function signIn(email: string, password: string) {
        setLoading(true);

        await fetch(`http://localhost:3000/users?email=${email}`)
            .then(res => res.json())
            .then(async result => {
                if (result[0]) {
                    const passwordMatch = await compare(password, result[0].password);

                    if (!passwordMatch) {
                        alert("Email/password incorrect")
                        setLoading(false);alert("Email/password incorrect")
                        setLoading(false);
                        return;
                    }

                    let data = {
                        id: result[0].id,
                        nome: result[0].nome,
                        email: result[0].email,
                        avatarURL: result[0]?.avatar
                    }

                    setUser(data);
                    storageUser(data);
                    setLoading(false);

                } else {
                    alert("Email/password incorrect")
                    setLoading(false);
                }
            })
            .catch((error: any) => {
                console.log(error)
            })

        setLoading(false);
    }

    async function signUp(email: string, password: string, nome: string) {
        setLoading(true);

        const passwordHash = await hash(password, 8);

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": Date.now(),
                "nome": nome,
                "email": email,
                "password": passwordHash,
            })
        })
            .then(res => res.json())
            .then(result => {
                let data = {
                    id: String(result.id),
                    nome: String(result.nome),
                    email: String(result.email),
                    avatarURL: undefined,
                }

                setUser(data);
                storageUser(data);
            })
            .catch((err: any) => {
                console.log(err.message);
            });

        setLoading(false);
    }

    function storageUser(data: User) {
        localStorage.setItem('called', JSON.stringify(data));
    }

    function signOut() {
        localStorage.removeItem('called');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}