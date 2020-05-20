import React, { createContext, useReducer, useState } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { IAuthContextProps } from "../interface/context/AuthContext";
import logger from 'use-reducer-logger';

export const AuthContext = createContext({} as IAuthContextProps);

function AuthContextProvider(props: any) {

    const initialState = {
        isAuthenticated: null,
        loginStatus: {
            sending: false,
            sent: false,
            error: null
        },
        getUserStatus: {
            sending: false,
            sent: false,
            error: null
        },
        user: {
            id: null,
            firstName: '',
            lastName: '',
            email: ''
        },
        token: null
    }

    const [authState, dispatch] = useReducer(
        process.env.NODE_ENV === 'development' 
            ? logger(AuthReducer)
            : AuthReducer, initialState
    );

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
        },
        authState,
        dispatch
    }
    
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;