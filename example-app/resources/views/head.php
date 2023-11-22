<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <link rel="stylesheet" href="components.css">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  


</head>
<body class="body">
  <header class="main-header bg-white">
    <!-- Logo -->
    <a href="" class="navbar-brand">
      <img src="logo-e163516137584.png" alt="Logo" style="width: 200px; height: auto; background-color: transparent;">
    </a>

    
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top bg-green nav-small" role="navigation">
      <!-- Sidebar toggle button-->
   <a href="#" class="sidebar-toggle bg-green" data-toggle="offcanvas" role="button" style="font-size: 24px;">
  <span class="sr-only">Toggle navigation</span>
</a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->

          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="d-sm-none d-lg-inline-block"></span>
              <div class="avatar-container">
                <div class="avatar">
                  <span class="avatar-text"></span>
                </div>
                <span id="name" class="hidden-xs"></span>
              </div>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <p id="level">Receptionist</p>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="index" id="logout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Add the sidebar HTML here -->

  <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
  <script>
    // Check if the name is available in sessionStorage
    var name = sessionStorage.getItem("name");
    if (name) {
      var initials = getIntials(name);
      console.log("Initials: " + initials);

      var avatarText = document.querySelector('.avatar-text');
      avatarText.textContent = initials;
    } else {
      console.log("Name not found in sessionStorage.");
    }

    function getIntials(name) {
      var initials = name ? name.match(/\b\w/g) || [] : [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    }

    // Sidebar toggle functionality
    $(document).ready(function() {
      $('.sidebar-toggle').click(function() {
        $('body').toggleClass('sidebar-visible');
        $('#logo-img').toggle();
      });
    });
  </script>
  <script>
    $('#logout').on('click', function(e) {
    sessionStorage.setItem("loggedin", "");
    window.location = "index";
    sessionStorage.clear();
    localStorage.clear();
    return false;

});

  </script>
  <Script>
    $(document).ready(function() {
  $('.sidebar-toggle').click(function() {
    $('body').toggleClass('sidebar-visible');
    $('.navbar-brand img').toggle();
  });
});

  </Script>
</body>
</html>
