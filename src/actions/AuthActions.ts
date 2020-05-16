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
        localStorage.setItem('token', json.token);
        dispatch({ type: 'LOGIN_FULFILLED', payload: { user: json.user, token: json.token } });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', payload: error })
    }
}

export const ResetLoginStatus = (dispatch: any) => {
    dispatch({ type: 'LOGIN_RESET' })
}

export const LogoutUser = async (dispatch: any) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
}

export const GetToken = () => {
    return localStorage.getItem('token');
}