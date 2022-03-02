import React from "react";
import { useHistory } from "react-router";
import { previous, next, today } from "../utils/date-time";
import ReservationRow from "./ReservationRow";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, reservationsError, loadDashboard }) {
  const history = useHistory();

  const reservationsJSX = () => {
    return reservations.map((reservation) =>
      <ReservationRow key={reservation.reservation_id} reservation={reservation} loadDashboard={loadDashboard}/>
    );
  }

  function handleDateNav({ target }) {
    let newDate;
    let useDate;

    if (!date) {
      useDate = today();
    }
    else {
      useDate = date;
    }

    if (target.name ==="previous") {
      newDate = previous(useDate);
    }
    else if (target.name === "next") {
      newDate = next(useDate);
    }
    else {
      newDate = today();
    }
    
    history.push(`/dashboard?date=${newDate}`);
  }
  return (
    <main>
      <h1>Dashboard</h1>

      <h4 className="mb-0">Reservations for {date}</h4>

      <button
        className="btn btn-secondary m-1"
        type="button"
        name="previous"
        onClick={handleDateNav}
      >
        Previous
      </button>
      <button
        className="btn btn-primary m-1"
        type="button"
        name="today"
        onClick={handleDateNav}
      >
        Today
      </button>
      <button
        className="btn btn-secondary m1"
        type="button"
        name="next"
        onClick={handleDateNav}
      >
        Next
      </button>

      <ErrorAlert error={reservationsError} />

      <table className="table table-hover m-1">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>

        <tbody>
          {reservationsJSX()}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
