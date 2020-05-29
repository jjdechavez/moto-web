import React, { useEffect, useContext, useState, useCallback } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { ItemContext, Items } from "../../../contexts/dashboard/ItemContext";
import { getItems, resetItemStatus } from "../../../actions/ItemActions";
import { IconButton, TablePagination, Button } from "@material-ui/core";
import { LinearProgress, withStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ItemFormDialog } from "./form-dialog";
import { Options } from "./Options";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import { TablePaginationActions } from "./table/TablePaginationActions";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#90caf9',
  },
  barColorPrimary: {
    backgroundColor: '#1976d2',
  },
})(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            padding: theme.spacing(1.5)
        },
        table: {
            minWidth: 500
        },
        quantityCell: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        quantityBtn: {
            minWidth: '10px'
        }
    }),
);

let render = 1;

function priceFormat(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ItemsComp = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [toggleDialog, setToggleDialog] = useState<boolean>(false);
    const { state, setState, itemState, dispatch } = useContext(ItemContext);
    
    const { 
        items, 
        getItemsStatus: { sending, sent, error }, 
        updateItemStatus,
        currentItem 
    } = itemState;
    const { setEdit, setRemove, setCreate } = setState;
    const { checkout } = state;

    console.log('render', render++);

    useEffect(() => {
        getItems(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (sent) {
            resetItemStatus(dispatch);
        }
        if (error) {
            resetItemStatus(dispatch);
        }
    }, [sent, error, dispatch]);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    //     setPage(newPage);
    // }, [])

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // }, [])

    
    const handleToggleDialog = (type: string, item?: Items ) => {
        setToggleDialog(true);
        if (type === 'edit') {
            dispatch({ type: 'GET_CURRENT_ITEM', payload: item }); 
            setEdit(true);
        } else if (type === 'remove') {
            dispatch({ type: 'GET_CURRENT_ITEM', payload: item }); 
            setRemove(true);
        } else {
            setCreate(true);
        }
    }

    const handleCartItem = useCallback((type: string, id: number) => {
        if (type === 'toCart') {
            dispatch({ type: 'INSERT_INTO_CART', payload: id });
        } else {
            dispatch({ type: 'REMOVE_INTO_CART', payload: id })
        }
    }, [dispatch])

    const handleInCart = useCallback((id) => {
        dispatch({ type: 'INSERT_INTO_CART', payload: id })
    }, [dispatch]);

    const renderItems = () => {
        return (rowsPerPage > 0
            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : items
        ).map((item: Items) => (
            <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                    {item.id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.serialNumber}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.brand}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.category}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.status === 1
                        ? (
                            <Box component="div" className={classes.quantityCell}>
                                <Button variant="outlined" className={classes.quantityBtn}>-</Button>
                                <Box component="span" style={{ color: item.quantity!  ? 'red' : ''}}>{item.quantity}</Box>   
                                <Button variant="outlined" className={classes.quantityBtn}>+</Button>
                            </Box>
                        ) : (
                            <>
                                {item.quantity}
                            </>
                        )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    &#8369; {priceFormat(item.price)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.dateAdded}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {item.user.firstName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    <Box display="flex" justifyContent="center">
                        {checkout ? (
                            <>
                                {item.status === 1 
                                    ? (
                                        <IconButton onClick={() => handleCartItem('removeFromTheCart',item.id!)}>
                                            <CloseIcon />
                                        </IconButton>
                                    ):(
                                        <IconButton onClick={() => handleInCart(item.id!)}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    )}
                            </>
                        ) : (
                            <>
                                <IconButton onClick={() => handleToggleDialog('edit', item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleToggleDialog('remove', item)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        )}
                    </Box>
                </TableCell>
            </TableRow>
        ));
    }

    if (sending) {
        return <ColorLinearProgress />
    } else {
        return (
            <>
                <ItemFormDialog 
                    open={toggleDialog} 
                    handleOpen={setToggleDialog} 
                    item={currentItem} 
                    handleDispatch={dispatch}
                    updateStatus={updateItemStatus}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={7}
                                    count={items.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    style={{ padding: 0 }}
                                />
                                <TableCell colSpan={3} style={{ padding: 0 }}>
                                    <Options onToggleDialog={handleToggleDialog} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">SerialNumber</TableCell>
                                <TableCell align="center">Brand</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Date Added</TableCell>
                                <TableCell align="center">Created By</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderItems()}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={10} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ItemsComp