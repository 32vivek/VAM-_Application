import React from "react";
import DataTable from "react-data-table-component";

const ReactDataTable = ({ title, columns, data }) => {
    return (
        <div>

            <DataTable
                title={title}
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default ReactDataTable;
