from docx2pdf import convert
import sys

def main():
    
    docx_file = sys.argv[1]
    pdf_file = sys.argv[2]

    try:
        convert(docx_file, pdf_file)
        return("Conversão concluída com sucesso!")
    except Exception as e:
        return("Erro durante a conversão:", str(e))

if __name__ == "__main__":
    main()