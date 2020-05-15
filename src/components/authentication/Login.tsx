import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { globalStyles } from "../../styles/index";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

interface iResponse {
    message: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            height: "100vh"
        },
        grid: {
            height: "inherit"
        },
        form: {
            margin: theme.spacing(1),
        },
        typo: {
            margin: theme.spacing(1),
            textAlign: "center",
            marginBottom: "1em"
        }
    })
);
export default function Login(): JSX.Element {
    const globalClass = globalStyles();
    const classes = useStyles();
    const history = useHistory();

    const { 
        state: { username, password },
        setState: { setUsername, setPassword }
    } = useContext(AuthContext);

    const [response, setResponse] = useState<iResponse | null>(null);

    const handleLogin = async () => {
        try {
            const resp = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password
                })
            });            
            const json = await resp.json();
            setResponse(json.message);
            resp.status === 202 && history.push('/');
        } catch (error) {
            setResponse(error);
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent style={{ height: "inherit" }}>
                    <Grid container spacing={3} alignItems="center" justify="center" className={classes.grid}>
                        <Grid item xs={12} sm={8} md={5} lg={4}>
                            <Typography variant="h4" className={classes.typo}>
                                Login
                            </Typography>
                            <form className={classes.form}>
                                <TextField 
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    className={globalClass.mbOneEm}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <TextField 
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    className={globalClass.mbOneEm}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    fullWidth
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}