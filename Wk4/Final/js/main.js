$(function() {



//Application

        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(data){
                    var cData = data;
                    console.log(cData);
                    $.get('templates/certs.html', function(template){

                        var ctemplate = $('#certs-template').html();


                        var stuff = Mustache.to_html(ctemplate, cData);
                        console.log(stuff);
                        $('#certDest').html(stuff);
                    });

                /*var certs = response.projects;
                var html = '';
                var html = $.render(certs, "certtemplate");

                $('#certs').append(html);*/

            }
        });

//Application End
//Application Init
   /* var init = function(){
        $.get('templates/certs.html', function(htmlArg){
            var cdata = $(htmlArg).find('#certs-template').html();
            $.template('certtemplate', cdata);
        });
    };
    init();
//Application Init End
//Application Events
    $(document).ready(function(){
        loadCert();
    })*/
//Application Events End

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
                        }else{
                            return r.user.user_n;
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



//Update Member Info
/*    var fName = $("#fName"),
        lName = $("#lName"),
        mID = $("#mID"),
        mPass = $("mPass"),
        mEmail = $("mEmail"),
        allFields = $([]).add(fName).add(lName).add(mID).add(mPass).add(mEmail),
        tips = $(".validateTips");

    function updateTips(t){
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function(){
            tips.removeClass("ui-state-highlight",1500);
        }, 500);
    }

    function checkLength(o,n,min,max){
        if (o.val().length >max || o.val().length < min){
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
            return false;
        }else{
            return true;
        }
    }

    $("#ncform").dialog({
        autoOpen: false,
        height: 180,
        width: 600,
        modal: true,
         buttons: {
            "Update Profile": function() {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength( fname, "first_name", 3, 15);
                bValid = bValid && checkLength( lName, "last_name",3,15);
                bValid = bValid && checkLength( mID, "member_id",3,15);
                bValid = bValid && checkLength( mPass, "member_pass",5,16);
                bValid = bValid && checkLength( mEmail, "member_email",6,25);


                if ( bValid ){
                    $.ajax({
                        url: 'xhr/update_client.php',
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
                    $(this).dialog("close");
                }
            },
            Cancel:function(){
                $(this).dialog("close");
            }
        },
        close: function(){
            allFields.val("").removeClass("ui-state-error");
        }
    });





*/
//Update Member Info End
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
});