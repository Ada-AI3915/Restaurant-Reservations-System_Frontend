# Capstone: Restaurant Reservation System Frontend

- code for the frontend of the final capstone project in the Thinkful curriculum.

## Restaurant Reservations-System-Front-End - created with React 
### --> A full restaurant reservation system for restaurant operators to use to keep track of reservations and tables at the restaurant given restaurant schedule as parameters.


**/dashboard And /dashboard?date=YYYY-MM-DD**

The dashboard page displays reservations for a specfiic date defaulted to today's date with the ability to move forwards and backwards day by day. The page only displays reservations if they are not "finished".

**/search**

The search page allows the user to search for a reservation by mobile phone number that will find partial matches and display past matches.

**/reservations/new**

This page displays a form to create a new reservation. Upon creation submit returns the user to the dashboard for the given date of the newly created reservation along with all other reservations for that date.

**/reservations/:reservation_id/edit**

The edit page displays a form and is routed to by clicking the 'edit' button on a "booked" reservations row(only reservations with a status of 'booked' can be edited). Form auto-fills data for reservation on edit for convenience.

**/reservations/reservation_id/seat**

The seat page displays a form for assiging a reservation to a table at the restaurant. This page is routed to by clicking the seat button on a 'booked' reservation. On click of the seat button the reservation's status is updated to 'seated'. The given table will then show 'occupied' and a finish button will appear on the table row. When the restaurant user is ready to finish a table clicking the finish button will update a table's status to 'free' and the attached reservation's status to 'finished' and remove that given reservation from the dashboard's view.

/tables/new

This page disiplays a form to create a new table for the restaurant. Upon creation submit returns the user to the dashboard.





