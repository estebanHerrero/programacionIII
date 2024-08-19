const axios = require('axios');
const fs = require ('fs');

const fakeUrl = ('https://fakestoreapi.com/products');

async function obtenerTodosProductos() {
    try {
        const response = await axios.get(fakeUrl);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        return [];
    }
}

async function obtenerNumeroProductoLimitado(limit) {
    try {
        const response = await axios.get(`${fakeUrl}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el numero de productos limitados:', error);
        return [];
    }
}

async function agregarProducto(nuevoProducto) {
    try {
        const response = await axios.post(fakeUrl, nuevoProducto);
        return response.data;
    } catch (error) {
        console.error('Error al agregar un producto nuevo:' , error);
        return null;
    }
}

async function obtenerProductoId(id) {
    try {
        const response = await axios.get(`${fakeUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return null;
    }
}

async function eliminarProducto(id) {
    try {
        const response = await axios.delete(`${fakeUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return null;
    }
}

async function principal() {
    const todosProductos = await obtenerTodosProductos();
    console.log('Todos los productos:', todosProductos);

    const productosLimitados = await obtenerNumeroProductoLimitado(6);
    console.log('Los primeros 6 productos:', productosLimitados);

    const nuevoProducto = {
        title: "Zapatillas",
        price: 150,
        description: "Zapatillas para Running",
        category: "running"
    };
    const productoAgregado = await agregarProducto(nuevoProducto);
    console.log('Producto agregado:', productoAgregado);

    const productoObtenidoId = await obtenerProductoId(2);
    console.log('Producto obtenido por id:', productoObtenidoId);

    
}

principal();