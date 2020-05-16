import React, { useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ItemContext } from "../../../contexts/dashboard/ItemContext";
import { getItems, resetItemStatus } from "../../../actions/ItemActions";
import { iItems } from "../../../interface/Items";
import { IconButton } from "@material-ui/core";
import { LinearProgress, withStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#90caf9',
  },
  barColorPrimary: {
    backgroundColor: '#1976d2',
  },
})(LinearProgress);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let render = 1;

const Items = () => {
    const classes = useStyles();
    const { itemState, dispatch } = useContext(ItemContext);
    
    const { items, getItemsStatus: { sending, sent, error } } = itemState;

    console.log('render', render++)

    useEffect(() => {
        getItems(dispatch);
    }, []);

    useEffect(() => {
        if (sent) {
            resetItemStatus(dispatch);
        }
        if (error) {
            resetItemStatus(dispatch);
        }
    }, [sent, error]);

    const renderItems = () => {
        return items.map((item: iItems) => (
            <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.id}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.serialNumber}</TableCell>
                <TableCell align="right">{item.brand}</TableCell>
                <TableCell align="right">{item.category}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">{item.dateAdded}</TableCell>
                <TableCell align="right">{item.user.firstName}</TableCell>
                <TableCell align="right">
                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    }

    if (sending) {
        return <ColorLinearProgress />
    } else {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">SerialNumber</TableCell>
                                <TableCell align="right">Brand</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date Added</TableCell>
                                <TableCell align="right">Created By</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderItems()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default Items