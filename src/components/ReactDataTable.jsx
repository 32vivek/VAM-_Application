import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Box, CircularProgress, createTheme, ThemeProvider } from "@mui/material";

const CustomDataTable = ({ columns, filteredData, onSearch }) => {
    const [loading, setLoading] = useState(true);

    const tableCustomStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                color: "white",
                backgroundColor: "#3C565B",
            },
        },
        cells: {
            style: {
                fontSize: "12px",
                padding: "4px",
                margin: "0px",
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
        },
        pagination: {
            style: {
                fontSize: '12px',
                // backgroundColor: '#3C565B',
                color: 'black',
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);



    const theme = createTheme({
        palette: {
            primary: {
                main: "#3C565B",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ overflowX: 'auto', width: "98.5%" }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <DataTable
                        customStyles={tableCustomStyles}
                        columns={columns}
                        data={filteredData}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        responsive

                        selectableRowHighlight
                        highlightOnHover
                        striped
                        dense
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => onSearch(e.target.value)}
                                style={{
                                    width: '15%',
                                    height: '40px', // Increased height
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                }}
                            />
                        }

                    />

                )}
            </Box>
        </ThemeProvider>
    );
};

export default CustomDataTable;
