/*
Este archivo es llamado por: home_obj.html
Modificacion por Ultima vez: 17/10/2015
Basado en el de BABYLONJS.
*/

// Paso 0 - Obtener el contenido del DOM.

var canvas = document.getElementById("renderCanvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Paso 1 - Iniciar WebGL.

var gl = canvas.getContext("experimental-webgl");

// Paso 2 - Funcion para extraer el codigo shader del DOM.

function getShader(id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
	return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
	if (k.nodeType == 3) {
	    str += k.textContent;
	}
	k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
	shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
	shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
	return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	alert(gl.getShaderInfoLog(shader));
	return null;
    }

    return shader;
}

// Paso 3 - Compilar shaders dentro del programa.

var shaderProgram;
var fragmentShader = getShader("shader-fs");
var vertexShader = getShader("shader-vs");

shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("No se pudo inicializar los shaders.")
}

gl.useProgram(shaderProgram);

// Paso 4 - Atributos.

var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(vertexPositionAttribute);

var vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "normal");
gl.enableVertexAttribArray(vertexNormalAttribute);

// Paso 5 - Shaders uniformes.

var pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
var mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix);    
}

// Paso 6 - El buffer del Mesh.

var triangleVertexPositionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
var vertices = [
    0.0,1.0,0.0,
	-1.0,-1.0,0.0,
    1.0,-1.0,0.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var triangleVertexNormalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexNormalBuffer);
var normals = [
    0.0,0.0,1.0,
    0.0,0.0,1.0,
    0.0,0.0,1.0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

// Paso 7 - Render.

var angle = 0;
function renderLoop() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, canvas.width / canvas.height, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, [0.0,0.0,-7.0]);
    mat4.rotateY(mvMatrix,angle);
    angle += 0.01;


    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute,3,gl.FLOAT,false,0,0);

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute,3,gl.FLOAT,false,0,0);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES,0,3);

    requestAnimationFrame(renderLoop);
}

// Ultimo Paso.

requestAnimationFrame(renderLoop);
