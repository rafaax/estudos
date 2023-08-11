from classes import *


def verificaCanal(tv):
    lista = ', ' . join(tv.lista_canais)
    print('Os canais da lista são ' + lista + ', e o canal que estamos sintonizando é: '+ tv.canal_atual + '!')

def especificacoesTv(tv):
    modelo = tv.modelo
    fabricante = tv.fabricante
    print('A televisão ' + modelo + ' é da marca ' + fabricante + '!')

def verificarVolume(tv):
    volumeAtual = tv.volume 
    print(f'O volume da televisão está em: {volumeAtual} %')

def comandosControle(controle):
    comandos = {
        'aumentaVolume': 'aumenta o volume do objeto tv',
        'diminuiVolume': 'diminui o volume da tv',
        'trocaCanal': 'troca o canal atual',
        'sintonizaCanal': 'adiciona um canal novo a lista de canais'        
    }
    print(comandos) ## printa o dict comandos
