import { useNavigate } from "react-router-dom";
export default function LogoutButton() {
    const navigate  = useNavigate ();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <button
            onClick={handleLogout}
            className={"text-2xl text-white bg-black font-bold"}
            >
            LogOut
        </button>
    )
}