













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

