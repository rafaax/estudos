from classes import *
from functions import *



tv = Televisor('L41N', 'EVA001') ## instanciando classe tv 
controle = ControleRemoto(tv) ## instanciando classe controleremoto

controle.sintonizaCanal('S7')
controle.trocaCanal('S7')


verificaCanal(tv)
especificacoesTv(tv)
verificarVolume(tv)
comandosControle(tv)