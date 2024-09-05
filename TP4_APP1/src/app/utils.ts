
// utils.ts

export async function api<T>(url: string): Promise<T> {
    console.log('URL parameter:', url); // Add this line

    const urlCompleta = `http://18.224.251.62:81${url}`;

    const response = await fetch(urlCompleta);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

export interface ProductoParams { meli_id: string };
export interface ProductoRespuesta { mensaje: string }

export async function agregarProducto(params: ProductoParams): Promise<ProductoRespuesta> {
    const urlCompleta = `http://18.224.251.62:81/v1/producto`;

    const response = await fetch(urlCompleta, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        var body = await response.text();
        return { mensaje: `Error agregando producto: ${body}` };
    }
    else {
        console.log(response)
        return { mensaje: `agregada con exito!` };
    }
}

export async function eliminarProducto(params: ProductoParams): Promise<ProductoRespuesta> {
    const urlCompleta = `http://18.224.251.62:81/v1/producto`;

    const response = await fetch(urlCompleta, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        var body = await response.text();
        return { mensaje: `Error eliminando producto: ${body}` };
    }
    else {
        return { mensaje: `Producto eliminado con exito!` };
    }
}
