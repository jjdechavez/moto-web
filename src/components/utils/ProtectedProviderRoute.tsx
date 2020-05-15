import React, { useState, useEffect } from "react";
import { User } from "../../interface/User";
import CircularLoading from "./Loading";
import { Route, Redirect } from "react-router-dom";

const ProtectedProviderRoute = (
    { component: Component, provider: Provider, ...rest} : any
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
            <Provider>
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
            </Provider>
        )
    }
}

export default ProtectedProviderRoute;