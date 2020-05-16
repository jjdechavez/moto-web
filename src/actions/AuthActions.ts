import {  } from "react-router-dom";

export const LoginUser = async (dispatch: any, username: string, password: string) => {
    try {
        dispatch({ type: 'LOGIN' });
        const res = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password
            })
        });            
        const json = await res.json();
        dispatch({ type: 'LOGIN_FULFILLED', payload: { user: json.user, token: json.token } })
        dispatch({ type: 'LOGIN_RESET' })
        // res.status === 202 && history.push('/');
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', payload: error })
    }
}