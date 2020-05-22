import React, { useState, useEffect } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Button, 
    InputAdornment,
    FormControl
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Items } from "../../../../contexts/dashboard/ItemContext";
import { updateItem } from "../../../../actions/ItemActions";

interface iProps {
    open: boolean;
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: Items;
    handleDispatch({ type, payload } : { type: string, payload?: any | null }): void;
}

const useStyle = makeStyles({
    textField: {
        marginTop: '1em'
    }
});

export const ItemFormDialog = (props: iProps) => {
    const classes = useStyle();
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

    useEffect(() => {
        setItem({...props.item});
    }, [props.item]);

    const handleClose = () => {
        props.handleOpen(false);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    }

    const handleUpdate = () => {
        updateItem(props.handleDispatch, item.id!, item.name, item.brand, item.category, +item.price, item.quantity!);
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
        props.handleOpen(false);
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    )
}