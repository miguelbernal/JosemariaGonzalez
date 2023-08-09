function mostrar_nombre_formulario(formulario){
    document.getElementById('navbar_nombre_formulario').innerHTML = formulario
}

function focus(campo){
  const elemento = document.querySelector(campo)
  if (elemento.getAttribute('type') === 'button') {
      elemento.focus()
  } else {
      elemento.select()
  }
}

function siguiente_campo(actual, siguiente, preventDefault){
    document.querySelector(actual).addEventListener('keydown', (event) => {
        const siguienteCampo = document.querySelector(siguiente)
        if (event.which === 13) {
            if (preventDefault) {
                event.preventDefault()
            }
            if (siguienteCampo.getAttribute('type') === 'button' || siguienteCampo.getAttribute('type') === 'select') {
                siguienteCampo.focus()
            } else {
                siguienteCampo.select()
            }
        }
    })
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

async function cargar_formulario(div, url, funcion) {
    const response = await fetch(url);
    const div_link = "#" + div + " link";
    const div_script = "#" + div + " script";
    if (response.status === 200) {
        const cuerpo = await response.text();
        document.getElementById(div).innerHTML = cuerpo;
        document.querySelectorAll(div_link).forEach(link => {
            document.getElementById(div).removeChild(link);
            var linkElement = document.createElement("link");
            for (attribute of link.attributes) {
                linkElement.setAttribute(attribute.name, attribute.value);
            }
            linkElement.text = link.innerHTML;
            document.getElementById(div).append(linkElement);
        });
        document.querySelectorAll(div_script).forEach(script => {
            document.getElementById(div).removeChild(script);
            var scriptElement = document.createElement("script");
            for (attribute of script.attributes) {
                scriptElement.setAttribute(attribute.name, attribute.value);
            }
            document.getElementById(div).append(scriptElement);
            eval(script.innerText);
        });
        eval(funcion);
    }
}

function ocultar_formulario() {
    document.getElementById('panel-formulario').style.display = 'none'
    document.getElementById('panel-busqueda').style.display = 'block'
    focus('#texto_buscar');
}

function ocultar_busqueda() {
    document.getElementById('panel-busqueda').style.display = 'none'
    document.getElementById('panel-formulario').style.display = 'block'
}