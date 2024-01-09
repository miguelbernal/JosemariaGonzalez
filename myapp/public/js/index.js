const usuario = document.getElementById('usuario')
const clave = document.getElementById('clave')

inicializar_formulario()

function inicializar_formulario(){
  focus('#usuario')
}

function validar_formulario(){
  if(usuario.value.trim() === ''){
    mensaje('Usuario Vacio','focus("#usuario")')
  } else if(clave.value.trim() === ''){
    mensaje('Contraseña vacia','focus("#clave")')
  } else {
    login()
  }
}

async function login() {
  const url = 'api/v1/usuarios/login'

  const data = {
    usuario: usuario.value,
    clave: clave.value
  }

  const parametros = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  }

  const datos = await fetch(url, parametros)
  const json = await datos.json()
  console.log(json)
  if (json.status === 200) {
    location.href = 'menu'
    localStorage.setItem('id_usuario', json.datos.id)
    localStorage.setItem('nombre_usuario', json.datos.nombre)
    localStorage.setItem('usuario_usuario', json.datos.usuario)
  } else {
    mensaje('Credencial incorrecta.', 'focus("#usuario")')
  }
}