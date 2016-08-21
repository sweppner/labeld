var app = angular.module('LabeldApp', ['ngRoute']);
var local_loc = "/node/rest/data"
var annotation_state = {};
annotation_state["prev_annotations"] = [];
annotation_state["next_annotations"] = [];
annotation_state["current_annotation"] = {};
