import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface Items {
    id: number;
    name: string;
    brand: string;
    category: string;
    serialNumber: string;
    quantity: number;
    dateAdded: string;
    status: number;
    userId: number | null;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Items = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Items[]>([]);

    const fetchItems = async () => {
        const resp = await fetch("http://localhost:5000/item/all", {
            credentials: "include"
        });
        const json = await resp.json();
        setItems([...items, json.map((data: Items) => data)])
    }

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        setLoading(false);
        console.log(items);
    }, [items])

    const renderItems = () => {
        if (loading) {
            return <div>Loading</div>
        } else {
            items.map(item => (
                <TableRow key={item.id}>
                    <TableCell component="th" scope="row">{item.id}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.serialNumber}</TableCell>
                    <TableCell align="right">{item.brand}</TableCell>
                    <TableCell align="right">{item.category}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                    <TableCell align="right">{item.dateAdded}</TableCell>
                </TableRow>
            ))
        }
    }

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
                    {renderItems}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Items