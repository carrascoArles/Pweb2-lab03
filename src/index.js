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

// Visualizar archivo Markdown en HTML
app.get("/markdown/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(__dirname + "/markdown/", name);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    const html = md.render(data);
    res.send(html);
  });
});

app.post("/crear", (req, res) => {
  const { titulo, texto } = req.body;

  // Verificar si la carpeta markdown existe, si no, crearla
  const directorioMarkdown = path.join(__dirname, "markdown");
  if (!fs.existsSync(directorioMarkdown)) {
    fs.mkdirSync(directorioMarkdown);
  }

  const nombreArchivo = `${titulo}.md`;
  const rutaArchivo = path.join(directorioMarkdown, nombreArchivo);

  // Verificar si el archivo ya existe
  if (fs.existsSync(rutaArchivo)) {
    return res.status(200).json({ confirmar: true });
  }

  // Guardar el contenido del archivo Markdown
  fs.writeFile(rutaArchivo, texto, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al guardar el archivo" });
    }

    console.log("Archivo Markdown guardado exitosamente");
    res.status(200).json({ message: "Archivo Markdown creado y guardado" });
  });
});

// Route NotFound
app.use((req, res) => {
  res.status(404).send("No se encontró la Página");
});
