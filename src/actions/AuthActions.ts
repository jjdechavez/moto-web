import { setAccessToken, getAccessToken } from "../components/utils/accessToken";

interface bodyProps {
    name: string,
    value: string
}

// export const fetchPostSetHeader = async (api: string, body: [bodyProps]) => {
//     const res = await fetch(`http://localhost:5000/${api}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             body.map(data => {
                // return `${data.name}: ${data.value}`
//             })
//         )
//     })
// }

export const LoginUser = async (dispatch: any, username: string, password: string) => {
    try {
        dispatch({ type: 'LOGIN' });
        const accessToken = getAccessToken();
        const res = await fetch("http://localhost:5001/user/login", {
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