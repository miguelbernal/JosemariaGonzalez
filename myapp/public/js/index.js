const usuario = document.getElementById('usuario')
const clave = document.getElementById('clave')

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

  // Objeto de javascript
  const data = {
    usuario: usuario.value,
    clave: clave.value
  }
  // json
  /*
  {
   "usuario": "admin",
   "clave": "1" 
  }
  */


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
    //localStorage.setItem('token', json.token)
    localStorage.setItem('id_usuario', json.datos.id)
    localStorage.setItem('nombre_usuario', json.datos.nombre)
    localStorage.setItem('usuario_usuario', json.datos.usuario)
  } else {
    mensaje('Credencial incorrecta.', 'focus("#usuario")')
  }
}