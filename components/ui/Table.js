import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import CustomPagination from './customPagination'; // Make sure this path is correct

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
       
        columnHeaderRow: {
          backgroundColor: '#EAECF0',
           borderBottom:'none',
           borderRadius:'10px 10px 0px 0px',
           
          color: 'black',
        },

        footerContainer: {
          display: 'none', // Hide default footer (pagination)
        },
      },
    },
  },
});

const Table = ({ columns, rows ,hoverColor  }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(rows.length / pageSize)) {
      setPage(newPage);
    }
  };

  const paginatedRows = rows?.slice(page * pageSize, page * pageSize + pageSize);
  const pageCount = Math.ceil(rows?.length / pageSize);

  return (
    <ThemeProvider theme={theme}>
      <div className="pt-3  !rounded-bl-none  !rounded-br-none  !border-b-0 overflow-auto">
        <Box sx={{ width: '98%' }}>
        
          <DataGrid
            rows={paginatedRows}
            columns={columns}
            pagination={false} // Disable default pagination
            style={{ fontSize: '13px' ,}}
            className={`custom-data-grid hover:bg-${hoverColor}`}
          />
          {/* Custom Pagination */}
          <div className="">
            <CustomPagination
              page={page}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
         
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Table;
