/**
 * Created by seanweppner on 8/5/16.
 */

(function() {
    'use strict';
    var dialogButton = document.querySelector('#annotationSettingsBtn');

    var dialog = document.querySelector('#dialog');

    $("#localInput").hide();

    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialogButton.addEventListener('click', function() {
        dialog.showModal();
    });
    dialog.querySelector('button:not([disabled])')
        .addEventListener('click', function() {
            dialog.close();
        });
}());

$("#useFlickrClick").click(function(){
    if(!$("#useFlickr").is(':checked'))
        $("#localInput").show();
    else
        $("#localInput").hide();
});

