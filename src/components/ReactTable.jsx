import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';

// Create styled components to make the table compact
const CompactTableCell = styled(TableCell)(({ theme }) => ({
    padding: '4px 8px',
}));

const CompactTableRow = styled(TableRow)(({ theme }) => ({
    height: 24,
}));

// Styled TableHead component to change background color
const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: 'green',
}));

// Styled TablePagination component to change background color and make it smaller
const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
    background: 'green',
    padding: '10px', // Adjust padding to reduce height
    minHeight: 'unset', // Override minHeight if needed
    '& .MuiTablePagination-spacer': {
        flex: 'none', // To prevent stretching
    },
    '& .MuiTablePagination-actions': {
        flex: 'none', // To prevent stretching
    },
}));

const StickyHeadTable = ({ columns, rows }) => {
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
        <Paper>
            <TableContainer sx={{ maxHeight: 250, overflowX: 'auto' }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <StyledTableHead>
                        <CompactTableRow>
                            {columns.map((column) => (
                                <CompactTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </CompactTableCell>
                            ))}
                        </CompactTableRow>
                    </StyledTableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <CompactTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <CompactTableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </CompactTableCell>
                                    );
                                })}
                            </CompactTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <StyledTablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

StickyHeadTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            minWidth: PropTypes.number,
            align: PropTypes.string,
            format: PropTypes.func,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            code: PropTypes.string.isRequired,
            population: PropTypes.number,
            size: PropTypes.number,
            density: PropTypes.number,
        })
    ).isRequired,
};

export default StickyHeadTable;
