import React from "react";
import DataTable from "react-data-table-component";
import { Box, TextField } from "@mui/material";

const CustomDataTable = ({ columns, filteredData, filterText, handleSearch }) => {
    const tableCustomStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                color: "white",
                backgroundColor: "#3C565B",
                // height: "40px",
            },
        },
        cells: {
            style: {
                fontSize: "12px",
                padding: "8px",
            },
        },
        rows: {
            style: {
                minHeight: "48px",
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#E0E0E0',
                },
            },
            stripedStyle: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#F9F9F9',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#EEE',
                borderBottomColor: '#FFF',
                outline: '1px solid #FFF',
                cursor: 'pointer',
            },
        },
        pagination: {
            style: {
                fontSize: '12px',
                backgroundColor: '#3C565B',
                color: 'white',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#E0E0E0',

            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.2s',
                backgroundColor: 'white',
                '&:hover:not(:disabled)': {
                    backgroundColor: '#3C565B',
                    color: 'white',
                },
            },
        },
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <TextField
                    size="small"
                    variant="standard"
                    placeholder="Search"
                    value={filterText}
                    onChange={handleSearch}
                />
            </Box>
            <DataTable
                customStyles={tableCustomStyles}
                columns={columns}
                data={filteredData}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="300px"
                selectableRowsHighlight
                highlightOnHover
                striped
            />
        </Box>
    );
};

export default CustomDataTable;
