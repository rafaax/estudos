import serial

ser = serial.Serial("COM14", 115200)

while True:
    read_bytes = ""
    for i in range(34):
        hex_string = hex(ord(ser.read()))
        hex_string = hex_string[2:]

        if len(hex_string) == 1:
            hex_string = "0" + hex_string

        read_bytes += hex_string + " "

    read_bytes += "\n"
    print(read_bytes)
