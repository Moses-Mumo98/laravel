<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="logo.jpg"> 
    <title>Document</title>
</head>
<style>
html,body{
  height: 100%;
  padding: 0;
  margin: 0;
}
body {
  font-family: Arial, Helvetica, Arial, sans-serif;
  margin-bottom: 0; /* Remove bottom margin */
}
*{
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 80%;
  display:flex;
  flex-direction:column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  margin-bottom: 0; /* Remove bottom margin */
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width:350px;
  border: none;
  padding: 20px;
  margin: 20px 0; /* Increase margin vertically */
  border-radius: 25px;
  transition: 0.3s;
  opacity: 0.8;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

button:hover {
  opacity: 1;
}

.button1 {
  background-color: #6DC60C;
  outline: none;
}

.button2 {
  #background-color: #E13319;
  background-color: #909074;
  outline: none;
}

span {
  padding: 15px 20px;
  margin: 10px;
  border: 3px solid #787878;
  font-size: 14px;
  background-color: #D3D3CF;
  border-radius: 15px;
}

.popup1 {
  visibility: hidden;
  align-self: flex-end;
}

.popup2 {
  visibility: hidden;
  align-self: flex-end;
}

</style>
<body>
    <a  style="margin-bottom: 0px; margin-left: 50px;    display: block; text-align: center;" class="navbar-brand">
  <img src="logo.jpg" alt="Logo" style="width: 200px; height: auto; background-color: transparent;">
</a>
      
  <div class="container">
    <div class="buttons">
    <a href="/login">
    <button class="button1">Member</button>
</a>

</a>
      
  <div class="container">
    <div class="buttons">
    <a href="/confirm">
    <button class="button1">Visitor</button>
</a>

      <!-- <button class="button2" onclick="openPage('confirm')">Visitor</button> -->
<button class="button1" onclick="openPage('verfyingotp')">Enter SMS Code</button>
    </div>
    <span class="popup1" onclick="event.stopPropagation()">Thank you!</span>
  </div>


</body>
</html>
