<?php
header('Access-Control-Allow-Origin: *');
error_reporting(E_STRICT);
session_start();
include 'func.php';
include_once 'sms_gateway.php';


$GLOBALS['URL'] = $_SERVER['REMOTE_ADDR'];
$request = $_POST['request'];
debug("Received Request " . $request . " And IP " . $GLOBALS['URL'], "VisitorAPI");
switch ($request) {
case 27:
	login();
	break;

case 1:
	getDashData();
	break;

case 2:
	saveOffice();
	break;

case 3:
	getOffices();
	break;

case 4:
	saveBooking();
	break;

case 5:
	getBookings();
	break;

case 6:
	saveUnavailability();
	break;

case 7:
	getUnavailability();
	break;

case 8:
	updateUnavailability();
	break;

case 9:
	requestFacility();
	break;

case 10:
	getBookedFacilities();
	break;

case 11:
	getFreeFacilitiesList();
	break;

case 13:
	getOccupiedFacilities();
	break;

case 12:
	bookingAction();
	break;

case 15:
	getSpecialRequests();
	break;

case 16:
	getAuthorizedReports();
	break;

case 17:
	getRevokedReports();
	break;

case 18:
	getAllFacilitiesList();
	break;

case 19:
	saveComplains();
	break;

case 20:
	getAllVisitorLogs();
	break;

case 21:
	getAllOffices();
	break;

case 22:
	getLogsPerOffice();
	break;
	
case 23:
	getPhoneNo();
	break;
	
	case 24:
	getUpcoming();
	break;
	
	case 25:
		getAllRegistered();
		break;
		
		case 26:
		getTimedBookings();
		break;
		case 28:
			registermember($_POST['m_number'],$_POST['m_password'],$_POST['booking_ref ']);
			break;
			case 29:
				getmembers();
				break;
				case 30:
					getDepartments();
					break;
					case 31:
					getprofile($_POST['user_id']);
					break;
					case 32:
					getmembersvistors($_POST['member_id']);
					break;
					case 33:
							confirmOTp($_POST['otp']);
							break;
							case 34:
								confirmvisitor($_POST['visitor_phone'],$_POST['booking_ref'],$_POST['v_id'],$_POST['visitor_name'],$_POST['member_name']);
								break;
								case 35:
									verifyOtp($_POST['otp']);
									break;
									case 36:
										confirmotps($_POST['otp']);
										break;

										case 37:
											verifyauth($_POST['auth']);
											break;
									



default:
	echo "Get Out Of Here";
	break;
}

function confirmOTps($otp) {
    $conn = connect("visitor");
    $typehere = "otp";
    debug("=================================================", $typehere);

    $checkV = "CALL visitor_otp_access(0, '$otp')";
    debug($checkV, $typehere);
    $q = execute_($checkV, $conn);
    $n = num($q);
    debug("Found " . $n . " otp", $typehere);
    $result = array();

    if ($n < 1) {
        debug($otp . " invalid otp", $typehere);
        array_push($result, array("bool_code" => false, "message" => "Invalid OTP"));
        echo json_encode(array("otp" => $result));
    } else {
        // Get the response from the stored procedure
        $row = fetch($q);
        $valid = $row['valid'];
        $lane_ip = $row['lane_ip'];
        $msg = $row['msg'];

		

        // Check if the OTP is valid or not
        if ($valid == 'TRUE') {
            $response = array("bool_code" => true, "valid" => true, "lane_ip" => $lane_ip, "msg" => $msg);
        } else {
            $response = array("bool_code" => true, "valid" => false, "msg" => $msg);
        }

        debug("Response" . json_encode($response), $typehere);
        echo json_encode(array("otp" => $response));
    }

    closer($conn);
    debug("=================================================", $typehere);
}







function verifyOtp($otp){
	$conn = connect("visitor");
	$typehere = "otp";
    debug("=================================================",$typehere);
	
	$checkV = "SELECT booking_ref FROM bookings WHERE otp_status='1' and booking_ref='$otp'";
	debug($checkV,$typehere);
	$q = execute_($checkV,$conn);
	$n = num($q);
	debug("Found ".$n." otp",$typehere);
	$result = array();
	
	if($n < 1){
		debug($otp . " invalid otp", $typehere);
		array_push($result, array("bool_code" => false,"message"=>"Invalid OTP"));
		echo json_encode($result);
	}
    else{
		$sql = "UPDATE bookings set otp_status= '2' WHERE booking_ref='$otp'";
 debug($sql, $typehere);
 $objQuery = mysqli_query($conn,$sql);
   
$resultArray = array();
  
array_push($resultArray,array("bool_code" => true));
debug("Response".json_encode(array("bool_code" => true,"otp" => $resultArray)),$typehere);
echo json_encode(array("otp" => $resultArray));
     
      closer($conn);
      debug("=================================================", $typehere);
	}

}

function confirmvisitor($visitor_phone, $booking_ref, $v_id, $visitor_name, $member_name) {
    $conn = connect("visitor");
    $typehere = "confirmvisitor";
    debug("=================================================", $typehere);
    $checkV = "SELECT book_id, visitor_name, visitor_id, visitor_phone, booking_date, booking_ref, visit_date_time, checking_status, member_name
        FROM bookings  WHERE visitor_phone = '$visitor_phone' AND checking_status = '1'";
    debug($checkV, $typehere);
    $q = execute_($checkV, $conn);
    $n = num($q);
    debug("Found " . $n . " id no Records", $typehere);
    $result = array();

    if ($n < 1) {
        array_push($result, array("bool_code" => false, "message" => "You have not been booked as a visitor at Parklands Sports Club"));
        echo json_encode($result);

        // Fetch the data from the bookings table
        $row = fetch($q);
        $visitor_name = $row['visitor_name'];
        $member_name = $row['member_name'];

        // Insert data into tbl_invalid
        $insert = "INSERT INTO tbl_invalid (visitor_name, vistor_phone, member_name, date) VALUES ('$visitor_name', '$visitor_phone', '$member_name', NOW())";
        execute_($insert, $conn);
		send_sms($visitor_phone,"You have not been booked as a visitor at Parklands Sports Club");
		debug($send_sms, $typehere);

        // Send email for "You have not been booked as a visitor at Parklands Sports Club."
        $u_email = 'mosesmumo49@gmail.com';
        $email_subject = "Alerts";
        $email_body = "You have not been booked as a visitor at Parklands Sports Club";
        push_mail2($u_email, $email_subject, $email_body, "Alerts", "mosesmumo49@gmail.com");
    } else {
        if ($_POST['booking_ref'] == "") {
            $booking_ref = randomString(6);
        } else {
            $booking_ref = $_POST['booking_ref'];
        }
        debug("Generated otp " . $booking_ref, $typehere);

        $sql = "UPDATE bookings SET checking_status = '2', booking_ref = '$booking_ref' WHERE visitor_phone = '$visitor_phone'";
        debug($sql, $typehere);
        $objQuery = mysqli_query($conn, $sql);

        $row = fetch($q);
        $book_id = $row['book_id'];

        $check = "call update_phone_number('$v_id','$booking_ref')";
        debug($check, $typehere);
        $objQuery = mysqli_query($conn, $check);

        $check = "CALL update_booking('$visitor_phone', '$v_id')";
        debug($check, $typehere);
        $objQuery = mysqli_query($conn, $check);
		send_sms($visitor_phone,"Your Visitor Code is $booking_ref");
        debug($send_sms, $typehere);


        // Fetch the response from the stored procedure
        $response = fetch($objQuery);
        $rsp = $response['rsp'];
        $msg = $response['msg'];
        $u_email = 'mosesmumo49@gmail.com';
		$visitor_phone =$response['visitor_phone'];

        if ($rsp == 'False') {
            array_push($result, array("bool_code" => false, "message" => $msg));
            echo json_encode($result);
            // Send email when the result is false
            push_mail2($u_email, "Alerts", $msg, "Alerts", "mosesmumo49@gmail.com");
		
        } else {
            $resultArray = array();
            array_push($resultArray, array("bool_code" => true, "visitor_phone" => $visitor_phone, "booking_ref" => $booking_ref, "v_id" => $v_id));
            echo json_encode(array($resultArray[0]));

            closer($conn);
            debug("=================================================", $typehere);
        }
    }
}






// function confirmvisitor($visitor_phone,$booking_ref) {
//     $conn = connect("visitor");
//     $typehere = "confirmvisitor";
//     debug("=================================================", $typehere);
//     $strSQL = "SELECT v.visitor_name, v.visitor_id, v.visitor_phone, v.booking_date, v.booking_ref, v.visit_date_time,v.checking_status, v.member_name, m.member_name, m.phone
//         FROM bookings v
//         LEFT JOIN tbl_members m ON m.member_name = v.member_name
//         WHERE v.visitor_phone = '$visitor_phone' and checking_status='1'";
//     $objQuery = mysqli_query($conn, $strSQL);
//     $intNumField = mysqli_num_fields($objQuery);
//     $resultArray = array();
// 	if($_POST['booking_ref'] == ""){
// 		$booking_ref = randomString(6);
// 	}else{
// 		$booking_ref = $_POST['booking_ref'];
// 	}
// 	$sql = "UPDATE bookings SET checking_status= '2' , visitor_code='$booking_ref' WHERE visitor_phone='$visitor_phone'";
// 	debug($sql, $typehere);
// 	$objQuery = mysqli_query($conn,$sql);



	

//     if (mysqli_num_rows($objQuery) < 1) {
//         debug("You have not been booked as a visitor at Parklands Sports Club", $typehere);
//         echo json_encode(array("confirmvisitor" => array("bool_code" => false, "message" => "You have not been booked as a visitor at Parklands Sports Club")));
//     } else {
		
	
//         while ($obResult = mysqli_fetch_array($objQuery)) {
//             $arrCol = array();
//             for ($i = 0; $i < $intNumField; $i++) {
//                 $arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
//             }

//             try {
//                 array_push($resultArray, $arrCol);
//             } catch (Exception $e) {
//                 debug("Error Reporting " . $e->getMessage(), $typehere);
//             }
//         }

//         debug("Response " . json_encode(array("confirmvisitor" => $resultArray)), $typehere);
//         echo json_encode(array("bool_code" => true,"confirmvisitor" => $resultArray));
//     }

//     closer($conn);
//     debug("=================================================", $typehere);
// }

	




function confirmOTp($otp){
	$conn = connect("visitor");
	$typehere = "otp";
    debug("=================================================",$typehere);
	
	$checkV = "SELECT otp,otp_status FROM tbl_members WHERE otp_status='1' and otp='$otp'";
	debug($checkV,$typehere);
	$q = execute_($checkV,$conn);
	$n = num($q);
	debug("Found ".$n." otp",$typehere);
	$result = array();
	
	if($n < 1){
		debug($otp . " invalid otp", $typehere);
		array_push($result, array("bool_code" => false,"message"=>"Invalid OTP"));
		echo json_encode($result);
	}
    else{
		$sql = "UPDATE tbl_members set otp_status= '2' WHERE otp='$otp'";
 debug($sql, $typehere);
 $objQuery = mysqli_query($conn,$sql);
   
$resultArray = array();
  
array_push($resultArray,array("bool_code" => true));
debug("Response".json_encode(array("bool_code" => true,"otp" => $resultArray)),$typehere);
echo json_encode(array("otp" => $resultArray));
     
      closer($conn);
      debug("=================================================", $typehere);
	}

}



function getmembersvistors($member_id){
	$conn = connect("visitor");
	$typehere = "getmembersvistors";
    debug("=================================================",$typehere);
	$strSQL = "SELECT visitor_name,visitor_id,visitor_phone,booking_date,booking_ref,visit_date_time,member_name from bookings where member_name='$member_id'";
	$objQuery = mysqli_query($conn,$strSQL);
    $intNumField = mysqli_num_fields($objQuery);
    $resultArray = array();
    while ($obResult = mysqli_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i ++) {
             $arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
        }
		
		try {
			array_push($resultArray, $arrCol);
		} catch (Exception $e) {
			debug("Error Reporting ".$e->getMessage(),$typehere);
		}
    }
	debug("Response ".json_encode(array("getmembersvistors" => $resultArray)),$typehere);
    echo json_encode(array("getmembersvistors" => $resultArray));
    closer($conn);
	debug("=================================================",$typehere);

}
function getprofile($user_id){
	$conn = connect("visitor");
	$typehere = "getprofile";
    debug("=================================================",$typehere);
	$strSQL = "SELECT * FROM tbl_members WHERE Member_number='$user_id'";
	$objQuery = mysqli_query($conn,$strSQL);
    $intNumField = mysqli_num_fields($objQuery);
    $resultArray = array();
    while ($obResult = mysqli_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i ++) {
             $arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
        }
		
		try {
			array_push($resultArray, $arrCol);
		} catch (Exception $e) {
			debug("Error Reporting ".$e->getMessage(),$typehere);
		}
    }
	debug("Response ".json_encode(array("getprofile" => $resultArray)),$typehere);
    echo json_encode(array("getprofile" => $resultArray));
    closer($conn);
	debug("=================================================",$typehere);

}

function getDepartments()
{
	$conn = connect("visitor");
	$typehere = "getDepartments";
	debug("===============================================",$typehere);
	
	
		$strSQL = "SELECT * from departments";
	
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"offices" => $resultArray
	));
	mysqli_close($conn);
}

function getmembers()
{
	$typehere = "getmembers";
	debug("=====================================",$typehere);
	$conn = connect("visitor");
	$office_id = $_POST['office_id'];
	if($office_id == "")
		$strSQL ="SELECT * FROM tbl_members";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"bookings" => $resultArray
	));
	mysqli_close($conn);
}


// function registermember($m_number, $m_password, $booking_ref) {
//     $conn = connect("visitor");
//     $typehere = "member";
//     debug("=================================================", $typehere);
//     $checkV = "call member_registration('$m_number')";
//     debug($checkV, $typehere);
//     $q = execute_($checkV, $conn);
//     $n = num($q);
//     debug("Found " . $n . " id no Records", $typehere);
//     $result = array();

//     if ($n > 0) {
//         array_push($result, array("bool_code" => false, "message" => "Member number already registered"));
//         echo json_encode($result);
//     } else {
//         if ($_POST['booking_ref'] == "") {
//             $booking_ref = randomString(6);
//         } else {
//             $booking_ref = $_POST['booking_ref'];
//         }
//         debug("Generated otp " . $booking_ref, $typehere);

//         // Free the result set
//         while ($conn->more_results()) {
//             $conn->next_result();
//             $conn->store_result();
//         }

//         $sql = "INSERT INTO tbl_members(Member_number, member_password, otp) VALUES ('$m_number', MD5('$m_password'), '$booking_ref')";
//         debug($sql, $typehere);
//         $objQuery = execute_($sql, $conn);
// 			send_sms($visitor_phone,"You have not been booked as a visitor at Parklands Sports Club");
// 		debug($send_sms, $typehere);

//         // Free the result set
//         while ($conn->more_results()) {
//             $conn->next_result();
//             $conn->store_result();
//         }

//         $resultArray = array();
//         array_push($resultArray, array("bool_code" => true, "m_number" => $m_number, "m_password" => $m_password, "booking_ref" => $booking_ref));
//         debug("Response" . json_encode(array("bool_code" => true, "booking_ref" => $booking_ref, "member" => $resultArray)), $typehere);
//         echo json_encode(array($resultArray[0]));

//         closer($conn);
//         debug("=================================================", $typehere);
//     }
// }

function registermember($m_number, $m_password, $booking_ref) {
    $conn = connect("visitor");
    $typehere = "member";
    debug("=================================================", $typehere);

    // Make an HTTP request to validate the member number
    $validateUrl = "http://192.168.0.201:8002/membersignotp?member_number=" . urlencode($m_number);
    $validateResponse = file_get_contents($validateUrl);
    $validateData = json_decode($validateResponse, true);
    
    if ($validateData['state'] != 200) {
        // Member number is not valid
        $result = array();
        array_push($result, array("bool_code" => false, "message" => "Invalid Member Number"));
        echo json_encode($result);
    } else {
        // Member number is valid, retrieve phone number from the response
        $phone_number = $validateData['msg'];
        
        if ($_POST['booking_ref'] == "") {
            $booking_ref = randomString(6);
        } else {
            $booking_ref = $_POST['booking_ref'];
        }
        debug("Generated otp " . $booking_ref, $typehere);
        
        // ... (rest of your code for registration)
       // Free the result set
	   while ($conn->more_results()) {
		$conn->next_result();
		$conn->store_result();
	}

	$sql = "INSERT INTO tbl_members(Member_number, member_password, otp) VALUES ('$m_number', MD5('$m_password'), '$booking_ref')";
	debug($sql, $typehere);
	$objQuery = execute_($sql, $conn);
	send_sms($visitor_phone,"Use this verification code to complete registration ".$booking_ref."");
		debug($send_sms, $typehere);

	// Free the result set
	while ($conn->more_results()) {
		$conn->next_result();
		$conn->store_result();
	}

	$resultArray = array();
	array_push($resultArray, array("bool_code" => true, "m_number" => $m_number, "m_password" => $m_password, "booking_ref" => $booking_ref));
	debug("Response" . json_encode(array("bool_code" => true, "booking_ref" => $booking_ref, "member" => $resultArray)), $typehere);
	echo json_encode(array($resultArray[0]));

	closer($conn);
	debug("=================================================", $typehere);
}
}







function getTimedBookings(){
	$typehere = "getTimedBookings";
	$conn = connect("visitor");
	debug("================================", $typehere);
	$office_id = $_POST['office_id'];
	debug("Got office id as ".$office_id,$typehere);
	if($office_id == "")
		$strSQL = "SELECT b.`book_id`,b.`visitor_name`,b.`visit_date_time` FROM bookings b WHERE b.`visit_date_time` IS NOT NULL";
	else
		$strSQL = "SELECT b.`book_id`,b.`visitor_name`,b.`visit_date_time` FROM bookings b WHERE office_id = '$office_id' and b.`visit_date_time` IS NOT NULL";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"bookings" => $resultArray
	));
	mysqli_close($conn);
}

function getAllRegistered(){
	$typehere = "getAllRegistered";
	$conn = connect("visitor");
	debug("================================", $typehere);
	$strSQL = "SELECT r.`registration_name`,r.`registration_id`,r.`registration_dayofbirth`,r.`registration_gender`,r.`registration_phoneNumber` FROM `registration` r";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"registered" => $resultArray
	));
	mysqli_close($conn);
}

function getUpcoming(){
	$conn = connect("visitor");
	$typehere = "getUpcoming";
	debug("================================", $typehere);
	$office_id = $_POST['office_id'];
	debug("Got Office Id as ".$office_id,$typehere);
	if($office_id == "")
		$strSQL = "SELECT TRIM(b.`visitor_name`) as visitor_name,TIMESTAMPDIFF(SECOND,NOW(),visit_date_time) AS howlong FROM bookings b WHERE booking_status IN (0,4) ORDER BY b.`visit_date_time` DESC LIMIT 10";
	else
		$strSQL = "SELECT TRIM(b.`visitor_name`) as visitor_name,TIMESTAMPDIFF(SECOND,NOW(),visit_date_time) AS howlong FROM bookings b WHERE booking_status IN (0,4) and office_id = '$office_id' ORDER BY b.`visit_date_time` DESC LIMIT 10";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"upcoming" => $resultArray
	));
	mysqli_close($conn);
}

function getLogsPerOffice()
{
	$conn = connect("visitor");
	$from_date = $_POST['from_date'];
	$to_date = $_POST['to_date'];
	$office_id = $_POST['office_id'];
	$from_date = date("Y-m-d", strtotime($from_date));
	$to_date = date("Y-m-d", strtotime($to_date));
	$typehere = "getLogsPerOffice";
	debug("Getting getLogsPerOffice ", $typehere);
	$strSQL = "SELECT v_name,v_id,v.`v_time`,o.`suite_no`,o.`occupant`,IFNULL(v_plate,'NONE') AS v_plate  FROM `visitors` v LEFT JOIN offices o ON v.v_office = o.`office_id` where date(v_time) between '$from_date' and '$to_date' and office_id = '$office_id' order by v_time desc";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"visitor_logs" => $resultArray
	));
	mysqli_close($conn);
}

function getAllOffices()
{
	$conn = connect("visitor");
	$typehere = "getAllOffices";
	debug("===============================================",$typehere);
	$office_id = $_POST['office_id'];
	debug("Got Office Id ".$office_id,$typehere);
	debug("Getting getAllOffices ", $typehere);
	if($office_id == "")
		$strSQL = "SELECT office_id,CONCAT(`occupant`,' - ',suite_no) AS occupant FROM `offices` ";
	else
		$strSQL = "SELECT office_id,CONCAT(`occupant`,' - ',suite_no) AS occupant FROM `offices` where office_id = '$office_id'  ";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"offices" => $resultArray
	));
	mysqli_close($conn);
}

function getAllVisitorLogs()
{
	$conn = connect("visitor");
	$typehere = "getAllVisitorLogs";
	$from_date = $_POST['from_date'];
	$to_date = $_POST['to_date'];
	$from_date = date("Y-m-d", strtotime($from_date));
	$to_date = date("Y-m-d", strtotime($to_date));
	debug("Getting getAllVisitorLogs", $typehere);
	$strSQL = "SELECT v_name,v_id,v.`v_time`,o.`suite_no`,o.`occupant`,ifnull(v_plate,'NONE') as v_plate  FROM `visitors` v LEFT JOIN offices o ON v.v_office = o.`office_id` where date(v_time) between '$from_date' and '$to_date' order by v_time desc";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"visitor_logs" => $resultArray
	));
	mysqli_close($conn);
}

function saveComplains()
{
	$c_subject = $_POST['c_subject'];
	$f_name = $_POST['f_name'];
	$comp_mes = $_POST['comp_mes'];
	$user = $_POST['user'];
	$typehere = "saveComplains";
	$conn = connect("visitor");
	$sql = "INSERT INTO tbl_complains(complain_by, complain_subject, complain_message, complain_raised_on,complain_facility)
VALUES ('$user','$c_subject','$comp_mes',now(),'$f_name')";
	debug($sql, $typehere);
	$roww = mysqli_query($conn,$sql);
	debug("Inserted " . $roww, $typehere);
	$num = mysqli_affected_rows($conn);
	if ($num > 0) {
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"addmessage" => "Complain Successfully Saved"
		));
		echo json_encode(array(
			"facilityadd" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"addmessage" => "Failed To Save, Try Again Later"
		));
		echo json_encode(array(
			"facilityadd" => $result
		));
	}

	mysqli_close($conn);
}

function getAllFacilitiesList()
{
	$typehere = "getAllFacilitiesList";
	$conn = connect("visitor");
	$strSQL = "SELECT  facility_id,faility_name FROM facilities";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getSpecialRequests()
{
	$typehere = "getSpecialRequests";
	$conn = connect("visitor");
	$strSQL = "SELECT s.`sp_id`,s.`sp_name` FROM specials s";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"specials" => $resultArray
	));
	mysqli_close($conn);
}

function bookingAction()
{
	$bookingid = $_POST['bookingid'];
	$action = $_POST['action'];
	$typehere = "bookingAction";
	debug("====================================",$typehere);
	$conn = connect("visitor");
	$sql = "UPDATE bookings SET booking_status = '$action' WHERE book_id = '$bookingid'";	
	debug($sql, $typehere);
	$roww = mysqli_query($conn,$sql);
	debug("Inserted " . $roww, $typehere);
	$num = mysqli_affected_rows($conn);
	if ($num > 0) {
		$getDetails = "Select * from bookings b left join offices o on o.office_id = b.office_id where book_id = '$bookingid'";
		debug($getDetails, $typehere);
		$q = execute_($getDetails, $conn);
		$w = fetch($q);
		$name = $w['visitor_name'];
		$bdate = $w['booking_date'];
		$btime = $w['booking_time'];
		$office = $w['suite_no'];
		$occupant = $w['occupant'];
		$phone = $w['visitor_phone'];
		switch($action){
			case 1:
			$mes = "Dear ".$name." ,Your booking to see ".$occupant."-".$office." on ".$bdate." ".$btime." has been cancelled.";
			break;
			
			case 2:
			$mes = "Dear ".$name." , ".$occupant."-".$office." will see you now.";
			break;
			
			case 4:
			$mes = "Dear ".$name." , ".$occupant."-".$office." will see you in 30 Mins.";
			break;
			
			case 5:
			$mes = "Dear ".$name." ,Your booking to see ".$occupant."-".$office." on ".$bdate." ".$btime." has been rescheduled.";
			break;
		}
		
		debug($mes,$typehere);
		smsNotification($mes, $url, $phone, 'KAPS');
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"message" => "Successfully Updated"
		));
		echo json_encode(array(
			"bookingaction" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"message" => "Failed To Update, Try Again Later "
		));
		echo json_encode(array(
			"bookingaction" => $result
		));
	}

	mysqli_close($conn);
}

function updateUnavailability()
{
	$bookingid = $_POST['bookingid'];
	$status = $_POST['status'];
	$sid = $_POST['sid'];
	$typehere = "updateUnavailability";
	$conn = connect("visitor");
	$sql = "UPDATE schedules SET s_active = '$status' WHERE s_id = '$sid'";
	debug($sql, $typehere);
	$roww = mysqli_query($conn,$sql);
	debug("updated " . $roww, $typehere);
	$num = mysqli_affected_rows($conn);
	if ($num > 0) {
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"message" => "Successfully Updated"
		));
		echo json_encode(array(
			"scheduleaction" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"message" => "Failed To Update, Try Again Later "
		));
		echo json_encode(array(
			"scheduleaction" => $result
		));
	}

	mysqli_close($conn);
}

function requestFacility()
{
	$typehere = "requestFacility";
	$conn = connect("visitor");
	$f_capacity = $_POST['f_capacity'];
	$f_id = $_POST['f_id'];
	$user = $_POST['user'];
	$b_f_date = $_POST['b_f_date'];
	$b_t_date = $_POST['b_t_date'];
	$special = $_POST['special'];
	$checker = "select * from facilities where facility_id = '$f_id'";
	debug($checker, $typehere);
	$q = execute_($checker, $conn);
	$w = fetch($q);
	$f_cap = $w['facility_capacity'];
	debug("Facility Capacity " . $f_cap, $typehere);
	if ($f_capacity > $f_cap) {
		debug($f_capacity . " is Greater Than " . $f_cap, $typehere);
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"message" => $w['faility_name'] . ' Cannot Accommodate ' . $f_capacity
		));
		echo json_encode(array(
			"requestFacility" => $result
		));
		exit;
	}

	$inserter = "INSERT INTO facility_booking(facility_id, booked_by, booking_date, booked_from, booked_to,booking_capacity,special_request)
	VALUES ('$f_id','$user',now(),'$b_f_date','$b_t_date','$f_capacity','$special')";
	$q = execute_($inserter, $conn);
	debug($inserter, $typehere);
	$n = mysqli_affected_rows($conn);
	if ($n > 0) {
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"message" => 'You Have Successfully Reserved ' . $w['faility_name'] . ' From ' . $b_f_date . ' To ' . $b_t_date . " \nWait for a Confirmation Email"
		));
		$query_log = "INSERT INTO `forgetpass` (`mobile`, `code`,`time`) VALUES ('$phoneSearched', '$codeGenerated','$timestamp')";
		$checker = "SELECT fullnames,email FROM `droster_users` u WHERE u.`user_level` = 2";
		debug($checker, $typehere);
		$q = execute_($checker, $conn);
		$x = fetch($q);
		$fullnames = $x['fullnames'];
		$to = $x['email'];
		$subject = 'Facility Reservation';
		$headers = 'From: noreply@leetech.co.ke';
		$body = 'Dear ' . $fullnames . ', 

				You have received a new Facility Reservation Request for ' . $w['faility_name'] . '

				Follow the link - http://api.leetech.co.ke/medicohome/login/update_password.php?mob=' . $phoneSearched . '&code=' . $codeGenerated . ' to action on it.

				Many thanks, 
				Team NHIF';
		debug("Mail To " . $to, $typehere);
		debug("Mail subject " . $subject, $typehere);
		debug("Mail body " . $body, $typehere);
		debug("Mail headers " . $headers, $typehere);
		mail($to, $subject, $body, $headers);
		echo json_encode(array(
			"requestFacility" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"message" => 'Booking failed, Try again Later'
		));
		echo json_encode(array(
			"requestFacility" => $result
		));
	}

	mysqli_close($conn);
}

function login()
{
    $typehere = "login";
    $conn = connect("visitor");
    $unum = $_POST['unum'];
    $upass = $_POST['upass'];
    $gencode = randomString(6); // Generate the code
    debug("gencode", $genCode);
    $log = "call login_member('$unum','$upass')";
    $q = execute_($log, $conn);
    debug($log, $typehere);
    $w = fetch($q);
    $records = num($q);
    debug("Login Account Records " . $records, $typehere);
    if ($records > 0) {
        // Consume the result set from the stored procedure
        while ($conn->more_results()) {
            $conn->next_result();
            $conn->store_result();
        }

        $updateCode = "UPDATE tbl_members  SET Authentication='$gencode' , auth_status='1' WHERE Member_number='$unum'";
        execute_($updateCode, $conn); // Execute the update statement

        $result = array();
        debug("1", $typehere);
        debug($w, $typehere);
        debug("2", $typehere);
        debug($w[0], $typehere);
        if ($w["result"] == "TRUE") {
            debug("result tru", $typehere);
            array_push($result, array(
                "result" => "TRUE",
                "loginmessage" => "Successful Login",
                "id" => $w['id'],
                "unum" => $_POST['unum'],
                "Member_name" => $w['Member_name'],
                "Member_id" => $w['Member_id'],
                "otp" => $w['otp'],
            ));
            //send_sms("0705051906", "To complete the sign in, enter the verification code " . $gencode . ".");
            debug($send_sms, $typehere);

            debug(json_encode(array(
                "login" => $result
            )), $typehere);
            echo json_encode(array(
                "login" => $result
            ));
        } else {
            debug("result not true", $typehere);

            $result = array();
            array_push($result, array(
                "result" => 'FALSE',
                "loginmessage" => $w["loginmessage"]
            ));
            echo json_encode(array(
                "login" => $result
            ));

        }
        debug("out", $typehere);
        debug($w["result"], $typehere);
    } else {
        $result = array();
        array_push($result, array(
            "result" => 'FALSE',
            "loginmessage" => 'Invalid Credentials'
        ));
        echo json_encode(array(
            "login" => $result
        ));
        exit;
    }

    mysqli_close($conn);
}

function verifyauth($auth){
	$conn = connect("visitor");
	$typehere = "auth";
    debug("=================================================",$typehere);
	
	$checkV = "SELECT Authentication FROM tbl_members WHERE auth_status='1' and Authentication='$auth'";
	debug($checkV,$typehere);
	$q = execute_($checkV,$conn);
	$n = num($q);
	debug("Found ".$n." auth",$typehere);
	$result = array();
	
	if($n < 1){
		debug($auth . " invalid auth", $typehere);
		array_push($result, array("bool_code" => false,"message"=>"Invalid verification code"));
		echo json_encode($result);
	}
    else{
		$sql = "UPDATE tbl_members set auth_status= '2' WHERE Authentication='$auth'";
 debug($sql, $typehere);
 $objQuery = mysqli_query($conn,$sql);
   
$resultArray = array();
  
array_push($resultArray,array("bool_code" => true));
debug("Response".json_encode(array("bool_code" => true,"auth" => $resultArray)),$typehere);
echo json_encode(array("auth" => $resultArray));
     
      closer($conn);
      debug("=================================================", $typehere);
	}

};



function getDashData()
{
	$typehere = "getDashData";
	debug("==============================================",$typehere);
	$conn = connect("visitor");
	$office_id = $_POST['office_id'];
	$member_name = $_POST['member_name'];
	debug("Got Office Id as ".$office_id,$typehere);
	if($office_id == ""){
		$strSQL = "SELECT count(*) as offices from offices";
	}else{
		$strSQL = "SELECT count(*) as offices from offices where office_id = '$office_id'";
	}
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$offices = $obResult['offices'];
		debug("offices " . $offices, $typehere);
	}
	
	if($office_id == ""){
		$strSQL = "SELECT count(*) AS bookings FROM `bookings` where  member_name= '$member_name'";
	}else{
		$strSQL = "SELECT count(*) AS bookings FROM `bookings` where office_id = '$office_id' and member_name= '$member_name'";
	}
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$bookings = $obResult['bookings'];
		debug("bookings " . $bookings, $typehere);
	}
	
	if($office_id == ""){
		$strSQL = "SELECT count(*) as visitors FROM `registration`";
	}else{
		$strSQL = "SELECT count(*) as visitors FROM `registration`";
	}
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$visitors = $obResult['visitors'];
		debug("visitors " . $visitors, $typehere);
	}

	if($office_id == ""){
		$strSQL = "SELECT count(*) as visitors FROM `visitors`";
	}else{
		$strSQL = "SELECT count(*) as visitors FROM `visitors` where v_office = '$office_id'";
	}
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$totvisitors = $obResult['visitors'];
		debug("totvisitors " . $totvisitors, $typehere);
	}

	$result = array();
	array_push($result, array(
		"offices" => $offices,
		"bookings" => $bookings,
		"visitors" => $visitors,
		"totvisitors" => $totvisitors
	));
	echo json_encode(array(
		"dashdata" => $result
	));
}

function saveOffice()
{
	$o_name = $_POST['o_name'];
	$o_occupant = $_POST['o_occupant'];
	$o_phone = $_POST['o_phone'];
	$typehere = "saveOffice";
	$conn = connect("visitor");
	$sql = "INSERT INTO offices(suite_no, occupant, phone_no) VALUES ('$o_name','$o_occupant','$o_phone')";
	debug($sql, $typehere);
	$roww = mysqli_query($conn,$sql);
	debug("Inserted " . $roww, $typehere);
	$num = mysqli_affected_rows($conn);
	if ($num > 0) {
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"addmessage" => $f_name . " Successfully Registered"
		));
		echo json_encode(array(
			"facilityadd" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"addmessage" => "Failed To Register " . $f_name
		));
		echo json_encode(array(
			"facilityadd" => $result
		));
	}

	mysqli_close($conn);
}

function getRevokedReports()
{
	$typehere = "getRevokedReports";
	$conn = connect("visitor");
	$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.`booking_date`,s.`authorized_on`,
			s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized`,
			s.occupied,n.`fullnames` AS authorized_by,s.`revoked_on`,s.`revoked_why`,p.`fullnames` AS revoked_by FROM `facility_booking` s
			LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
			LEFT JOIN `droster_users` n ON n.`id` = s.`authorized_by`
			LEFT JOIN `droster_users` p ON p.`id` = s.`revoked_by`
			LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
			WHERE revoked = 1";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getAuthorizedReports()
{
	$typehere = "getAuthorizedReports";
	$conn = connect("visitor");
	$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.`booking_date`,s.`authorized_on`,
s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized`,s.occupied,n.`fullnames` as authorized_by FROM `facility_booking` s
LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
LEFT JOIN `droster_users` n ON n.`id` = s.`authorized_by`
LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
WHERE booking_authorized = 1";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getOccupiedFacilities()
{
	$typehere = "getOccupiedFacilities";
	$uid = $_POST['uid'];
	$conn = connect("visitor");
	if ($uid == "") {
		$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.`booking_date`,
		s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized`,s.occupied FROM `facility_booking` s
		LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
		LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
		WHERE date(s.booked_from) <= current_date and booking_authorized = 1";
	}
	else {
		$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.`booking_date`,
		s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized`,s.occupied FROM `facility_booking` s
		LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
		LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
		WHERE date(s.booked_from) <= current_date and booking_authorized = 1 and s.booked_by = '$uid'";
	}

	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getBookedFacilities()
{
	$typehere = "getBookedFacilities";
	$conn = connect("visitor");
	$user = $_POST['user'];
	if ($user == "") {
		$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.special_request,s.`booking_date`,
				s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized` FROM `facility_booking` s
				LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
				LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
				WHERE date(s.booking_date) <= current_date";
	}
	else {
		$strSQL = "SELECT  s.`booking_id`,f.`faility_name`,s.`booking_capacity`,s.special_request,s.`booking_date`,
				s.`booked_from`,s.`booked_to`,d.`fullnames`,d.`user_branch`,s.`booking_authorized` FROM `facility_booking` s
				LEFT JOIN `droster_users` d ON d.id = s.`booked_by`
				LEFT JOIN `facilities` f ON f.`facility_id` = s.`facility_id`
				WHERE date(s.booking_date) <= current_date and s.booked_by = '$user'";
	}

	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getFreeFacilitiesList()
{
	$typehere = "getFreeFacilitiesList";
	$conn = connect("visitor");
	$strSQL = "SELECT  facility_id,faility_name FROM facilities where active = 0";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getFreeFacilities()
{
	$typehere = "getFreeFacilities";
	$conn = connect("visitor");
	$strSQL = "SELECT  * FROM facilities where active = 0";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getOffices()
{
	$typehere = "getOffices";
	debug("============================",$typehere);
	$conn = connect("visitor");
	if($_POST['office_id']=="")
		$strSQL = "SELECT  * FROM offices";
	else
		$strSQL = "SELECT  * FROM offices where office_id = '".$_POST['office_id']."'";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"facility" => $resultArray
	));
	mysqli_close($conn);
}

function getPhoneNo(){
	$typehere = "getPhoneNo";
	$v_id = $_POST['v_id'];
	debug("Got booking_ref as ".$booking_ref,$typehere);
	$conn = connect("visitor");
	$query = "SELECT COUNT(*) AS found_,visitor_phone FROM bookings WHERE visitor_id = '$v_id' GROUP BY visitor_phone ORDER BY COUNT(*) DESC LIMIT 1";
	debug($query,$typehere);
	$q = execute_($query,$conn);
	$row = fetch($q);
	$phone =  $row['visitor_phone'];
	debug("Got Phone ".$phone,$typehere);
	echo $phone;
	mysqli_close($conn);
}

function saveBooking()
{
    $v_date = $_POST['v_date'];
    $v_date = date("Y-m-d", strtotime($v_date));
    $v_time = $_POST['v_time'];
    $v_name = $_POST['v_name'];
    $v_id = $_POST['v_id'];
    $v_phone = $_POST['v_phone'];
    $meterperregid = $_POST['meterperregid'];
    $gencode = $_POST['gencode'];
    $member_name = $_POST['member_name'];
	$name = $_POST['name'];
    $visitor_code = $_POST['visitor_code'];
    $zone_id = $_POST['zone_id'];
    $typehere = "saveBooking";
    debug("===========================================", $typehere);
    $visit_date = $_POST['visit_date'];
    $visit_date = date("Y-m-d H:i", strtotime($visit_date));
    debug("Visit date " . $visit_date, $typehere);
    debug("Got booking_ref as " . $booking_ref, $typehere);
	$conn = new mysqli("192.168.0.201", "root", "parklands", "visitor");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $checkV = "call validate_visitor('$member_name','$v_id','$v_phone')";
    debug($checkV, $typehere);

    if (!$conn->multi_query($checkV)) {
        debug("Error: " . $conn->error, $typehere);
        $conn->close();
        return;
    }

    // Process all result sets
    do {
        if ($result = $conn->store_result()) {
            while ($row = $result->fetch_assoc()) {
                if ($row['result'] == 'FALSE') {
                    $validationResult = false;
                    break;
                }
                $validationResult = true;
            }
            $result->free();
        } else {
            if ($conn->errno) {
                debug("Error: " . $conn->error, $typehere);
                $conn->close();
                return;
            }
        }
    } while ($conn->more_results() && $conn->next_result());

    if (!$validationResult) {
        // Display error message if validation failed
        $result = array();
        array_push($result, array(
            "result" => 'FALSE',
            "addmessage" => "Sorry, Monthly Access validity EXCEEDED",
            "book_ref" => ""
        ));
        echo json_encode(array(
            "bookingadd" => $result
        ));

        $conn->close();
        return;
    }
    

    if ($_POST['gencode'] == "") {
        $gencode = randomString(6);
    } else {
        $gencode = $_POST['gencode'];
    }
    debug("Generated gencode " . $gencode, $typehere);

    if ($_POST['visitor_code'] == "") {
        $visitor_code = randomString(6);
    } else {
        $visitor_code = $_POST['visitor_code'];
    }
    debug("Generated visitor_code " . $visitor_code, $typehere);

    // $sql = "call create_booking('$v_name','$v_id','$v_phone','$v_date','$v_time','$gencode','$visit_date','$member_name','$visitor_code','$zone_id')";
    $sql = "INSERT INTO bookings(visitor_name, visitor_phone, booking_date, booking_time, record_time,booking_ref,
        visit_date_time,member_name,visitor_code)
        VALUES ('$v_name','$v_phone','2023-07-01',NOW(),'2023-07-01','$gencode','$visit_date','$member_name','$visitor_code')";
    debug($sql, $typehere);
    $roww =execute_($sql, $conn);
	$num = mysqli_affected_rows($conn);


    debug("Inserted " . $roww, $typehere);
    if ($num > 0) {
        send_sms($v_phone,"Dear ".$v_name." You have been booked as a visitor at Parklands Sports Club by ".$name." on . Please present this message and your ID or Passport upon arrival at the Club Main reception.");
        debug($send_sms, $typehere);
        //smsNotification($sms, $url, $v_phone, '');
        $result = array();
        array_push($result, array(
            "result" => 'TRUE',
            "addmessage" => "Successfully Booked",
            "gencode" => $gencode
        ));
        echo json_encode(array(
            "bookingadd" => $result
        ));
    } else {
        $result = array();
        array_push($result, array(
            "result" => 'FALSE',
            "addmessage" => "Booking Failed",
            "gencode" => ""
        ));
        echo json_encode(array(
            "bookingadd" => $result
        ));
    }
    mysqli_close($conn);
}

function saveUnavailability()
{
	$from_date = $_POST['from_date'];
	$from_date = date("Y-m-d H:i:s", strtotime($from_date));
	$to_date = $_POST['to_date'];
	$to_date = date("Y-m-d H:i:s", strtotime($to_date));
	$meterperregid = $_POST['meterperregid'];
	$typehere = "saveUnavailability";
	$conn = connect("visitor");
	$sql = "INSERT INTO schedules(office_id, s_from, s_to) VALUES ('$meterperregid','$from_date','$to_date');";
	debug($sql, $typehere);
	$roww = mysqli_query($conn,$sql);
	debug("Inserted " . $roww, $typehere);
	$num = mysqli_affected_rows($conn);
	if ($num > 0) {
		$result = array();
		array_push($result, array(
			"result" => 'TRUE',
			"addmessage" => "Request Successful"
		));
		echo json_encode(array(
			"requestadd" => $result
		));
	}
	else {
		$result = array();
		array_push($result, array(
			"result" => 'FALSE',
			"addmessage" => "Request Failed"
		));
		echo json_encode(array(
			"requestadd" => $result
		));
	}

	mysqli_close($conn);
}

function getBookings()
{
	$typehere = "getBookings";
	debug("=====================================",$typehere);
	$conn = connect("visitor");
	$office_id = $_POST['office_id'];
	if($office_id == "")
		$strSQL = "SELECT book_id,s.`visitor_name`,s.`visitor_id`,s.`visitor_phone`,s.`booking_date`,s.`booking_time`,b.suite_no,
	s.`record_time`,s.booking_status FROM bookings s LEFT JOIN offices b ON b.`office_id` = s.`office_id` order by record_time desc";
	else
		$strSQL = "SELECT book_id,s.`visitor_name`,s.`visitor_id`,s.`visitor_phone`,s.`booking_date`,s.`booking_time`,b.suite_no,
	s.`record_time`,s.booking_status FROM bookings s LEFT JOIN offices b ON b.`office_id` = s.`office_id` where s.office_id = '$office_id' order by record_time desc";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"bookings" => $resultArray
	));
	mysqli_close($conn);
}

function getUnavailability()
{
	$typehere = "getUnavailability";
	debug("========================================",$typehere);
	$conn = connect("visitor");
	if($_POST['office_id']=="")
		$strSQL = "select s_id,o.`suite_no`,s.`s_from`,s.`s_to`,s.`s_active` from schedules s left join offices o on o.`office_id` = s.`office_id`";
	else
		$strSQL = "select s_id,o.`suite_no`,s.`s_from`,s.`s_to`,s.`s_active` from schedules s left join offices o on o.`office_id` = s.`office_id` where s.office_id = '".$_POST['office_id']."'";
	debug($strSQL, $typehere);
	$objQuery = mysqli_query($conn,$strSQL);
	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while ($obResult = mysqli_fetch_array($objQuery)) {
		$arrCol = array();
		for ($i = 0; $i < $intNumField; $i++) {
			$arrCol[mysqli_fetch_field_direct($objQuery, $i)->name] = $obResult[$i];
		}

		array_push($resultArray, $arrCol);
	}

	echo json_encode(array(
		"schedules" => $resultArray
	));
	mysqli_close($conn);
}

?>