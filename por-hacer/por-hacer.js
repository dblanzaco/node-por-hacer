const fs = require('fs');



let listadoPorhacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorhacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {
    try {
        listadoPorhacer = require('../db/data.json');
    } catch (error) {
        listadoPorhacer = [];
    }

}

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };

    cargarDB();
    listadoPorhacer.push(porHacer);
    guardarDB();

    return porHacer;
}


const getListado = () => {
    cargarDB();
    return listadoPorhacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorhacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorhacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    /** Forma de borrar numero 1, desarrollada por mi */
    /*cargarDB();
     let index = listadoPorhacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorhacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    } */


    /** Forma de borrar numero 2, desarrollada por el profesor del curso */
    cargarDB();

    let nuevoListado = listadoPorhacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorhacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorhacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}