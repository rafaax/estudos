from classe import *
import math


while True:
    piso_a = float(input("Digite um lado do piso: "))
    piso_b = float(input("Digite o outro lado do piso: "))

    piso = Retangulo(piso_a, piso_b)

    azl = float(input("Digite o lado do azulejo: "))
    azl_b = float(input("Digite o outro lado do azulejo: "))

    azl = Retangulo(azl, azl_b)

    area_piso = piso.area()
    area_azl = azl.area()

    quantidade_az = area_piso / area_azl

    if (area_piso % area_azl) == 0:
        print(f"A quantidade exata de azulejos para preencher o piso é de {quantidade_az}")

    else:
        print(f"A quantidade mínima de azulejos para preencher o piso é de {math.ceil(quantidade_az)}")