import React, { useContext } from "react";
import CircularLoading from "./Loading";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getAccessToken } from "./accessToken";

const ProtectedProviderRoute = (
    { component: Component, provider: Provider, ...rest} : any
) => {
    const { authState } = useContext(AuthContext);
    const { user } = authState;
    const token = getAccessToken();

    if (user === null) {
        return <CircularLoading />
    } else {
        return (
            <Provider>
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
            </Provider>
        )
    }
}

export default ProtectedProviderRoute;