from django.db import models

class Imagem(models.Model):
    imagem = models.ImageField(upload_to='uploads/')

    def __str__(self):
        return self.imagem.name
