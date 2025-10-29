//importo db
const connection = require('../data/db');   

// importo i post
const postsExported = require("../data/postsExported");

function index(req, res) {
  //restituisce la lista dei post in formato json + bonus: filtra per tag se è presente nella query string

  const tagsRichiesto = req.query.tags;
  if (!tagsRichiesto) {
    return res.json(postsExported);
  }
  const postsFiltrati = postsExported.filter((post) =>
    post.tags.includes(tagsRichiesto)
  );

  return res.json(postsFiltrati);
}

function show(req, res) {
  // restituisce un singolo post in formato json + bonus errore 404 se non trovato
  const Id = parseInt(req.params.id);

  const post = postsExported.find((post) => post.id === Id);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Post not found",
      message: "Post non trovato",
    });
  }

  res.json(post);
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
  // elimina un singolo post dalla lista, stampa nel terminale la lista aggiornata e risponde con uno stato 204 e nessun contenuto
  const id = parseInt(req.params.id);

  const post = postsExported.findIndex((post) => post.id === id);

  if (post === -1) {
    res.status(404);
    return res.json({
      status: 404,
      error: "Post not found",
      message: "Post non trovato",
    });
  }

  postsExported.splice(post, 1);
  console.log("Lista aggiornata dei post:", postsExported);

  res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
