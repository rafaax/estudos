from django.shortcuts import render
from .forms import ImagemForm

def upload_imagem(request):
    if request.method == 'POST':
        form = ImagemForm(request.POST, request.FILES)
        if form.is_valid():
            instancia = form.save()
            return render(request, 'core/upload.html', {'form': ImagemForm(), 'uploaded': True, 'imagem_url': instancia.imagem.url})
    else:
        form = ImagemForm()
    return render(request, 'core/upload.html', {'form': form})