import React, { useState } from "react";
import './App.css';
import { Container, Button, FormControl, Box, NativeSelect, Card, CardContent, IconButton, Paper, Stack, TextField, Typography, Select, MenuItem, InputLabel, CssBaseline } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';


export default function BranchForm() {
  const [weekdaysfrom, setWeekdaysFrom] = useState("");
  const [weekdaysto, setWeekdaysTo] = useState("");
  const [weekendsfrom, setWeekendsFrom] = useState("")
  const [weekendsto, setWeekendsTo] = useState("");
  const [aptmnthrs, setAppointmentHours] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(weekdaysfrom);
  }

  const columns = [
    { id: 'BrName', label: 'Branch Name', Width: 300, align: 'center' },
    { id: 'ManName', label: 'Name of Manager', Width: 300, align: 'center' },
    { id: 'Cntct', label: 'Contact Number', Width: 300, align: 'center' },
    { id: 'Addrs', label: 'Address', Width: 300, align: 'center' },

  ];
  function createData(BrName, ManName, Cntct, Addrs) {
    return { BrName, ManName, Cntct, Addrs };
  }

  const rows = [
    createData('Colombo', 'L.Malith Perera', '0114512892', 'No.12,Duplication Road,Colombo 6'),
    createData("Aluthgama", "A. Senith Cooray", "0344589632", "No.108,Galle Road,Aluthgama"),
    createData("Matara", "S.Malan Peiris", "0485789632", "No.85,Galle Road Matara"),


  ]

  const list = ['MPPI10000', 'MPPI10001', 'MPPI10002', 'MPPI10003'];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
  
    <div className="BranchDetails">
      <h1>Branch Details</h1>
      <form className="BranchForm" onSubmit={handleSubmit}>
        <div className="weekdays">
          <label className="Label" for="weekdays-from">Weekdays-open</label>
          <input
            id="weekdays-from"
            type="number"
            name="weekdays"
            value={weekdaysfrom || ""}
            placeholder="From"
            onChange={(e) =>
              setWeekdaysFrom(e.target.value)}
          />
          <input
            type="number"
            name="weekdays"
            value={weekdaysto || ""}
            placeholder="To"
            onChange={(e) =>
              setWeekdaysTo(e.target.value)}
          />
        </div>

        <div className="weekends">
          <label className="Label">Weekends-open</label>
          <input
            type="number"

            name="weekends"
            value={weekendsfrom || ""}
            placeholder="From"
            onChange={(e) => setWeekendsFrom(e.target.value)}
          />
          <input
            type="number"
            name="weekdays"
            value={weekendsto || ""}
            placeholder="To"
            onChange={(e) =>
              setWeekendsTo(e.target.value)}
          />
        </div>

        <div className="hours">
          <label className="Label1">Number of Appointment Hours</label>
          <input
            type="number"
            name="aptmnthrs"
            value={aptmnthrs || ""}
            placeholder="Enter number of hours"
            onChange={(e) => setAppointmentHours(e.target.value)}
          />
        </div>
      </form>

      <div>
        <Paper elevation={6} sx={{ mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" }, alignItems: "center", borderRadius: "31px",overflow:"auto" }}>
          <TableContainer  >
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.Width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows

                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>

                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

      </div>
    </div>

  )


} 
