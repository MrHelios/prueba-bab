'''
Created on 28/10/2015

@author: lucho
'''
from django.shortcuts import render;

'''
 En esta pagina hay hecho un tablero basico.
 Ultima modificacion: 28/10
'''
def home_phaser(request):
    return render(request,'Phaser/phaser0.html');

'''
 Un diseno estilo: rouge-style.
 Todo estatico.
 Ultima modificacion: 29/10
'''
def home_phaser1(request):
    return render(request,'Phaser/phaser1.html');

'''
 Movimiento de imagenes mediante el teclado.
 Derecha e izquierda.
 Con el movimiento cambia la imagen simulando movimiento.
 Ultima modificacion: 30/10
'''
def home_phaser2(request):
    return render(request,'Phaser/phaser2.html');

'''
 Animaciones y mezcla de home1 y home2.
 Ultima modificacion: 30/10   
'''
def home_phaser3(request):
    return render(request,'Phaser/phaser3.html');

'''
 PROBLEMA: El Sistema actual de salas NO funciona.
 PROBLEMA: El facing del proyectil es incorrecto.
 Mario dispara proyectiles.
 Ultima modificacion: 1/11
'''
def home_phaser4(request):
    return render(request,'Phaser/phaser4.html');
