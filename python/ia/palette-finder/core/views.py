from django.shortcuts import render
from .forms import ImagemForm

def upload_imagem(request):
    cores_predominantes = None  # futuramente sua paleta
    if request.method == 'POST':
        form = ImagemForm(request.POST, request.FILES)
        if form.is_valid():
            instancia = form.save()
            # cores_predominantes = get_cores_predominantes(instancia.imagem.path)
            return render(
                request,
                'core/upload.html',
                {
                    'form': ImagemForm(),
                    'uploaded': True,
                    'imagem_url': instancia.imagem.url,
                    'cores': cores_predominantes,  
                }
            )
    else:
        form = ImagemForm()
    return render(request, 'core/upload.html', {'form': form})