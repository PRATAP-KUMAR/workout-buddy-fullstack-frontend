import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center 2xl:flex-row border-2 border-red-500">
            <div className='flex bg-cyan-500 flex-col items-center h-1/2 border-2 border-red-500 justify-center'>
                <img
                    className="w-96 border-2  border-green-500"
                    src="images/Wavy_Gen-01_Single-07.jpg"
                    alt="Login Photo"
                />
                <a href="https://www.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_12146011.htm#query=login&position=6&from_view=keyword&track=sph&uuid=4e1235ce-aea3-478b-a2ae-0ab3e2b4f72f" className='text-red-500'>Image by vectorjuice</a> on Freepik
            </div>
            <form onSubmit={handleSubmit} className='h-1/2 max-w-7xl 2xl:min-h-[calc(100vh-4rem)] flex flex-col justify-start p-10 w-full bg-light 2xl:w-2/3 space-y-5 items-center mx-auto bg-green-200'>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email'
                />

                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Password'
                />
                <button disabled={isLoading} className='btn-blue'>Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default Login;