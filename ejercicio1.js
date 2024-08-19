const axios  = require('axios');
const fs = require('fs');

const throneUrl = 'https://thronesapi.com/api/v2/Characters';


async function obtenerPersonajeId(id) {
    try {
        const response = await axios.get(`${throneUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el obtener el personaje: ', error);
        return null;
    }
}

async function obtenerTodosPersonajes() {
    try {
        const response = await axios.get(throneUrl);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los personajes.', error);
        return [];
    }
}

async function guardarPersonajeAlJson(personajes, filename) {
    try {
        fs.writeFileSync(filename, JSON.stringify(personajes, null, 2));
        console.log('Personaje guardado en', filename);
    } catch (error) {
        console.error('Error al guardar el personaje:', error);
    }
}

async function principal() {
    const nedStark = await obtenerPersonajeId(6);
    console.log('Ned Stark:', nedStark);

    const todosPersonajes = await obtenerTodosPersonajes();
    console.log(todosPersonajes);
    await guardarPersonajeAlJson(todosPersonajes, 'personajes.json');

    const data = fs.readFileSync('personajes.json');
    const personajes = JSON.parse(data);

    const starkPersonajes = personajes.filter(personaje => personaje.family === 'House Stark');
    console.log('Personajes de la familia Stark:' , starkPersonajes);

    todosPersonajes.push({
        id: 25,
        name: 'Steven Dev',
        family: 'House Stark'
    });
    await guardarPersonajeAlJson(todosPersonajes, 'personajes.json');

    const filteredPersonajes = personajes.filter(personaje => personaje.id <= 25);
    await guardarPersonajeAlJson(filteredPersonajes, 'personajes.json');
}

principal();