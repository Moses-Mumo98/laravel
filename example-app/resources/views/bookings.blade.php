<?php
define('root','../');
?>
<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" href="http://localhost:8080/visitor/visitorAdmin/dist/headfoot/icon.png"> 
<link href="/css/app.css" rel="stylesheet">
<!-- <link href="/css/style.css" rel="stylesheet">
<link href="/css/admin.css" rel="stylesheet">
<link href="/css/all.css" rel="stylesheet"> -->
<!-- <link href="/css/bootstrap_min.css" rel="stylesheet">
<link href="/css/bootstrap.css" rel="stylesheet"> -->

@include('header')
  
  <!-- Include Select2 CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">

</head>
<body class="hold-transition skin-blue sidebar-mini">
  <div class="wrapper">
    @include('headman')
 
    <!-- Left side column. contains the logo and sidebar -->
    @include('aside')

    <div id="wrapper">
      <div class="page-content-wrapper">
        <div class="content-wrapper container">
          <div class="row">
            <div class="col-sm-12">
              <div class="page-title">
                <div class="row">
                  <div class="col-sm-12">
                    <h4 class="pull-left">Add New Booking</h4>
                    <ol class="breadcrumb pull-right">
                      <li><a href="admin"><i class="fa fa-home"></i></a></li>
                      <li><a href="bookings">Bookings</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- end .page title -->
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-card recent-activites">
                <!-- Start .panel -->
                <div class="panel-heading">
                  <b>Add New Booking</b>
                </div>
                <div class="col-sm-3">
                <div class="form-group">
    <label>Member Number:</label>
    <input id="m_num" name="m_num" value="" placeholder="Member Number" class="form-control" onblur="membernumber()" />
</div>
<div class="alert alert-danger" role="alert" id="alertMessage" style="display: none;"></div>

</div>



                <div class="panel panel-card recent-activites">
                  <div class="row">
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Visitor Name:</label>
                        <input type="text" name="v_name" value="" placeholder="Visitor Name" id="v_name" class="form-control" required>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Visitor ID:</label>
                        <input type="text" name="v_id" value="" placeholder="Visitor ID" id="v_id" class="form-control" onkeydown="checkPhoneNo()" onkeyup="checkPhoneNo()" required>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Visitor Phone No:</label>
                        <input type="number" name="v_phone" value="" placeholder="Visitor Phone No" id="v_phone" class="form-control" required>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label>Visit Date:</label>
                        <input type="text" name="consfrom_date" id="consfrom_date" class="form-control" placeholder="From Date">
                      </div>
                    </div>
                    
                    <div class="col-sm-7">
                    <div class="form-group">
    <label>Select Zone:</label>
    <div id="meterperregidS" onchange='saveZones()'></div>
</div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <label></label>
                        <button type="button" id="b_saver" class="btn btn-primary btn-block"><i class="fa fa-save"></i> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Meters panel -->
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-card recent-activites">
                <!-- Start .panel -->
                <div class="panel-heading">
                  <span id='receivedBookings'> Bookings</span>
                </div>
                <div class="panel-body text-center">
                  <div class="table-responsive table-commerce" id="bookingss">
                    <table id="registeredOffice" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>
                            <strong>Office Name</strong>
                          </th>
                          <th>
                            <strong>Office Occupant</strong>
                          </th>
                          <th>
                            <strong>Office Contact</strong>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
              <!-- End Meters panel -->
            </div>
          </div>
        </div>
      </div>
    </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
  <!-- ./wrapper -->


  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


  <!-- Include Select2 JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
  



</body>
</html>
