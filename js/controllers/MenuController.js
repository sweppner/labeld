/**
 * Created by seanweppner on 8/4/16.
 */

app.controller('MenuController', ['$scope', function($scope) {

    $scope.downloadJson = function(){
        console.log("Downloading");
        var total_annotations = [];
        total_annotations = total_annotations.concat(annotation_state.prev_annotations);
        total_annotations.push(annotation_state.current_annotation);
        total_annotations = total_annotations.concat(annotation_state.next_annotations);

        var final_download = {};
        var milliseconds = (new Date).getTime();
        final_download["created"] = milliseconds;
        final_download["data"] = total_annotations;


        /*var something = window.open("data:text/json," + encodeURIComponent(JSON.stringify(final_download)),
            "_blank");
        something.focus();*/
        
        var iframe = "<iframe width='100%' height='100%' src='" + "data:text/json," + encodeURIComponent(JSON.stringify(final_download)) + "'></iframe>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();

    };

}]);
