const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("../public"));
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/archivos", (req, res) => {
  fs.readdir(__dirname + "/markdown", (err, files) => {
    if (err) {
      console.error(err);
      return res.status(404).json({
        error: "No se encontró la carpeta deseada",
      });
    }

    const markdownFiles = files.filter((file) => path.extname(file) === '.md');
    res.json(markdownFiles);
    console.log(markdownFiles);
  });
});

app.get("/archivos/:name", (req, res) => {


});

app.get("/crear", (req, res) => {
  res.send("Crear");
});

// Route NotFound
app.use((req, res) => {
  res.status(404).send("No se encontró la Página");
});
