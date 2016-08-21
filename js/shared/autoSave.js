var autoSave = function(image_id){
    // console.log("saving...");
    var current_annotation_object = {};
    var current = $(image_id);

    current_annotation_object["location"] = current.attr("src");
    current_annotation_object["annotations"] = anno.getAnnotations();
    current_annotation_object["size"] = {
        "height": current.height(),
        "width": current.width()
    };
    annotation_state.current_annotation = current_annotation_object;

    setTimeout(autoSave(image_id), 50);
};