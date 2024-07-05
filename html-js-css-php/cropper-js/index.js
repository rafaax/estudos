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
    });
});
