import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import CircularLoading from "./Loading";
import { AuthContext } from "../../contexts/AuthContext";
import { getAccessToken } from "./accessToken";

export interface User {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
}

const ProtectedRoute = (
    { component: Component, ...rest} : any
) => {
    const { authState } = useContext(AuthContext);
    const { user } = authState;
    const token = getAccessToken(); 

    if (user === null) {
        return <CircularLoading />
    } else {
        return (
            <Route 
                {...rest}
                render={(props) => {
                    if (!token) return <Redirect to={{
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