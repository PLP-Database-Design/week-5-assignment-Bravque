
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// Middleware to parse JSON bodies (if needed)
app.use(express.json())

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Test the database connection
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err)
  } else {
    console.log('Connected to the MySQL database')
  }
})



// Question 1 goes here
// GET all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err)
        res.status(500).send('Server error')
      } else {
        res.status(200).json(results)
      }
    })
  })
  

// Question 2 goes here
// GET all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers'
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err)
        res.status(500).send('Server error')
      } else {
        res.status(200).json(results)
      }
    })
  })
  

// Question 3 goes here
// GET patients by first name
app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?'
    
    db.query(query, [first_name], (err, results) => {
      if (err) {
        console.error('Error filtering patients:', err)
        res.status(500).send('Server error')
      } else {
        res.status(200).json(results)
      }
    })
  })
  

// Question 4 goes here
// GET providers by specialty
app.get('/providers/filter', (req, res) => {
    const { specialty } = req.query
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?'
  
    db.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error filtering providers:', err)
        res.status(500).send('Server error')
      } else {
        res.status(200).json(results)
      }
    })
  })
  


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})