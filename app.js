// importo express
const express = require("express");
// creiamo un instanza di express
const app = express();
// definiamo una porta
const port = 3000;

// importo modulo router posts e middleware
const postsRouter = require("./routers/posts");
const NotFound = require("./middlewares/error404");
const ServerError = require("./middlewares/error500");

//usiamo il middleware static per rendere disponibile i file statici
app.use(express.static("public"));
//lettura json nel body parser
app.use(express.json());
// routers
app.use("/posts", postsRouter);

// definiamo rotta per index
app.get("/", (req, res) => {
  // codice funzione
  res.send("<h1>Server del mio blog</h1>");
});

// richiamo error 500  e 404
app.use(NotFound);
app.use(ServerError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
