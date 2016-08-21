app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'HomeController'
        })

        // route for the about page
        .when('/annotate', {
            templateUrl : 'pages/annotate.html',
            controller  : 'AnnotationController'
        })

        // route for the about page
        .when('/classify', {
            templateUrl : 'pages/classify.html',
            controller  : 'ClassifyController'
        })

        // route for the contact page
        .when('/discover', {
            templateUrl : 'pages/discover.html',
            controller  : 'DiscoverController'
        })

        // route for the contact page
        .when('/contribute', {
            templateUrl : 'pages/contribute.html',
            controller  : 'ContributeController'
        })

        // route for the contact page
        .when('/help', {
            templateUrl : 'pages/help.html',
            controller  : 'HelpController'
        });
});