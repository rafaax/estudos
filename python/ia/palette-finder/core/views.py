from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import ImagemForm
from .color_utils import get_cores_predominantes
from .models import Imagem 
import os

def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % rgb # Converte RGB para HEX para mostrar no template

def upload_imagem(request):

    error_message = None
    cores_info = []
    imagem_url = None

    if request.method == 'POST': # Se o método for POST, significa que o usuário enviou uma imagem
        form = ImagemForm(request.POST, request.FILES) # Cria o formulário com os dados enviados

        if form.is_valid():
            instancia = form.save()
            return redirect(reverse('upload_imagem') + f'?img={instancia.id}')
    else:
        form = ImagemForm()

    img_id = request.GET.get('img')

    if img_id:
        try:
            instancia = Imagem.objects.get(id=img_id)
            caminho = instancia.imagem.path

            if os.path.exists(caminho):
                imagem_url = instancia.imagem.url

                cores_predominantes = get_cores_predominantes(caminho, n_cores=5)

                for cor_dict in cores_predominantes:
                    cor = cor_dict['rgb']
                    porcentagem = cor_dict['porcentagem']
                    cores_info.append({
                        'rgb': cor,
                        'hex': rgb_to_hex(cor),
                        'css': f"rgb({cor[0]}, {cor[1]}, {cor[2]})",
                        'porcentagem': porcentagem
                    })

                    cores_info.sort(key=lambda x: x['porcentagem'], reverse=True)
            else: 
                error_message = "Arquivo não encontrado."
        except Imagem.DoesNotExist:
            error_message = 'Imagem não encontrada.'

    else: 
        error_message = 'Nenhuma imagem enviada.'

    return render(request, 'core/upload.html', {
        'form': form,
        'cores_info': cores_info,
        'uploaded': bool(imagem_url),
        'imagem_url': imagem_url,
        'error_message': error_message,
    })