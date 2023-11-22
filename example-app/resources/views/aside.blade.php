<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
@include('headman')
<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->

    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
      <div class="input-group">
        <!-- <input type="text" name="q" class="form-control" placeholder="Search...">
        <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
        </span> -->
      </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu">
      <li class="header"></li>
      <li class="active treeview" id="dashboard">
        <a href="../admin_dashboard/admin">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>
      <li class="treeview" id="stats">
        <a href="../admin_dashboard/statistics">
          <i class="fa fa-bar-chart"></i><span>statistics</span>
        </a>
      </li>
      <li class="treeview" id="access">
        <a href="../admin_dashboard/acess_history">
          <i class="fa fa-server"></i><span>Access History</span>
        </a>
      </li>
      <li class="treeview" id="zones">
        <a href="../admin_dashboard/office">
          <i class="fa fa-circle-o"></i><span>Zones</span>
        </a>
      </li>
      <li class="treeview" id="bookings">
        <a href="#">
          <i class=" fa fa-edit"></i><span>Bookings</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="../admin_dashboard/bookings">Visitor</a></li>
          <li><a href="../admin_dashboard/reprocating">Reciprocating Member</a></li>
          <!-- <li><a href="../admin_dashboard/member_visitor">Visitor Member</a></li> -->
        </ul>
      </li>
      <li class="treeview" id="recipro">
        <a href="../admin_dashboard/add_recprocating">
          <i class="fa fa-users"></i><span>Add Reciprocating Member</span>
        </a>
      </li>
      <!-- <li class="treeview">
        <a href="../admin_dashboard/reprocating">
          <i class=" fa fa-users"></i><span>Add Reciprocating</span>
        </a>
      </li> -->
      <li class="treeview" id="add_user">
        <a href="../admin_dashboard/registration">
          <i class="fa fa-user-plus"></i><span>System Users</span>
        </a>
      </li>
      <li class="treeview" id="schedules">
        <a href="../admin_dashboard/schedules">
          <i class="fa fa-th"></i><span>Zone Schedules</span>
        </a>
      </li>
      <ul class="sidebar-menu">
        <li class="treeview" id="reports-menu">
          <a href="#">
            <i class="fa fa-edit"></i><span>Reports</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../admin_dashboard/visitors">Visitor</a></li>
            <li><a href="../admin_dashboard/reciprocating_member">Reciprocating Member</a></li>
            <li><a href="../admin_dashboard/member_visitor">Visitor Member</a></li>
            <li><a href="../admin_dashboard/access">Access</a></li>
            <li><a href="../admin_dashboard/alert">Alerts</a></li>
            <li><a href="../admin_dashboard/audit">Audit trial</a></li>
          </ul>
        </li>
      </ul>

  </section>
  <!-- /.sidebar -->
</aside>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type !== "1") {
    var reportsMenu = document.getElementById("reports-menu");
    reportsMenu.style.display = "none";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type !== "1") {
    var reportsMenu = document.getElementById("add_user");
    reportsMenu.style.display = "none";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type !== "1") {
    var reportsMenu = document.getElementById("recpro");
    reportsMenu.style.display = "none";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type !== "1") {
    var reportsMenu = document.getElementById("zones");
    reportsMenu.style.display = "none";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type !== "1") {
    var reportsMenu = document.getElementById("schedules");
    reportsMenu.style.display = "none";
  }
</script>
<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("reports-menu");
    reportsMenu.style.display = "block";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("dashboard");
    reportsMenu.style.display = "block";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("stats");
    reportsMenu.style.display = "block";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("access");
    reportsMenu.style.display = "block";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("bookings");
    reportsMenu.style.display = "block";
  }
</script>

<script>
  // Get the user_type value from the local storage
  var user_type = sessionStorage.getItem("user_type");

  // Hide the "Reports" menu if user_type is not equal to 1
  if (user_type >2) {
    var reportsMenu = document.getElementById("recipro");
    reportsMenu.style.display = "block";
  }
</script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
