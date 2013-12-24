(function($) {


    var hud = function(raw){
        //console.log(raw.status);
    };
//Application
//Get Projects
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(data){

                    hud(data);
                    var proObs = data.projects;
                    for(var i = 0; i<proObs.length; i++){


                        var cData = proObs[i];
                        var sta = cData.status;

                            switch(sta){
                                case 'urgent':
                                    $('#urgC').text(parseInt($('#urgC').text())+1);
                                    $("#certs-template").tmpl(cData)
                                        .appendTo("#tabs-1");
                                    break;
                                case 'complete':
                                    $('#comC').text(parseInt($('#comC').text())+1);
                                    $("#certs-template").tmpl(cData)
                                        .appendTo("#tabs-2");
                                    break;
                                case 'active':
                                    $('#actC').text(parseInt($('#actC').text())+1);
                                    $("#certs-template").tmpl(cData)
                                        .appendTo("#tabs-3");
                                    break;
                                case 'delayed':
                                    $('#delC').text(parseInt($('#delC').text())+1);
                                    $("#certs-template").tmpl(cData)
                                        .appendTo("#tabs-4");
                                    break;
                            }
                    };
            }
        });
//Get Projects end
//Get tasks
    $.ajax({
        url:'xhr/check_login.php',
        type: 'get',
        dataType: 'json',
        success: function(r){
            console.log(r.user.id);


        $.ajax({
        url: 'xhr/get_tasks.php',
        type: 'get',
        dataType: 'json',
        success: function(data){
            console.log(data);
            hud(data);
            var tasObs = data.tasks;
            for(var i = 0; i<tasObs.length; i++){


                var tData = tasObs[i];
                var sta = tData.status;

                switch(sta){
                    case 'urgent':
                        $('#urgT').text(parseInt($('#urgT').text())+1);
                        $("#tasks-template").tmpl(tData)
                            .appendTo("#tabs-1");
                        break;
                    case 'complete':
                        $('#comT').text(parseInt($('#comT').text())+1);
                        $("#tasks-template").tmpl(tData)
                            .appendTo("#tabs-2");
                        break;
                    case 'active':
                        $('#actT').text(parseInt($('#actT').text())+1);
                        $("#tasks-template").tmpl(tData)
                            .appendTo("#tabs-3");
                        break;
                    case 'delayed':
                        $('#delT').text(parseInt($('#delT').text())+1);
                        $("#tasks-template").tmpl(tData)
                            .appendTo("#tabs-4");
                        break;
                }
            };
        }
    });

        }
    });
//Get Tasks end
//Application End


//Load Landing
    var loadLanding = function(){
        window.open ('index.html', '_self');
        return false;
    };
//Load landing end

//LoadApp
    var loadApp = function(){
        window.open ('certs.html', '_self');
        return false;
    };
//LoadApp End

//Show Login Error
    var showLoginError = function(error){
      if(error == "Username required."){

          $('#loginForm')[0].reset();

          $("#memberID").attr("placeholder", error).css({border: '2px red solid'});
          //$("#memberID").focus(function() {
          //    $(this).css(border: '0px').delay(400);

          //});
      }else if(error == "Password required."){

          $('#loginForm')[0].reset();
          $("#pword").attr("placeholder", error).css({border: '2px red solid'});
      }else{
          $('#loginForm')[0].reset();
          $("#memberID").attr("placeholder", error).css({border: '2px red solid'});
          $("#pword").attr("placeholder", error).css({border: '2px red solid'});
      }
      return false;
    };
//Show Login Error End

//Check Login
    var checkLogin = function(){
                  $.ajax({
                    url:'xhr/check_login.php',
                    type: 'get',
                    dataType: 'json',
                    success: function(r){
                        if(r.error == 'Not logged in.' && window.location.pathname != '/crew%20leader/index.html'){
                            loadLanding();
                            $('#uName').html( r.user.user_n);
                            console.log(r.user.user_n);
                        }else{

                        }
                        return false;
                    }
                  });
    };
    checkLogin();
//Check Login End

//Login / Logout
    $("#loginBtn").click(function(){
          event.preventDefault();
        var user = $('#memberID').val();
        var pass = $('#pword').val();
        var dataString = 'username='+ user + '&password=' + pass;

        $.ajax({
            url: 'xhr/login.php',
            data: dataString,
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response.error);
                    showLoginError(response.error);
                }else{
                    loadApp(user);
                }
                return false;
            }
        });
    });

    $("#btnLogOut").click(function(){
       $.get('xhr/logout.php', function(){
            loadLanding();
        });
        return false;
    });
//Login / Logout End

//Register New User
    $("#regBtn").click(function(){
        event.preventDefault();
        var rUser = $('#regUser').val();
        var rPass = $('#rPword').val();
        var rEmail = $('#regEmail').val();
        var regDataString = 'username='+ rUser + '&password=' + rPass +'&email=' + rEmail;

        $.ajax({
            url: 'xhr/register.php',
            data: regDataString,
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    showLoginError(response.error);

                }else{
                    loadApp(rUser);
                }
                return false;
            }

        });
    });
//Register New User End

//New Projects
    $("#ncbtn").click(function(){
        event.preventDefault();
        var newCertName = $('#newCertName').val();
        var certDesc = $('#certDesc').val();
        var dateDueCert = $('#dateDueCert').val();
        var dateCompCert = $('#dateCompCert').val();
        var certRem = $('#ncForm input[type=checkbox]:checked').val();
        var status = $("#ncForm input[type=radio]:checked").val();
        var newCertDS = 'projectName=' + newCertName + '&projectDescription=' + certDesc + '&status=' + status + '&dueDate=' + dateDueCert + '&compDate=' + dateCompCert + '&teamID' + certRem;

        $.ajax({
            url: 'xhr/new_project.php',
            data: newCertDS,
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response);
                    //showLoginError(response.error);
                }else{
                    console.log(response);
                    //loadApp(rUser);
                }
                return false;
            }

        });
    });
//New Projects End
//Function Calls


//Member update info
        var nameF = $( "#fName" ),
            nameL = $( "#lName"),
            memID = $( "#mID" ),
            email = $( "#mEmail" ),
            password = $( "#mPass" ),
            allFields = $( [] ).add( nameF ).add( nameL).add( memID ).add( email ),
            tips = $( ".validateTips" );

        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }

        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }


        $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 625,
            width: 650,
            modal: true,

            buttons: {
                "Update Account": function() {

                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );

                    bValid = bValid && checkLength( nameF, "First Name", 3, 16 );
                    bValid = bValid && checkLength( nameL, "Last Name", 3, 16 );
                    //bValid = bValid && checkLength( memID, "Member ID", 3, 16 );

                    //bValid = bValid && checkLength( email, "email", 6, 80 );


                    console.log(bValid);
                    if ( bValid ) {

                        var fName= $('#fName').val();
                        var lName= $('#lName').val();
                        var mID =  $('#mID').val();
                        var email= $('#mEmail').val();
                        var dstring="first_name=" +  fName + "&last_name=" +  lName + "&user_n=" + mID + "&email=" + email;
                        $.ajax({
                            url: 'xhr/update_user.php',
                            data: dstring,
                            type: 'post',
                            dataType: 'json',
                            success: function(response){
                                console.log(response);
                            }

                        });
                    }
                    $( this ).dialog( "close" );

                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }
        });

        $( "#create-user" )
            .button()
            .click(function() {
                $(".ui-dialog-titlebar").hide();
                $( "#dialog-form" ).dialog( "open" );
                $.ajax({
                    url:'xhr/check_login.php',
                    type: 'get',
                    dataType: 'json',
                    success: function(r){

                        $('input[name="fName"]').val( r.user.first_name);
                        $('input[name="lName"]').val( r.user.last_name);
                        $('input[name="mID"]').val( r.user.user_n);
                        $('input[name="mEmail"]').val( r.user.email);
                    }
                });
            });

//Update Member Info End
//New Task popup
    var tName = $( "#tName" ),
        tDesc = $( "#tDesc"),
        tStat = $( "#tStatus" ),
        tDate = $( "#tDateDue" ),
        allFields = $( [] ).add( tName ).add( tDesc ).add( tStat ).add( tDate ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }


    $( "#dialog-form2" ).dialog({
        autoOpen: false,
        height: 500,
        width: 700,
        modal: true,

        buttons: {
            "Update Account": function() {

                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( tName, "Task Name", 3, 16 );
                bValid = bValid && checkLength( tDesc, "Last Name", 3, 45 );



                console.log(bValid);
                if ( bValid ) {

                    var fName= $('#fName').val();
                    var lName= $('#lName').val();
                    var mID =  $('#mID').val();
                    var email= $('#mEmail').val();
                    var dstring="first_name=" +  fName + "&last_name=" +  lName + "&user_n=" + mID + "&email=" + email;
                    $.ajax({
                        url: 'xhr/update_user.php',
                        data: dstring,
                        type: 'post',
                        dataType: 'json',
                        success: function(response){
                            console.log(response);
                        }

                    });
                }
                $( this ).dialog( "close" );

            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });

    $( "#addTask" )
        .button()
        .click(function() {
            $(".ui-dialog-titlebar").hide();
            $( "#dialog-form2" ).dialog( "open" );
            $.ajax({
                url:'xhr/check_login.php',
                type: 'get',
                dataType: 'json',
                success: function(r){
                    console.log(r.user);
                    $('input[name="tName"]').val( r.user.first_name);
                    $('input[name="tDesc"]').val( r.user.last_name);
                    $('input[name="tStatus"]').val( r.user.user_n);
                    $('input[name="tDateDue"]').val( r.user.email);
                }
            });
        });
//New Task popup end
//Function Calls End

//library features

    var tabs = $( "#tabs" ).tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
            tabs.tabs( "refresh" );
        }
    });

    $( "#acC1, #acC2, #acC3, #acC4, #acT1, #acT2, #acT3, #acT4" )
        .accordion({
            header: "> div > h2"
        })
        .sortable({
            axis: "y",
            handle: "h2",
            stop: function( event, ui ){
                ui.item.children("h2").triggerHandler( "focusout" );
            }
        });
//Library features END

//END
})(jQuery);