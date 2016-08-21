anno.setProperties({
    outline: 'red'
});
$(".previous-button").hide();

app.controller('ClassifyController', ['$scope', function($scope) {

    $scope.nextImage = function(){

        // //if there arent any previous images, hide the previous button
        // if(annotation_state.prev_annotations.length > 0)
        //     $(".previous-button").show();
        // else
        //     $(".previous-button").hide();

        // If there are any objects in next_annotations, ie if the user has gone back in the queue, pull the most recent
        if(firstImage){
            hljs.initHighlightingOnLoad();

            if(annotation_state.prev_annotations.length > 0){
                $("#image").attr("src", annotation_state.current_annotation.location);
            }
            var child = $("#image");
            var height = $(window).height() - 125;
            var width =  $(window).width() - 391;
            child.height("inherit");//height="42" width="42"
            child.width("inherit");

            anno.makeAnnotatable(document.getElementById('image'));

            if(annotation_state.prev_annotations.length > 0){
                if(previous.annotations.length > 0) {
                    for (var annotation_index in annotation_state.current_annotation.annotations) {
                        var annotation = annotation_state.current_annotation.annotations[annotation_index];
                        anno.addAnnotation(annotation);
                    }
                }
            }
            firstImage = false;
        }


        if(annotation_state.next_annotations.length > 0){

            // set initial variables
            var current_annotation_object = {};
            var next = annotation_state.next_annotations.pop();
            var parent = $("#image").parent();
            var current = $("#image");

            // save current annotation values and remove annotorious from the image
            current_annotation_object["location"] = current.attr("src");
            current_annotation_object["annotations"] = anno.getAnnotations();
            console.log(anno.getAnnotations());
            anno.removeAll();
            current_annotation_object["size"] = {
                "height": current.height(),
                "width": current.width()
            };
            annotation_state.current_annotation = current_annotation_object;

            // push the current annotation object to the array of previously seen annotation objects
            annotation_state.prev_annotations.push(current_annotation_object);

            // create a new child image object and set its values
            //var child = $("<img >");
            //$("#image").remove();
            var child = $("#image")
            var height = $( window ).height() - 125;
            var width =  $(window).width() - 125;
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
            var keyword = 'dogs';
            if($("#search").val()!="")
                keyword = $("#search").val();

            var query_link = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            var query_object = {
                tags: keyword,
                tagmode: "any",
                format: "json"
            };
            var query_callback = function (data) {

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
                    "height": current.height(),
                    "width": current.width()
                };
                annotation_state.current_annotation = current_annotation_object;
                annotation_state.prev_annotations.push(current_annotation_object);

                // var child = $("<img >");
                // $("#image").remove();
                var child = $("#image");
                var height = $(window).height() - 125;
                var width =  $(window).width() - 125;

                child.attr("src", image_src);
                child.attr("id", "image");
                child.attr("class", "annotatable");
                child.attr("height", height);//height="42" width="42"
                child.attr("width", width);
                parent.append(child);
                // anno.makeAnnotatable(document.getElementById('image'));
            };
            if(!$("#useFlickr").is(':checked')) {

                var image_src = local_loc+"/"+local_list.pop();

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
                    "height": current.height(),
                    "width": current.width()
                };
                annotation_state.current_annotation = current_annotation_object;
                annotation_state.prev_annotations.push(current_annotation_object);

                // var child = $("<img >");
                // $("#image").remove();
                var child = $("#image");
                var height = $(window).height() - 125;
                var width =  $(window).width() - 125;

                child.attr("src", image_src);
                child.attr("id", "image");
                child.attr("class", "annotatable");
                child.attr("height", height);//height="42" width="42"
                child.attr("width", width);
                parent.append(child);
            }else{
                $(document).ready(function () {
                    $.getJSON(query_link, query_object, query_callback);
                });
            }
        }
    };

    $scope.prevImage = function(){


        var current_annotation_object = {};
        var previous = annotation_state.prev_annotations.pop();
        var parent = $("#image").parent();
        var current = $("#image");
        current_annotation_object["location"] = current.attr("src");
        current_annotation_object["annotations"] = anno.getAnnotations();
        console.log(anno.getAnnotations());
        anno.removeAll();
        current_annotation_object["size"] = {
            "height": current.height(),
            "width": current.width()
        };
        annotation_state.current_annotation = current_annotation_object;
        annotation_state.next_annotations.push(current_annotation_object);

        var child = $("#image");
        // var child = $("<img >");
        // $("#image").remove();
        var height = $( window ).height() - 125;
        var width =  $(window).width() - 125;

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

        console.log("Previous queue length : " + annotation_state.prev_annotations.length);
        console.log("Next queue length : " + annotation_state.next_annotations.length);

    };

    var handler = function(e){
        if(e.keyCode === 39) {
            // console.log('right arrow');
            $scope.nextImage();
            // $scope.doSomething();
        }else if (e.keyCode == 37){
            // console.log('left arrow');
            $scope.prevImage();
        }
    };

    var $doc = angular.element(document);

    $doc.on('keydown', handler);
    $scope.$on('$destroy',function(){
        $doc.off('keydown', handler);
    });

}]);