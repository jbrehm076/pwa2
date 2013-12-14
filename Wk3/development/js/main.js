$(function() {

//Load Landing
    var loadLanding = function(){
        window.open ('index.html', '_self');

    };
//Load landing end

//LoadApp
    var loadApp = function(){
        console.log('load app page');
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
            console.log('check running');
            $.ajax({
                url:'xhr/check_login.php',
                type: 'get',
                dataType: 'json',
                success: function(r){
                    console.log(r.error);
                    if(r.error == 'Not logged in.'){
                        loadLanding();
                    //}else{
                    //loadLanding();
                    //$('input, textarea').placeholder();
                    }
                    return false;
                }
            });
        }
    //});
    $(document).ready(function(){
        checkLogin();
    });
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
                    loadApp();
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

//Function Calls

//Function Calls End

//library features

    var tabs = $( "#tabs" ).tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
            tabs.tabs( "refresh" );
        }
    });

    $( "#accordion" )
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