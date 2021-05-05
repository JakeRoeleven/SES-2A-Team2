import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'CID', width: 150 },
    { field: 'cname', headerName: 'Course Name', width: 400 },
    { field: 'crequirements', headerName: 'Course Requirements', width: 400 },
    { field: 'ctype', headerName: 'Course Type', width: 400 },
];
  
const rows = [
    { id: 1, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 2, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 3, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 4, cname: 'MM2', crequirements: 'MM1', ctype: Math },
];

export default function AdminDash() {

  function handleAdd() {
    console.log("add");
    <Link to='/addcourse'>Add Course</Link>
  }

  function handleEdit() {
    console.log("edit");
  }

  function handleDelete() {
    console.log("delete");
  }

  return (
    <div>
      <div>
        <center><header><strong>Admin Dashboard</strong></header></center>
      </div>
      <div style={{ height: 600, width: '99%' }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
      <div>
        <ButtonGroup variant="contained">
          <Link to='/addcourse' onClick={handleAdd}>Add Course</Link>
          <Button onClick={handleEdit}>Edit Course</Button>
          <Button onClick={handleDelete}>Delete Course</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

/* import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(cid, cname, creqs, ctype) {
  return { cid, cname, creqs, ctype };
}

const rows = [
  createData(1, 'MM2', 'MM1', 'Math'),
  createData(1, 'MM2', 'MM1', 'Math'),
  createData(1, 'MM2', 'MM1', 'Math'),
  createData(1, 'MM2', 'MM1', 'Math'),
  createData(1, 'MM2', 'MM1', 'Math'),
];

export default function BasicTable() {
  const classes = useStyles();

  function handleAdd() {
    console.log("add");
  }

  function handleEdit() {
    console.log("edit");
  }

  function handleDelete() {
    console.log("delete");
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Course Requirements</TableCell>
            <TableCell>Course Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.cid}>
              <TableCell component="th" scope="row">
                {row.cid}
              </TableCell>
              <TableCell>{row.cname}</TableCell>
              <TableCell>{row.creqs}</TableCell>
              <TableCell>{row.ctype}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={handleAdd}>Add Course</Button>
        <Button onClick={handleEdit}>Edit Course</Button>
        <Button onClick={handleDelete}>Delete Course</Button>
      </ButtonGroup>
    </TableContainer>
  );
} */