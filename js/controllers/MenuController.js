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


        var something = window.open("data:text/json," + encodeURIComponent(JSON.stringify(final_download)),
            "_blank");
        something.focus();

    };

}]);