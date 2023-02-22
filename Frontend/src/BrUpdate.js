import React, { useState } from "react";
import styleset from './brUpdate.module.css';

import { Container, Button, FormControl, Box, NativeSelect, Card, CardContent, IconButton, Paper, Stack, TextField, Typography, Select, MenuItem, InputLabel, CssBaseline } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlignHorizontalCenter } from "@mui/icons-material";


export default function BranchForm() {



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

 

  return (

    <div className={styleset.mainContainer}>
      <div >
        <Paper elevation={6} className={styleset.brDetails} sx={{ mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" }, alignItems: "center", borderRadius: "31px", overflow: "auto" }} >
          <div className={styleset.headTitleContainer}>
            <h1>Branch Details</h1></div>
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
                        <div className={styleset.buttonUpDel}>
                          <Button variant="contained" sx={{ mr: '10px' }}>Update</Button>
                          <Button variant="contained" sx={{ mr: '10px' }}>Delete</Button>
                        </div>

                      </TableRow>

                    );

                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styleset.buttonadd}>
            <Button variant="contained" sx={{ mr: '10px' }} >Add more</Button>
          </div>

        </Paper>

      </div>
    </div>

  )


} 