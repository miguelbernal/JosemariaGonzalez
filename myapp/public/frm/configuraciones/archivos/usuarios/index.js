mostrar_nombre_formulario("Usuarios");

// MANEJO DEL FORMULARIO
var fid_usuario = document.getElementById('id_usuario')
var fnombre = document.getElementById('nombre')
var fusuario = document.getElementById('usuario')
var fclave = document.getElementById('clave')
var fid_rol = document.getElementById('id_rol')
var boton_guardar = document.getElementById('boton-guardar')
var pag = 1
var id_usuario_eliminar = 0

inicializar_formulario()

function inicializar_formulario(){
    focus('#buscar')
    siguiente_campo('#nombre','#usuario',true)
    siguiente_campo('#usuario','#clave',true)
    siguiente_campo('#clave','#id_rol',true)
    siguiente_campo('#id_rol','#boton-guardar',true)
    siguiente_campo('#buscar','#boton-buscar',false)
    buscar_usuarios()
}

function agregar_linea(){
    desproteger_campos()
    boton_guardar.innerHTML = '<i class="fas fa-plus"></i> Agregar';
    document.getElementById('panel-formulario-datos').style.display = 'block'
    document.getElementById('panel-tabla-datos').style.display = 'none'
    limpiar_campos()
    focus('#nombre')
}

function guardar_linea(){
    if(validar_formulario()){
        if(fid_usuario.value == 0){
            guardar_agregar()
        } else {
            guardar_modificar()
        }
        
    }
}

function validar_formulario(){
    let ok = true
    if(fnombre.value.trim() === ''){
        mensaje('Nombre vacio.','focus("#nombre")')
        ok = false
    } else if(fusuario.value.trim() === ''){
        mensaje('Usuario vacio.','focus("#usuario")')
        ok = false
    } else if(fclave.value.trim() === ''){
        mensaje('Clave vacia.','focus("#clave")')
        ok = false
    } else if(fid_rol.value.trim() === ''){
        mensaje('Rol no existe.','focus("#id_rol")')
        ok = false
    }
    return ok
}

function limpiar_campos(){
    fid_usuario.value = 0
    fnombre.value = ""
    fusuario.value = ""
    fclave.value = ""
    fid_rol.value = ""
}

function consultar_linea(xthis){
    proteger_campos()
    boton_guardar.innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar';
    document.getElementById('panel-formulario-datos').style.display = 'block'
    document.getElementById('panel-tabla-datos').style.display = 'none'
    const tds = xthis.parentElement.parentElement.children
    const tid_usuario = tds[0].innerText
    const tnombre = tds[1].innerText
    const tusuario = tds[2].innerText
    const tclave = tds[3].innerText
    const tid_rol = tds[4].innerText
    fid_usuario.value = tid_usuario
    fnombre.value = tnombre
    fusuario.value = tusuario
    fclave.value = tclave
    fid_rol.value = tid_rol
    focus('#nombre')
}

function editar_linea(xthis){
    desproteger_campos()
    boton_guardar.innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar';
    document.getElementById('panel-formulario-datos').style.display = 'block'
    document.getElementById('panel-tabla-datos').style.display = 'none'
    const tds = xthis.parentElement.parentElement.children
    const tid_usuario = tds[0].innerText
    const tnombre = tds[1].innerText
    const tusuario = tds[2].innerText
    const tclave = tds[3].innerText
    const tid_rol = tds[4].innerText
    fid_usuario.value = tid_usuario
    fnombre.value = tnombre
    fusuario.value = tusuario
    fclave.value = tclave
    fid_rol.value = tid_rol
    focus('#nombre')
}

function eliminar_linea(xthis){
    const tds = xthis.parentElement.parentElement.children
    id_usuario_eliminar = parseInt(tds[0].innerText)
    mensaje_confirmar('¿Está seguro de anular este registro?','Eliminar','guardar_eliminar()')
}

function cancelar_linea(){
    document.getElementById('panel-formulario-datos').style.display = 'none'
    document.getElementById('panel-tabla-datos').style.display = 'block'
    focus('#buscar')
}

function proteger_campos(){
    fnombre.disabled = true
    fusuario.disabled = true
    fclave.disabled = true
    fid_rol.disabled = true
    boton_guardar.style.display = 'none'
}

function desproteger_campos(){
    fnombre.disabled = false
    fusuario.disabled = false
    fclave.disabled = false
    fid_rol.disabled = false
    boton_guardar.style.display = 'inline-block'
}

// PETICIONES AL SERVIDOR
async function buscar_usuarios(){
    const buscar = document.getElementById('buscar').value    
    let url = `api/v1/usuarios/paginar?pag=${pag}&buscar=${buscar}`;
    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-usuarios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr>
                            <td>${json.datos[item].id}</td>
                            <td>${json.datos[item].nombre}</td>
                            <td>${json.datos[item].usuario}</td>
                            <td>${json.datos[item].clave}</td>
                            <td>${json.datos[item].id_rol}</td>
                            <td>${json.datos[item].nombre_rol}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-secondary btn-sm" onclick='consultar_linea(this)'>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <button type="button" class="btn btn-warning btn-sm" onclick='editar_linea(this)'>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-sm" onclick='eliminar_linea(this)'>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="7" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}


async function guardar_agregar(){
    let url = '/api/v1/usuarios';
    let cnombre = fnombre.value;
    let cusuario = fusuario.value;
    let cclave = fclave.value;
    let cid_rol = fid_rol.value;

    var data = {
        nombre: cnombre,
        usuario: cusuario,
        clave: cclave,
        id_rol: cid_rol,
    };

    var parametros = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_usuarios();
    agregar_linea();
    limpiar_campos()
    focus('#nombre')
}

async function guardar_modificar(){
    let url = `/api/v1/usuarios/${fid_usuario.value}`;

    let cnombre = fnombre.value;
    let cusuario = fusuario.value;
    let cclave = fclave.value;
    let cid_rol = fid_rol.value;

    var data = {
        nombre: cnombre,
        usuario: cusuario,
        clave: cclave,
        id_rol: cid_rol,
    };

    var parametros = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    cancelar_linea()
    buscar_usuarios();
}

async function guardar_eliminar(){
    let url = `/api/v1/usuarios/${id_usuario_eliminar}`;

    var parametros = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_usuarios();
}

// Roles
function seleccionar_roles(){
    document.getElementById('panel-formulario').style.display = 'none'
    document.getElementById('panel-busqueda').style.display = 'block'
    cargar_formulario('panel-busqueda','./frm/configuraciones/archivos/usuarios/buscar_rol.html','buscar_roles(); focus("#buscar_rol");');
}

function seleccionar_rol_linea(xthis){
    salir_seleccionar_roles()
    const tds = xthis.parentElement.parentElement.children
    const tid_rol = tds[0].innerText
    const tnombre_rol = tds[1].innerText
    fid_rol.value = tid_rol
    fnombre_rol.value = tnombre_rol
}

function salir_seleccionar_roles(){
    document.getElementById('panel-busqueda').style.display = 'none'
    document.getElementById('panel-formulario').style.display = 'block'
    focus('#id_rol')
}

async function buscar_roles(){
    const buscar = document.getElementById('buscar_rol').value    
    let url = `api/v1/roles/paginar?pag=${pag}&buscar=${buscar}`;
    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-roles');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr>
                            <td>${json.datos[item].id}</td>
                            <td>${json.datos[item].nombre}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-warning btn-sm" onclick='seleccionar_rol_linea(this)'>
                                    <i class="fa-solid fa-check"></i>
                                </button>
                            </td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="3" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function buscar_roles_id(){
    const id = fid_rol.value
    let url = `api/v1/roles/${id}`;

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    if(json.datos.length > 0){
        fnombre_rol.value = json.datos[0].nombre
    } else {
        fnombre_rol.value = ''
        mensaje('Rol no existe.','focus("#id_rol")')
    }
    
}