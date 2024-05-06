import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-start 2xl:flex-row">
            <div className='flex flex-col items-center justify-center 2xl:w-1/3'>
                <img
                    className="w-96"
                    src="images/Wavy_Gen-01_Single-07.jpg"
                    alt="Login Photo"
                />
                <a
                    className='text-blue-500 text-xs'
                    href="https://www.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_12146011.htm#query=login&position=6&from_view=keyword&track=sph&uuid=4e1235ce-aea3-478b-a2ae-0ab3e2b4f72f">Image by vectorjuice on Freepik
                </a>
            </div>
            <form onSubmit={handleSubmit} className='flex-1 2xl:min-h-[calc(100vh-4rem)] flex flex-col w-full bg-orange-500 px-12 2xl:w-2/3 space-y-5 items-center justify-center mx-auto'>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email'
                    className='w-full h-12'
                />
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Password'
                    className='w-full h-12'
                />
                <button disabled={isLoading} className='btn-blue'>Signup</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default Signup