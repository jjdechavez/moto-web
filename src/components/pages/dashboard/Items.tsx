import React, { useEffect, useContext, useState } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ItemContext, Items } from "../../../contexts/dashboard/ItemContext";
import { getItems, resetItemStatus, deleteItem } from "../../../actions/ItemActions";
import { IconButton, useTheme, TableFooter, TablePagination } from "@material-ui/core";
import { LinearProgress, withStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { ItemFormDialog } from "./form-dialog";

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
        marginLeft: theme.spacing(2.5),
        },
        table: {
            minWidth: 500
        }
    }),
);

let render = 1;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const ItemsComp = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { state, setState, itemState, dispatch } = useContext(ItemContext);
    
    const { 
        items, 
        getItemsStatus: { sending, sent, error }, 
        updateItemStatus,
        currentItem 
    } = itemState;
    const { setEdit } = setState;
    const { edit } = state;

    console.log('render', render++)

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

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const priceFormat = (x: number) => {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleEditItem = (item: any) => {
        dispatch({ type: 'GET_CURRENT_ITEM', payload: item });
        setEdit(true);
    }

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
                    {item.quantity}
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
                    <IconButton onClick={() => handleEditItem(item)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon onClick={() => deleteItem(dispatch, item.id!)}/>
                    </IconButton>
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
                    open={edit} 
                    handleOpen={setEdit} 
                    item={currentItem} 
                    handleDispatch={dispatch}
                    updateStatus={updateItemStatus}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
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
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={10}
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
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ItemsComp