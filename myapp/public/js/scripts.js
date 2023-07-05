function focus(campo){
  const elemento = document.querySelector(campo)
  if (elemento.getAttribute('type') === 'button') {
      elemento.focus()
  } else {
      elemento.select()
  }
}

function mensaje(texto, funcion){
  const modal = `
  <div class="modal" id="myModal" tabindex="-1">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Mensaje del sistema</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <p>${texto}</p>
          </div>
          <div class="modal-footer">
              <button id="mensaje-aceptar" type="button" class="btn btn-danger" data-bs-dismiss="modal">Aceptar</button>
          </div>
          </div>
      </div>
  </div>`
  document.getElementById('mensaje').innerHTML = modal
  const options = {}
  const myModal = new bootstrap.Modal(document.getElementById("myModal"), options)
  myModal.show()
  const mensaje_aceptar = document.querySelector('#mensaje-aceptar')
  mensaje_aceptar.focus()
  mensaje_aceptar.addEventListener('click',function(){
      eval(funcion)
      document.querySelector('#mensaje').innerHTML = ''
  })
}