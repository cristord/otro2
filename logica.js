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
			$("#principal").fadeOut("slow",function(){ 
				$("#principal").html($("#div-"+miid).html());
			}).fadeIn("slow");
		}
	});

	$( ".opciones" ).click(function() {
		$.mobile.silentScroll($(document).height())

	});
});

//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		$(this).trigger("collapse");
	});
});

// display the version of jQM
$(document).on( 'pageinit', function() {
	var version = $.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = (words[1] || "Final"),
		html = ver,
		foothtml = "Version " + ver;

	if( str.indexOf( "rc" ) == -1 ){
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace(".", "");
	}

	if ( $.mobile.version && str ) {
		html += " <b>" + str + "</b>";
		foothtml += " " + str;
	}

	$( ".type-home .ui-content p.jqm-version" ).html( html );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
});

// Measure the time from pageload until pageshow for page lists-performance.html
// NB: lists-performance.html should load without a transition to avoid having
// the transition's duration included in the measurement
$( document ).on( "pageload", function( e, data ) {
	var ar = data.dataUrl.split( "/" ), then;

	// If we're loading "lists-performance.html ..."
	if ( ar.length && ar[ ar.length - 1 ] === "lists-performance.html" ) {
		// ... save the event's timestamp, and connect to the page's pagebeforeshow
		then = new Date();
		data.page.one( "pageshow", function( e, pbsData ) {
			// ... then compare the time at pagebeforeshow to the one at pageload
			var now = new Date(),
				header = data.page.find( ".ui-header h1:first" );
			// ... and add/replace a span in the header with the result
			header
				.remove( "span:jqmData(role='perfData')" )
				.append( "<span style='font-size: 8px;' data-" + $.mobile.ns + "role='perfData'> (" + ( now.getTime() - then.getTime() ) + " ms)</span>" );
		});
	}
});
