import React, { useContext } from 'react';
import { Button, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Items, ItemContext } from '../../../contexts/dashboard/ItemContext';
import CloseIcon from '@material-ui/icons/Close';

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
    const { state, setState } = useContext(ItemContext);
    const { checkout } = state;
    const { setCheckout } = setState;
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
                style={{ backgroundColor: checkout ? '#e91e63' : '#2196f3', color: '#fff' }}
                startIcon={checkout ? <CloseIcon /> : <ShoppingCartIcon />}
                className={classes.button}
                onClick={() => setCheckout(!checkout)}
            >
                {checkout ? 'Cancel' : 'Checkout'}
            </Button>
        </Box>
    )
}