mostrar_nombre_formulario("Módulos");

// MANEJO DEL FORMULARIO
var fid_modulo = document.getElementById('id_modulo')
var fnombre = document.getElementById('nombre')
var boton_guardar = document.getElementById('boton-guardar')
var pag = 1
var id_modulo_eliminar = 0

inicializar_formulario()

function inicializar_formulario(){
    focus('#buscar')
    siguiente_campo('#nombre','#boton-guardar',true)
    siguiente_campo('#buscar','#boton-buscar',false)
    buscar_roles()
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
        if(fid_modulo.value == 0){
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
    }
    return ok
}

function limpiar_campos(){
    fid_modulo.value = 0
    fnombre.value = ""
}

function consultar_linea(xthis){
    proteger_campos()
    boton_guardar.innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar';
    document.getElementById('panel-formulario-datos').style.display = 'block'
    document.getElementById('panel-tabla-datos').style.display = 'none'
    const tds = xthis.parentElement.parentElement.children
    const tid_modulo = tds[0].innerText
    const tnombre = tds[1].innerText
    fid_modulo.value = tid_modulo
    fnombre.value = tnombre
    focus('#nombre')
}

function editar_linea(xthis){
    desproteger_campos()
    boton_guardar.innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar';
    document.getElementById('panel-formulario-datos').style.display = 'block'
    document.getElementById('panel-tabla-datos').style.display = 'none'
    const tds = xthis.parentElement.parentElement.children
    const tid_modulo = tds[0].innerText
    const tnombre = tds[1].innerText
    fid_modulo.value = tid_modulo
    fnombre.value = tnombre
    focus('#nombre')
}

function eliminar_linea(xthis){
    const tds = xthis.parentElement.parentElement.children
    id_modulo_eliminar = parseInt(tds[0].innerText)
    mensaje_confirmar('¿Está seguro de anular este registro?','Eliminar','guardar_eliminar()')
}

function cancelar_linea(){
    document.getElementById('panel-formulario-datos').style.display = 'none'
    document.getElementById('panel-tabla-datos').style.display = 'block'
    focus('#buscar')
}

function proteger_campos(){
    fnombre.disabled = true
    boton_guardar.style.display = 'none'
}

function desproteger_campos(){
    fnombre.disabled = false
    boton_guardar.style.display = 'inline-block'
}

// PETICIONES AL SERVIDOR
async function buscar_roles(){
    const buscar = document.getElementById('buscar').value    
    let url = `api/v1/modulos/paginar?pag=${pag}&buscar=${buscar}`;
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
    const tbody = document.getElementById('tbody-datos-modulos');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr>
                            <td>${json.datos[item].id}</td>
                            <td>${json.datos[item].nombre}</td>
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
        lineas = `<tr><td colspan="3" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}


async function guardar_agregar(){
    let url = '/api/v1/modulos';
    let cnombre = fnombre.value;

    var data = {
        nombre: cnombre,
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
    buscar_roles();
    agregar_linea();
    limpiar_campos()
    focus('#nombre')
}

async function guardar_modificar(){
    let url = `/api/v1/modulos/${fid_modulo.value}`;

    let cnombre = fnombre.value;

    var data = {
        nombre: cnombre,
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
    buscar_roles();
}

async function guardar_eliminar(){
    let url = `/api/v1/modulos/${id_modulo_eliminar}`;

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
    buscar_roles();
}
