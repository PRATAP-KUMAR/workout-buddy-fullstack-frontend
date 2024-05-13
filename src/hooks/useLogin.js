import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import API from "../../api";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const headers = new Headers();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API}/api/user/login`, {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ email, password })
            })
            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }

            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                // update AuthContext
                dispatch({ type: 'LOGIN', payload: json })
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { login, isLoading, error }
}