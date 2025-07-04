# 🏥 NovaCare – A Hospital Management System

NovaCare is a web-based hospital management application designed to streamline the workflow of hospitals by managing patient records, doctor prescriptions, and pharmacy billing in a structured and secure way.

It is built using:

- **Frontend**: React
- **Backend**: Express.js with RESTful APIs
- **Database**: PostgreSQL
- **Database Management**: pgAdmin4 via Docker
- **Authentication & Authorization**: JWT (JSON Web Token)

---
### 📁 Backend Structure

The backend is structured into separate folders for better modularity and maintainability:

- **Models**: Defines the database schemas and data logic.
- **Controllers**: Contains the core business logic and handles requests.
- **Routes**: Maps endpoints to their respective controller functions.

This clean separation of concerns makes the codebase more organized and easier to manage.

---

## 👥 User Roles and Functionalities

NovaCare supports **three types of users**: **Front Desk Staff**, **Doctors**, and **Pharmacists**, each having their own dashboard and specific access.

### 1️⃣ Front Desk Staff

Once signed in, the front desk staff is presented with two main tabs on the dashboard:

#### 🗂️ New Form
- Used to register a new patient visit.
- Each visit creates a **unique `formId`**.
- New patients are given a **new `patientId`** by clicking the "New" button.
- For follow-up patients, the staff uses the **existing `patientId`**.
- A **search bar** allows staff to search by **patient name or phone number**.

#### 📋 Patient History
- Displays the list of all previously recorded patient visits.
- Allows quick review of past records.

#### 👨‍⚕️ Doctor and Department Selection
- The form includes a dropdown to select a **specialist department**.
- Once a department is chosen, another dropdown shows available **doctors** from that department.
- Selecting a doctor automatically fetches their **doctor ID**.

> 🔒 **Note**: The doctor’s prescription section and the medicine table are **not visible** to the front desk staff. These are only available to doctors and pharmacists.

---

### 2️⃣ Doctor

While signing in, doctors are required to select their **specialist department** (e.g., ENT, Ophthalmologist). They are then taken to a dashboard with two tabs:

#### 📅 Today’s List
- Displays a list of **patients registered today**, filtered by the doctor’s **selected department**.
- Doctors can:
  - View patient details.
  - Add prescriptions and medicine recommendations.
  - Save updates to the same patient form.

#### 📚 Patient History
- Allows doctors to view all past patient records, **regardless of department**.
- Doctors can also **delete patient records**:
  - When a record is deleted, the `deleted_date` field is set in the database.
  - The record disappears from the application view but remains in the database for historical tracking.

---

### 3️⃣ Pharmacist

The pharmacist has access to the same two tabs:

#### 📅 Today’s List
- Shows **all patients registered today**, without department filtering.
- Pharmacists can:
  - Review the patient form and prescriptions added by the doctor.
  - Add **medicine cost, quantity**, and **calculate total cost**.
  - Save the completed form.

#### 📚 Patient History
- Allows viewing of all past patient records.
- Pharmacists can also **delete a patient record**, which sets the `deleted_date` in the database. Like the doctor, deleted records are removed from the list but remain in the database.

---

## 🔍 Global Features (Navigation Bar)

At the top of the application, the **navbar** includes:

### 🔎 Search Bar
- Available in the “Today’s List” and “Patient History” tabs.
- Allows searching for patient records using **name or phone number**.

### 👤 User Icon Dropdown
- Includes a **Users** option.
- Displays a list of all users with their **roles and department details**.
- Allows admins to:
  - Edit user information (name, phone number, role, department).
  - Save updates. The **email of the person who made the changes** is recorded for tracking.
  - Delete users. When deleted, the `deleted_date` is set, so they are hidden from the app but remain in the database.

> 🔎 **Note**: All deleted records (patients or users) are filtered using `WHERE deleted_date IS NULL` in the backend queries. This means deleted data is **not shown in the UI**, but still exists in the database for reference or recovery if needed.

---
## 🚀 How to Run This Project

Follow the steps below to run NovaCare on your local machine:

### 🔧 Prerequisites
- Node.js
- Docker & Docker Compose
- Git

### 📥 Clone the Repository
```bash
git clone https://github.com/saleenabajracharya/novacare.git
cd novacare
```

### 🐳 Start Database (PostgreSQL & pgAdmin)
Ensure Docker is running, then:
```bash
docker start pgadmin4
docker start my-postgres
```

### ⚙️ Backend Setup
```bash
cd server
node server.js
```
Make sure you have a `.env` file in the backend with the required environment variables such as:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

### 💻 Frontend Setup
```bash
cd ../client
npm run dev
```
Ensure the frontend is configured to call the correct backend API (adjust `proxy` in `package.json` or use environment variables).

### 🔗 Access the Application
- Frontend: `http://localhost:5173`
- pgAdmin: `http://localhost:5050` (if configured in Docker)

## ✅ Conclusion: What NovaCare Does

NovaCare is a secure, role-based hospital management system that simplifies the daily operations of a hospital by:

- Managing **patient registrations** and **visit records**.
- Supporting **doctor diagnosis** and **prescription entry**.
- Handling **pharmacy billing** and **medicine tracking**.
- Providing **role-based access** and functionality (front desk, doctor, pharmacist).
- Ensuring **data security** and **accountability** through authentication, audit tracking, and soft deletes (via `deleted_date`).
- Offering a **user-friendly dashboard** for each role with real-time data updates and patient history tracking.

By digitizing these essential workflows, NovaCare helps **reduce manual errors**, **improve communication between departments**, and provide **better patient care** through organized, centralized records.
