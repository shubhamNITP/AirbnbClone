# Airbnb Clone 🏡

A full-stack **Airbnb-inspired web application** where users can explore, create, and review property listings.
Built using **Node.js, Express, MongoDB, and EJS** following an MVC architecture.

---

## 🌐 Live Demo

👉 https://airbnb-srzx.onrender.com

---

## 🚀 Features

* 🏠 Browse property listings
* ➕ Create new listings
* ✏️ Edit and delete listings
* ⭐ Add reviews and ratings
* 🔐 User authentication (Signup / Login)
* 📸 Image uploads using Cloudinary
* 🗺️ Location support
* 💬 Flash messages for actions
* 📱 Responsive UI with Bootstrap
* 🧾 Price toggle with tax calculation

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* EJS
* Bootstrap
* CSS

### Authentication

* Passport.js
* Express-session

### Storage

* Cloudinary (for images)
* MongoDB Atlas (database)

### Deployment

* Render

---

## 📂 Project Structure

```
AirbnbClone
│
├── controllers
├── models
├── routes
├── views
│   ├── layouts
│   ├── includes
│   └── listings
│
├── public
│   ├── css
│   └── js
│
├── utils
├── uploads
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/shubhamNITP/AirbnbClone.git
```

Go into the project directory

```
cd AirbnbClone
```

Install dependencies

```
npm install
```

Create a `.env` file and add:

```
ATLASDB_URL=your_mongodb_connection
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
```

Run the server

```
node app.js
```

or

```
nodemon app.js
```

Server will run at

```
http://localhost:8080
```

---

## 📸 Screenshots

Home Page
Listings Page
Listing Details
Create Listing

<img width="1902" height="1039" alt="image" src="https://github.com/user-attachments/assets/6ee1b7d4-000b-4acf-b3fb-03bcbf1abe14" />


---

## 👨‍💻 Author

**Shubham Chaudhary**
B.Tech CSE — NIT Patna

GitHub:
https://github.com/shubhamNITP

---

## ⭐ If you like this project

Give it a **star on GitHub** ⭐
