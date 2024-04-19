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
        <form onSubmit={handleSubmit} className='flex flex-col space-y-5 justify-start items-center mt-10 max-w-4xl mx-auto bg-green-200'>

            <h3 className='font-bold'>Sign up</h3>

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
            <button disabled={isLoading} className='btn-blue'>Submit</button>
            {error && <div className='text-red-500'>{error}</div>}
        </form>
    )
}

export default Signup