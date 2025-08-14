
# Product Management App

A modern and professional **Product Management Web Application** built with **React** for the frontend, **Node.js + Express** for the backend, and **MySQL** as the database. This app allows users to **add, edit, delete, and search products** efficiently, with a polished UI featuring gradient buttons, hover effects, and responsive design.

---

## Features

* **CRUD Operations**:

  * Add new products with name, description, and image URL
  * Edit existing products
  * Delete products
  * View product list in a responsive grid
* **Search & Filter**: Dynamic search bar to filter products by name or description
* **Responsive Design**: Mobile-first UI with professional styling
* **Hover Effects & Transitions**: Smooth animations and gradients for buttons and cards
* **Image Preview**: Preview product images before submission
* **Fallback Mock Data**: Displays mock products if API is unavailable
* **Professional Product List**: Curated products for workspace and professional use

---

## Tech Stack

* **Frontend**: React, JSX, Lucide-react icons, CSS
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **Other Libraries**:

  * `cors` for cross-origin requests
  * `body-parser` for JSON parsing
  * `dotenv` for environment variables

---

## Project Structure

product-management-app/
│
├─ backend/
│   ├─ server.js           # Express server with CRUD APIs
│   ├─ db.js               # MySQL connection setup
│
├─ frontend/
│   ├─ src/
│   │   ├─ components/
│   │   │   ├─ ProductCard.jsx
│   │   │   ├─ ProductModal.jsx
│   │   │   ├─ SearchBar.jsx
│   │   │   └─ LoadingSpinner.jsx
│   │   ├─ App.jsx
│   │   └─ index.js
│   ├─ public/
│   └─ package.json
│
└─ README.md

---

## Database Setup

1. **Create Database**:

```sql
CREATE DATABASE IF NOT EXISTS productdb;
USE productdb;
```

2.**Create Table**:

```sql
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    image VARCHAR(255)
);
```

1. **Insert Sample Products**:

```sql
INSERT INTO products (name, description, image) VALUES
('Executive Wireless Headphones', 'Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and high-fidelity sound.', 'https://th.bing.com/th/id/OIP.n3Jnwh_G6Zknnm_yHQyRHAHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),
('Smart Productivity Watch', 'Sleek smartwatch with advanced health monitoring, calendar integration, and real-time notifications.', 'https://tse4.mm.bing.net/th/id/OIP.NQb9TlLQTIPug_wfQsV3qwHaHa?w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Ergonomic Laptop Stand', 'Adjustable aluminum laptop stand for optimal posture and desk ergonomics.', 'https://tse2.mm.bing.net/th/id/OIP.zflIPKS5UOk2k5G6PHls_AHaIV?rs=1&pid=ImgDetMain&o=7&rm=3');
```

> You can add more products using similar `INSERT` queries.

---

## Backend Setup

1. Navigate to the `backend` folder:

```bash
cd backend
```

2.Install dependencies:

```bash
npm install express cors body-parser dotenv mysql
```

1. Create `.env` file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=productdb

4.Run the server:

```bash
node server.js
```

* API endpoints:

  * `GET /products` – fetch all products
  * `POST /products` – create new product
  * `PUT /products/:id` – update product
  * `DELETE /products/:id` – delete product
  * `GET /products/:id` – get single product

---

## Frontend Setup

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2.Install dependencies:

```bash
npm install react react-dom lucide-react
```

1. Start the development server:

```bash
npm start
```

* Open `http://localhost:3000` to view the app
* The app fetches products from the backend at `http://localhost:5000`

---

## Styling & UI

* Gradient buttons:

  * Primary: pink shades (`#A53860 → #EF88AD`)
  * Success: coral shades (`#FF6B6B → #FF878D`)
* Hover and focus effects for interactive elements
* Glassmorphic cards for product display
* Responsive grid layout for product listing
* Professional search bar with icon and shadow effects

## Screenshot

![App Screenshot](screenshot.jpeg)

## Future Improvements

* Add **user authentication** and **role-based access**
* Implement **image upload** instead of URL only
* Pagination and sorting for product listing
* Dark mode toggle
* Backend validation using **Joi** or similar library

---

## License

MIT License – free to use and modify.

---
