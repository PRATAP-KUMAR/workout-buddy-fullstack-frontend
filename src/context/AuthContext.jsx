import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import authReducer from '../reducers/authReducer';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
