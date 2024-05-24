import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const onLogout = () => {
        logout()
    }

    return (
        <header className="bg-toodark sticky top-0 z-50">
            <nav className='flex justify-between items-center h-16 p-4 max-width'>
                <div className="text-white font-bold text-xl">
                    <Link to="/">Workout Buddy</Link>
                </div>
                {user && (
                    <div className="flex flex-col xs:flex-row xs:space-x-2 justify-center items-center text-white">
                        <p>{user.email}</p>
                        <button onClick={onLogout} className="btn-sm xs:btn">Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="text-white">
                        <Link className="btn" to="/login">Login</Link>
                        <Link className="btn" to="/signup">Signup</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;