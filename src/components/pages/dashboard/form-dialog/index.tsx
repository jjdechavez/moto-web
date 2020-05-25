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
import { updateItem, deleteItem, createItem, resetCreateItem, resetUpdateItem } from "../../../../actions/ItemActions";
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
        state: { edit, remove, create },
        setState: { setEdit, setRemove, setCreate }
    } = useContext(ItemContext);

    useEffect(() => {
        setItem({...props.item});
    }, [props.item]);

    useEffect(() => {
        if (sent || error) {
            edit && resetUpdateItem(handleDispatch);
            create && resetCreateItem(handleDispatch);
        }
    }, [error, sent, handleDispatch, create, edit]);
    
    const handleClose = () => {
        handleOpen(false);
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
        setTimeout(() => {
            edit && setEdit(false);
            remove && setRemove(false);
            create && setCreate(false);
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
            type === 'create' && createItem(handleDispatch, item.name, item.serialNumber, item.brand, item.category, item.quantity!, item.price);
            timer.current = setTimeout(() => {
                setLoading(false);
                handleOpen(false);
                setTimeout(() => {
                    type === 'update' && setEdit(false);
                    type === 'remove' && setRemove(false);
                    type === 'create' && setCreate(false);
                }, 100);
            }, 1500);
        }
    }

    let body: any = null;
    let status: any = null;
    let defaultBody = <>
        <FormControl className={classes.textField} fullWidth>
            <TextField 
                label="Name"
                name="name"
                value={edit ? item.name || "" : item.name || ""} 
                onChange={(e) => handleChange(e)}
                variant="outlined" 
                disabled={loading ? true : false}
            />
        </FormControl>
        <FormControl className={classes.textField} fullWidth>
            <TextField 
                label="Serial Number" 
                name="serialNumber"
                value={edit ? item.serialNumber || "" : item.serialNumber || ""} 
                onChange={e => handleChange(e)}
                variant="outlined" 
                disabled={loading ? true : false}
            />
        </FormControl>
        <FormControl className={classes.textField} fullWidth>
            <TextField 
                label="Brand" 
                name="brand"
                value={edit ? item.brand || "" : item.brand || ""} 
                onChange={handleChange}
                variant="outlined" 
                disabled={loading ? true : false}
            />
        </FormControl>
        <FormControl className={classes.textField} fullWidth>
            <TextField 
                label="Category" 
                name="category"
                value={edit ? item.category || "" : item.category || ""} 
                onChange={e => handleChange(e)}
                variant="outlined" 
                disabled={loading ? true : false}
            />
        </FormControl>
        <FormControl className={classes.textField} fullWidth>
            <TextField 
                label="Quantity" 
                name="quantity"
                value={edit ? item.quantity || "" : item.quantity || ""} 
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
                value={edit ? item.price || "" : item.price || ""} 
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
    </>;

    if (edit) {
        status = 'Update';
        body = defaultBody;
    } else if (remove) {
        status = 'Remove';
        body = <>
           Are you sure to remove this item? 
        </>
    } else {
        status = 'Create';
        body = defaultBody;
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {status} Item
            </DialogTitle>
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
                            : remove ? handleUpdate('remove', item.id)
                            : handleUpdate('create')
                        } 
                        color="primary"
                        disabled={loading && true}
                    >
                        {status}
                    </Button> 
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </DialogActions>
      </Dialog>
    )
}