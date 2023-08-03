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
