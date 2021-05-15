import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{field: 'year', headerName: 'Year', width: 90},
	{field: 'postgraduate', headerName: 'Postgraduate', width: 140},
	{field: 'name', headerName: 'Student Name', width: 180},
	{field: 'major', headerName: 'Student Major', width: 180},
	{field: 'degree', headerName: 'Student Degree', width: 300},
	{field: 'interests', headerName: 'Student Interests', width: 300},
	{field: 'courses_completed', headerName: 'Completed Courses', width: 500},
];

export default function StudentGrid(props) {

	const setSelectedData = async (e) => {
		props.handleSelected(e.selectionModel);
	} 

	return (
		<DataGrid onSelectionModelChange={(e) =>  setSelectedData(e)} autoHeight="true" rows={props.rows} columns={columns} checkboxSelection pageSize={10} />
	);
}
