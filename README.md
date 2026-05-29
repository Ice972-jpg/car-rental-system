# Car Rental Management System

## Project Overview

This is a full stack web application for managing rental cars.

The application allows users to:

- Add new cars
- Edit existing cars
- Delete cars
- Search cars
- Sort cars by price
- Filter available and unavailable cars
- View statistics about stored cars

The application uses a Node.js and Express backend with JSON file storage.

---

## System Requirements

- Node.js
- npm
- Google Chrome / Edge / Firefox

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Ice972-jpg/car-rental-system.git
```

Navigate to the project folder:

```bash
cd car-rental-system
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the server:

```bash
node server.js
```

Open your browser:

```text
http://localhost:3000
```

---

## Features

- Create cars
- Read cars
- Update cars
- Delete cars
- Search by brand or model
- Sort by price
- Availability filter
- Statistics dashboard
- Success notifications
- Input validation

---

## Data Storage

All car data is stored in:

```text
data/cars.json
```

---

## API Endpoints

### GET /cars

Returns all cars.

### POST /cars

Creates a new car.

### PUT /cars/:id

Updates an existing car.

### DELETE /cars/:id

Deletes a car.

---

## Troubleshooting

If the application does not start:

1. Make sure Node.js is installed.
2. Run:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

---

## Author
