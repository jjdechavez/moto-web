import React, { createContext, useReducer, useState } from "react";
import { LoginState, LoginReducer } from "../reducers/LoginReducer";
import { iLoginContextProps } from "../interface/context/LoginContext";

export const LoginContext = createContext({} as iLoginContextProps);

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