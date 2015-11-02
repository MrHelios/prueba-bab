// Paso 0 - Obtener el contenido del DOM.

var canvas = document.getElementById("renderCanvas");
canvas.width = canvas.clientWidth;
canvas.heigth = canvas.clientHeigth;

// Paso 1 - Iniciar WebGL.

var gl = canvas.getContext("experimental-webgl");

// Paso 2 - Renderizar.

function renderLoop() {
    gl.clearColor(1.0,0,0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // El siguiente frame
    requestAnimationFrame(renderLoop);
}

// Ultimo paso.

requestAnimationFrame(renderLoop);
