// Obtener el botón y el modal
var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");

// Obtener el elemento de cierre del modal
var closeBtn = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar el modal cuando se hace clic en el elemento de cierre
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera del contenido del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
