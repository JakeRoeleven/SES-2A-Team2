import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const columns = [
    { field: 'id', headerName: 'CID', width: 150 },
    { field: 'cname', headerName: 'Course Name', width: 400 },
    { field: 'crequirements', headerName: 'Course Requirements', width: 400 },
    { field: 'ctype', headerName: 'Course Type', width: 400 },
];

//const [rows, setRows] = React.useState(['']);
//const addRow = () => {
//	const newRows = [...rows];
//	newRows.push('');
//	setRows(newRows);
//}; test commit
  
const rows = [
    { id: 1, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 2, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 3, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 4, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 5, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 6, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 7, cname: 'MM2', crequirements: 'MM1', ctype: Math },
    { id: 8, cname: 'MM2', crequirements: 'null', ctype: null },
    { id: 9, cname: 'MM2', crequirements: 'null', ctype: null },
];

export default function AdminDash() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div style={{ height: 600, width: '99%' }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
        <div>
            <Fab color="primary" aria-label="add"><AddIcon/></Fab>
            <Fab color="secondary" aria-label="edit"><EditIcon/></Fab>
        </div>
    </div>
  );
}