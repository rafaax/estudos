var cropper;
const fileInput = document.querySelector('#fileInput');

const inputHtml = `
    <div>
        <img id="cropperjs" class="display-img">
    </div>
`;

$('#fileInput').on('change', function() {
    Swal.fire({
        html: inputHtml,
        confirmButtonText: 'SALVAR',
        willOpen: () => {
            const cropperImage = Swal.getPopup().querySelector('#cropperjs');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    cropperImage.src = e.target.result;
                    cropperImage.style.display = 'block';
                    cropperImage.onload = () => {
                        cropper = new Cropper(cropperImage, {
                            aspectRatio: 4 / 3 ,
                            viewMode: 1,
                            autoCropArea: 0.6,
                        });
                    };
                };
                reader.readAsDataURL(file);
            }
        },
    });
});
