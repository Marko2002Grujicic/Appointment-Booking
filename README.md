# Table of Contents

1. **Project Overview**
2. **Dependencies**
3. **Folder Structure**
4. **Key Components**
5. **How to run**
6. **Future enhancements**

# Appointment Booking

This project is an appointment booking system that allows users to set their availability for different days of the week. The system allows dynamic input for time slots on each weekday, validates the input, and ensures it can be easily updated. Based on the user availability and availability of the guests added in a meeting, creator of the meeting can select that that fits all users.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Formik**: For handling form state and validation.
- **Yup**: For validation schema with Formik.
- **MUI** (Material-UI): For styling the components.
- **FontAwesome**: For icons (used for adding/removing time slots).
- **axios**: For making HTTP requests and interacting with APIs.
- **i18next**: For internationalization and handling translations in the application.
- **react-pro-sidebar**: For creating responsive sidebars with customizable layouts in React applications.
- **react-query**: For fetching, caching, synchronizing, and managing server state in React applications.
- **react-router-dom**: For handling routing and navigation between different components/pages in a React application.

## Folder Structure

─ /components - components that are being styled and used inside pages.

─ /pages - directory where pages are located

─ /helpers - directory where constants, adapters and other helpers are

─ /context - directory where context is located

─ /assets - asset directory consisting of pngs for form fields

## Key Components

- **Availability.jsx** - Initializes the form with the availability object for each day. It manages the overall state and schema validation for the availability. Sets up the validation schema for each time slot using Yup. On form submission, updates the availability data.

- **CalendarComponent.jsx** - This component initializes the calendar using FullCalendar. It is rendering the calendar in UI based on events provided.

- **AppointmentForm.jsx** - This component initializes the form with the appointment object. It manages the overall state and schema validation for the appointment. Sets up the validation schema for each form field using Yup. On form submission, creates or updates the appointment data.

## How to Run

In terminal use following commands:

1. Clone Repository:
   `git clone https://github.com/Marko2002Grujicic/Appointment-Booking`

2. Clone Backend repository in a new folder
   `git clone https://github.com/Marko2002Grujicic/Appointment-Booking-Backend`

3. Install Dependecies in both projects:
   `npm install`

4. Start database using XAAMP.
   `Run Apache and MySQL`

5. Run the development servers:
   Frontend - `npm start`

Backend - `nodemon server.js`

6. Open the app in your browser:

`http://localhost:3000/`

## Future Enhancements

- add Typescript to the project

- add User Config in settings page where the user can change name, email, password etc

- clean up code

- personalize each profile using welcoming messages, names or profile pictures

- add notifications panel where the user can see latest notifications and changes

- disable editing for meeting guests
