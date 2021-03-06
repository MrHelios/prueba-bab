from django.shortcuts import render

# Mediante el CPU, NO DEBE HACERSE.
def home_cpu(request):
    return render(request,'BabylonJS/home.html');

# CONFIGURACION MAS BASICA PARA USAR EL GPU.
def home_gpu(request):
    return render(request,'BabylonJS/home_gpu.html');

# UN TRIANGULO QUE ROTA SOBRE SI MISMO.
def home_gpu_obj(request):
    return render(request,'BabylonJS/home_obj.html');

# TUTORIAL WEBGL:
# UN TRIANGULO Y UN CUADRADO ESTATICO.
def tutorial_1(request):
    return render(request,'Libro/tutorial_1.html');
