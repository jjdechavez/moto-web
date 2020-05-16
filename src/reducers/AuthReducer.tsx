import { User } from "../interface/User"

export type loginStatus = {
    sending: boolean;
    sent: boolean;
    error: string | null;
}
export interface IAuthState {
    isAuthenticated: boolean | null;
    loginStatus: loginStatus;
    user: User;
    token: string | null;
}

export const AuthReducer = (
    state: IAuthState, 
    { type, payload } : { type: string, payload?: any | null }
): IAuthState => {
    switch(type) {
        case 'LOGIN': {
            let status = {
                ...state.loginStatus,
                sending: true
            }
            return { ...state, loginStatus: status }
        }
        case 'LOGIN_FULFILLED': {
            let status = {
                ...state.loginStatus,
                sending: false,
                sent: true
            }
            return { 
                ...state, 
                loginStatus: status, 
                user: payload.user, 
                token: payload.token,
                isAuthenticated: true
            }
        }
        case 'LOGIN_FAILED': {
            let status = {
                ...state.loginStatus,
                sent: false,
                error: payload
            }
            return { ...state, loginStatus: status, isAuthenticated: false }
        }
        case 'LOGIN_RESET': {
            let status = {
                ...state.loginStatus,
                sending: false,
                sent: false,
                error: null
            }
            return { ...state, loginStatus: status }
        }
        case 'LOGOUT': {
            let status = {
                ...state.loginStatus,
                sending: false,
                sent: false,
                error: null
            }

            return {
                ...state,
                isAuthenticated: false,
                loginStatus: status,
                user: {
                    id: null,
                    firstName: '',
                    lastName: '',
                    email: ''
                },
                token: null
            }
        }
        default:
            return state;
    }
}