
var canvas = document.getElementByID("renderCanvas");
initGL(canvas);
initShaders();
initBuffers();

// Negro.
gl.clearColor(0.0, 0.0, 0.0 ,1.0);
gl.enable(gl.DEPTH_TEST);

drawScene();


// 1 - Iniciamos WebGL.
var gl;
function initGL(canvas) {
    try {
	gl = canvas.getContext("experimental-webgl");
	gl.viewportWidth  = canvas.width;
	gl.viewportHeight = canvas.height;
    } catch(e) {
    }
    if (!gl) {
	alert("WebGL no se puede incializar.");
    }
}

// 2 - Iniciamos los Shaders.
// Extraemos el codigo shader DOM.
function getShader(gl, id) {
      var shaderScript = document.getElementById(id);
      if (!shaderScript) {
          return null;
      }

      var str = "";
      var k = shaderScript.firstChild;
      while (k) {
          if (k.nodeType == 3)
              str += k.textContent;
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

// Compilar shaders dentro del programa.
var shaderProgram;
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    // Atributos:
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "PMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

// Model-View Matrix:
var mvMatrix = mat4.create();
// Projection Matrix:
var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
  }

// 3 - Iniciamos los Buffer.
// Las declaramos globales solo para facilitar las cosas.
var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;

function initBuffers() {

    // Triangulo:

    // Creamos la direccion de memoria en el GPU.
    triangleVertexPositionBuffer = gl.createBuffer();
    // Especificamos que buffer vamos a usar.
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    // Definimos nuestros vertices como una lista de JavaScript.
    var vertices = [
        0.0, 1.0, 0.0,
	     -1.0, -1.0, 0.0,
	      1.0, -1.0, 0.0
    ]; 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Arrays(vertices), gl.STATIC_DRAW)

    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    // Cuadrado:

    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    vertices = [
	       1.0, 1.0 , 0.0,
	       -1.0, 1.0 , 0.0,
	       1.0, -1.0 , 0.0,
	       -1.0, -1.0 , 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
}

function drawScene() {
    // El tamaño del canvas.
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    // Limpiamos el canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Establecemos la perspectia de como queremos ver la escena.
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100, pMatrix);
    mat4.identity(mvMatrix);
    // Truquito porque no usamos OpenGL sino WebGL.
    mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);

    // Y ahora si dibujamos.
    // Elijo el buffer del triangulo.
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    // Usar el buffer del triangulo para las posiciones de los vertices.
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

    // Ahora dibujamos el Cuadrado.
    // Recordemos que estamos en: [-1.5, 0.0, -7.0]
    // Y vamos ahora a: [1.5, 0.0, -7.0]
    mat4.translate(mMatrix, [3.0, 0.0, 0.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}
