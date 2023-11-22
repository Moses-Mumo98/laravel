
<!DOCTYPE html>
<html>
<link rel="shortcut icon" href="icon.png"> 
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Member Portal | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
 
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="AdminLTE.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="blue.css">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="{{ asset('js/custom.js') }}" defer></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition login-page" style="margin-bottom: 400px;">
  <div>
  <a href="/">
    <button>Go Back</button>
  </a>
</div>

<div class="login-box">
    <div class="login-logo" style="display: flex; flex-direction: column; justify-content: flex-end;">
  <a href="" class="navbar-brand" style="margin-bottom: 10px;">
    <img src="logo-e1635161375840.png" alt="Logo" style="width: 200px; height: auto; background-color: transparent;">
  </a>

  <a href="login" style="margin-top: 30px;"><b>Member</b> Portal</a>
</div><!-- /.login-logo -->
      <div class="login-box-body" style="margin-bottom: 400px">
        <p id = "mess" class="login-box-msg">Sign in to start your session</p>
        <form action="#" method="post">
          <div class="form-group has-feedback">
            <input name = "unum" id = "unum" type="" class="form-control" placeholder="Member number">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input name = "upass" id = "upass" type="password" class="form-control" placeholder="Password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-8">
              <div class="checkbox icheck">
                <label>
                  <input type="checkbox"> Remember Me
                </label>
<div class="text-center dont-have">Don't have an account yet? <a href="registration">Register</a></div></br>
<div class="text-center dont-have"> <a href="registration">Forgot Password ?</a></div>
              </div>
            </div><!-- /.col -->
            <div class="col-xs-4">
              <button id="b_login" class="btn btn-primary btn-block btn-flat">Log In</button>
            </div><!-- /.col -->
          </div>
        </form>

      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

    <!-- jQuery 2.1.4 -->

  
  </body>
</html>
