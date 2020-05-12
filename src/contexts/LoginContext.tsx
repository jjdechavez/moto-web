import React, { createContext, useReducer, useState } from "react";
import { LoginState, LoginReducer } from "../reducers/LoginReducer";

export interface iContextProps {
    state: any;
    setState: any;
    // dispatch({type}:{type:string}): void;
}

export const LoginContext = createContext({} as iContextProps);

function LoginContextProvider(props: any) {
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
        <LoginContext.Provider value={value}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;