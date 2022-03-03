import React from "react";

/**
 * a Row representing a row from the tables data table
 */
export default function TableRow({ table, loadDashboard }) {
    if (!table) return null;

    return (
        <tr>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.status}</td>
            <td>{table.reservation_id ? table.reservation_id : "--"}</td>
        </tr>
    );
}