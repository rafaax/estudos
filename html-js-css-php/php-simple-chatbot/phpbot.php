<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chatbot com php ajax </title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/stylesheet.css">

</head>
<body>

        <div class="wrapper">
            <a style="position:absolute;width:99%;height:-2%;bottom:20%;">
            <div class="chatBotAberto">
                <div class="logoChat">
                    <img class="imagemVetorian"src="img/vetorianCorAzulTexto.png" >
                </div>
                <div class="form">  
                    <div class="bot-inbox inbox">
                        <div class="msg-header">
                            <p>Boas-vindas a Vetorian! Como posso te ajudar? </p>
                            <br>
                            <p>Digite 'Perguntas' para ver as perguntas pré-definidas. </p>
                        </div>  
                    </div>
                </div>
                <input id="data" type="text" placeholder="Pergunte aqui" required>
                            <button id="send-btn">Enviar</button>
            </div>
        </div>
        <div class="flex">
            <a style="position:absolute;bottom:40px;left:20px;color:#FFF;">
            <button class="iconeChat"></button>
            </a>
        </div>   

    <script>
         $(document).ready(function(){
            $("#send-btn").on("click", function(){
                $value = $("#data").val();
                $msg = '<div class="user-inbox inbox"><div class="msg-header"><p>'+ $value +'</p></div></div>';
                $(".form").append($msg);
                $("#data").val('');
                // parte do ajax
                $.ajax({
                    url: 'message.php',
                    type: 'POST',
                    data: 'texto='+$value,
                    success: function(result){
                        $replay = '<div class="bot-inbox inbox"><div class="msg-header"><p>'+ result +'</p></div></div>';
                        $(".form").append($replay);
                        $(".form").scrollTop($(".form")[0].scrollHeight);
                    }
                });
            });
        });

          function callResposta($value){
            $msg = '<div class="user-inbox inbox"><div class="msg-header"><p>'+ $value +'</p></div></div>';
            $(".form").append($msg);
            $.ajax({
                url: 'message.php',
                type: 'POST',
                data: 'texto='+$value,
                success: function(result){
                    $replay = '<div class="bot-inbox inbox"><div class="msg-header"><p>'+ result +'</p></div></div>';
                    $(".form").append($replay);
                    $(".form").scrollTop($(".form")[0].scrollHeight);
                }
            });
        };

        $(document).keypress(function(evento) {

            if(evento.which === 13 ) {
                $('#send-btn').click();
            }
        });

        $('.iconeChat').on("click", function() {
            $('.chatBotAberto').slideToggle();
            $('.fontOpitions').slideToggle();
            $('.digi').slideToggle();
        });

    </script>
    </body>