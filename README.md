# Crop Monitoring and Advisory System (CropAdvisory)

A full-stack web application designed to help Filipino farmers monitor their crops and receive rule-based agricultural advisories based on simulated weather data.

## Tech Stack
- **Backend:** NestJS, TypeORM, MySQL (XAMPP)
- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Authentication:** JWT (JSON Web Tokens), Bcrypt

## Features
- **Role-Based Access Control:** Separate dashboards for Farmers and Admins.
- **Crop Management:** Farmers can add and monitor their crops.
- **Rule-Based Advisory Engine:** Generates advisories (Flood Risk, Irrigation Reminder) based on crop age and weather data.
- **Admin Panel:** Admins can view and manage all registered users.

## How to Run Locally

### Prerequisites
- Node.js installed
- XAMPP (MySQL running)

### 1. Setup Database
1. Open phpMyAdmin.
2. Create a new database named `crop_advisory_db`.

### 2. Run the Backend
```bash
# From the root directory
npm install
npm run start:dev
```

### 3. Run the Frontend
```bash
# Open a new terminal
cd crop-advisory-frontend
npm install
npm run dev
```
