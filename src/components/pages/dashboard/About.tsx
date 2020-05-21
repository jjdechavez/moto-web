import React, { useEffect, useContext } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";
import CircularLoading from "../../utils/Loading";
import { AuthContext } from "../../../contexts/AuthContext";
import { getUser, resetGetUser } from "../../../actions/AuthActions";

export const About = () => {
   const { authState, dispatch } = useContext(AuthContext) ;
   const { user, getUserStatus: { sending, error } } = authState;

    useEffect(() => {
        if (error) {
            resetGetUser(dispatch);
        }
        getUser(dispatch);
    }, [dispatch, error]);

    if (sending) {
        return <CircularLoading />
    }

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <div>
                    <Typography>{user.firstName + ' ' + user.lastName}</Typography>
                    <Typography>{user.email}</Typography>
                </div>
            </Container>
        </div>
    )
}