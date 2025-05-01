from django import forms
from .models import Imagem  # (ou o nome do seu model)

class ImagemForm(forms.ModelForm):
    class Meta:
        model = Imagem  # (certifique-se do nome correto)
        fields = ['imagem']