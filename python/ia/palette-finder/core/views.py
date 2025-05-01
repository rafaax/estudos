from django.shortcuts import render
from .forms import ImagemForm
from .color_utils import get_cores_predominantes

def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % rgb  # rgb precisa ser (r, g, b) com valores int de 0-255

def upload_imagem(request):
    cores_predominantes = []
    cores_hex = []
    if request.method == 'POST':
        form = ImagemForm(request.POST, request.FILES)
        if form.is_valid():
            instancia = form.save()
            caminho = instancia.imagem.path

            cores_predominantes = get_cores_predominantes(caminho, n_cores=5)
            cores_rgb_css = [f"rgb({cor[0]},{cor[1]},{cor[2]})" for cor in cores_predominantes]
            cores_predominantes = [tuple(int(x) for x in cor) for cor in cores_predominantes]

            cores_hex = [rgb_to_hex(cor) for cor in cores_predominantes]
            
            return render(request, 'core/upload.html', {
                'form': ImagemForm(),
                'uploaded': True,
                'imagem_url': instancia.imagem.url,
                'cores': cores_predominantes,
                'cores_rgb_css': cores_rgb_css,
                'cores_hex': cores_hex,
            })
    else:
        form = ImagemForm()


    return render(request, 'core/upload.html', {
        'form': form,
        'cores': [],
        'cores_hex': [],
    })