import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { iItems } from '../../../interface/Items';
import ItemContextProvider, { ItemContext } from "../../../contexts/dashboard/ItemContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Items = () => {
    const classes = useStyles();
    const { itemState, dispatch } = useContext(ItemContext);

    // const [loading, setLoading] = useState(false);
    // const [items, setItems] = useState<iItems[]>([]);

    const fetchItems = async () => {
        // setItems(json.map((data: iItems) => data))
        dispatch({ type: 'GET_ITEMS' });
        try {
            const resp = await fetch("http://localhost:5000/item/all", {
                credentials: "include"
            });
            const json = await resp.json();
            console.log(json)
        } catch (error) {
            dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
        }
    }

    useEffect(() => {
        // fetchItems();
    }, []);

    // useEffect(() => {
    //     setLoading(false);
    //     console.log(items);
    // }, [items])

    // const renderItems = () => {
    //     if (loading) {
    //         return <div>Loading</div>
    //     } else {
    //         items.map(item => (
    //             <TableRow key={item.id}>
    //                 <TableCell component="th" scope="row">{item.id}</TableCell>
    //                 <TableCell align="right">{item.name}</TableCell>
    //                 <TableCell align="right">{item.serialNumber}</TableCell>
    //                 <TableCell align="right">{item.brand}</TableCell>
    //                 <TableCell align="right">{item.category}</TableCell>
    //                 <TableCell align="right">{item.status}</TableCell>
    //                 <TableCell align="right">{item.dateAdded}</TableCell>
    //             </TableRow>
    //         ))
    //     }
    // }

    return (
        <ItemContextProvider>
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
                        {/* {renderItems} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </ItemContextProvider>
    );
}

export default Items