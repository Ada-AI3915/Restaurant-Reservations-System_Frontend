import React from "react";
// import { Link } from "react-router-dom";

/**
 * a Row representing a row from the reservations data table
 */

export default function ReservationRow({ reservation, loadDashboard }) {
    if (!reservation || reservation.status === "finished") return null;

    // function handleCancel() {
    //     if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            
    //     }
    // }

    return (
        <tr>
            <th scope="row">{reservation.reservation_id}</th>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date.substr(0, 10)}</td>
            <td>{reservation.reservation_time.substr(0, 5)}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>

            {reservation.status === "booked" && 
                <>
                    <td>
                        <button
                            className="btn btn-danger"
                            type="button"
                            // onClick={handleCancel}
                            data-reservation-id-cancel={reservation.reservation_id}
                        >
                            Cancel
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}