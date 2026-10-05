from django.urls import path
from .views import upload_imagem

urlpatterns = [
    path('', upload_imagem, name='upload_imagem'),
]