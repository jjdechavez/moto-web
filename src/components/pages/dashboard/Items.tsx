import React, { useEffect, useState, useContext } from "react";
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
import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from "@material-ui/core";

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
        sent || error && resetItemStatus(dispatch);
    }, [sent, error]);

    let container: any = [];
    const loadingItems = () => {
        for (let i = 0; i < 5; i++) {
            container.push(
                <Box key={i}>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </Box>
            )
        }
    return <>{container}</>
    }

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
            </TableRow>
        ))
    }

    if (sending) {
        return loadingItems()
    } else {
        return (
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderItems()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Items