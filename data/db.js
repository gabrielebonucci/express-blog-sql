// Importo mysql2
const mysql = require('mysql2');

// connessione
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '2301',     
  database: 'blog',
  autocommit: true
});

// Provo a connettermi
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!)');
});

// Esporto la connessione per usarla nei controller
module.exports = connection;