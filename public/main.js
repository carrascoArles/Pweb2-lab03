document.getElementById("show-files").addEventListener("click", function () {
  document.getElementById("Markdown-form").style.display = "none"

  const xhr = new XMLHttpRequest() // Peticion AJAX
  xhr.open("GET", "/archivos", true)

  xhr.onreadystatechange = (err) => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const boxContainer = document.getElementById("box-container");

      boxContainer.innerHTML = "";

      for (var i = 0; i < response.length; i++) {
        const fileName = response[i];
        const link = document.createElement("a")

        link.href = "/markdown/" + fileName; // Ruta a los archivos markdown
        link.textContent = fileName

        boxContainer.appendChild(link)
        boxContainer.appendChild(document.createElement("br"))
      }
    } else {
      console.error(err)
    }
  }

  xhr.send()
})

document.getElementById("crate-new").addEventListener("click", function () {
  document.getElementById("Markdown-form").style.display = "block"
  document.getElementById("box-container").innerHTML=""
});

document
  .getElementById("Markdown-form")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/archivos", true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        console.log("Archivo creado y guardado exitosamente")
        // Realizar cualquier acción adicional después de guardar el archivo
      } else {
        console.error("Error al crear y guardar el archivo:", xhr.status)
      }
    };

    var data = {
      titulo: titulo,
      texto: texto,
    };

    xhr.send(JSON.stringify(data))
  });
