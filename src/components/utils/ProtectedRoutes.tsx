import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import CircularLoading from "./Loading";

export interface User {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
}

const ProtectedRoute = (
    { component: Component, ...rest} : any
) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const checkAuth = async () => {
        try {
            const resp = await fetch("http://localhost:5000/user/auth", {
                credentials: "include"
            });
            const json = await resp.json();
            setIsAuthenticated(json.isAuth);
            setUser(json.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()  => {
        checkAuth();
    }, []);

    if (user === null) {
        return <CircularLoading />
    } else {
        return (
            <Route 
                {...rest}
                render={(props) => {
                    if (!isAuthenticated) return <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }} />
                    return <Component {...props}  />
                }}       
            />

        )
    }

}

export default ProtectedRoute;