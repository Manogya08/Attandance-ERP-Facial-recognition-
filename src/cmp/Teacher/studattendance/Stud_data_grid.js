import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function DataGridDemo(props) {

    const columns = [
        { field: 'uid', headerName: 'Roll no', width: 130 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'attendance', headerName: 'Attendance', width: 130 },
        
        
      ];
      
      const rows = props.fetched;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={60} />
    </div>
  );
}
