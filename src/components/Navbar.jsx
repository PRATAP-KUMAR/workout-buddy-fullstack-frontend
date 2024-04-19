import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const onLogout = () => {
        logout()
    }

    return (
        <header className="bg-gray-900 w-full sticky top-0 z-50">
            <nav className='flex justify-between items-center h-16 mx-5 '>
                <div className="text-white font-bold text-2xl">
                    <Link to="/">Workout Buddy</Link>
                </div>
                {user && (
                    <div className="space-x-5 text-white">
                        <span>{user.email}</span>
                        <button onClick={onLogout} className="btn-blue">Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="space-x-5 text-white">
                        <Link className="btn-blue" to="/login">Login</Link>
                        <Link className="btn-blue" to="/signup">Signup</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;