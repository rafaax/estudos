class Televisor:
    def __init__(self, fab, modelo):
        self.fabricante = fab
        self.modelo = modelo
        self.canal_atual = None
        self.lista_canais = ['S1', 'S2', 'S3']
        self.volume = 5
