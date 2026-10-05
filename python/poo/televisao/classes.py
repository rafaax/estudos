class Televisor:
    def __init__(self, fab, modelo):
        self.fabricante = fab
        self.modelo = modelo
        self.canal_atual = None
        self.lista_canais = ['S1', 'S2', 'S3']
        self.volume = 5


    def aumentaVolume(self, valor):
        if self.volume + valor <= 100:
            self.volume = self.volume + valor 
        else:
            self.volume = 100 # maior volume

    def diminuiVolume(self, valor):
        if self.volume - valor >= 0:
            self.volume = self.volume - valor
        else: 
            self.volume = 0

    def trocaCanal(self, canal):
        if canal in self.lista_canais:
            self.canal_atual = canal

    def sintonizaCanal(self, canal):
        if canal not in self.lista_canais:
            self.lista_canais.append(canal)



class ControleRemoto:

    def __init__(self, tv):

        self.tv = tv
        
    def aumentaVolume(self):
        self.tv.aumentaVolume(50)

    def diminuiVolume(self):
        self.tv.diminuiVolume(30)


    def trocaCanal(self, canal):
        self.tv.trocaCanal(canal)

    def sintonizaCanal(self, canal):
        self.tv.sintonizaCanal(canal)