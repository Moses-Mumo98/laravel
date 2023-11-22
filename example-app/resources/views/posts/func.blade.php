<?php
date_default_timezone_set('Africa/Nairobi');
include ('sms_gateway.php');
include('class.smtp.php'); 
include('class.phpmailer.php');

function smsNotification($sms_msg,$url,$recepients_array,$from ){
$username = "kapslimited";
$apiKey     = "a6cf9152c2a4d49a2f1d780f23cdd1a3de4a12baf958d791ce6fc050ce067b5f"; 
$recipients = $recepients_array;
$message = $sms_msg;
$gateway  = new AfricaStalkingGateway($username, $apiKey);
$results  = $gateway->sendMessage($recipients, $message, $from);
if ( count($results) ) {
  foreach($results as $result) {
	log_sms($results,$message);
	debug(" Status: " .$result->status,'smsSender');
  }
} else {
 	debug("Oops, No messages were sent. ErrorMessage: ".$gateway->getErrorMessage(),'smsSender');
	
}
	
}

function   log_sms($results,$message){

$sms_conn=connect('visitor');
	$s='insert into sms_texts (`time_sent`,`phone`,`message`,`gtw`)VALUES("'.date('Y-m-d H:i:s').'","'.$results[0]->number.'","'.$message.'","'.$results[0]->status.'")';
	execute_($s,$sms_conn);
}
function randomString($length) {
	$str = "";
	$characters = array_merge(range('0','9'));
	$max = count($characters) - 1;
	for ($i = 0; $i < $length; $i++) {
		$rand = mt_rand(0, $max);
		$str .= $characters[$rand];
	}
	return $str;
}

function debug($msg, $type)
{
	$filename = "visitorAPItraces/" . date('dmY-H') . "_$type.txt";
	if (!file_exists('visitorAPItraces')) {
		mkdir('visitorAPItraces', '0777');
	}

	if (!$handle = fopen($filename, 'a')) {

	}else{
	if (is_writable($filename)) {
		fwrite($handle, date('Y-m-d H:i:s') . ' - ' . $msg . "\n");
		fclose($handle);
	}
	}
}

function connect($server)
{
	$typehere = 'funcs';
	debug('Initialising ' . $server . 'DB connection....', $typehere);
	switch ($server) {
		
		case "visitor1":
			$ip = "10.20.21.225";
			$u = "labuser";
			$p = "K@pslab";
			$d = 'visitor';
			$port = "1418";
			break;
		
		case "visitor":
			$ip = "localhost";
			$u = "root";
			$p = "";
			$d = 'visitor';
			$port = "3306";
			break;

		// case "visitor":
		// 	$ip = "192.168.0.201";
		// 	$u = "root";
		// 	$p = "parklands";
		// 	$d = 'visitor';
		// 	$port = "3306";
		// 	break;
			

			// case "visitor":
			// 	$ip = "sacs-access";
			// 	$u = "root";
			// 	$p = "parklands";
			// 	$d = 'visitor';
			// 	$port = "3306";
			// 	break
			
		default:
			$ip = "localhost";
			$u = "root";
			$p = "";
			$d = 'droster';
			break;
			
	}

	if ($conn = mysqli_connect($ip, $u, $p,$d,$port)) {
		debug('Connnected to ' . $server, $typehere);
		return $conn;
	}
	else {
		debug('NOT connnected....', $typehere);
		$author = $GLOBALS['author'];
	}
}

function execute_($s, $link)
{
	$typehere = 'execute_';
	debug("Executing " . $s, $typehere);
	if ($q = mysqli_query($link,$s)) {
		return $q;
	}
	else {
		debug(mysqli_error($link) . '<br />  <b> SQL ERROR </b>: ' . $s, $typehere);
	}
}

function fetch($q)
{
	if ($f = mysqli_fetch_assoc($q)) {
		return $f;
	}
	else {
	}
}

function num($q)
{
	if ($n = mysqli_num_rows($q)) {
		return $n;
	}
	else {
		return 0;
	}
}

function createticketserial($opid){
	#create a unique and yet random number
	 if($opid ==6){
		 $divider='123456789';
	 }else if($opid==14){
		$divider='1'; 
	 }
	 $agid = 21;
	
	
	$random1 = floor(10000 + rand(1000,10000)*5);
	$total = strval($random1/1000);
	$timestamper = strval(date('Ymdhis')/$divider) + 0;
	$calc = (($random1 + $timestamper)* 2.3)/0.56;
	$calc2 =floor($calc);
	$total =strval($random1 + $calc2);
	
	
	return $total;
	}

	
	function random_password($length) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $password = substr( str_shuffle( $chars ), 0, $length );
    return $password;
}

 function multiexplode ($delimiters,$string) {
    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}

function push_mail2($email,$mail_msg,$message,$sent_from_user,$sent_from_email){
	$typehere = "SendMail";
	debug("======================================",$typehere);
	debug("Sending Email to " . $email, $typehere);
	debug("Email Message " . $mail_msg, $typehere);
	
	$mail = new PHPMailer;
	$mail->isSMTP();                                      
	$mail->Host = 'smtp.gmail.com'; 
	$mail->Port = 465; // or 587 
	$mail->SMTPAuth = true;                               
	$mail->Username = 'mosesmumo49@gmail.com';                
	$mail->Password = 'qiwqestvhgsuiosf';                           
	$mail->SMTPSecure = 'ssl';  
							  
	debug("hey",$typehere);
	
	$mail->From = $sent_from_email;
	$mail->FromName = $sent_from_user;
	$mail->addAddress('mosesmumo49@gmail.com');     
	
	
	$mail->WordWrap = 50;                                 
	$mail->isHTML(true);                                 
	
	$mail->Subject = $message;
	$mail->Body    = $mail_msg;
	
	if(!$mail->send()) {
		debug('Message could not be sent.',$typehere);
		debug('Mailer Error: ' . $mail->ErrorInfo,$typehere);
	} else {
		debug('Message has been sent',$typehere);
	}
	}
?>