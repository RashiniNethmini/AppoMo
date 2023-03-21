import React from 'react';
import './dashboard.css';
import { AppointmentList } from '../../AppointmentList';
import {Paper,Button} from '@mui/material';
// import NavBar from '../../component/NavBar/NavBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
  ) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell component="th" scope="row">
          Appointment {AppointmentList[0].id}
            {/* {row.name} */}
          </TableCell>
          <TableCell align="right">{AppointmentList[0].name}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{AppointmentList[0].contactNumber}
          <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton></TableCell>
          {/* <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell> */}
          {/* <TableCell align="right">
          {row.protein}
    </TableCell> */}
          {/* <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
               Appointment {AppointmentList[0].id}
                </Typography>
                <Table size="small" aria-label="purchases">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell> {AppointmentList[0].name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact No</TableCell>
                    <TableCell> {AppointmentList[0].contactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice No</TableCell>
                    <TableCell>   {AppointmentList[0].invoice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>{AppointmentList[0].product}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Issue</TableCell>
                    <TableCell>{AppointmentList[0].issue}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Voice Message</TableCell>
                    <TableCell><audio src={AppointmentList[0].voiceSrc} controls></audio></TableCell>
                  </TableRow>
                    {/* {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
          
        </TableRow>
      </React.Fragment>
    );
  }
  //rows
  const rows = [
    createData('Frozen yoghurt', 159),
    // createData('Ice cream sandwich', 237),
    // createData('Eclair', 262),
    // createData('Cupcake', 305),
    // createData('Gingerbread', 356),
    // AppointmentList.name
  ];
  
  export default function CollapsibleTable() {
    return (
     
      <TableContainer component={Paper} style={{marginTop:'20px'}}>

      {/* console.log(AppointmentList[0].id) */}

        <Table aria-label="collapsible table">
          <TableHead 
          // style={{backgroundColor:"red"}}
          >
            <TableRow >
            
              <TableCell colSpan="2" >
              <Typography variant="h6" gutterBottom component="div">
              Today
              </Typography></TableCell>
              {/* <TableCell align="right">Calories</TableCell> */}
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
        
          {/* <TableCell>Today</TableCell> */}
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
             {/* {AppointmentList.map((Appointment) => (

          
            <div key={Appointment.id} className={styles.buttonOuter} >
            <Popup className={styles.popup}Appointment={Appointment}/>
            </div>
          

        ))} */}
           
          </TableBody>
        </Table>
      </TableContainer>

      
    );
  }
  

