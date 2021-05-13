import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{field: '_id', headerName: 'Course ID', width: 120},
	{field: 'course_name', headerName: 'Course Name', width: 250},
	{field: 'credit_points', headerName: 'Credit Points', width: 150},
	{field: 'faculty', headerName: 'Faculty', width: 250},
	{field: 'description', headerName: 'Course Description', width: 900},
];

export default function CourseGrid(props) {

	const setSelectedData = async (e) => {
		props.handleSelected(e.selectionModel);
	} 

	return (
		<DataGrid onSelectionModelChange={(e) =>  setSelectedData(e)} autoHeight="true" rows={props.rows} columns={columns} checkboxSelection pageSize={20} />
	);
}
