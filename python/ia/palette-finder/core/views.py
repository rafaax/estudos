from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import ImagemForm
from .color_utils import get_cores_predominantes

def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % rgb # Converte RGB para HEX para mostrar no template

def upload_imagem(request):
    if request.method == 'POST': # Se o método for POST, significa que o usuário enviou uma imagem
        form = ImagemForm(request.POST, request.FILES) # Cria o formulário com os dados enviados

        if form.is_valid():
            instancia = form.save()
            return redirect(reverse('upload_imagem') + f'?img={instancia.id}')
    else:
        form = ImagemForm()

    cores_info = []
    imagem_url = None

    img_id = request.GET.get('img')

    if img_id:
        from .models import Imagem 
        try:
            instancia = Imagem.objects.get(id=img_id)
            imagem_url = instancia.imagem.url
            caminho = instancia.imagem.path

            cores_predominantes = get_cores_predominantes(caminho, n_cores=5)
            cores_predominantes = [tuple(int(x) for x in cor) for cor in cores_predominantes]

            for cor in cores_predominantes:
                cores_info.append({
                    'rgb': cor,
                    'hex': rgb_to_hex(cor),
                    'css': f"rgb({cor[0]}, {cor[1]}, {cor[2]})"
                })
        except Imagem.DoesNotExist:
            pass  

    return render(request, 'core/upload.html', {
        'form': form,
        'cores_info': cores_info,
        'uploaded': bool(imagem_url),
        'imagem_url': imagem_url,
    })