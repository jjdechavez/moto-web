import { setAccessToken, getAccessToken } from "../components/utils/accessToken";
import { fetchData } from "./ItemActions";

interface bodyProps {
    name: string,
    value: string
}

export const port = 5000;
export const changePort = 5001;

export const LoginUser = async (dispatch: any, username: string, password: string) => {
    try {
        dispatch({ type: 'LOGIN' });
        const accessToken = getAccessToken();
        const res = await fetch(`http://localhost:${changePort}/user/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken ? `Bearer ${accessToken}` : ''
            },
            body: JSON.stringify({
                email: username,
                password
            })
        });            
        const json = await res.json();
        setAccessToken(json.token);
        dispatch({ type: 'LOGIN_FULFILLED', payload: { user: json.user, token: json.token } });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', payload: error });
    }
}

export const ResetLoginStatus = (dispatch: any) => {
    dispatch({ type: 'LOGIN_RESET' });
}

export const LogoutUser = async (dispatch: any) => {
    dispatch({ type: 'LOGOUT' });
}

export const getUser = async (dispatch: any) => {
    try {
        dispatch({ type: 'GET_USER' });
        const json = await fetchData('user/about');
        dispatch({ type: 'GET_USER_FULFILLED', payload: json.user });
    } catch (error) {
        dispatch({ type: 'GET_USER_ERROR', payload: error });
    }
}

export const resetGetUser = (dispatch: any) => {
    dispatch({ type: 'GET_USER_RESET' });
}