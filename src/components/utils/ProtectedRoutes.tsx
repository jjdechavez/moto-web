import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    password: string;
}

const ProtectedRoute = () => {
    useEffect(() => {
        async function checkAuth() {
            const resp = await fetch("http://localhost:5000/user/auth")
            // resp.status === 202 ? 
        }
    }, []);

    return (
        <Route 
            // render={}
        />
    )
}

export default ProtectedRoute;