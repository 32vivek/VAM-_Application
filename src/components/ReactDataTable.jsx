import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Box, IconButton, CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { FileCopy, GetApp, Description } from '@mui/icons-material'; // Import icons for copy, download as XLSX, download as CSV


const CustomDataTable = ({ columns, data, onSearch, copyEnabled, onCopy, downloadEnabled, onDownloadXLSX }) => {
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
                padding: "2px",
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

    const handleCopy = () => {
        if (onCopy) {
            onCopy();
        }
    };

    const handleDownloadXLSX = () => {
        if (onDownloadXLSX) {
            onDownloadXLSX();
        }
    };

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
                        data={data}
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
                            <Box display="flex" alignItems="center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={(e) => onSearch(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        padding: '10px',
                                        fontSize: '14px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        marginLeft: '10px',
                                    }}
                                />
                                {copyEnabled && (
                                    <IconButton onClick={handleCopy}>
                                        <FileCopy />
                                    </IconButton>
                                )}
                                {downloadEnabled && (
                                    <IconButton onClick={handleDownloadXLSX}>
                                        <GetApp />
                                    </IconButton>
                                )}
                            </Box>
                        }
                    />
                )}
            </Box>
        </ThemeProvider>
    );
};

export default CustomDataTable;
