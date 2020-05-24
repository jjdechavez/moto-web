import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
        marginTop: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);


export const Options = () => {
    const classes = useStyles();
    return (
        // <Box display="flex" justifyContent="flex-end" className={classes.box}>
            <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                className={classes.button}
            >
                Create Item
            </Button>
            <Button
                variant="contained"
                style={{ backgroundColor: '#2196f3', color: '#fff' }}
                startIcon={<ShoppingCartIcon />}
                className={classes.button}
            >
                Checkout
            </Button>
            </>
        // {/* </Box> */}
    )
}