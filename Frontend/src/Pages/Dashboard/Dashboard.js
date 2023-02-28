// import React from 'react';
// import './dashboard.css';
// import { AppointmentList } from '../../AppointmentList';
// import {Paper,Button} from '@mui/material';
// // import NavBar from '../../component/NavBar/NavBar';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// function createData(
//     name: string,
//     calories: number,
//      fat: number,
//     carbs: number,
//     protein: number,
//    price: number,
//   ) {
//     return {
//       name,
//       calories,
//       fat,
//       carbs,
//       protein,
//       price,
//       history: [
//         {
//           date: '2020-01-05',
//           customerId: '11091700',
//           amount: 3,
//         },
//         {
//           date: '2020-01-02',
//           customerId: 'Anonymous',
//           amount: 1,
//         },
//       ],
//     };
//   }
  
//   function Row(props: { 
//     // row: ReturnType<typeof AppointmentList> 
// }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
  
//     return (
//       <React.Fragment>
//         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
//           <TableCell component="th" scope="row">
//             {row.name}
//           </TableCell>
//           <TableCell align="right">{row.calories}</TableCell>
//           {/* <TableCell align="right">{row.fat}</TableCell>
//           <TableCell align="right">{row.carbs}</TableCell>
//           <TableCell align="right">{row.protein}</TableCell> */}
//           <TableCell>
//             <IconButton
//               aria-label="expand row"
//               size="small"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//             <Collapse in={open} timeout="auto" unmountOnExit>
//               <Box sx={{ margin: 1 }}>
                
//                 <Table size="small" aria-label="purchases">
//                   {/* <TableHead>
//                     <TableRow>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell align="right">Amount</TableCell>
//                       <TableCell align="right">Total price ($)</TableCell>
//                     </TableRow>
//                   </TableHead> */}
//                   <TableBody>
//                     {row.AppointmentList.map((historyRow) => (
//                       <TableRow key={historyRow.id}>
//                         <TableCell component="th" scope="row">
//                           {historyRow.id}
//                         </TableCell>
//                         {/* <TableCell>{historyRow.customerId}</TableCell>
//                         <TableCell align="right">{historyRow.amount}</TableCell>
//                         <TableCell align="right">
//                           {Math.round(historyRow.amount * row.price * 100) / 100}
//                         </TableCell> */}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Collapse>
//           </TableCell>
//         </TableRow>
//       </React.Fragment>
//     );
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 3055),
//     createData('Gingerbread', 356),
//   ];

// export default function Dashboard() {
//   return (
//     <div className='dash'>
//       {/* <div><NavBar/></div> */}
//       <Paper elevation={6} className="dashPaper">
        
          
//           <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell>
//             <Typography variant="h6" gutterBottom component="div">
//                  Today
//                 </Typography>
//             </TableCell>
//             {/* <TableCell />
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
//           </TableRow> 
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//       </Paper>  
//     </div>
// )
// }





// // export default function CollapsibleTable() {
// //   return (
    
// //   );
// // }

