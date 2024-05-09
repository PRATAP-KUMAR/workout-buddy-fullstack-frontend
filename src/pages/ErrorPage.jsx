import React from 'react'

function ErrorPage() {
    return (
        <div className='min-h-[calc(100vh-4rem)] font-bold text-2xl text-center justify-center flex-col items-center bg-lite text-toodark flex'>
            <p>Oops! Sorry, there seems to be a Network Error/Backend is not connected.</p>
            <a
                href='https://github.com/PRATAP-KUMAR/workout-mern-backend.git'
                target='_blank'
                rel='noreferrer'
                className='text-blue-500'
            >
                Backend Instructions
            </a>
        </div>
    )
}

export default ErrorPage