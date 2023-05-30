const express = require("express");
const path = require("path");
const fs = require("fs");
const markdownIt = require("markdown-it");

const app = express();
const md = new markdownIt();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Mostrar la lista de archivos markdown que hay en la carpeta
app.get("/archivos", (req, res) => {
  fs.readdir(__dirname + "/markdown", (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "No se encontró la carpeta deseada",
      });
    }

    const markdownFiles = files.filter((file) => path.extname(file) === ".md");
    res.json(markdownFiles);
    console.log(markdownFiles);
  });
});

// Convertir y visualizar un archivo Markdown en HTML
app.get("/archivos/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(__dirname + "/markdown/" + name);

  // Leemos el archivo, si hay un error lo lanzamos, si no, convertimos y mostramos
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    const html = md.render(data);
    res.send(html);
  });
});

// Creamos un archivo markdown y lo guardamos
app.post("/crear", (req, res) => {
  const { titulo, texto } = req.body;

  // Verificamos si la carpeta markdown existe, si no, crearla
  const markdownPath = path.join(__dirname, "markdown");
  if (!fs.existsSync(markdownPath)) {
    fs.mkdirSync(markdownPath);
  }

  const titleFile = `${titulo}.md`;
  const filePath = path.join(markdownPath, titleFile);

  // Verificamos si el archivo ya existe y retornamos un json con true para que el cliente pueda confirmar
  if (fs.existsSync(filePath)) {
    return res.status(200).json({ confirmar: true });
  }

  // Guardamos archivo Markdown, si hay un error lo lanzamos
  fs.writeFile(filePath, texto, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al guardar el archivo" });
    }

    console.log("Archivo Markdown guardado exitosamente");
    res.status(200).json({ message: "Archivo Markdown creado y guardado" });
  });
});

// Reescribimos un archivo markdown
app.put("/crear", (req, res) => {
  const { titulo, texto } = req.body;

  const markdownPath = path.join(__dirname, "markdown");
  const filePath = path.join(markdownPath, `${titulo}.md`);

  // Verificamos si el archivo existe antes de reescribirlo
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "El archivo no existe" });
  }

  // Reescribimos el archivo Markdown
  fs.writeFile(filePath, texto, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al reescribir el archivo" });
    }

    console.log("Archivo Markdown reescrito exitosamente");
    res.status(200).json({ message: "Archivo Markdown reescrito" });
  });
});

// Route NotFound
app.use((req, res) => {
  res.status(404).send("No se encontró la Página");
});
