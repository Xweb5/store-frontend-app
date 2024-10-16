import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import Confirmation from './confirmation';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useAtom } from 'jotai';
import { chartCounter } from '../context/manageContext';



export default function Checkout(props: any) {

  
  const [incrementListBook, setIncrementListBook] = useAtom(chartCounter);

  const [totalListBook, setTotalListBook] = React.useState(0);

  const [totalPriceBooks, setTotalPriceBooks] = React.useState(0);
  


  const [showReadyToBuy, setShowReadyToBuy] = React.useState(false);

  const handleClickLogout = () => {
    setShowReadyToBuy(true);
  };

  const handleClose = () => {
    props.onCloseWindow(false)
  };


  const handleAddItems = (event: React.MouseEvent<HTMLElement>, row: any) => {
    
    row.items++;
    setIncrementListBook(c => c + 1)
    let total = 0;
    props.rows.map((row: any) => (total = total + row.price * row.items ))
    setTotalPriceBooks(total);

    let monSet = new Map();
    let localSet = localStorage.getItem("listOfBooks");
    if (localSet !== null) {
      monSet = new Map(JSON.parse(localSet));
    }

    monSet.set(row.id, row);
    
    localStorage.setItem("listOfBooks", JSON.stringify(Array.from(monSet)));

    
  };

  const handleDeleteItems = (event: React.MouseEvent<HTMLElement>, row: any) => {
    if (row.items > 0) {
      row.items--;
      setIncrementListBook(c => c - 1)
      let total = 0;
      props.rows.map((row: any) => (total = total + row.price * row.items ))
      setTotalPriceBooks(total);
  
      let monSet = new Map();
      let localSet = localStorage.getItem("listOfBooks");
      if (localSet !== null) {
        monSet = new Map(JSON.parse(localSet));
      }
  
      if (row.items === 0 ) {
        monSet.delete(row.id);  
      } else {
        monSet.set(row.id, row);
      }
      
      localStorage.setItem("listOfBooks", JSON.stringify(Array.from(monSet)));
    } 

  };

  const totalListBooks = (rows: any) => {
    let total = 0;
    rows.map((row: any) => total = total + row.items)
    return total;
  }

  const totalPrice = (rows: any) => {
    let total = 0;
    rows.map((row: any) => total = total + row.price * row.items)
    return total;
  }

  return (
    <React.Fragment>

    <Confirmation title="ready?"
          message="Are you ready to proceed?"
          openModal={showReadyToBuy}
          onCloseWindow={(event: boolean) => {setShowReadyToBuy(event)}}
          onOk={() => {alert('ready')}}
      />

      <Dialog maxWidth='lg'
        open={props.openModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Checkout List"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">author</TableCell>
                  <TableCell align="right">price €</TableCell>
                  <TableCell align="right">items</TableCell>
                  <TableCell ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.items}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleAddItems(e, row)} sx={{ p: 0 }}>
                          <AddBoxIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      </IconButton>  
                      <IconButton onClick={(e) => handleDeleteItems(e, row)} sx={{ p: 0 }}>
                          <IndeterminateCheckBoxIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      </IconButton> 
                    </TableCell> 
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableCell align="left" colSpan={2}><span style={{fontWeight: 'bold'}}>Totals</span></TableCell> 
                <TableCell align="right" ><span style={{fontWeight: 'bold'}}>{totalPrice(props.rows)}</span></TableCell> 
                <TableCell align="right" ><span style={{fontWeight: 'bold'}}>{totalListBooks(props.rows)}</span></TableCell>
                <TableCell></TableCell>  
              </TableFooter>
            </Table>
          </TableContainer>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClickLogout} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
