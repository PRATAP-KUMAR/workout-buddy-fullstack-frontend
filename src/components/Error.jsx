function Error() {
    return (
        <div className='text-md text-center justify-center flex-col items-center text-toodark flex'>
            <p>Oops! Sorry, there seems to be a Network Error/Backend is not connected.</p>
            <a
                href='https://github.com/PRATAP-KUMAR/workout-mern-backend.git'
                target='_blank'
                rel='noreferrer'
                className='text-white'
            >
                Click here for Backend Instructions
            </a>
        </div>
    )
}

export default Error