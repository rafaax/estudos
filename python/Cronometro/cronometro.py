import time
import os

class Cronometro:
    
    def __init__(self, segundos = 0, minutos = 0, horas = 0):
        self.segundos = segundos
        self.minutos = minutos
        self.horas = horas


    def __repr__(self):
        return (f'{self.horas:02d}:{self.minutos:02d}:{self.segundos:02d}')

    
    def incremento(self):
        self.segundos = self.segundos + 1
