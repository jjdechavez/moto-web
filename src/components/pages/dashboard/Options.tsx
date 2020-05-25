import React from 'react';
import { Button, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Items } from '../../../contexts/dashboard/ItemContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
        // marginTop: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface iProps {
    onToggleDialog: (type: string, item?: Items) => void;
}

export const Options = (props: iProps) => {
    const classes = useStyles();
    return (
        <Box display="flex" justifyContent="flex-end" className={classes.box}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                className={classes.button}
                onClick={() => props.onToggleDialog('create')}
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
        </Box>
    )
}