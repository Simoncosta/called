import { hash, compare } from 'bcryptjs'
import { useState, createContext, useEffect }from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

interface User {
    id: string;
    nome: string;
    email: string;
    avatarURL: string | null;
}

function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>();
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // isso serve pra quando a aplicação abrir verificar se tem algum
    // usuario ja logado na aplicação e se tiver eu ja insiro isso dentro
    // da STATE USER e ai aplicação ja redireciona para o dashboard
    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem("SistemaUser");
    
            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
    
            setLoading(false);
        }

        loadStorage();

    }, []);

    // Cadastrando o usuário
    async function signUp(email: string, password: string, nome: string) {
        setLoadingAuth(true);

        const passwordHash = await hash(password, 8);

        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "id": Date.now(), 
                "name": nome,
                "email": email, 
                "password": passwordHash,
            })
            })
            .then(res => res.json())
            .then(result => {
                let data = {
                    id: result.id,
                    nome: result.name,
                    email: result.email,
                    avatarURL: null,
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Bem vindo a plataforma!");
            })
            .catch(console.log);
    }

    // Logando com usuário
    async function signIn(email: string, password: string) {
        setLoadingAuth(true);

        await fetch(`http://localhost:3000/users?email=${email}`)
            .then(res => res.json())
            .then(async result => {

                if(result[0]) {
                    const passwordMatch = await compare(password, result[0].password);

                    if(!passwordMatch) {
                        toast.error("Email/Password incorrect.");
                        setLoadingAuth(false);
                        return;
                    } 

                    let data = {
                        id: result[0].id,
                        nome: result[0].name,
                        email: result[0].email,
                        avatarURL: result[0]?.avatarURL,
                    };

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    toast.success("Bem vindo de volta!");
                } else {
                    toast.error("Email/Password incorrect.");
                    setLoadingAuth(false);
                }
            })
            .catch(console.log);      
    }

    function storageUser(data: User) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    // Logout do usuário
    function signOut() {
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider 
            value={{ 
                signed: !!user, 
                user, 
                loading, 
                signUp, 
                signOut,
                signIn,
                loadingAuth,
                setUser,
                storageUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

// Pra transforma esse valor user em boolean nós vamos 
// usar um hack e iremos mandar esse valor boolean pra dentro do
// nosso PrivateRoute.
// !!user converter o valor pra boolean
// { name: "Simon" } return true
// { } return false