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
        <form onSubmit={handleSubmit} className='flex flex-col justify-start space-y-5 items-center mt-10 max-w-4xl mx-auto bg-green-200'>

            <h3 className='font-bold'>Login</h3>

            <label>Email: </label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password: </label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading} className='btn-blue'>Login</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login;