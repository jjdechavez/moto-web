import React, { createContext, useReducer, useState } from "react";
import { IAuthState, AuthReducer } from "../reducers/AuthReducer";
import { iLoginContextProps } from "../interface/context/LoginContext";
import logger from 'use-reducer-logger';

export const AuthContext = createContext({} as iLoginContextProps);

function AuthContextProvider(props: any) {

    const initialState = {
        isAuthenticated: null,
        loginStatus: {
            sending: false,
            sent: false,
            error: null
        }
    }

    const [authState, dispatch] = useReducer(AuthReducer, initialState);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const value = {
        state: {
            username,
            password
        },
        setState: {
            setUsername,
            setPassword
        }
    }
    
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;