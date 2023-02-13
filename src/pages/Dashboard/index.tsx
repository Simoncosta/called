import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard() {

    const { signOut }: any = useContext(AuthContext);

    return(
        <>
            <h1>DASHBOARD</h1>
            <button onClick={() => signOut()}>Fazer Logount</button>
        </>
    )
}