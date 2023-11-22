<?php
define('root','../');
?>
<!DOCTYPE html>
<html>
  <head>
  <link rel="shortcut icon" href="icon.png"> 
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">

   <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
@include ('head')
  </head>
  <body>
<style>
    .form-control {
        height: 80px; /* Adjust the height as needed */
    }
</style>
    <div>



	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>

	<!-- FOR IE9 below -->
	<!--[if lt IE 9]>
	<script src="js/respond.min.js"></script>
	<![endif]-->

</head>
<body>
	<div id="fh5co-wrapper">
	<div id="fh5co-page">
	<div id="fh5co-header">
		<header id="fh5co-header-section">
			<div class="container msg">

			</div>
		</header>

	</div>
	<!-- end:fh5co-header -->



	</div>
	<!-- END fh5co-page -->

	</div>
	<!-- END fh5co-wrapper -->

	<!-- Javascripts -->
	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>

	<!-- FOR IE9 below -->
	<!--[if lt IE 9]>
	<script src="js/respond.min.js"></script>
	<![endif]-->

</head>
<body>
	<div id="fh5co-wrapper">
	<div id="fh5co-page">
	<div id="fh5co-header">
		<header id="fh5co-header-section">
			<div class="container msg">

			</div>
		</header>

	</div>
	<!-- end:fh5co-header -->



	</div>
	<!-- END fh5co-page -->

	</div>
	<!-- END fh5co-wrapper -->

	<!-- Javascripts -->
	<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>	<!-- Dropdown Menu -->

	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>

	<!-- FOR IE9 below -->
	<!--[if lt IE 9]>
	<script src="js/respond.min.js"></script>
	<![endif]-->

</head>
<body>
	<div id="fh5co-wrapper">
	<div id="fh5co-page">
	<div id="fh5co-header">
		<header id="fh5co-header-section">
			<div class="container msg">

			</div>
		</header>

	</div>
	<!-- end:fh5co-header -->



	</div>
	<!-- END fh5co-page -->

	</div>
	<!-- END fh5co-wrapper -->

	<!-- Javascripts -->
  <head>
	<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</head>
<body>
	
	<script>
		var mrzInput;
		var scannerInput = '';
		clickedPack = false;
		var id_no = [48, 56];
		var id_sn = [5, 14];
		var names = [60, 90];
		var chkn = [2, 5];
		var ntn = [2, 5];
		var dob = [30, 36];
		var cdob = [36];
		var gender = [37];

		var fillFillers = function(s) {
			while (s.length < 44) {
				s = s + "<";
			}
			return s;
		}

		var mrzParse = function parse(a, b) {
			a = fillFillers(a);
			b = fillFillers(b);
			var doc_type = a.slice(0, 2);
			var country = a.slice(2, 5);
			var surname_names = a.slice(names[0], names[1]).split('<<', 2);
			if (surname_names.length < 2) {
				surname_names.push('');
			}
			var surname = surname_names[0];
			var xnames = surname_names[1];
			xnames = xnames.replaceAll('<', ' ').trim();
			surname = surname.replaceAll('<', ' ').trim();
			var number = b.slice(id_no[0], id_no[1]); //ID NUMBER
			var check_number = b.charAt(chkn[0]);
			var nationality = b.slice(ntn[0], ntn[1]);
			var date_of_birth = b.slice(dob[0], dob[1]);
			var check_date_of_birth = b.charAt(cdob[0]);
			var sex = b.charAt(gender[0]);
			var expiration_date = b.slice(21, 27);
			var check_expiration_date = b.charAt(27);
			var personal_number = b.slice(28, 42);
			var check_personal_number = b.charAt(42);
			var check_composite = b.charAt(43);

			console.log(surname);

			var result = {};
			console.log(result);
			result["surname"] = surname;
			result["names"] = xnames;
			result["country"] = country;
			result["doc_type"] = doc_type;
			result["number"] = number;
			result["check_number"] = check_number;
			result["date_of_birth"] = date_of_birth;
			result["check_date_of_birth"] = check_date_of_birth;
			result["sex"] = sex;
			result["expiration_date"] = expiration_date;
			result["personal_number"] = personal_number;
			result["check_personal_number"] = check_personal_number;
			result["check_composite"] = check_composite;

			// Automatically fill the v_name field with the scanned surname
			//document.getElementById('v_name').value = surname;

			// Automatically fill the v_id field with the scanned number
			document.getElementById('v_id').value = number;

			var sms = surname + " of " + nationality + ", a " + sex + " born " + date_of_birth + " is at Jarida 1. Please assist";

			console.log(result);
			mrzInput = scannerInput = '';
		}

		$(document).off('keypress').on('keypress', function(event) {
			// Assuming the barcode scanner sends an Enter keypress after each scan
			if (event.key === 'Enter') {
				console.log(scannerInput);
				mrzInput = scannerInput;
				if (!mrzInput == '') {
					mrzParse(mrzInput, mrzInput);
				} else {
					alert('No input received');
				}
			} else {
				console.log(event.key);
				scannerInput += event.key;
			}
		});
	</script>

	<div id="wrapper">
		<div>
			<div>
				
				<div class="row">
					<div class="col-sm-12">
						<div class="page-title">
							<div class="row">
								<div class="col-sm-12">
									<h4 class="pull-left"></h4>
									<ol class="breadcrumb pull-right">
										<!-- <li><a href="admin"><i class="fa fa-home"></i></a></li> -->
										<!-- <li><a href="bookings">Bookings</a></li> -->
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end .page title-->
				<div class="row" style="padding: 20px;">
					<div class="col-sm-12">
						<div class="panel panel-card recent-activites">
							<!-- Start .panel -->
							<div class="panel-heading">
								
						
                        <h4 id="confrimed" style="color:red; display:none;"></h4>
						<div>
  <a href="/">
    <button>Go Back</button>
  </a>
</div>

						<div class="panel panel-card recent-activites" >
							    <a href="">Scan your passport or fill in your details</a>
							<div>
								<div>
          <div class="form-group">
            <label>Visitor ID:</label>
            <input type="" name="v_id" value="" placeholder="Visitor ID" id="v_id" class="form-control" required>
          </div>
        </div>
								<div>
									<div>
										<label>Phone Number:</label>
										<input name="visitor_phone" value="" placeholder="Enter your phonenumber" id="visitor_phone" class="form-control" required>
									</div>
								</div>

							
                
            <div>
                <div class="form-group">
                    <label></label>
                    <button type="button" id="confirmvisitor"  onclick = "clickConfirm()" class="btn btn-primary btn-block "> SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
                        </div>
                        <!-- End Meters panel --> 
                     </div>
                  </div>
				  <div class="row">
                           
                                </div><!-- End Meters panel --> 
                            </div>
                        </div>
               </div>
			   </div>
			   </div>
			   </div>
			    </aside><!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
          
     <script>
  // Function to handle the scanned ID data
  function handleScannedID(data) {
    // Extract the required information from the scanned object
    //const surname = data.surname;
    const number = data.number;

    // Set the values in the input fields
    //document.getElementById('v_name').value = surname;
    document.getElementById('v_id').value = number;
  }

  // Configuration for barcode scanner
  const config = {
    // ... (existing configuration code)

    // Listen for barcode detection
    Quagga.onDetected(function(result) {
      const code = result.codeResult.code;
      console.log('Scanned code:', code);

      // Parse the scanned code as JSON
      try {
        const scannedData = JSON.parse(code);
        handleScannedID(scannedData);
      } catch (error) {
        console.error('Error parsing scanned data:', error);
      }
    });
  });
</script>

<script>
  // Function to handle the scanned ID data
  function handleScannedID(data) {
    // Extract the required information from the scanned object
    //const surname = data.surname;
    const number = data.number;

    // Set the values in the input fields
    //document.getElementById('v_name').value = surname;
    document.getElementById('v_id').value = number;
  }

  // Configuration for barcode scanner
  const config = {
    // ... (existing configuration code)

    // Listen for barcode detection
    Quagga.onDetected(function(result) {
      const code = result.codeResult.code;
      console.log('Scanned code:', code);

      // Parse the scanned code as JSON
      try {
        const scannedData = JSON.parse(code);
        handleScannedID(scannedData);
      } catch (error) {
        console.error('Error parsing scanned data:', error);
      }
    });
  };
</script>


    </div><!-- ./wrapper -->


<script>
function openKeyboard(){
    CommandRun.run("C:\\WINDOWS\\system32\\osk.exe", []);;
}</script>
<script>
$("#v_name").click(()=>{
console.log("clicked");
openKeyboard();
document.getElementById("v_name").select()})
</script>
  
    <script>
        // Check if the device is a touch device
        var isTouchDevice = false;

        function detectTouchDevice() {
            isTouchDevice = true;
            document.removeEventListener('touchstart', detectTouchDevice);
        }

        // Listen for the touchstart event
        document.addEventListener('touchstart', detectTouchDevice);

        // Add or remove classes based on the device type
        function updateInputClasses() {
            var inputs = document.querySelectorAll('input[type="text"], input[type="number"], select');
            for (var i = 0; i < inputs.length; i++) {
                if (isTouchDevice) {
                    inputs[i].classList.add('touch-input');
                } else {
                    inputs[i].classList.remove('touch-input');
                }
            }
        }

        // Call the updateInputClasses function on page load
        window.addEventListener('load', updateInputClasses);
    </script>
  </body>
</html>
