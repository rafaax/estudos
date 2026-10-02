<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <title> particles.js</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<div id="particles-js">
  <div class="container tamanho-largura">
      <div class="d-flex justify-content-center">
          <img src="../assets/logo.png" width="125px" height="125px" alt="">
      </div>
      <form action="login.php" method="POST">
          <div class="form-group">
              <label>Login</label>
              <input class="form-control" type="text" name="usuario" placeholder="Digite o e-mail ou login do usuário"
                  autocomplete="off" />
          </div>

          <div class="form-group">
              <label>Senha</label>
              <input class="form-control" type="password" name="senha" placeholder="Digite a senha do usuário" autocomplete="off" />
          </div>
          <button type="submit" class="btn btn-success btn-sm btn-block">Entrar</button>
          <br>
          <?php 
          if (isset($_GET['semCadastro'])) 
          {
              echo '<div id="alerta" class="alert alert-danger" role="alert">
              Usuario <b>' . $_GET['semCadastro'] . '</b>  sem cadastro!.
              </div>';
          }
          
          if (isset($_GET['dadosInvalidos'])) 
          {
              echo '<div id="alerta" class="alert alert-danger" role="alert">
              Senha <b>' . $_GET['dadosInvalidos'] . '</b>  inválida!.
              </div>';
          }

          if (isset($_GET['emailCadastrado'])) 
          {
              echo '<div id="alerta" class="alert alert-danger" role="alert">
              Email <b>' . $_GET['emailCadastrado'] . '</b>  duplicado, pedir a central para recuperá-lo!.
              </div>';
          }
          ?>
           </form>
    </div>
</div> 
<script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> 
<script src="http://threejs.org/examples/js/libs/stats.min.js"></script>
<script  src="../particles.min.js"></script>
</body>
</html>
