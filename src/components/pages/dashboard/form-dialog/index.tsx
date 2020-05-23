import React, { useState, useEffect, useRef, useContext } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Button, 
    InputAdornment,
    FormControl,
    CircularProgress,
    Theme,
    createStyles
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Items, ItemContext } from "../../../../contexts/dashboard/ItemContext";
import { updateItem, deleteItem } from "../../../../actions/ItemActions";
import { ItemStatus } from "../../../../reducers/ItemReducer";

interface iProps {
    open: boolean;
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: Items;
    handleDispatch({ type, payload } : { type: string, payload?: any | null }): void;
    updateStatus: ItemStatus
}

const useStyle = makeStyles((theme: Theme) => 
    createStyles({
        textField: {
            marginTop: '1em'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    }
));

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
    const [loading, setLoading] = useState(false);
    const timer = useRef<number | any>();
    const { 
        state: { edit, remove },
        setState: { setEdit, setRemove }
    } = useContext(ItemContext);

    useEffect(() => {
        setItem({...props.item});
    }, [props.item]);

    useEffect(() => {
        if (sent || error) {
            handleDispatch({ type: 'UPDATE_ITEM_RESET' });
        }
    }, [error, sent, handleDispatch]);
    
    const handleClose = () => {
        handleOpen(false);
        setTimeout(() => {
            edit && setEdit(false);
            remove && setRemove(false);
        }, 150);
    };
    
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    }
    
    const handleUpdate = (type: string, data?: any) => {
        if (!loading) {
            setLoading(true);
            type === 'update' && updateItem(handleDispatch, item.id!, item.name, item.brand, item.category, +item.price, item.quantity!);
            type === 'remove' && deleteItem(handleDispatch, data);
            timer.current = setTimeout(() => {
                setLoading(false);
                handleOpen(false);
                setTimeout(() => {
                    type === 'update' && setEdit(false);
                    type === 'remove' && setRemove(false);
                }, 100);
            }, 1500);
        }
    }

    let body: any = null;

    if (edit) {
        body = <>
            <FormControl className={classes.textField} fullWidth>
                <TextField 
                    label="Name"
                    name="name"
                    value={item.name || ""} 
                    onChange={(e) => handleChange(e)}
                    variant="outlined" 
                    disabled={loading ? true : false}
                />
            </FormControl>
            <FormControl className={classes.textField} fullWidth>
                <TextField 
                    label="Serial Number" 
                    name="serialNumber"
                    value={item.serialNumber || ""} 
                    onChange={e => handleChange(e)}
                    variant="outlined" 
                    disabled={loading ? true : false}
                />
            </FormControl>
            <FormControl className={classes.textField} fullWidth>
                <TextField 
                    label="Brand" 
                    name="brand"
                    value={item.brand || ""} 
                    onChange={handleChange}
                    variant="outlined" 
                    disabled={loading ? true : false}
                />
            </FormControl>
            <FormControl className={classes.textField} fullWidth>
                <TextField 
                    label="Category" 
                    name="category"
                    value={item.category || ""} 
                    onChange={e => handleChange(e)}
                    variant="outlined" 
                    disabled={loading ? true : false}
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
                    disabled={loading ? true : false}
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
                    disabled={loading ? true : false}
                />
            </FormControl>
        </>
    } else if (remove) {
        body = <>
           Are you sure to remove this item? 
        </>
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{edit ? 'Update' : 'Remove'} Item</DialogTitle>
            <DialogContent>
                {body}
            </DialogContent>
        <DialogActions>
            <div className={classes.wrapper}>
                <Button 
                    onClick={handleClose} 
                    color="primary"
                    disabled={loading && true}
                >
                    Cancel
                </Button>                
            </div>
            <div className={classes.wrapper}>
                <Button 
                    onClick={() => edit 
                        ? handleUpdate('update') 
                        : handleUpdate('remove', item.id)
                    } 
                    color="primary"
                    disabled={loading && true}
                >
                    {edit ? 'Update' : 'Remove'}
                </Button> 
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </DialogActions>
      </Dialog>
    )
}