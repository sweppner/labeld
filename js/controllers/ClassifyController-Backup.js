var prev_annotations = [];
var next_annotations = [];
var current_annotation = {};

anno.setProperties({
    outline: 'red'
});
$(".previous-button").hide();

app.controller('ClassifyController', ['$scope', function($scope) {

    $scope.nextImage = function(){

        //if there arent any previous images, hide the previous button
        if(prev_annotations.length > 0)
            $(".previous-button").show();
        else
            $(".previous-button").hide();

        // If there are any objects in next_annotations, ie if the user has gone back in the queue, pull the most recent
        if(next_annotations.length > 0){

            // set initial variables
            var current_annotation_object = {};
            var next = next_annotations.pop();
            var parent = $("#image").parent();
            var current = $("#image");

            // save current annotation values and remove annotorious from the image
            current_annotation_object["location"] = current.attr("src");
            current_annotation_object["annotations"] = anno.getAnnotations();
            console.log(anno.getAnnotations());
            anno.removeAll();
            current_annotation_object["size"] = {
                "height": current.attr("height"),
                "width": current.attr("width")
            };
            current_annotation = current_annotation_object;

            // push the current annotation object to the array of previously seen annotation objects
            prev_annotations.push(current_annotation_object);

            // create a new child image object and set its values
            //var child = $("<img >");
            //$("#image").remove();
            var child = $("#image")
            var height = $( window ).height() - 125;
            var width = 1048;
            child.attr("src", next.location);
            child.attr("id", "image");
            child.attr("height", height);//height="42" width="42"
            child.attr("width", width);

            // add the child image object to the parent on the page
            parent.append(child);

            // Add annotorious to the new child image element
            // anno.makeAnnotatable(document.getElementById('image'));

            //add the given anno
            if(next.annotations.length > 0){
                for(var annotation_index in next.annotations){
                    var annotation = next.annotations[annotation_index];
                    anno.addAnnotation(annotation);
                }
            }
        }else {
            var keyword = "dogs";
            $(document).ready(function () {

                $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
                    {
                        tags: keyword,
                        tagmode: "any",
                        format: "json"
                    },
                    function (data) {
                        var image_annotation_object = {};
                        var rnd = Math.floor(Math.random() * data.items.length);
                        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
                        var current_annotation_object = {};
                        // return image_src;
                        // $('body').css('background-image', "url('" + image_src + "')");
                        var parent = $("#image").parent();
                        var current = $("#image");
                        current_annotation_object["location"] = current.attr("src");
                        current_annotation_object["annotations"] = anno.getAnnotations();
                        console.log(anno.getAnnotations());
                        anno.removeAll();
                        current_annotation_object["size"] = {
                            "height": current.attr("height"),
                            "width": current.attr("width")
                        };
                        current_annotation = current_annotation_object;
                        prev_annotations.push(current_annotation_object);

                        // var child = $("<img >");
                        // $("#image").remove();
                        var child = $("#image");
                        var height = $(window).height() - 125;
                        var width = 1048;

                        child.attr("src", image_src);
                        child.attr("id", "image");
                        child.attr("class", "annotatable");
                        child.attr("height", height);//height="42" width="42"
                        child.attr("width", width);
                        parent.append(child);
                        // anno.makeAnnotatable(document.getElementById('image'));
                    });

            });
        }
    };

    $scope.prevImage = function(){


        var current_annotation_object = {};
        var previous = prev_annotations.pop();
        var parent = $("#image").parent();
        var current = $("#image");
        current_annotation_object["location"] = current.attr("src");
        current_annotation_object["annotations"] = anno.getAnnotations();
        console.log(anno.getAnnotations());
        anno.removeAll();
        current_annotation_object["size"] = {
            "height": current.attr("height"),
            "width": current.attr("width")
        };
        current_annotation = current_annotation_object;
        next_annotations.push(current_annotation_object);

        var child = $("#image");
        // var child = $("<img >");
        // $("#image").remove();
        var height = $( window ).height() - 125;
        var width = 1048;

        child.attr("src", previous.location);
        child.attr("id", "image");
        child.attr("height", height);//height="42" width="42"
        child.attr("width", width);
        parent.append(child);
        // anno.makeAnnotatable(document.getElementById('image'));
        if(previous.annotations.length > 0) {
            for (var annotation_index in previous.annotations) {
                var annotation = previous.annotations[annotation_index];
                anno.addAnnotation(annotation);
            }
        }

        console.log("Previous queue length : " + prev_annotations.length);
        console.log("Next queue length : " + next_annotations.length);

    };

    var handler = function(e){
        if(e.keyCode === 39) {
            console.log('right arrow');
            $scope.nextImage();
            // $scope.doSomething();
        }else if (e.keyCode == 37){
            console.log('left arrow');
            $scope.prevImage();
        }
    };

    var $doc = angular.element(document);

    $doc.on('keydown', handler);
    $scope.$on('$destroy',function(){
        $doc.off('keydown', handler);
    });

}]);