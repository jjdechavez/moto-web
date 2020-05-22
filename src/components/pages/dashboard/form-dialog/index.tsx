import React, { useState, useEffect } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Button, 
    InputAdornment,
    FormControl,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Items } from "../../../../contexts/dashboard/ItemContext";
import { updateItem } from "../../../../actions/ItemActions";
import { ItemStatus } from "../../../../reducers/ItemReducer";

interface iProps {
    open: boolean;
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: Items;
    handleDispatch({ type, payload } : { type: string, payload?: any | null }): void;
    updateStatus: ItemStatus
}

const useStyle = makeStyles({
    textField: {
        marginTop: '1em'
    },
    wrapper: {
    //   margin: theme.spacing(1),
      position: 'relative',
    },
});

export const ItemFormDialog = (props: iProps) => {
    const classes = useStyle();
    const { 
        updateStatus: { sent, error },
        handleDispatch,
        handleOpen
    } = props;

    const [item, setItem] = useState<Items>({
        id: null,
        name: '',
        brand: '',
        category: '',
        serialNumber: '',
        price: 0,
        status: null,
        quantity: null,
        user: {
            id: null,
            firstName: ''
        }
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setItem({...props.item});
    }, [props.item]);

    useEffect(() => {
        if (sent || error) {
            handleDispatch({ type: 'UPDATE_ITEM_RESET' });
        }

        function tick() {
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }
        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, [error, sent, handleDispatch]);

    const handleClose = () => {
        handleOpen(false);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    }

    const handleUpdate = () => {
        updateItem(handleDispatch, item.id!, item.name, item.brand, item.category, +item.price, item.quantity!);
        setItem({
            id: null,
            name: '',
            brand: '',
            category: '',
            serialNumber: '',
            price: 0,
            status: null,
            quantity: null,
            user: {
                id: null,
                firstName: ''
            }
        });
        handleOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
            <DialogContent>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Name"
                        name="name"
                        value={item.name || ""} 
                        onChange={(e) => handleChange(e)}
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Serial Number" 
                        name="serialNumber"
                        value={item.serialNumber || ""} 
                        onChange={e => handleChange(e)}
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Brand" 
                        name="brand"
                        value={item.brand || ""} 
                        onChange={handleChange}
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Category" 
                        name="category"
                        value={item.category || ""} 
                        onChange={e => handleChange(e)}
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Quantity" 
                        name="quantity"
                        value={item.quantity || ""} 
                        onChange={e => handleChange(e)}
                        type="number" 
                        InputLabelProps={{ shrink: true }} 
                        variant="outlined" 
                    />
                </FormControl>
                <FormControl className={classes.textField} fullWidth>
                    <TextField 
                        label="Price"
                        name="price" 
                        value={item.price || ""} 
                        onChange={e => handleChange(e)}
                        type="number" 
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">&#8369;</InputAdornment>,
                        }}
                        variant="outlined" 
                    />
                </FormControl>
            </DialogContent>
        <DialogActions>
            <div className={classes.wrapper}>
                <Button 
                    onClick={handleClose} 
                    color="primary"
                    disabled={sent && true}
                >
                    Cancel
                </Button>                
            </div>
            <div className={classes.wrapper}>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
                {sent && <CircularProgress variant="determinate" value={progress} /> }
            </div>
        </DialogActions>
      </Dialog>
    )
}