// Sentencia
console.log("Hola Mundo")
console.log("Adios Mundo")
let firstName = "Josemaria" // string
let lastName = "Gonzalez"
let edad = 29 // integer number
let nota = 4.5 // float decimal
let estudia = true // false boolean
console.log(firstName)
console.log(lastName)
console.log(edad)
console.log(nota)
console.log(estudia)
console.log(firstName + " " + lastName) // concatenacion
//     funcion
//           () ejecute
//            parametros 
//edad = prompt("Que edad tienes?")
console.log(edad)
if (edad >= 18) {
    console.log("Eres mayor de edad")
} else {
    console.log("Eres menor de edad")
}
/***********************************************************************/
// If anidado (No se recomienda usar, es muy confuso)
var dia = 4
if (dia === 1){
    console.log('Domingo')
} else {
    if (dia === 2){
        console.log('Lunes')
    } else {
        if (dia === 3){
            console.log('Martes')
        } else {
            if (dia === 4){
                console.log('Miercoles')
            }
        }

    }
}
// if else if
dia = 1
if (dia === 1){
    console.log('Domingo')
} else if (dia === 2){
    console.log('Lunes')
} else if (dia === 3){
    console.log('Martes')
} else if (dia === 4){
    console.log('Miercoles')
} else if (dia === 5){
    console.log('Jueves')
} else if (dia === 6){
    console.log('Viernes')
} else if (dia === 7){
    console.log('Sábado')
} else {
    console.log('Dia erroneo')
}

// switch
console.log('----- switch -----')
dia = 10
switch (dia) {
    case 1:
        console.log('Domingo')
        break;
    case 2:
        console.log('Lunes')
        break;
    case 3:
        console.log('Martes')
        break;
    case 4:
        console.log('Miercoles')
        break;
    case 5:
        console.log('Jueves')
        break;
    case 6:
        console.log('Viernes')
        break;
    case 7:
        console.log('Sábado')
        break;
    default:
        console.log('Día erróneo')
        break;
}
console.log('Continuando con el programa...')
// Ciclos
// Automatico
// For Para
//   inicializacion
//             condicion
//                     incremento
for (let i = 1; i <= 10; i = i + 2) {
    console.log(i)
}
console.log('Continuando con el programa despues del for...')
// while
let i = 1
while (i <= 10) {
    console.log('while ' + i)
    i = i + 2
}
console.log('Continuando con el programa despues del while...')
// do while
i = 1
do {
    console.log('do while ' + i)
    i++
} while (i <= 15)
console.log('Continuando con el programa despues del do while...')
// arrays - vectores
//  indices ->   0        1      2      3
let alumnos = ["Jose","Alvaro","Ana","Cesar"] // -> length = 4
let notas = [4,3,2,1]
console.log(alumnos)
console.log(notas)
// For each
alumnos.forEach(alumno => {
    console.log(alumno)
});
// for
for (let i = 0; i < alumnos.length; i++) {
    console.log(alumnos[i] + " quitó " + notas[i])
}
// Objetos
let perro = {
    raza: "caniche",
    tamanio: "pequeño",
    edad: 2,
    color: "blanco",
    ladrar: function(ladrido, ladrido2){
        console.log(ladrido,ladrido2)
    }
}
console.log(perro)
console.log(perro.raza)
perro.ladrar('Guauuuuu','Gua Gua')

let persona1 = {
    nombre: "Ana",
    apellido: "Gonzalez"
}

let persona2 = {
    nombre: "Jose",
    apellido: "Ramirez"
}

let personas = [persona1, persona2]
console.log(personas)

personas.forEach(persona => {
    console.log(persona.nombre + " " + persona.apellido)
});

// Funciones
// function
//       nombre de la funcion
//                 parametros
console.log('*** funcion diaLetras ***')
function diaLetras(diaNumero){
    if (diaNumero === 1){
        return 'Domingo'
    } else if (diaNumero === 2){
        return 'Lunes'
    } else if (diaNumero === 3){
        return 'Martes'
    } else if (diaNumero === 4){
        return 'Miercoles'
    } else if (diaNumero === 5){
        return 'Jueves'
    } else if (diaNumero === 6){
        return 'Viernes'
    } else if (diaNumero === 7){
        return 'Sábado'
    } else {
        return 'Dia erroneo'
    }
}

console.log(diaLetras(1))
console.log(diaLetras(3))
console.log(diaLetras(5))
console.log(diaLetras(21))

// Arrow function -> Funciones de flecha
const diaLetrasArrowFunction = (diaNumero) => {
    if (diaNumero === 1){
        return 'Domingo'
    } else if (diaNumero === 2){
        return 'Lunes'
    } else if (diaNumero === 3){
        return 'Martes'
    } else if (diaNumero === 4){
        return 'Miercoles'
    } else if (diaNumero === 5){
        return 'Jueves'
    } else if (diaNumero === 6){
        return 'Viernes'
    } else if (diaNumero === 7){
        return 'Sábado'
    } else {
        return 'Dia erroneo'
    }
}

console.log('Arrow Function')
console.log(diaLetrasArrowFunction(2))
console.log(diaLetrasArrowFunction(7))
console.log(diaLetrasArrowFunction(22))
