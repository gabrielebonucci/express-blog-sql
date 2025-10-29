//importo db
const connection = require('../data/db');   

// Index
function index(req, res) {
  // prepariamo la query 
  const sql = 'SELECT * FROM posts';

  // eseguiamo la query
  connection.query(sql, (err, results) => {
    
    // gestione l'errore 
    if (err) return res.status(500).json({ error: 'Database query failed' });
    
    // risultati in JSON
    res.json(results);
  });
}

function show(req, res) {
  // recuperiamo l'id dall'URL
  const id = req.params.id;
  
  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
     if(err) return res.status(500).json({ error: 'Database query failed' });
     if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
     res.json(results[0]);
    });
}

function store(req, res) {
  // estraggo dati dal body
  const { titolo, contenuto, immagine, tags } = req.body;

  //crea un nuovo ID
  const newId = postsExported[postsExported.length - 1].id + 1;

  /*Stampa nel terminale i dati in arrivo
  console.log("Dati ricevuti nel body:", req.body);
  res.send("Dati ricevuti, controlla il terminale!");
  */

  // oggetto del nuovo post
  const newPost = {
    id: newId,
    titolo,
    contenuto,
    immagine,
    tags,
  };

  postsExported.push(newPost);

  res
    .status(201)
    .json({ result: true, message: "inserimento nuovo post", newPost });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const postToUpdate = postsExported.find((item) => item.id === id);

  if (!postToUpdate) {
    res.status(404);
    return res.json({ error: "Not Found", message: "Post non trovato" });
  }

  postToUpdate.title = req.body.title || postToUpdate.title;
  postToUpdate.content = req.body.content || postToUpdate.content;
  postToUpdate.image = req.body.image || postToUpdate.image;
  postToUpdate.tags = req.body.tags || postToUpdate.tags;

  res.json(postToUpdate);
  console.log("aggiornatp:", postToUpdate);
}

function modify(req, res) {
  res.send("Modifica parziale del post " + req.params.id);
}

function destroy(req, res) {
  
  // recuperiamo l'id dall' URL
  const { id } = req.params; 

  // eliminiamo il post
  connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete post' });
    console.log("--- QUERY DELETE ESEGUITA SENZA ERRORI ---");
    res.sendStatus(204)
  });
}

module.exports = { index, show, store, update, modify, destroy };
