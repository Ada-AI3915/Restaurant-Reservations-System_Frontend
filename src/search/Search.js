import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationRow from "../dashboard/ReservationRow";

export default function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  function handleInputChange({ target }) {
    setMobileNumber(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const abortController = new AbortController();

    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  const searchResultsJSX = () => {
    return reservations.length > 0 ? (
      reservations.map((reservation) => (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <tr>
        <td>No reservations found</td>
      </tr>
    );
  };

  return (
    <>
      <form>
        <ErrorAlert error={error} />

        <label className="form-label" htmlFor="mobile_number">
          Enter a customer's mobile number
        </label>
        <div className="input-group">
          <input
            className="form-control-sm rounded m-1"
            name="mobile_number"
            id="mobile_number"
            placeholder="Mobile Number"
            type="search"
            onChange={handleInputChange}
            value={mobileNumber}
            aria-label="Search"
            aria-describedby="search-addon"
            required
          />

          <button
            className="btn btn-outline-primary m-1"
            type="submit"
            onClick={handleSubmit}
          >
            Find
          </button>
        </div>
      </form>

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
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>

        <tbody>{searchResultsJSX()}</tbody>
      </table>
    </>
  );
}
