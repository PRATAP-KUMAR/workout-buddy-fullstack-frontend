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
        <header className="bg-toodark w-full sticky top-0 z-50">
            <nav className='flex justify-between items-center h-16 mx-5 '>
                <div className="text-white font-bold text-2xl">
                    <Link to="/">Workout Buddy</Link>
                </div>
                {user && (
                    <div className="space-x-5 text-white">
                        <span>{user.email}</span>
                        <button onClick={onLogout} className="button">Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="space-x-5 text-white">
                        <Link className="button" to="/login">Login</Link>
                        <Link className="button" to="/signup">Signup</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;