/**
 * Created by seanweppner on 8/7/16.
 */

$("#localInput").hide();

$(".mdl-navigation__link").each(function( index ) {
    // console.log( index + ": " + $( this ).text() );
    $( this ).click(function(){
        $(".mdl-navigation__link").each(function( index ){
            $( this ).removeClass('selected-page');
        });
        $( this ).toggleClass('selected-page');
    });
});

$("#useFlickrClick").click(function(){
    var query_link = base_query_url + "/listFiles";
    var query_object = {};
    var query_callback = function (data) {
        local_list = local_list.concat(data.data);
        console.log(data);
    }

    if(!$("#useFlickr").is(':checked')){
        $("#localInput").show();
        $.getJSON(query_link, query_object, query_callback);

    }else{
        $("#localInput").hide();
    }
});