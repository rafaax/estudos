$(document).ready(function() {
    
    const $qrCodeImage = $('#qrCodeImage');
    const $errorMessage = $('#errorMessage');
    const $loadingMessage = $('#loadingMessage');
    const $userEmailInput = $('#userEmailInput');
    const $generateQrButton = $('#generateQrButton');
    const $qrCodeDisplayArea = $('#qrCodeDisplayArea');
    const $generateQrSection = $('#generateQrSection');
    const $otpVerificationSection = $('#otpVerificationSection');
    const $otpCodeInput = $('#otpCodeInput');
    const $verifyOtpButton = $('#verifyOtpButton');
    const $verificationMessage = $('#verificationMessage'); 
    const $loadingVerificationMessage = $('#loadingVerificationMessage');

    let currentUserEmail = ''; 

    
    $generateQrButton.on('click', function() {
        const userEmail = $userEmailInput.val().trim();
        currentUserEmail = userEmail;

        $errorMessage.hide().text('');
        $qrCodeImage.attr('src', '').hide();
        $qrCodeDisplayArea.hide();
        $otpVerificationSection.hide();
        $verificationMessage.hide().text('');


        if (!userEmail) {
            $errorMessage.text('Por favor, insira seu e-mail.').show();
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(userEmail)) {
            $errorMessage.text('Por favor, insira um e-mail válido.').show();
            return;
        }

        $loadingMessage.show();
        $generateQrButton.prop('disabled', true); 

        $.ajax({
            url: `generate_qrcode.php`, 
            method: 'POST', 
            contentType: 'application/json',
            data: JSON.stringify({user: userEmail}),
            dataType: 'json',
            success: function(data) {
                $loadingMessage.hide();
                $generateQrButton.prop('disabled', false);

                if (data.erro) {
                    $errorMessage.text(`Erro ao gerar QR Code: ${data.msg}`).show();
                } else if (data.qrcodebase64) { 
                    $qrCodeImage.attr('src', data.qrcodebase64).show();
                    $qrCodeDisplayArea.show(); 
                    $errorMessage.hide();
                    
                    $generateQrSection.hide(); // Oculta a seção de input de email e botão de gerar QR
                    
                    $otpVerificationSection.show(); // Mostra a seção de verificação do OTP
                    $otpCodeInput.val(''); 
                    $otpCodeInput.focus();
                } else {
                    $errorMessage.text('Erro: Resposta inválida do servidor (faltando qrcode_image_base64).').show();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $loadingMessage.hide();
                $generateQrButton.prop('disabled', false);
                let errorMsg = `Falha ao buscar QR Code: ${textStatus}`;
                if (jqXHR.responseJSON && jqXHR.responseJSON.msg) {
                    errorMsg = `Erro: ${jqXHR.responseJSON.msg}`;
                } else if (errorThrown) {
                    errorMsg += ` (${errorThrown})`;
                }
                $errorMessage.text(errorMsg).show();
                console.error('Erro ao buscar QR Code:', textStatus, errorThrown, jqXHR.responseText);
            }
        });
    });

    
    $('#verifyOtpForm').on('submit', function(event) { // Evento para verificar o código OTP
        event.preventDefault();
        const otpCode = $otpCodeInput.val().trim();

        if (!otpCode || otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
            $verificationMessage.text('Por favor, insira um código OTP válido de 6 dígitos.').removeClass('success').addClass('error').show();
            return;
        }

        $loadingVerificationMessage.show();
        $verifyOtpButton.prop('disabled', true);
        $verificationMessage.hide().text('');

        
        $.ajax({
            url: `verify_otp.php`, 
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: currentUserEmail, otp_code: otpCode }),
            dataType: 'json',
            success: function(response) {
                $loadingVerificationMessage.hide();
                $verifyOtpButton.prop('disabled', false);

                if (response.erro) {
                    $verificationMessage.text(`Erro: ${response.msg}`).removeClass('success').addClass('error').show();
                    $otpCodeInput.focus().select();
                } else {
                    $verificationMessage.text(response.msg || '2FA ativado com sucesso!').removeClass('error').addClass('success').show();
                    $otpVerificationSection.find('input, button').prop('disabled', true);
                    alert('2FA ativado com sucesso!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $loadingVerificationMessage.hide();
                $verifyOtpButton.prop('disabled', false);
                let errorMsg = `Falha ao verificar OTP: ${textStatus}`;
                if (jqXHR.responseJSON && jqXHR.responseJSON.msg) {
                    errorMsg = `Erro: ${jqXHR.responseJSON.msg}`;
                } else if (errorThrown) {
                    errorMsg += ` (${errorThrown})`;
                }
                $verificationMessage.text(errorMsg).removeClass('success').addClass('error').show();
                console.error('Erro ao verificar OTP:', textStatus, errorThrown, jqXHR.responseText);
            }
        });
    });
});