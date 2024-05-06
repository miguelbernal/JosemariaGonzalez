mostrar_nombre_formulario("Pemisos");

var fid_rol = document.getElementById('id_rol')
var fnombre_rol = document.getElementById('nombre_rol')
var id_rol = 0
var pag = 1

inicializar_formulario()

function inicializar_formulario(){
    fid_rol.value = ''
    fnombre_rol.value = '' 
    focus('#id_rol')
}

function guardar_permiso(xthis){
    const xid_permiso = xthis.parentNode.parentNode.getAttribute('data-id_permiso')
    const xid_formulario = xthis.parentNode.parentNode.getAttribute('data-id_formulario')
    const tds = xthis.parentNode.parentNode.children
    const habilitar = tds[2].children[0].checked ? 1: 0
    const consultar = tds[3].children[0].checked ? 1: 0
    const agregar = tds[4].children[0].checked ? 1: 0
    const modificar = tds[5].children[0].checked ? 1: 0
    const eliminar = tds[6].children[0].checked ? 1: 0
    if (xid_permiso === 'null') {
        guardar_permiso_agregar(xid_formulario, habilitar, consultar, agregar, modificar, eliminar)
    } else {
        guardar_permiso_modificar(xid_permiso, xid_formulario, habilitar, consultar, agregar, modificar, eliminar)
    }
}

// Llamadas al servidor
async function buscar_formularios_permisos(){
    let url = `/api/v1/formularios/rol/${id_rol}/permisos`;
    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json)
    const tbody = document.getElementById('tbody-datos-formularios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            var habilitar = json.datos[item].habilitar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var consultar = json.datos[item].consultar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var agregar = json.datos[item].agregar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var modificar = json.datos[item].modificar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var eliminar = json.datos[item].eliminar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            let linea = `<tr data-id_permiso=${json.datos[item].id_permiso} data-id_formulario=${json.datos[item].id_formulario}>
                            <td>${json.datos[item].nombre_formulario}</td>
                            <td>${json.datos[item].nombre_submenu}</td>
                            <td class="text-center">${habilitar}</td>
                            <td class="text-center">${consultar}</td>
                            <td class="text-center">${agregar}</td>
                            <td class="text-center">${modificar}</td>
                            <td class="text-center">${eliminar}</td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="5" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function guardar_permiso_agregar(xid_formulario, habilitar, consultar, agregar, modificar, eliminar){
    let url = '/api/v1/permisos';

    var data = {
        id_rol: id_rol,
        id_formulario: xid_formulario,
        habilitar: habilitar,
        consultar: consultar,
        agregar: agregar,
        modificar: modificar,
        eliminar: eliminar
    };

    var parametros = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_formularios_permisos();
}

async function guardar_permiso_modificar(xid_permiso, xid_formulario, habilitar, consultar, agregar, modificar, eliminar){
    let url = `/api/v1/permisos/${xid_permiso}`;

    var data = {
        id_rol: id_rol,
        id_formulario: xid_formulario,
        habilitar: habilitar,
        consultar: consultar,
        agregar: agregar,
        modificar: modificar,
        eliminar: eliminar
    };

    var parametros = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_formularios_permisos();
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
    id_rol = tid_rol
    buscar_formularios_permisos()
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
    id_rol = fid_rol.value
    let url = `api/v1/roles/${id_rol}`;

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
    console.log(json)
    if(json.datos.length > 0){
        fnombre_rol.value = json.datos[0].nombre
        buscar_formularios_permisos()
    } else {
        fnombre_rol.value = ''
        mensaje('Rol no existe.','focus("#id_rol")')
    }
    
}