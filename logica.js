$( document ).bind( "pageinit", function() {
        $.support.cors = true;
        $.mobile.buttonMarkup.hoverDelay = true;
        $( ".gotop" ).click(function() {
                $.mobile.silentScroll(0);
        });
        miid = "home";
        $("#principal").html($("#div-"+miid).html());
        $("#"+miid).css("background","#153F23");
        $( ".menues" ).click(function() {
                if(miid!=this.id) {
                        $.mobile.silentScroll(0);
                        $("#"+miid).css("background","");
                        miid = this.id;
                        $("#"+miid).css("background","#153F23");
                        $("#principal").slideUp(200,function(){ 
                                $("#principal").html($("#div-"+miid).html());
                        }).slideDown(200);
                }
        });

        $( ".opciones" ).click(function() {
                $.mobile.silentScroll($(document).height())

        });
});
