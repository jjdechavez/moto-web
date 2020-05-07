import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { globalStyles } from "../../styles/index";

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
            margin: theme.spacing(1)
        }
    })
);
export default function Login() {
    const globalClass = globalStyles();
    const classes = useStyles();

    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = async () => {
        const resp = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: uname,
                password: pwd
            })
        });

        // resp.status === 202 && Router.push('/');
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent style={{ height: "inherit" }}>
                    <Grid container spacing={3} alignItems="center" className={classes.grid}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="h4" className={classes.typo}>
                                Login - NextJS
                            </Typography>
                            <form className={classes.form}>
                                <TextField 
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    className={globalClass.mbOneEm}
                                    value={uname}
                                    onChange={e => setUname(e.target.value)}
                                />
                                <TextField 
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    className={globalClass.mbOneEm}
                                    value={pwd}
                                    onChange={e => setPwd(e.target.value)}
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