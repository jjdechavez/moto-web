import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

export interface User {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
}

export interface iData {
    isAuth: boolean;
    user: User;
}

const ProtectedRoute = ({ component: Component, ...rest}: any) => {
    const [data, setData] = useState<iData>({ 
        isAuth: false,
        user: { 
            id: null,
            firstName: "",
            lastName: "",
            email: ""
        }
    });
    const [status, setStatus] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuth = async () => {
        const resp = await fetch("http://localhost:5000/user/auth", {
            credentials: "include"
        });
        const json = await resp.json();
        setData(json.data);
    }

    useEffect(()  => {
        checkAuth();
    }, []);

    useEffect(() => {
        console.log('update', data)
    }, [data])

    return (
        <Route 
            {...rest}
            render={(props) => {
                if (!isAuthenticated) return <Redirect to={{
                    pathname: '/login',
                    state: {from: rest.path}
                }} />
                return <Component {...props}  />
            }}       
        />
    )
}

export default ProtectedRoute;