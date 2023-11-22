$(document).ready(function() {
    var page = location.pathname.split('/').slice(-1)[0];
    logger('document loaded ' + page);
    userLogged = sessionStorage.getItem("name");
    userLoggedin = sessionStorage.getItem("user_id");
    logger('User LoggedIn ' + userLogged);
    logger('Uid ' + userLoggedin);
    $('#name').html(userLogged);
    $('#level').html(sessionStorage.getItem("company"));
    if(page == "login"){
		logger("login Page Loaded");
		window.fbAsyncInit = function() {
        FB.init({
            appId      : '1385286528202893',
            xfbml      : true,
            version    : 'v2.8'
        });
        FB.getLoginStatus(function(response){
            if(response.status === 'connected'){
                document.getElementById('status').innerHTML = 'we are connected';
            } else if(response.status === 'not_authorized') {
                 document.getElementById('status').innerHTML = 'we are not logged in.'
            } else {
                document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
            }
        });
    };

    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
	}else if (page == "admin") {
        // var initial = getIntials(sessionStorage.getItem("name"));
        // logger("Initials "+initial);
        // var IntialHtml = '<figure class="avatar mr-2 avatar-sm" data-initial="'+initial+'"></figure>';
        // $('#myinitials').html(IntialHtml);
        // var userInitialsHtml = '<figure class="avatar mr-2 avatar-xl" data-initial="'+initial+'"></figure>';
        // $('#userInitials').html(userInitialsHtml);
        logger("Ni admin page");
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd'
        });

        $(function() {
            $("#consfrom_date").datepicker();
            $("#consto_date").datepicker();
        });
        var currentDate = new Date();
        var myDate = currentDate.addDays(-7);
        $("#consfrom_date").datepicker().datepicker("setDate", myDate);
        $("#consto_date").datepicker().datepicker("setDate", new Date());
		initCalendar();
        getDashData();
		getUpcomingVisits();
		getTimedBookings();
    } else if (page == "office") {
        logger("Offices Page Loaded");
		if(sessionStorage.getItem("user_type") ==1){
			
		}else{
			document.getElementById('addOff').style.display = 'none';
		}
        getRegisteredOffices();
    } else if (page == "groups") {
        logger("Group Page Loaded");
        getRegisteredGroups();
    } else if (page == 'request') {
        logger("Request Page Loaded");
        getRequest();
    } else if (page == 'book_facility') {
        logger("Book Facility Page Loaded");
        document.getElementById('l_specif').style.display = 'none';
        document.getElementById('t_specif').style.display = 'none';
        $.datepicker.setDefaults({
            dateFormat: 'yyyy-mm-dd'
        });

        $("#b_f_date").datepicker({
            format: 'yyyy-mm-dd'
        });
        $("#b_t_date").datepicker({
            format: 'yyyy-mm-dd'
        });
        var currentDate = new Date();
        var myDate = currentDate.addDays(+7);
        $("#b_t_date").datepicker().datepicker("setDate", myDate);
        $("#b_f_date").datepicker().datepicker("setDate", new Date());
        logger("User Level " + sessionStorage.getItem("level"));
        getFreeFacilitiesList();
        if (sessionStorage.getItem("level") == 1) {
            getFreeFacility();
            getMyBookedFacilities();
        } else {
            getFreeFacility();
            getBookedFacility();
        }
        getSpecialRequests();

    } else if (page == "clear_facility") {
        getOccupiedFacility();
    } else if (page == "authReports") {
        $.datepicker.setDefaults({
            dateFormat: 'yyyy-mm-dd'
        });

        $("#f_r_auth_from").datepicker({
            format: 'yyyy-mm-dd'
        });
        $("#f_r_auth_to").datepicker({
            format: 'yyyy-mm-dd'
        });
        var currentDate = new Date();
        var myDate = currentDate.addDays(+7);
        $("#f_r_auth_to").datepicker().datepicker("setDate", myDate);
        $("#f_r_auth_from").datepicker().datepicker("setDate", new Date());
        getFacilityAuthReport();
    } else if (page == "revokeReports") {
        $.datepicker.setDefaults({
            dateFormat: 'yyyy-mm-dd'
        });

        $("#f_r_auth_from").datepicker({
            format: 'yyyy-mm-dd'
        });
        $("#f_r_auth_to").datepicker({
            format: 'yyyy-mm-dd'
        });
        var currentDate = new Date();
        var myDate = currentDate.addDays(+7);
        $("#f_r_auth_to").datepicker().datepicker("setDate", myDate);
        $("#f_r_auth_from").datepicker().datepicker("setDate", new Date());
        getFacilityRevokeReport();
    } else if (page == "makeComplain") {
        logger("Make Complain Page Loaded");
        getAllFacilitiesList();
        if (sessionStorage.getItem("level") == 1) {
            //getMyComplains();
        } else {
            //getAllComplains();
        }
    } else if (page == "visitors") {
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd'
        });

        $(function() {
            // Initialize datepickers
            $("#consfrom_date").datepicker();
            $("#consto_date").datepicker();
          
            // Get the current date and time
            var currentDate = new Date();
            var formattedDate = currentDate.toLocaleString();
          
            // Subtract 7 days from the current date
            var myDate = new Date();
            myDate.setDate(currentDate.getDate() - 7);
            var formattedMyDate = myDate.toLocaleString();
          
            // Set the initial values of the datepickers
            $("#consfrom_date").datepicker("setDate", formattedMyDate);
            $("#consto_date").datepicker("setDate", formattedDate);
          });
          
        getAllLogs();
        getAllOffices();
    } else if (page == "bookings") {
        $('#bookingss').html('Loading');
        logger("Bookings Loaded");
        $(function() {
            $("#consfrom_date").datepicker();
            $("#consto_date").datepicker();
        });
        var currentDate = new Date();
        var myDate = currentDate.addDays(-7);
        $("#consfrom_date").datepicker().datepicker("setDate", myDate);

        getAllOffices();
        getBookings();
    }else if (page == "schedules") {
        $('#bookingss').html('Loading');
        logger("Bookings Loaded");
        $(function() {
            $('#consfrom_date').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });
            $('#consto_date').datetimepicker({
                format: 'DD-MM-YYYY HH:mm'
            });
        });
        getAllOffices();
        getSchedules();
    }else if(page == "register"){
		$('#cswaterflowtables').html('Loading');
		getAllRegistered();
	}else if(page == "members"){
        $('#bookingss').html('Loading');
        logger("Bookings Loaded");
        getAllOffices();
     
       
    }else if(page == "staff"){
        getDepartments();
    }
    else if (page == "profile"){
        getprofile();
    }else if (page == "visitor") {
      getmembersvistors();
    }
});

var myurl = "http://localhost:8080/member/visitorAdmin/visitorapi/visitorAPI.php";
//var myurl = "http://localhost/visitoradmin/visitorapi/visitorAPI.php";
logger("Using Url " + myurl);
var cqassigned = "";
var userLoggedin = "";
var userLogged = "";
var booking_ref = "";

function getmembersvistors() {
    console.log("this are visitors");
    var member_id = sessionStorage.getItem("num");
    console.log("iiiiid", member_id);
    var dataString = {
        'request': 32,
        'member_id': member_id,
    };

    console.log("hh", Response);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function (data) {
            console.log(data); // Check the response in the browser console

            var ResponseJSON = JSON.parse(data);
            var tbHTML = "";
            for (var i = 0; i < ResponseJSON.getmembersvistors.length; i++) {
                var visitor_name = ResponseJSON.getmembersvistors[i].visitor_name;
                var visitor_id = ResponseJSON.getmembersvistors[i].visitor_id;
                var visitor_phone = ResponseJSON.getmembersvistors[i].visitor_phone;
				var booking_date = ResponseJSON.getmembersvistors[i].booking_date;
				var booking_ref = ResponseJSON.getmembersvistors[i].booking_ref;
				var visit_date_time = ResponseJSON.getmembersvistors[i].visit_date_time;

                tbHTML += "<tr><td>" + visitor_name + "</td><td>" + visitor_id + "</td><td>" + visitor_phone + "</td><td>" + booking_date + "</td><td>" + booking_ref + "</td><td>" + visit_date_time + "</td></tr>";
            }

            tbHTML = '<table class="table table-striped table-hover" id="projectsTablesa" style="width:100%; margin: 0 auto;"><thead><tr><th>Visitor Name</th><th>Visitor ID</th><th>Visitor Phone</th><th>Booking Date</th><th>Booking Ref</th><th>Visitor Date/Time</th></tr></thead><tbody>' + tbHTML + '</tbody></table>';
            $('#projects-tablesa').html(tbHTML);

            $('#projectsTablesa').DataTable({
                "iDisplayLength": 10,
                dom: 'lBfrtiBp',
                buttons: [
                    'copy', 'excel', 'csv', 'pdf', 'print'
                ]
            });
        }

    });
}



function getprofile() {
    console.log("these are properties");
    var user_id = sessionStorage.getItem("num");
    console.log("user_id", user_id);
    var dataString = {
        'request': 31,
        'user_id': user_id,
    };

    console.log("hh", Response);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function (data) {
            console.log(data); // Check the response in the browser console

            var ResponseJSON = JSON.parse(data);
            var tbHTML = "";
            for (var i = 0; i < ResponseJSON.getprofile.length; i++) {
                var Member_name = ResponseJSON.getprofile[i].Member_name;
                var phone = ResponseJSON.getprofile[i].phone;
                var Member_number = ResponseJSON.getprofile[i].Member_number;

                tbHTML += "<tr><td>" + Member_name + "</td><td>" + phone + "</td><td>" + Member_number + "</td></tr>";
            }

            tbHTML = '<table class="table table-striped table-hover" id="projectsTablesa" style="width:80%; margin-left:0px"><thead><tr><th>Member Name</th><th>Phone</th><th>Member Number</th></tr></thead><tbody>' + tbHTML + '</tbody></table>';
            $('#projects-tablesa').html(tbHTML);

            $('#projectsTablesa').DataTable({
                "iDisplayLength": 10,
                dom: 'lBfrtiBp',
                buttons: [
                    'copy', 'excel', 'csv', 'pdf', 'print'
                ]
            });
        }

    });
}





function getmembers(){
	logger("this are landlords")
	

	var dataString = {
		'request': 29,
		
		
	};
	logger("hh",Response)
	$.ajax({
		type:"POST",
		url:myurl,
		data: dataString,
		success: async function(data){
logger("this",dataString)
var ResponseJSON = JSON.parse(JSON.stringify(data));
console.log(ResponseJSON);
sessionStorage.setItem('datamst',JSON.stringify(data));
logger("Length of Profile JSON " +ResponseJSON.members.length);
var tbHTML = "";
for (var i = 0; i < ResponseJSON.members.length; i++){
	// var id = ResponseJSON.landlords[i].id;
	var m_name = ResponseJSON.members[i].m_name;
	var m_id = ResponseJSON.members[i].m_id;
	var m_number = ResponseJSON.members[i].m_number;
	var home_club = ResponseJSON.members[i].home_club;
	var dete_joined = ResponseJSON.members[i].dete_joined;
	var c_num = ResponseJSON.members[i].c_num;
	
	var toadd;
	var code;

	var sty = await getnumberproperty(id).then((k)=>k)
	console.log("the main id is",id,sty)

	// $('input[name="id_no"]').val(id_no);
	// $('input[name="first_name"]').val(first_name);
	// $('input[name="last_name"]').val(last_name);
	// $('input[name="phone_number"]').val(phone_number);
	// $('input[name="properties"]').val(properties);
	// $('input[name="user_email"]').val(user_email);

	toadd= "<a  onclick = 'setting("+")' data-toggle='tooltip' title='' data-original-title='Edit'><i class='fas fa-pencil-alt'></i></a>";
tbHTML +="<tr><td><a href='#'>"+m_name+"</a></td>"+"<td><a href='#'>"+m_id+"</a></td>"+
'<td class="col-green font-weight-bold">'+m_number+'</td>'+
"<td>"+home_club+"</td>"+"<td>"+dete_joined+"</td>"+
"<td>"+c_num+"</td>"+"<td><div class='badge l-bg-"+code+"'>"+toadd+"</div></td></tr>";
}
tbHTML = '<table class="table table-striped table-hover" id="projectsTable" style="width:100%;"><thead><tr><th>ID no</th><th>First name</th><th>Last name</th><th>Phone number</th><th>Properties</th><th>User email</th><th>Edit</th></tr></thead><tbody>'+tbHTML+'</tbody></table>';
$('#projects-table').html(tbHTML)
$('#projectsTable').DataTable({
	"iDisplayLength": 10,
	dom: 'lBfrtiBp',
	       
        button: [
          'copy', 'excel', 'csv', 'pdf', 'print'
         ]
	// buttons: [
	// 	{
	// 		extend: 'copyHtml5',
	// 		exportOptions: {
	// 			columns: [0,1,2,3,4]
	// 		}
	// 	},
	// 	{
	// 		extend: 'excelHtml5',
	// 		exportOptions: {
	// 			columns: [0,1,2,3,4]
	// 		}
	// 	},
	// 	{
	// 		extend: 'pdfHtml5',
	// 		exportOptions: {
	// 			columns: [0,1,2,3,4]
	// 		}
	// 	},
	// 	{
	// 		extend: 'csvHtml5',
	// 		exportOptions: {
	// 			columns: [0,1,2,3,4]
	// 		}
	// 	},
	// 	// 'colvis'
	// ]

});

		
}
	})
}




$('#fblog').click(function() {
    logger("fblog clicked");
	fblogin();
	getInfo();
    return false;
});

 function fblogin(){
        FB.login(function(response){
			logger("Fb Response "+response);
            if(response.status === 'connected'){
                document.getElementById('status').innerHTML = 'we are connected';
            } else if(response.status === 'not_authorized') {
                 document.getElementById('status').innerHTML = 'we are not logged in.'
            } else {
                document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
            }

        });
		return false;
    }
	
	function getInfo() {
        FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
            document.getElementById('status').innerHTML = "Welcome "+response.name;
        });
		return false;
    }

function getAllRegistered() {
    var dataString = {
        'request': 25
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var waterFlowJSON = JSON.parse(data);
            var trHTML = "";
			
			//{"registered":[{"registration_name":"THOMAS KONGOLO","registration_id":"1","registration_dayofbirth":"1993-04-27",
			//"registration_gender":"M","registration_phoneNumber":"0703208072"}
            logger("Length Ya " + waterFlowJSON + " Ni " + waterFlowJSON.registered.length);
            for (var i = 0; i < waterFlowJSON.registered.length; i++) {
                if (i === 0) {
                    trHTML += '<tr><td align="left">' + waterFlowJSON.registered[i].registration_name +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_id +
						'</td><td align="left">' + waterFlowJSON.registered[i].registration_dayofbirth +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_gender +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_phoneNumber +
                        '</td></tr>';
                } else {
                  trHTML += '<tr><td align="left">' + waterFlowJSON.registered[i].registration_name +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_id +
						'</td><td align="left">' + waterFlowJSON.registered[i].registration_dayofbirth +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_gender +
                        '</td><td align="left">' + waterFlowJSON.registered[i].registration_phoneNumber +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"cswaterflowtable\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor ID</strong>\n" +
                "                                                        </th>\n" +
				 "                                                        <th>\n" +
                "                                                            <strong>Visitor DOB</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Gender</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Contact</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#cswaterflowtables').html(trHTML);
            $('#consperregtotals').html(waterFlowJSON.registered.length + " Registered Visitors");
            var oTable = $('#cswaterflowtable').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting all logs ", e);

        }
    });
    return false;
}


function getAllLogs() {
    var from_date = $('#consfrom_date').val();
    var to_date = $('#consto_date').val();
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    var dataString = {
        'request': 20,
        'from_date': from_date,
        'to_date': to_date,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var waterFlowJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + waterFlowJSON + " Ni " + waterFlowJSON.visitor_logs.length);
            for (var i = 0; i < waterFlowJSON.visitor_logs.length; i++) {
                if (i === 0) {
                    trHTML += '<tr><td align="left">' + waterFlowJSON.visitor_logs[i].v_name +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_id +
						'</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_plate +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_time +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].suite_no +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].occupant +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + waterFlowJSON.visitor_logs[i].v_name +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_id +
						'</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_plate +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_time +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].suite_no +
                        '</td><td align="left">' + waterFlowJSON.visitor_logs[i].occupant +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"cswaterflowtable\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor ID</strong>\n" +
                "                                                        </th>\n" +
				 "                                                        <th>\n" +
                "                                                            <strong>Vehicle Plate</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Time Logged</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Suite No</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Occupant</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#cswaterflowtables').html(trHTML);
            $('#consperregtotals').html(waterFlowJSON.visitor_logs.length + " Records");
            var oTable = $('#cswaterflowtable').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting all logs ", e);

        }
    });
    return false;
}

function getDepartments() {
	logger("Getting offices");
	
    var dataString = {
            'request': 30,
		
        };
  
    logger(dataString);
    $('#hloadingmessage').show();
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            $('#hloadingmessage').hide();
            logger('All offices Response ' + data);
            SeriesJSON = data;
            var tryJSON = JSON.parse(data);
            var meterIDs = '<option></option>';
            logger("Length Ya " + tryJSON + " Ni " + tryJSON.offices.length);
            for (var i = 0; i < tryJSON.offices.length; i++) {
                if (i === 0) {
                    meterIDs += "<option value='" + tryJSON.offices[i].office_id + "' selected>" + tryJSON.offices[i].dep_name + "</option>";
                } else {
                    meterIDs += "<option value='" + tryJSON.offices[i].office_id + "'>" + tryJSON.offices[i].dep_name + "</option>";
                }
            }
            $("#zregid").html(meterIDs);
            $("#meterperregidS").html(meterIDs);
        },
        error: function(e) {
            $('#hloadingmessage').hide();
        }

    });
    return false;
} // end of function getAllOffices

function getpropertys(){
    logger("Getting service");  
	var agent_id = JSON.parse(localStorage.getItem("user_id"))
    
    var dataString = {
            'request': 12,
			'agent_id':agent_id
        
        };
  
    logger(dataString);
    $('#hloadingmessage').show();
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            $('#hloadingmessage').hide();
            logger('All description Response ' + data);
            //SeriesJSON = data;
            var serviceJSON =  JSON.parse(JSON.stringify(data));
			sessionStorage.setItem('property',JSON.stringify(data));
            var service = '<option></option>';
            logger("Length Ya " + serviceJSON + " Ni " + serviceJSON.landlord.length);
            for (var i = 0; i < serviceJSON.landlord.length; i++) {
                console.log("the data 1", serviceJSON.landlord[i])
   
                        const dui = {
                            id:serviceJSON.landlord[i].id,
                            property_name:serviceJSON.landlord[i].property_name,
                            //id:serviceJSON.landlord[i].Id
                        }
                        service += `<option value='${JSON.stringify(dui)}' >${serviceJSON.landlord[i].property_name}  </option> `;
                    // }
                   
                    // service += "<option value='" + serviceJSON.service[i].service_id + "'>" + serviceJSON.service[i].services_name + "</option>";
                // }
            }
            
            
            $("#name").html(service);
        },
      
    });
    return false;
}


function getAllOffices() {
	logger("Getting offices");
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    
    var dataString = {
            'request': 21,
			'office_id':office_id
        };
  
    logger(dataString);
    $('#hloadingmessage').show();
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            $('#hloadingmessage').hide();
            logger('All offices Response ' + data);
            SeriesJSON = data;
            var tryJSON = JSON.parse(data);
            var meterIDs = '<option></option>';
            logger("Length Ya " + tryJSON + " Ni " + tryJSON.offices.length);
            for (var i = 0; i < tryJSON.offices.length; i++) {
                if (i === 0) {
                    meterIDs += "<option value='" + tryJSON.offices[i].office_id + "' selected>" + tryJSON.offices[i].occupant + "</option>";
                } else {
                    meterIDs += "<option value='" + tryJSON.offices[i].office_id + "'>" + tryJSON.offices[i].occupant + "</option>";
                }
            }
            $("#zregid").html(meterIDs);
            $("#meterperregid").html(meterIDs);
        },
        error: function(e) {
            $('#hloadingmessage').hide();
        }

    });
    return false;
} // end of function getAllOffices

$('#b_login').on('click', function(event) {
    console.log("b_login clicked");
    var unum = $('input[name = "unum"]').val();
    logger("member number " + unum);
    var upass = $('input[name = "upass"]').val();
    if(unum == ""){
		errorMessage = "Member_number is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("unum").style.borderColor = "red";
		return;	
	}
    else if(upass == ""){
		errorMessage = "Password is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("upass").style.borderColor = "red";
		return;	
	}
    logger("Password " + upass);
	
    var dataString = {
        'unum': unum,
        'upass': upass,
        'request': 27
    };

    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Login Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
			
			 //{"login":[{"result":"TRUE","loginmessage":"Successful Login","user_id":"1","user_pass":"abc123","full_name":"Alex Mulei",
			 //"user_type":"1","user_office":"1","company_name":"KAPS"}]}
			
            var result = jsObject.login[0].result;
            var loginmessage = jsObject.login[0].loginmessage;
			if(result == "TRUE"){
				//#666
				$('#mess').html("Welcome "+jsObject.login[0].Member_name);
				document.getElementById("unum").style.borderColor = "#666";
                document.getElementById("upass").style.borderColor = "#666";
				document.getElementById("mess").style.color = "#666";
				sessionStorage.setItem("name", jsObject.login[0].Member_name);
				sessionStorage.setItem("user_id", jsObject.login[0].Member_id);
                sessionStorage.setItem("num", jsObject.login[0].unum);
				
				window.location = "bookings";
			}else{
				$('#mess').html(loginmessage);
				document.getElementById("unum").style.borderColor = "red";
                document.getElementById("upass").style.borderColor = "red";
				document.getElementById("mess").style.color = "#ff0000";
			}
        },
        error: function(e) {
            alert("An Error Occurred " + e);
        }

    });
    return false;
});

$('#u_saver').click(function() {
    logger("u_saver clicked");
    var from_date = $('#consfrom_date').val();
    logger("From Date " + from_date);
    var to_date = $('#consto_date').val();
    logger("To Date " + to_date);
    var meterperregid = $('#meterperregid').val();
    
    if (from_date == "" || to_date == "" || meterperregid == "") {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
        'from_date': from_date,
        'to_date': to_date,
        'meterperregid': meterperregid,
        'request': 6
    };

    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Booking Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.requestadd[0].result;
            var loginmessage = jsObject.requestadd[0].addmessage;
            alert(loginmessage);
            window.location = 'schedules';
        },
        error: function(e) {
            alert("An Error Occurred " + e);
        }

    });
    return false;
});

function checkPhoneNo(){
	var v_id = $('input[name = "v_id"]').val();
	logger("ID Typed "+v_id);
	var dataString = {
        'v_id': v_id,
        'request': 23
    };

    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Phone Response ' + data);
			document.getElementById("v_phone").value  = data;
        },
        error: function(e) {
            alert("An Error Getting Phone Number " + e);
        }

    });
    return false;
}



// $('#confirmvisitor').on('click', function(e) {
//     console.log("registermember");
//     var visitor_phone = $('input[name="visitor_phone"]').val();
//     var errorMessage;
    
//     if (visitor_phone == "") {
//         errorMessage = "Phone Number is Required";
//         document.getElementById("confrimed").innerText = errorMessage;
//         document.getElementById('confrimed').style.display = 'block';
//         document.getElementById("visitor_phone").style.borderColor = "red";
//         return;
//     }

//     var dataString = {
//         'visitor_phone': visitor_phone,
//         'request': 34
//     };
//     logger(dataString);
//     $.ajax({
//         type: "POST",
//         url: myurl,
//         data: dataString,
//         success: function(data) {
//             console.log("the data is", data);

//             var jsObject = JSON.parse(data);
//             console.log("my object", jsObject[0]);
//             let bool_code = jsObject[0].bool_code;
//             let booking_ref = jsObject[0].booking_ref;
            
//             if (bool_code === true) {
//                 var settings = {
//                     "url": "http://143.244.180.244:5000/api/v1/notifications/sms",
//                     "method": "POST",
//                     "timeout": 0,
//                     "headers": {
//                         "Content-Type": "application/json"
//                     },
//                     "data": JSON.stringify({
//                         "body": `Use this One Time Password ${booking_ref} to complete your registration`,
//                         "phoneNumber": `${visitor_phone}`,
//                         "subject": "subject",
//                         "emailAddress": "recipient"
//                     }),
//                 };

//                 $.ajax(settings).done(function(response) {
//                     console.log(response);
//                 });
                
//                 Swal.fire(
//                     'Success!',
//                     'Insert OTP code that is sent to your phone number to complete registration',
//                     'success'
//                 ).then(function() {
//                     window.location = "confirmotp";
//                 });
//             } else {
//                 // Hide the error message element
//                 document.getElementById('confrimed').style.display = 'none';
//             }
//         }
//     });
//     return false;
// });








// $('#confirmvisitor').on('click', function(e) {
//     console.log("registermember");
//     var visitor_phone = $('input[name="visitor_phone"]').val();
//     console.log("registermember",visitor_phone);
//     var errorMessage;
    
//     // if (visitor_phone == "") {
//     //     errorMessage = "Phone Number is Required";
//     //     document.getElementById("confrimed").innerText = errorMessage;
//     //     document.getElementById('confrimed').style.display = 'block';
//     //     document.getElementById("visitor_phone").style.borderColor = "red";
//     //     return;
//     // }

//     // var dataString = {
//     //     'visitor_phone': visitor_phone,
//     //     'request': 34
//     // };
//     // logger(dataString);
//     // $.ajax({
//     //     type: "POST",
//     //     url: myurl,
//     //     data: dataString,
//     //     success: function(data) {
//     //         console.log("the data is", data);

//     //         var jsObject = JSON.parse(data);
//     //         console.log("my object", jsObject[0]);
//     //         let bool_code = jsObject[0].bool_code;
//     //         let booking_ref = jsObject[0].booking_ref;
            
//     //         if (bool_code === true) {
//     //             var settings = {
//     //                 "url": "http://143.244.180.244:5000/api/v1/notifications/sms",
//     //                 "method": "POST",
//     //                 "timeout": 0,
//     //                 "headers": {
//     //                     "Content-Type": "application/json"
//     //                 },
//     //                 "data": JSON.stringify({
//     //                     "body": `Use this One Time Password ${booking_ref} to complete your registration`,
//     //                     "phoneNumber": `${visitor_phone}`,
//     //                     "subject": "subject",
//     //                     "emailAddress": "recipient"
//     //                 }),
//     //             };

//     //             $.ajax(settings).done(function(response) {
//     //                 console.log(response);
//     //             });
                
//     //             Swal.fire(
//     //                 'Success!',
//     //                 'Insert OTP code that is sent to your phone number to complete registration',
//     //                 'success'
//     //             ).then(function() {
//     //                 window.location = "confirmotp";
//     //             });
//     //         } else {
//     //             // Show the error message element
//     //             document.getElementById("confrimed").innerText = jsObject[0].message;
//     //             document.getElementById('confrimed').style.display = 'block';
//     //         }
//     //     }
//     // });
//     return false;
// });
function clickConfirm() {
    console.log("this is to do confirmation");
    var v_id = $('input[name="v_id"]').val();
    var visitor_phone = $('input[name="visitor_phone"]').val();
    console.log("registermember", visitor_phone);

    var errorMessage;

    // Regular expression to match only numbers
    var numbersRegex = /^[0-9]+$/;

    if (v_id == "") {
        errorMessage = "Visitor ID is Required";
        document.getElementById("confrimed").innerText = errorMessage;
        document.getElementById('confrimed').style.display = 'block';
        document.getElementById("v_id").style.borderColor = "red";
        return;
    } 
    // Check if v_id contains only numbers
    else if (!v_id.match(numbersRegex)) {
        errorMessage = "Visitor ID must contain only numbers";
        document.getElementById("confrimed").innerText = errorMessage;
        document.getElementById('confrimed').style.display = 'block';
        document.getElementById("v_id").style.borderColor = "red";
        return;
    } 
    if (visitor_phone == "") {
        errorMessage = "Phone Number is Required";
        document.getElementById("confrimed").innerText = errorMessage;
        document.getElementById('confrimed').style.display = 'block';
        document.getElementById("visitor_phone").style.borderColor = "red";
        return;
    }
    var dataString = {
        'visitor_phone': visitor_phone,
        'v_id': v_id,
        'request': 34
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            console.log("the data is", data);

            var jsObject = JSON.parse(data);
            console.log("my object", jsObject[0]);
            let bool_code = jsObject[0].bool_code;
            let booking_ref = jsObject[0].booking_ref;

            if (bool_code === true) {
                // $('input[name="v_phone"]').each(function() {
                //     var visitorPhone = $(this).val();
                //     if (visitorPhone) {
                //         var message = `Use this One Time Password ${booking_ref} to complete your verification`;
                //         console.log("this is the message", message);
                //         $.ajax({
                //             type: "POST",
                //             url: "http://localhost:8080/visitor/visitorAdmin/dist/js/sms_gateway.php",
                //             data: {
                //                 phoneNumber: visitorPhone,
                //                 message: message
                //             },
                //             success: function(response) {
                //                 console.log(response);
                //             },
                //             error: function(e) {
                //                 console.error("An Error Occurred sending SMS", e);
                //             }
                //         });
                //     }
                // });

                Swal.fire(
                    'Success!',
                    'Insert OTP code that is sent to your phone number to complete verification',
                    'success'
                ).then(function() {
                    window.location = "verfyingotp.php";
                });
            } else {
                // Show the error message element
                document.getElementById("confrimed").innerText = jsObject[0].message;
                document.getElementById('confrimed').style.display = 'block';

                // var settings = {
                //     "url": "http://143.244.180.244:5000/api/v1/notifications/sms",
                //     "method": "POST",
                //     "timeout": 0,
                //     "headers": {
                //         "Content-Type": "application/json"
                //     },
                //     "data": JSON.stringify({
                //         "body": `Error: ${jsObject[0].message}`,
                //         "phoneNumber": `${visitor_phone}`,
                //         "subject": "subject",
                //         "emailAddress": "recipient"
                //     }),
                // };

                // $.ajax(settings).done(function(response) {
                //     console.log(response);
                // });
            }
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error("An Error Occurred", error);
        }
    });
}





function verifstuuff() {
    console.log("begun running");
    var otp = $('input[name="otp"]').val();
  
      	var errorMessage;
	if(otp == ""){
		errorMessage = "Otp is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("otp").style.borderColor = "red";
		return;	
	}
    else{
        document.getElementById("otp").style.borderColor = "green";
    }
    let dataString = {
        'otp': otp,
        'request': 36
    };
    logger(dataString);

    // First AJAX request to verify OTP
    $.ajax({
        type: "POST",
        url: myurl, // Replace with the actual path to your PHP script
        data: dataString,
        dataType: 'json', // Expecting JSON response from the server
        success: function (response) {
            console.log("Server response", response);

            if (response.hasOwnProperty('otp')) {
                var jsObject = response.otp;
                console.log(jsObject);

                if (jsObject.bool_code) {
                    if (jsObject.valid) {
                        console.log("OTP is valid");

                        // Second AJAX request upon successful verification
                        var settings = {
                            "url": `http://192.168.0.201:8002/openvisitor?otp=${otp}&terminal_id=1`,
                            "method": "GET",
                            "timeout": 0,
                        };

                        $.ajax(settings).done(function (secondResponse) {
                            console.log("Second AJAX request response", secondResponse);

                            // Handle the second AJAX response here
                            // For example, display the response data or perform additional actions
                            // This code will be executed when the second AJAX request is successful
                        });

                        Swal.fire(
                            'Success!',
                            '',
                            'success'
                        ).then(function () {
                            window.location = "index";
                        });
                    } else {
                        console.log("OTP is invalid");
                        Swal.fire(
                            'Error!',
                            jsObject.msg,
                            'error'
                        );
                    }
                } else {
                    console.log("Invalid OTP");
                    Swal.fire(
                        'Error!',
                        jsObject.message,
                        'error'
                    );
                }
            } else {
                console.log("Invalid server response format");
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX error:", error);
            Swal.fire(
                'Error!',
                'An error occurred while processing the request.',
                'error'
            );
        }
    });
}


$('#verifyAuth').on('click', function(e) {
	console.log("otp")
	var auth = $('input[name="auth"]').val();
    var user_id =  (sessionStorage.getItem("user_type"));

	
	var errorMessage;
	if(auth == ""){
		errorMessage = "Verification code is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("auth").style.borderColor = "red";
		return;	
	}
    else{
        document.getElementById("auth").style.borderColor = "green";
    }
	
    
var dataString = {
		'auth':auth,
		'request':37
	};
	logger(dataString)
	$.ajax({
		type: "POST",
		url: myurl,
		data: dataString,
		success: function(data){
			// logger('Register Response' +JSON.stringify(data));
           
            console.log("the data is", data)
            
			var jsObject = JSON.parse(data);
			console.log(jsObject[0]);
			console.log("runnin this part ")
			let messa ="";
            let bool_code = false;
			try{
				messa = jsObject.auth[0].message;
				bool_code = jsObject.auth[0].bool_code;
			}catch(ERR){
				try{
					messa = jsObject[0].message;
					bool_code = jsObject[0].bool_code;
				}catch(err){
					messa = jsObject[0].message;
				bool_code = jsObject[0].bool_code;
				}
				
			}

			

			
			
			logger("bool_code "+bool_code);
			if(bool_code){
				
				Swal.fire(
					'Sucess!',
					'success',
					'success',
					
				  ).then(function(){
                    if (user_id === "3") {
                        window.location = "visitors";
                    } else {
                        window.location = "admin";
                    }
					 })
			}else{
				console.log("the code is data ",messa)
				messa = jsObject[0].message;
				// errorMessage =  jsObject[0].message;
				document.getElementById("confrimed").innerText = messa;
				document.getElementById('confrimed').style.display = 'block';
			}
		}
	})
return false
});

// var logoutTimeout;

// function resetLogoutTimeout() {
//     clearTimeout(logoutTimeout);
//     logoutTimeout = setTimeout(logoutAction, 300000); // 1 minute 60000
//     console.log("Timeout reset");
// }

// function logoutAction() {
//     console.log("Logging out automatically...");
//     // Perform the logout action here
//     // For example, redirect to the logout page
//     window.location.href = "index.php";
//     sessionStorage.clear();
//     localStorage.clear();
// }

// document.addEventListener("click", resetLogoutTimeout);
// document.addEventListener("mousemove", resetLogoutTimeout);
// document.addEventListener("keydown", resetLogoutTimeout);

// resetLogoutTimeout();
// console.log("Automatic logout code initialized");



$('#verifyOtp').on('click', function(e) {
	console.log("otp")
	var otp = $('input[name="otp"]').val();

	
	var errorMessage;
	if(otp == ""){
		errorMessage = "Otp is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("otp").style.borderColor = "red";
		return;	
	}
    else{
        document.getElementById("otp").style.borderColor = "green";
    }
	
    
var dataString = {
		'otp':otp,
		'request':35
	};
	logger(dataString)
	$.ajax({
		type: "POST",
		url: myurl,
		data: dataString,
		success: function(data){
			// logger('Register Response' +JSON.stringify(data));
           
            console.log("the data is", data)
            
			var jsObject = JSON.parse(data);
			console.log(jsObject[0]);
			console.log("runnin this part ")
			let messa ="";
            let bool_code = false;
			try{
				messa = jsObject.otp[0].message;
				bool_code = jsObject.otp[0].bool_code;
			}catch(ERR){
				try{
					messa = jsObject[0].message;
					bool_code = jsObject[0].bool_code;
				}catch(err){
					messa = jsObject[0].message;
				bool_code = jsObject[0].bool_code;
				}
				
			}

			

			
			
			logger("bool_code "+bool_code);
			if(bool_code){
				
				Swal.fire(
					'Sucess!',
					'Please wait as we have sent a message to a member to come and pick you up.',
					'success',
					
				  ).then(function(){
						window.location = "index"
					 })
			}else{
				console.log("the code is data ",messa)
				messa = jsObject[0].message;
				// errorMessage =  jsObject[0].message;
				document.getElementById("confrimed").innerText = messa;
				document.getElementById('confrimed').style.display = 'block';
			}
		}
	})
return false
});

$('#confirmotp').on('click', function(e) {
	console.log("otp")
	var otp = $('input[name="otp"]').val();

	
	var errorMessage;
	if(otp == ""){
		errorMessage = "Otp is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("otp").style.borderColor = "red";
		return;	
	}
    else{
        document.getElementById("otp").style.borderColor = "green";
    }
	
    
var dataString = {
		'otp':otp,
		'request':33
	};
	logger(dataString)
	$.ajax({
		type: "POST",
		url: myurl,
		data: dataString,
		success: function(data){
			// logger('Register Response' +JSON.stringify(data));
           
            console.log("the data is", data)
            
			var jsObject = JSON.parse(data);
			console.log(jsObject[0]);
			console.log("runnin this part ")
			let messa ="";
            let bool_code = false;
			try{
				messa = jsObject.otp[0].message;
				bool_code = jsObject.otp[0].bool_code;
			}catch(ERR){
				try{
					messa = jsObject[0].message;
					bool_code = jsObject[0].bool_code;
				}catch(err){
					messa = jsObject[0].message;
				bool_code = jsObject[0].bool_code;
				}
				
			}

			

			
			
			logger("bool_code "+bool_code);
			if(bool_code){
				
				Swal.fire(
					'Sucess!',
					'You have succesfully completed your registration',
					'success',
					
				  ).then(function(){
						window.location = "login"
					 })
			}else{
				console.log("the code is data ",messa)
				messa = jsObject[0].message;
				// errorMessage =  jsObject[0].message;
				document.getElementById("confrimed").innerText = messa;
				document.getElementById('confrimed').style.display = 'block';
			}
		}
	})
return false
});

function passConfirm() {
	if (document.getElementById("m_password").value ==
	  document.getElementById("m_confirm_password").value) {
	  document.getElementById("Message").style.color = "Green";
	  document.getElementById("Message").innerHTML = "Passwords match!"
	} else {
	  document.getElementById("Message").style.color = "Red";
	  document.getElementById("Message").innerHTML = "Passwords DO NOT match!"
	}
  }

  

$('#registermember').on('click', function(e) {
	console.log("registermember")
	
	
	var m_number = $('input[name ="m_number"]').val();
	
	var m_password = $('input[name = "m_password"]').val();
    var m_confirm_password = $('input[name = "m_confirm_password"]').val();
	
    var booking_ref =$("#booking_ref").val();
	
	
	
	var errorMessage;
	

	 if(m_number == ""){
		errorMessage = "Member_number is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("m_number").style.borderColor = "red";
		return;	
	}

    else if(m_password == ""){
		errorMessage = "Password is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("m_password").style.borderColor = "red";
		return;	
	}
    else if(m_confirm_password == ""){
		errorMessage = "Confirm password is Required";
		document.getElementById("confrimed").innerText = errorMessage;
		document.getElementById('confrimed').style.display = 'block';
		document.getElementById("m_confirm_password").style.borderColor = "red";
		return;	
	}


    
var dataString = {
		
	
		'm_number':m_number,
		'm_password':m_password,
		'booking_ref':booking_ref,
        // 'm_confirm_password':m_confirm_password,
		'request':28
	};
	logger(dataString)
	$.ajax({
		type: "POST",
		url: myurl,
		data: dataString,
		success: function(data){
			// logger('Register Response' +JSON.stringify(data));
           
            console.log("the data is", data)
            
			var jsObject = JSON.parse(data);
			console.log(jsObject[0]);
			console.log("runnin this part ")
			let messa ="";
			let bool_code = jsObject[0].bool_code;
            let booking_ref = jsObject[0].booking_ref;
            // var settings = {
            //     "url": "http://143.244.180.244:5000/api/v1/notifications/sms",
            //     "method": "POST",
            //     "timeout": 0,
            //     "headers": {
            //       "Content-Type": "application/json"
            //     },
            //     "data": JSON.stringify({
            //       "body": `Use this One Time Password ${booking_ref} to complete your registration`,
            //       "phoneNumber": `0705051906`,
            //       "subject": "subject",
            //       "emailAddress": "recipient"
            //     }),
            //   };

            //   $('input[name="v_phone"]').each(function() {
            //     var visitorPhone = $(this).val();
            //     if (visitorPhone) {
            //         var message = `Use this One Time Password ${booking_ref} to complete your registration`;
            // console.log("this is the message",message)
            //         $.ajax({
            //             type: "POST",
            //             url: "http://localhost:8080/visitor/visitorAdmin/dist/js/sms_gateway.php", // Use the intermediary script
            //             data: {
            //                 phoneNumber: `0705051906`,
            //                 message: message
            //             },
            //             success: function(response) {
            //                 console.log(response); // Handle the response from the PHP script
            //             },
            //             error: function(e) {
            //                 console.error("An Error Occurred sending SMS", e);
            //             }
            //         });
            //     }
            // });

              
            //   $.ajax(settings).done(function (response) {
            //     console.log(response);
            //   });

            
            if(!bool_code){
                messa = jsObject[0].message;
				bool_code = jsObject[0].bool_code;
            }
			// try{
               
				
			// }catch(ERR){
				
			// }

			
			
			logger("bool_code "+bool_code);
			if(bool_code){
				// swal(jsObject.register[0].message,"Success",'success').then(function(){
				//     window.location = "index"
				// })
				Swal.fire(
					'Sucess!',
					'Insert OTP code that is sent to your phone number to complete registration',
					'success',
					
				  ).then(function(){
						window.location = "confirmotp"
					 })
			}else{
				console.log("the code is data ",messa)
				messa = jsObject[0].message;
				// errorMessage =  jsObject[0].message;
				document.getElementById("confrimed").innerText = messa;
				document.getElementById('confrimed').style.display = 'block';
			}
		}
	})
return false
});	


// $('#b_saver').click(function() {
//     logger("consfilter clicked");
//     var visit_date = $('#consfrom_date').val();
//     logger("Visit Date " + visit_date);
//     var v_date = visit_date.substring(0, 10);
//     logger("v_date " + v_date);
//     var v_time = visit_date.substring(11, 16);
//     logger("v_time " + v_time);
//     var v_name = $('input[name = "v_name"]').val();
//     // var v_id = $('input[name = "v_id"]').val();
//     var v_phone = $('input[name = "v_phone"]').val();
//     // var meterperregid = $('#meterperregid').val();
// 	//var member_id =  sessionStorage.getItem("user_id");
//     var member_name =  sessionStorage.getItem("num");
// 	var name =  sessionStorage.getItem("name");

//     if (visit_date == "" || v_name == "" ) {
//         alert("Fill in all fields.");
//         return;
//     }

//     var dataString = {
//     	'visit_date':visit_date,
//         'v_date': v_date,
//         'v_time': v_time,
//         'v_name': v_name,
//         // 'v_id': v_id,
//         'v_phone': v_phone,
//         // 'meterperregid': meterperregid,
// 		//'member_id': member_id,
//         'member_name':member_name,
// 		'name':name,
//         'request': 4,
// 		'booking_ref':booking_ref
//     };

//     logger(dataString);
//     $.ajax({
//         type: "POST",
//         url: myurl,
//         data: dataString,
//         success: function(data) {
//             logger('Booking Add Response ' + data);
//             var jsObject = JSON.parse(data);
//             logger(jsObject);
//             var result = jsObject.bookingadd[0].result;
//             console.log('results',result)
//             let bool_code = jsObject[0].bool_code;
//             console.log("this is my bool",bool_code);
// 			var book_ref = jsObject.bookingadd[0].book_ref;
// 			var loginmessage = jsObject.bookingadd[0].addmessage;
//             if (bool_code === true){
// 			var settings = {
//                 "url": "http://143.244.180.244:5000/api/v1/notifications/sms",
//                 "method": "POST",
//                 "timeout": 0,
//                 "headers": {
//                   "Content-Type": "application/json"
//                 },
//                 "data": JSON.stringify({
//                   "body": `Dear ${v_name},You have been booked as visitor at Parklands Sports Club by ${name}.Please present this message and your ID or Passport upon arrival at the club`,
//                   "phoneNumber": `${v_phone}`,
//                   "subject": "subject",
//                   "emailAddress": "recipient"
//                 }),
//               };
              
//               $.ajax(settings).done(function (response) {
//                 console.log(response);
//               });
// 			if(result == "TRUE"){
// 				var answer = confirm("Successfully Saved, Ref: "+book_ref+"")
// 				if (answer) {
// 					booking_ref = book_ref;
// 					document.getElementById("v_name").value  = "";
// 					document.getElementById("v_id").value  = "";
// 					document.getElementById("v_phone").value  = "";
// 				}
//             }else {
// 					booking_ref = "";
// 					window.location = 'bookings';
// 				}
// 			}else{
// 				alert(loginmessage);
// 				window.location = 'bookings';
// 			}
//         },
//         error: function(e) {
//             alert("An Error Occurred saving booking" + e);
//         }

//     });
//     return false;
// });




const addbook  =  () =>{
 
    logger("consfilter clicked");
    var visit_date = $('#consfroms_date').val();
    logger("Visit Date " + visit_date);
    var v_date = visit_date.substring(0, 10);
    logger("v_date " + v_date);
    var v_time = visit_date.substring(11, 16);
    logger("v_time " + v_time);
    var v_name = $('input[name = "v_name"]').val();
    // var v_id = $('input[name = "v_id"]').val();
    var v_phone = $('input[name = "v_phone"]').val();
    // var meterperregid = $('#meterperregid').val();
	//var member_id =  sessionStorage.getItem("user_id");
    var member_name =  sessionStorage.getItem("num");
	var name =  sessionStorage.getItem("name");

    if (visit_date == "" || v_name == "" ) {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
    	'visit_date':visit_date,
        'v_date': v_date,
        'v_time': v_time,
        'v_name': v_name,
        // 'v_id': v_id,
        'v_phone': v_phone,
        // 'meterperregid': meterperregid,
		//'member_id': member_id,
        'member_name':member_name,
		'name':name,
        'request': 4,
		'booking_ref':booking_ref
    };

    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            console.log("the data is", data);

            var jsObject = JSON.parse(data);
            console.log("my object", jsObject);
            if (jsObject.hasOwnProperty('bookingadd') && Array.isArray(jsObject.bookingadd) && jsObject.bookingadd.length > 0) {
              let result = jsObject.bookingadd[0].result;
              var gencode = jsObject.bookingadd[0].gencode;
              console.log("Result:", result);
              console.log("Book Ref:", gencode);
            
              if (result === "TRUE") {
                // $('input[name="v_phone"]').each(function() {
                //     var visitorPhone = $(this).val();
                //     if (visitorPhone) {
                //         var message = `Dear ${v_name}, You have been booked as a visitor at Parklands Sports Club.  Please present this message and your ID or Passport upon arrival at the club`;
                // console.log("this is the message",message)
                //         $.ajax({
                //             type: "POST",
                //             url: "http://localhost:8080/visitor/visitorAdmin/dist/js/sms_gateway.php", // Use the intermediary script
                //             data: {
                //                 phoneNumber: visitorPhone,
                //                 message: message
                //             },
                //             success: function(response) {
                //                 console.log(response); // Handle the response from the PHP script
                //             },
                //             error: function(e) {
                //                 console.error("An Error Occurred sending SMS", e);
                //             }
                //         });
                //     }
                // });

                // $.ajax(settings).done(function(response) {
                //     console.log(response);
                // });
                
                Swal.fire(
                    'Success!',
                    'You have successfully booked your visitor',
                    'success'
                ).then(function() {
                    window.location = "bookings";
                });
            } else {
                // Show the error message element
                document.getElementById("confrimed").innerText = jsObject.bookingadd[0].addmessage;
                document.getElementById('confrimed').style.display = 'block';
            }
        }
    }
    });
    

}

$('#consfilter').click(function() {
    $('#cswaterflowtables').html('Loading');
    logger("consfilter clicked");
    var from_date = $('#consfrom_date').val();
    var to_date = $('#consto_date').val();
    var office_id = $('#meterperregid').val();
    logger("Office ID " + office_id);
    if (from_date != '' && to_date != '') {
        var dataString = {
            'request': 22,
            'from_date': from_date,
            'to_date': to_date,
            'office_id': office_id
        };
        logger(dataString);
        var myTrip = new Array();
        $.ajax({
            type: "POST",
            url: myurl,
            data: dataString,
            success: function(data) {
                logger(data);
                var waterFlowJSON = JSON.parse(data);
                var trHTML = "";
                logger("Length Ya " + waterFlowJSON + " Ni " + waterFlowJSON.visitor_logs.length);
                for (var i = 0; i < waterFlowJSON.visitor_logs.length; i++) {
                    if (i === 0) {
                        trHTML += '<tr><td align="left">' + waterFlowJSON.visitor_logs[i].v_name +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_id +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_time +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].suite_no +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].occupant +
                            '</td></tr>';
                    } else {
                        trHTML += '<tr><td align="left">' + waterFlowJSON.visitor_logs[i].v_name +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_id +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].v_time +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].suite_no +
                            '</td><td align="left">' + waterFlowJSON.visitor_logs[i].occupant +
                            '</td></tr>';
                    }
                }
                trHTML = "                                            <table id=\"cswaterflowtable\" class=\"table table-bordered\">\n" +
                    "                                                <thead>\n" +
                    "                                                    <tr>\n" +
                    "                                                        <th>\n" +
                    "                                                            <strong>Visitor Name</strong>\n" +
                    "                                                        </th>\n" +
                    "                                                        <th>\n" +
                    "                                                            <strong>Visitor ID</strong>\n" +
                    "                                                        </th>\n" +
                    "                                                        <th>\n" +
                    "                                                            <strong>Time Logged</strong>\n" +
                    "                                                        </th>\n" +
                    "                                                        <th>\n" +
                    "                                                            <strong>Suite No</strong>\n" +
                    "                                                        </th>\n" +
                    "                                                        <th>\n" +
                    "                                                            <strong>Occupant</strong>\n" +
                    "                                                        </th>\n" +
                    "                                                    </tr>\n" +
                    "                                                </thead>\n" +
                    "                                            <tbody>" + trHTML + "</tbody></table>";
                $('#cswaterflowtables').html(trHTML);
                $('#consperregtotals').html(waterFlowJSON.visitor_logs.length + " Records");
                var oTable = $('#cswaterflowtable').DataTable({
                    "iDisplayLength": 10,
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ]
                });
            },
            error: function(e) {
                logger("error getting filter data ", e);

            }
        });
    } else {
        alert("Please Select Date");
    }
    return false;
});

$('#seealloffices').on('click', function(e) {
    logger("seealloffices CLICKED");
    var dataString = {
        'request': 5
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Complain Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.facilityadd[0].result;
            var loginmessage = jsObject.facilityadd[0].addmessage;
            alert(loginmessage);
            window.location = 'makeComplain';
        },
        error: function(e) {
            alert("An Error Occurred " + e);
        }

    });
    return false;
});

$('#c_save').on('click', function(e) {
    logger("c_save CLICKED");
    var c_subject = $('input[name = "comp_sub"]').val();
    var f_name = $("#facilityID").val();
    var comp_mes = document.getElementById("comp_mes").value;
    var dataString = {
        'request': 19,
        'c_subject': c_subject,
        'f_name': f_name,
        'comp_mes': comp_mes,
        'user': sessionStorage.getItem("uid")
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Complain Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.facilityadd[0].result;
            var loginmessage = jsObject.facilityadd[0].addmessage;
            alert(loginmessage);
            window.location = 'makeComplain';
        },
        error: function(e) {
            alert("An Error Occurred " + e);
        }

    });
    return false;
});

$('#f_r_revoke_filter').on('click', function(e) {
    logger("f_r_revoke_filter CLICKED");
    getFacilityRevokeReport();
});


function getFacilityRevokeReport() {
    document.getElementById('mybookedFacilitiess').innerHTML = "Loading......";
    var from_date = $('#f_r_auth_from').val();
    var to_date = $('#f_r_auth_to').val();
    var dataString = {
        'request': 17,
        'from_date': from_date,
        'to_date': to_date
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_by +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_by +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_why +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_by +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_by +
                        '</td><td align="left">' + FacilityJSON.facility[i].revoked_why +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"mybookedFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked Members</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Authorized On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Authorized By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Revoked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Revoked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Revoked Why</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#mybookedFacilitiess').html(trHTML);
            $('#mybookedFacilities').html(FacilityJSON.facility.length + " Revoked Requests");
            var oTable = $('#mybookedFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting Revoked facilities " + e);

        }
    });
    return false;
}

$('#f_r_auth_filter').on('click', function(e) {
    logger("f_r_auth_filter CLICKED");
    getFacilityAuthReport();
});

function getFacilityAuthReport() {
    var from_date = $('#f_r_auth_from').val();
    var to_date = $('#f_r_auth_to').val();
    var dataString = {
        'request': 16,
        'from_date': from_date,
        'to_date': to_date
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_by +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_on +
                        '</td><td align="left">' + FacilityJSON.facility[i].authorized_by +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"mybookedFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked Members</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Branch</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Authorized On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Authorized By</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#mybookedFacilitiess').html(trHTML);
            $('#mybookedFacilities').html(FacilityJSON.facility.length + " Authorized Requests");
            var oTable = $('#mybookedFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting Authorized facilities " + e);

        }
    });
    return false;
}

function setUserId(id) {
    logger("Got Uid as " + id);
    userLoggedin = id;
    getUserId(id);
    return false;
}

function confirmifOthers() {
    var selected = $('#requestID').val();
    logger("Selected ID " + selected);
    if (selected == "Other") {
        document.getElementById('l_specif').style.display = 'block';
        document.getElementById('t_specif').style.display = 'block';
    }
    return false;
}

function seconds_to_days_hours_mins_secs_str(seconds)
{ // day, h, m and s
  var days     = Math.floor(seconds / (24*60*60));
      seconds -= days    * (24*60*60);
  var hours    = Math.floor(seconds / (60*60));
      seconds -= hours   * (60*60);
  var minutes  = Math.floor(seconds / (60));
      seconds -= minutes * (60);
  return ((0<days)?(days+" day, "):"")+hours+"h, "+minutes+"m and "+seconds+"s";
}

function initCalendar(){
		var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
        $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          buttonText: {
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
          },
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar !!!
          drop: function (date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            copiedEventObject.backgroundColor = $(this).css("background-color");
            copiedEventObject.borderColor = $(this).css("border-color");

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove();
            }

          }
        });
		return false;
}

function getTimedBookings(){
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
	var dataString = {
        'request': 26,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
		//{"bookings":[{"book_id":"9","visitor_name":"ALEX IVIULEI WELLINGTON","visit_date_time":"2018-08-19 17:00:00"},
            logger(data);
            var FacilityJSON = JSON.parse(data);
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.bookings.length);
            for (var i = 0; i < FacilityJSON.bookings.length; i++) {
				var name = FacilityJSON.bookings[i].visitor_name;
				var visit_date_time = FacilityJSON.bookings[i].visit_date_time;
				logger(name+" , "+ visit_date_time);
				addCalendarEvent(i, visit_date_time, '', name);
            }
        },
        error: function(e) {
            logger("error getting special requests " + e);

        }
    });
    return false;
	
}

function addCalendarEvent(id, start, end, title) {
  var eventObject = {
    id: id,
    start: start,
    title: title,
	backgroundColor: "#f39c12", //yellow
    borderColor: "#f39c12" //yellow
  };
  $('#calendar').fullCalendar('renderEvent', eventObject, true);
}

function getUpcomingVisits(){
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
	var dataString = {
        'request': 24,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
		//"upcoming":[{"visitor_name":"CLEMENT MWAURA","howlong":"318092"}
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            var facilityID = '<option></option>';
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.upcoming.length);
			var myhtml = "";
            for (var i = 0; i < FacilityJSON.upcoming.length; i++) {
				var name = FacilityJSON.upcoming[i].visitor_name;
				var howlong = FacilityJSON.upcoming[i].howlong;
				var conv = seconds_to_days_hours_mins_secs_str(howlong);
				logger(name+" , "+howlong +" , " + conv);
				myhtml+= "<li><span class='handle'><i class='fa fa-ellipsis-v'></i><i class='fa fa-ellipsis-v'></i></span><input type='checkbox' value='' name=''><span class='text'>"+name+"</span><small class='label label-primary'><i class='fa fa-clock-o'></i>"+conv+"</small><div class='tools'><i class='fa fa-edit'></i><i class='fa fa-trash-o'></i></div></li>";
            }
			logger(myhtml);
            $("#upcoming").html(myhtml);
        },
        error: function(e) {
            logger("error getting special requests " + e);

        }
    });
    return false;
	
}

function getSpecialRequests() {
    var dataString = {
        'request': 15
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            var facilityID = '<option></option>';
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.specials.length);
            for (var i = 0; i < FacilityJSON.specials.length; i++) {
                if (i == 0) {
                    facilityID += "<option value='" + FacilityJSON.specials[i].sp_name + "' selected>" + FacilityJSON.specials[i].sp_name + "</option>";
                } else {
                    facilityID += "<option value='" + FacilityJSON.specials[i].sp_name + "'>" + FacilityJSON.specials[i].sp_name + "</option>";
                }
            }
            $("#requestID").html(facilityID);
        },
        error: function(e) {
            logger("error getting special requests " + e);

        }
    });
    return false;
}

function getUserId(id) {
    var dataString = {
        'id': id,
        'request': 0
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Login Response ' + data);
            var jsObject = JSON.parse(data);
            var result = jsObject.login[0].result;
            var loginmessage = jsObject.login[0].loginmessage;
            if (result == "FALSE") {
                alert(loginmessage);
                window.location = 'login';
            } else {
                userLoggedin = jsObject.login[0].uid;
                userLogged = jsObject.login[0].name;

                sessionStorage.SessionName = "uid";
                sessionStorage.setItem("uid", userLoggedin);

                sessionStorage.SessionName = "name";
                sessionStorage.setItem("name", userLogged);

                sessionStorage.SessionName = "password";
                sessionStorage.setItem("password", jsObject.login[0].pass);

                sessionStorage.SessionName = "level";
                sessionStorage.setItem("level", jsObject.login[0].level);

                sessionStorage.SessionName = "level_desc";
                sessionStorage.setItem("level_desc", jsObject.login[0].level_desc);

                logger("User Logged In " + userLoggedin);
            }
        },
        error: function(e) {
            alert("An Error Occurred adding request " + e);
        }

    });
    return false;
}


function getDashData() {
    var member_name = sessionStorage.getItem("num");
    console.log("mbebeyujf",member_name)
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    var dataString = {
        'request': 1,
		'office_id':office_id,
        'member_name':member_name
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Dashboard Data ' + data);
            var jsObject = JSON.parse(data);
            $('#no_of_offices').html(jsObject.dashdata[0].offices);
            $('#no_of_bookings').html(jsObject.dashdata[0].bookings);
            $('#no_of_registered_visitors').html(jsObject.dashdata[0].visitors);
            $('#no_of_all_visitors').html(jsObject.dashdata[0].totvisitors);
        },
        error: function(e) {

        }

    });
    return false;
}

$('#o_saver').on('click', function(e) {
    logger("o_saver CLICKED");
    var o_name = $('input[name = "o_name"]').val();
    var o_occupant = $('input[name = "o_occupant"]').val();
    var o_phone = $('input[name = "o_phone"]').val();

    if (o_name == "" || o_occupant == "" || o_phone == "") {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
        'o_name': o_name,
        'o_occupant': o_occupant,
        'o_phone': o_phone,
        'request': 2
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Facility Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.facilityadd[0].result;
            var loginmessage = jsObject.facilityadd[0].addmessage;
            alert(loginmessage);
            window.location = 'office';
        },
        error: function(e) {
            alert("An Error Occurred " + e);
        }

    });
    return false;
});

function getOccupiedFacility() {
    var user = "";
    if (sessionStorage.getItem("level") == 1) {
        user = sessionStorage.getItem("uid");
    }
    var dataString = {
        'request': 13,
        'uid': user

    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                var toadd = "";
                var authaction = "";
                var booking_id = FacilityJSON.facility[i].booking_id;
                var authbuttonid = "auth" + booking_id;
                var canacelbuttonid = "cancelauth" + booking_id;
                var fasta = "";
                logger("Facility Occupied " + FacilityJSON.facility[i].occupied);
                if (FacilityJSON.facility[i].occupied == "0") {
                    authaction = booking_id + "," + 1;
                    fasta = '<span class="label label-info">Not Occupied</span>';
                    toadd = '<td align = "left"> <input type = "button" class="btn btn-success" id="' + authbuttonid + '" value="Occupy" class="save" onclick="markoccupied(' + authaction + ')"> </td>';
                } else if (FacilityJSON.facility[i].occupied == "1") {
                    fasta = '<span class="label label-success">Occupied</span>';
                    authaction = booking_id + "," + 0;
                    toadd = '<td align = "left"> <input type = "button" class="btn btn-danger" id="' + authbuttonid + '" value="Clear" class="save" onclick="markoccupied(' + authaction + ')"> </td>';
                } else {
                    toadd = '<td></td>';
                }

                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"registeredFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked Members</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Branch</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Action</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#registeredFacilitiess').html(trHTML);
            $('#registeredFacilities').html(FacilityJSON.facility.length + " Authorized Bookings");
            var oTable = $('#registeredFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting Occupied facilities " + e);

        }
    });
    return false;
}

function getMyBookedFacilities() {
    var user = "";
    if (sessionStorage.getItem("level") == 1) {
        user = sessionStorage.getItem("uid")
    }
    var dataString = {
        'request': 10,
        'user': user
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                var toadd = "";
                var authaction = "";
                var booking_id = FacilityJSON.facility[i].booking_id;
                var authbuttonid = "auth" + booking_id;
                var canacelbuttonid = "cancelauth" + booking_id;
                var fasta = "";
                logger("Facility Status " + FacilityJSON.facility[i].booking_authorized);
                if (FacilityJSON.facility[i].booking_authorized == "0") {
                    authaction = booking_id + "," + 1;
                    fasta = '<span class="label label-danger">Not Authorized</span>';
                    if (sessionStorage.getItem("level") == 1) {
                        toadd = "<td></td>"
                    } else {
                        toadd = '<td align = "left"> <input type = "button" class="btn btn-success" id="' + authbuttonid + '" value="Authorize" class="save" onclick="bookingaction(' + authaction + ')"> </td>';
                    }
                } else if (FacilityJSON.facility[i].booking_authorized == "1") {
                    fasta = '<span class="label label-success">Authorized</span>';
                    authaction = booking_id + "," + 0;
                    if (sessionStorage.getItem("level") == 1) {
                        toadd = "<td></td>"
                    } else {
                        toadd = '<td align = "left"> <input type = "button" class="btn btn-danger" id="' + authbuttonid + '" value="Revoke Auth" class="save" onclick="bookingaction(' + authaction + ')"> </td>';
                    }
                } else {
                    toadd = '<td></td>';
                }

                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].special_request +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].special_request +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"mybookedFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked Members</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Special Request</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Branch</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Action</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#mybookedFacilitiess').html(trHTML);
            $('#mybookedFacilities').html(FacilityJSON.facility.length + " Reserved Facilities");
            var oTable = $('#mybookedFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting booked facilities " + e);

        }
    });
    return false;
}

function getBookedFacility() {
    var dataString = {
        'request': 10
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                var toadd = "";
                var authaction = "";
                var booking_id = FacilityJSON.facility[i].booking_id;
                var authbuttonid = "auth" + booking_id;
                var canacelbuttonid = "cancelauth" + booking_id;
                var fasta = "";
                logger("Facility Status " + FacilityJSON.facility[i].booking_authorized);
                if (FacilityJSON.facility[i].booking_authorized == "0") {
                    authaction = booking_id + "," + 1;
                    fasta = '<span class="label label-danger">Not Authorized</span>';
                    toadd = '<td align = "left"> <input type = "button" class="btn btn-success" id="' + authbuttonid + '" value="Authorize" class="save" onclick="bookingaction(' + authaction + ')"> </td>';
                } else if (FacilityJSON.facility[i].booking_authorized == "1") {
                    fasta = '<span class="label label-success">Authorized</span>';
                    authaction = booking_id + "," + 0;
                    toadd = '<td align = "left"> <input type = "button" class="btn btn-danger" id="' + authbuttonid + '" value="Revoke Auth" class="save" onclick="bookingaction(' + authaction + ')"> </td>';
                } else {
                    toadd = '<td></td>';
                }

                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].special_request +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_capacity +
                        '</td><td align="left">' + FacilityJSON.facility[i].booking_date +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_from +
                        '</td><td align="left">' + FacilityJSON.facility[i].booked_to +
                        '</td><td align="left">' + FacilityJSON.facility[i].fullnames +
                        '</td><td align="left">' + FacilityJSON.facility[i].special_request +
                        '</td><td align="left">' + FacilityJSON.facility[i].user_branch +
                        '</td><td align="left">' + fasta +
                        '</td>' + toadd +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"mybookedFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked Members</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Special Request</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Branch</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Action</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#mybookedFacilitiess').html(trHTML);
            $('#mybookedFacilities').html(FacilityJSON.facility.length + " Reserved Facilities");
            var oTable = $('#mybookedFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting booked facilities " + e);

        }
    });
    return false;
}


function markoccupied(bookingid, action) {
    var dataString = {
        'bookingid': bookingid,
        'action': action,
        'request': 14,
        'user': sessionStorage.getItem("uid")
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Mark Occupied Action Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.bookingaction[0].result;
            var loginmessage = jsObject.bookingaction[0].message;
            alert(loginmessage);
            window.location = 'clear_facility';
        },
        error: function(e) {
            alert("An Error Occurred Mark Occupied " + e);
        }

    });
    return false;
}

function bookingaction(bookingid, action) {
    var reason = "";
    if (action == 0) {
        reason = prompt("Please enter a reason to Revoke", "Authorized Wrongly");
    }
    var dataString = {
        'bookingid': bookingid,
        'action': action,
        'request': 12,
        'user': sessionStorage.getItem("uid"),
        'reason': reason
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Booking Action Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.bookingaction[0].result;
            var loginmessage = jsObject.bookingaction[0].message;
            alert(loginmessage);
            window.location = 'book_facility';
        },
        error: function(e) {
            alert("An Error Occurred Booking Action " + e);
        }

    });
    return false;
}

function getAllFacilitiesList() {
    var dataString = {
        'request': 18
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            var facilityID = '<option></option>';
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                if (i == 0) {
                    facilityID += "<option value='" + FacilityJSON.facility[i].faility_name + "' selected>" + FacilityJSON.facility[i].faility_name + "</option>";
                } else {
                    facilityID += "<option value='" + FacilityJSON.facility[i].faility_name + "'>" + FacilityJSON.facility[i].faility_name + "</option>";
                }
            }
            facilityID += '<option value = Others>Others</option>';
            $("#facilityID").html(facilityID);
        },
        error: function(e) {
            logger("error getting free facilities " + e);

        }
    });
    return false;
}


function getFreeFacilitiesList() {
    var dataString = {
        'request': 11
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            var facilityID = '<option></option>';
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                if (i == 0) {
                    facilityID += "<option value='" + FacilityJSON.facility[i].facility_id + "' selected>" + FacilityJSON.facility[i].faility_name + "</option>";
                } else {
                    facilityID += "<option value='" + FacilityJSON.facility[i].facility_id + "'>" + FacilityJSON.facility[i].faility_name + "</option>";
                }
            }
            $("#facilityID").html(facilityID);
        },
        error: function(e) {
            logger("error getting free facilities " + e);

        }
    });
    return false;
}

function getFreeFacility() {
    var dataString = {
        'request': 8
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {
                var fasta = "";
                logger("Facility Status " + FacilityJSON.facility[i].active);
                if (FacilityJSON.facility[i].active == "0") {
                    fasta = '<span class="label label-success">Open</span>';
                } else if (FacilityJSON.facility[i].active == "2") {
                    fasta = '<span class="label label-danger">Closed</span>';
                } else if (FacilityJSON.facility[i].active == "1") {
                    fasta = '<span class="label label-info">Occupied</span>';
                }
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].facility_desc +
                        '</td><td align="left">' + FacilityJSON.facility[i].facility_capacity +
                        '</td><td align="left">' + fasta +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].faility_name +
                        '</td><td align="left">' + FacilityJSON.facility[i].facility_desc +
                        '</td><td align="left">' + FacilityJSON.facility[i].facility_capacity +
                        '</td><td align="left">' + fasta +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"registeredFacility\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Desc</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Facility Capacity</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#registeredFacilitiess').html(trHTML);
            $('#registeredFacilities').html(FacilityJSON.facility.length + " Available Facilities");
            var oTable = $('#registeredFacility').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting registered facilities " + e);

        }
    });
    return false;
}


function getRegisteredOffices() {
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    var dataString = {
        'request': 3,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var FacilityJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + FacilityJSON + " Ni " + FacilityJSON.facility.length);
            for (var i = 0; i < FacilityJSON.facility.length; i++) {

                if (i == 0) {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].suite_no +
                        '</td><td align="left">' + FacilityJSON.facility[i].occupant +
                        '</td><td align="left">' + FacilityJSON.facility[i].phone_no +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + FacilityJSON.facility[i].suite_no +
                        '</td><td align="left">' + FacilityJSON.facility[i].occupant +
                        '</td><td align="left">' + FacilityJSON.facility[i].phone_no +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"registeredOffice\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Office Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Office Occupant</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Office Contact</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#registeredOfficess').html(trHTML);
            $('#registeredOffices').html(FacilityJSON.facility.length + " Offices");
            var oTable = $('#registeredOffice').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting registered facilities " + e);

        }
    });
    return false;
}

$('#btnaddbooking').on('click',function(){
	window.location = "bookings";
});

$('#g_saver').on('click', function(e) {
    logger("g_saver CLICKED");
    var g_name = $('input[name = "g_name"]').val();
    var g_desc = $('input[name = "g_desc"]').val();

    if (g_name == "" || g_desc == "") {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
        'g_name': g_name,
        'g_desc': g_desc,
        'request': 4,
        'user': sessionStorage.getItem("uid")
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Group Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.groupadd[0].result;
            var loginmessage = jsObject.groupadd[0].addmessage;
            alert(loginmessage);
            window.location = 'groups';
        },
        error: function(e) {
            alert("An Error Occurred adding group " + e);
        }

    });
    return false;
});


function getSchedules() {

	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    var dataString = {
        'request': 7,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var GroupsJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + GroupsJSON + " Ni " + GroupsJSON.schedules.length);
            for (var i = 0; i < GroupsJSON.schedules.length; i++) {
            	 var fasta = "";
            	 var moreActions = "";
            	 var s_id = GroupsJSON.schedules[i].s_id;
                 logger("Group Status " + GroupsJSON.schedules[i].active);
                 if (GroupsJSON.schedules[i].s_active == "1") {
                	 moreActions = '</td><td align="left"><button type="button" class="fa fa-trash-o" style="color:red" onclick="scheduleAction(' + s_id + ',0)"> DeActivate</button>';
                     fasta = '<span class="label label-success">Active</span>';
                 } else {
                	 moreActions = '</td><td align="left"><button type="button" class="fa fa-edit" style="color:blue" onclick="scheduleAction(' + s_id + ',1)"> Activate</button>';
                     fasta = '<span class="label label-info">InActive</span>';
                 }
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + GroupsJSON.schedules[i].suite_no +
                        '</td><td align="left">' + GroupsJSON.schedules[i].s_from +
                        '</td><td align="left">' + GroupsJSON.schedules[i].s_to +
                        '</td><td align="left">' + fasta + moreActions+
                        '</td></tr>';
                } else {
                	 trHTML += '<tr><td align="left">' + GroupsJSON.schedules[i].suite_no +
                     '</td><td align="left">' + GroupsJSON.schedules[i].s_from +
                     '</td><td align="left">' + GroupsJSON.schedules[i].s_to +
                     '</td><td align="left">' +fasta + moreActions+
                     '</td></tr>';
                	 }
            }
            trHTML = "                                            <table id=\"registeredBookings\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Office Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Unavailable From</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Unavailable To</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Action</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#bookingss').html(trHTML);
            $('#receivedBookings').html(GroupsJSON.schedules.length + " Unavailability Schedules");
            var oTable = $('#registeredBookings').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting registered facilities " + e);

        }
    });
    return false;
}


function scheduleAction(sid,status){
	logger('Received '+sid+' and '+status);
	var dataString = {
       'request': 8,
	   'sid':sid,
	   'status':status
     };
	 logger(dataString);
		$.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
			logger('After acc action '+data)
			var actionJSON = JSON.parse(data);
            alert(actionJSON.scheduleaction[0].message);
			window.location = "schedules";
        },
        error: function(e) {
            logger("error gupdating schedules "+e);
        }
    });
}

function bookingAction(bookingid, action) {
   logger("Received "+bookingid+" and "+action);
    var dataString = {
        'bookingid': bookingid,
        'action': action,
        'request': 12
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Booking Action Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.bookingaction[0].result;
            var loginmessage = jsObject.bookingaction[0].message;
            alert(loginmessage);
            window.location = 'bookings';
        },
        error: function(e) {
            alert("An Error Occurred Booking Action " + e);
        }

    });
    return false;
}

function getBookings() {
	var office_id = "";
	if(sessionStorage.getItem("user_type") ==1){
		office_id = "";
	}else{
		office_id = sessionStorage.getItem("user_office");
	}
    var dataString = {
        'request': 5,
		'office_id':office_id
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var GroupsJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + GroupsJSON + " Ni " + GroupsJSON.bookings.length);
            for (var i = 0; i < GroupsJSON.bookings.length; i++) {
            	var book_id = GroupsJSON.bookings[i].book_id;
                var fasta;
                var booking_status = GroupsJSON.bookings[i].booking_status;
                logger("Booking Status " + booking_status);
	                switch(booking_status){
	                case "0":
	                	fasta = '<span class="label label-default">Open</span>';
	                	break;
	                case "1":
	                	fasta = '<span class="label label-danger">Cancelled</span>';
	                	break;
	                case "2":
	                	fasta = '<span class="label label-primary">Ready</span>';
	                	break;
	                case "3":
	                	fasta = '<span class="label label-success">Seen</span>';
	                	break;
	                case "4":
	                	fasta = '<span class="label label-info">30 Mins to</span>';
	                	break;
	                	
	                case "5":
	                	fasta = '<span class="label label-warning">Rescheduled</span>';
	                	break;
	                }
                logger("Fasta "+fasta);
                var added = "<div class='btn-group'>" +
         		"<button type='button' class='btn btn-info'>Action</button>" +
         		"<button type='button' class='btn btn-info dropdown-toggle' data-toggle='dropdown'>" +
         		"<span class='caret'></span>" +
         		"<span class='sr-only'>Toggle Dropdown</span>" +
         		"</button>" +
         		"<ul class='dropdown-menu' role='menu'>" +
         		"<li><a href='javascript:bookingAction("+book_id+",1);'>Cancel</a></li>" +
         		"<li><a href='javascript:bookingAction("+book_id+",2);'>See Now</a></li>" +
         		"<li><a href='javascript:bookingAction("+book_id+",3);'>Seen</a></li>" +
         		"<li><a href='javascript:bookingAction("+book_id+",4);'>See in 30 Mins</a></li>" +
         		"<li class='divider'></li>" +
         		"<li><a href='javascript:bookingAction("+book_id+",5);'>Reschedule</a></li>" +
         		"</ul></div>";
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + GroupsJSON.bookings[i].visitor_name +
                        '</td><td align="left">' + GroupsJSON.bookings[i].visitor_id +
                        '</td><td align="left">' + GroupsJSON.bookings[i].visitor_phone +
                        '</td><td align="left">' + GroupsJSON.bookings[i].booking_date +
                        '</td><td align="left">' + GroupsJSON.bookings[i].booking_time +
                        '</td><td align="left">' + GroupsJSON.bookings[i].suite_no +
                        '</td><td align="left">' + GroupsJSON.bookings[i].record_time +
                        '</td><td align="left">' +fasta+
                        '</td><td align="left">' +added+
                        '</td></tr>';
                } else {
                	 trHTML += '<tr><td align="left">' + GroupsJSON.bookings[i].visitor_name +
                     '</td><td align="left">' + GroupsJSON.bookings[i].visitor_id +
                     '</td><td align="left">' + GroupsJSON.bookings[i].visitor_phone +
                     '</td><td align="left">' + GroupsJSON.bookings[i].booking_date +
                     '</td><td align="left">' + GroupsJSON.bookings[i].booking_time +
                     '</td><td align="left">' + GroupsJSON.bookings[i].suite_no +
                     '</td><td align="left">' + GroupsJSON.bookings[i].record_time +
                     '</td><td align="left">' +fasta+
                     '</td><td align="left">' +added+
                     '</td></tr>';
                	 }
            }
            trHTML = "                                            <table id=\"registeredBookings\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Identification</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visitor Contact</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visit Date</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visit Time</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Visit Office</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Booked On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Action</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#bookingss').html(trHTML);
            $('#receivedBookings').html(GroupsJSON.bookings.length + " Bookings");
            var oTable = $('#registeredBookings').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting registered facilities " + e);

        }
    });
    return false;
}

$('#r_saver').on('click', function(e) {
    logger("r_saver CLICKED");
    var r_name = $('input[name = "r_name"]').val();
    var r_desc = $('input[name = "r_desc"]').val();

    if (r_name == "" || r_desc == "") {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
        'r_name': r_name,
        'r_desc': r_desc,
        'request': 6,
        'user': sessionStorage.getItem("uid")
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Request Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.requestadd[0].result;
            var loginmessage = jsObject.requestadd[0].addmessage;
            alert(loginmessage);
            window.location = 'request';
        },
        error: function(e) {
            alert("An Error Occurred adding request " + e);
        }

    });
    return false;
});

function getRequest() {
    var from_date = $('#consfrom_date').val();
    var to_date = $('#consto_date').val();
    var dataString = {
        'request': 7
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger(data);
            var GroupsJSON = JSON.parse(data);
            var trHTML = "";
            logger("Length Ya " + GroupsJSON + " Ni " + GroupsJSON.request.length);
            for (var i = 0; i < GroupsJSON.request.length; i++) {
                var fasta = "";
                logger("Group Status " + GroupsJSON.request[i].active);
                if (GroupsJSON.request[i].active == "1") {
                    fasta = '<span class="label label-success">Active</span>';
                } else {
                    fasta = '<span class="label label-danger">In-Active</span>';
                }
                if (i == 0) {
                    trHTML += '<tr><td align="left">' + GroupsJSON.request[i].req_name +
                        '</td><td align="left">' + GroupsJSON.request[i].req_desc +
                        '</td><td align="left">' + GroupsJSON.request[i].created_by +
                        '</td><td align="left">' + GroupsJSON.request[i].created_on +
                        '</td><td align="left">' + fasta +
                        '</td></tr>';
                } else {
                    trHTML += '<tr><td align="left">' + GroupsJSON.request[i].req_name +
                        '</td><td align="left">' + GroupsJSON.request[i].req_desc +
                        '</td><td align="left">' + GroupsJSON.request[i].created_by +
                        '</td><td align="left">' + GroupsJSON.request[i].created_on +
                        '</td><td align="left">' + fasta +
                        '</td></tr>';
                }
            }
            trHTML = "                                            <table id=\"requestGroup\" class=\"table table-bordered\">\n" +
                "                                                <thead>\n" +
                "                                                    <tr>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Request Name</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Request Desc</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Registered By</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Registered On</strong>\n" +
                "                                                        </th>\n" +
                "                                                        <th>\n" +
                "                                                            <strong>Status</strong>\n" +
                "                                                        </th>\n" +
                "                                                    </tr>\n" +
                "                                                </thead>\n" +
                "                                            <tbody>" + trHTML + "</tbody></table>";
            $('#requestGroupss').html(trHTML);
            $('#requestGroups').html(GroupsJSON.request.length + " Request(s)");
            var oTable = $('#requestGroup').DataTable({
                "iDisplayLength": 10,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function(e) {
            logger("error getting registered facilities " + e);

        }
    });
    return false;
}

$('#login').on('click', function(e) {
    logger("login CLICKED");
    var uname = $('input[name = "uname"]').val();
    var upass = $('input[name = "upass"]').val();

    if (uname == "" || upass == "") {
        alert("Fill in all fields.");
        return;
    }

    var dataString = {
        'uname': uname,
        'upass': upass,
        'request': 0
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Login Response ' + data);
            var jsObject = JSON.parse(data);
            var result = jsObject.login[0].result;
            var loginmessage = jsObject.login[0].loginmessage;
            if (result == "FALSE") {
                alert(loginmessage);
                window.location = 'login';
            } else {
                userLoggedin = jsObject.login[0].uid;
                userLogged = jsObject.login[0].name;

                sessionStorage.SessionName = "uid";
                sessionStorage.setItem("uid", userLoggedin);

                sessionStorage.SessionName = "name";
                sessionStorage.setItem("name", userLogged);

                sessionStorage.SessionName = "password";
                sessionStorage.setItem("password", jsObject.login[0].pass);

                sessionStorage.SessionName = "level";
                sessionStorage.setItem("level", jsObject.login[0].level);

                sessionStorage.SessionName = "level_desc";
                sessionStorage.setItem("level_desc", jsObject.login[0].level_desc);

                logger("User Logged In " + userLoggedin);
                logger("Redirect to Admin home");
                window.location = 'admin';

            }
        },
        error: function(e) {
            alert("An Error Occurred adding request " + e);
        }

    });
    return false;
});

$('#f_book').on('click', function(e) {
    logger("f_book CLICKED");
    var f_id = $("#facilityID").val();

    var b_f_date = $('#b_f_date').val();
    var b_t_date = $('#b_t_date').val();

    var f_capacity = $('input[name = "f_capacity"]').val();

    if (b_f_date == "" || b_t_date == "" || f_capacity == "") {
        alert("Fill in all fields.");
        return;
    }


    var selected = $('#requestID').val();
    logger("Selected ID " + selected);
    var requested = document.getElementById("t_specif").value;
    logger("Requested " + requested);
    if (selected == "Other" && requested == "") {
        alert("Fill in Your Special Request.");
        return;
    }
    if (selected == "Other") {
        selected = requested;
    }
    logger("Selected ID " + selected);

    var dataString = {
        'b_f_date': b_f_date,
        'b_t_date': b_t_date,
        'f_capacity': f_capacity,
        'f_id': f_id,
        'request': 9,
        'user': sessionStorage.getItem("uid"),
        'special': selected
    };
    logger(dataString);
    $.ajax({
        type: "POST",
        url: myurl,
        data: dataString,
        success: function(data) {
            logger('Request Add Response ' + data);
            var jsObject = JSON.parse(data);
            logger(jsObject);
            var result = jsObject.requestFacility[0].result;
            var loginmessage = jsObject.requestFacility[0].message;
            alert(loginmessage);
            window.location = 'book_facility';
        },
        error: function(e) {
            alert("An Error Occurred requesting facility " + e);
        }

    });
    return false;
});

function number_format(number) {
    var thousands_sep = ",";
    var dec_point = ".";
    var decimals = 2;
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function logger(msg) {
    console.log(msg);
}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};