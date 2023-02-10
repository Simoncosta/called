import { createContext, useState } from "react";
import { hash } from 'bcryptjs';

export const AuthContext = createContext({});

export default function AuthProvider({ children }: any) {

    const [loading, setLoading] = useState(false);

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
        });

        setLoading(false);
    }

    return(
        <AuthContext.Provider value={{ }}>
            {children}
        </AuthContext.Provider>
    );
}