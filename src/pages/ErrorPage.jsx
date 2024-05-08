import React from 'react'

function ErrorPage() {
    return (
        <div className='min-h-[calc(100vh-4rem)] font-bold text-4xl justify-center items-center bg-lite text-toodark flex'>
            Opps! Sorry, there seems to be a Network Error/Backend is not connected.
        </div>
    )
}

export default ErrorPage