import { useContext } from "react"
import { FiSettings } from "react-icons/fi";
import Breadcrumbs from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth"

export default function Dashboard() {

    const { signOut }: any = useContext(AuthContext);

    return (
        <>
            <Header />

            <div className="content">

                <Breadcrumbs name="Atendimentos">
                    <FiSettings size={24} />
                </Breadcrumbs>

                <h1>DASHBOARD</h1>
            </div>
        </>
    )
}