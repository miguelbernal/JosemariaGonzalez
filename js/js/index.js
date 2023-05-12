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