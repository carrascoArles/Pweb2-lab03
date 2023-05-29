document.getElementById("show-files").addEventListener("click", function () {
  const xhr = new XMLHttpRequest(); // Peticion AJAX
  xhr.open("GET", "/archivos", true);

  xhr.onreadystatechange = (err) => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const boxContainer = document.getElementById("box-container");

      boxContainer.innerHTML = "";

      for (var i = 0; i < response.length; i++) {
        const fileName = response[i];
        const link = document.createElement("a");

        link.href = "/markdown/" + fileName; // Ruta a los archivos markdown
        link.textContent = fileName;

        boxContainer.appendChild(link);
        boxContainer.appendChild(document.createElement("br"));
      }
    } else {
      console.error(err);
    }
  };

  xhr.send();
});



