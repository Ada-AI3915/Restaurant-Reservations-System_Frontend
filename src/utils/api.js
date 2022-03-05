/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}


/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}


/** creates a reservation -> "POST"
 * 
 * @param {*} reservation 
 * @param {*} signal 
 * @returns a newly created reservation
 */
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations/new`;

  const body = JSON.stringify({ data: reservation });

  return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}


/** edits an existing reservation  -> "PUT"
 * 
 * @param {*} reservation_id 
 * @param {*} reservation 
 * @param {*} signal 
 * @returns 
 */
export async function editReservation(reservation_id, reservation, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;

  const body = JSON.stringify({ data: reservation });

  return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}


/** update a specified reservations status
 * 
 * @param {*} reservation_id 
 * @param {*} status 
 * @param {*} signal 
 * @returns 
 */
export async function updateReservationStatus(reservation_id, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;

  const body = JSON.stringify({ data: { status: status }});

  return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}


/** Lists all tables for the restaurant from the tables table
 * 
 * @param {*} signal 
 * @returns 
 */
export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`

  return await fetchJson(url, { headers, signal, method: "GET" }, []);
}

/** creates a new table for the restaurant
 * 
 * @param {*} table 
 * @param {*} signal 
 * @returns 
 */
export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables/new`

  const body = JSON.stringify({ data: table });

  return await fetchJson(url, { headers, signal, method: "POST", body }, []);
}

/** seats a given reservaton at a given table
 * 
 * @param {*} reservation_id 
 * @param {*} table_id 
 * @param {*} signal 
 * @returns 
 */
export async function seatTable(reservation_id, table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`

  const body = JSON.stringify({ data: {reservation_id: reservation_id } });

  return await fetchJson(url, { headers, signal, method: "PUT", body }, []);
}

/** set a table to status = "finished"
 * 
 * @param {*} table_id 
 * @param {*} signal 
 * @returns 
 */
export async function finishTable(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;

  return await fetchJson(url, { headers, signal, method: "DELETE" }, []);
}

