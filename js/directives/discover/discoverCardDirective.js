app.directive('discoverCard', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'js/directives/discover/discoverCardDirective.html'
    };
});