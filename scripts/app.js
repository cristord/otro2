app = angular.module('ionicApp', ['ionic', 'ngCordova'])
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
             return $sce.trustAsHtml(text);
        };
    }]);

app.controller('MyController', function ($scope, $rootScope) {
    $scope.sayHello = function (link, ocultar) {
        $rootScope.milink = link;
        $rootScope.ocultarpie = ocultar;
    };
});

app.controller('miAzar', function ($rootScope, $http, $state, $scope, $ionicScrollDelegate) {

    $rootScope.shufle = false;
    $rootScope.loadshufle = true;

    $scope.alazar = function (link) {
        $rootScope.shufle = true;
        $rootScope.loadshufle = false;
        $http.get(link, {})
            .success(function (data) {
                $rootScope.titulopost = data.posts[0].title;
                $rootScope.imagenpost = '';
                $rootScope.imagenpost = data.posts[0].attachments[0].url;
                $rootScope.contentpost = data.posts[0].content;
                $rootScope.idpost = data.posts[0].id;
                $rootScope.excerptpost = data.posts[0].excerpt;
                $rootScope.cuentacomenttpost = data.posts[0].comment_count;
                $rootScope.comments = data.posts[0].comments;
                $state.go('post');
                $rootScope.shufle = false;
                $rootScope.loadshufle = true;
            })
            .error(function (data) {
                alert('No se pudo cargar el contenido, favor de revisar su conexión a internet...');
                $rootScope.shufle = false;
                $rootScope.loadshufle = true;
            });
    }
});

app.controller('ctrlHome', function ($rootScope) {
    //$rootScope.milink = "templates/tab.html";
    $rootScope.ocultarpie = true;
});

app.controller('FeedSlide', function ($scope, $http, $ionicSlideBoxDelegate, $window) {
    $scope.getData = function (link) {
     $http.get(link, {})
        .success(function (data) {
            $scope.posts = data.posts;
            $ionicSlideBoxDelegate.update();
        })
        .error(function (data) {
        });
    }

    $scope.openUrl = function (link) {
        var ref = $window.open(link, '_system', 'location=yes');
    };

});
 
app.config(function ($stateProvider, $urlRouterProvider) {
  
    $stateProvider

            .state('home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'ctrlHome'
                    }
                }
            })

            .state('historia', {
                url: "/historia",
                views: {
                    'menuContent': {
                        templateUrl: "templates/nosotros/historia.html"
                    }
                }
            })

            .state('aquiles', {
                url: "/aquiles",
                views: {
                    'menuContent': {
                        templateUrl: "templates/nosotros/aquiles.html"
                    }
                }
            })

            .state('familia', {
                url: "/familia",
                views: {
                    'menuContent': {
                        templateUrl: "templates/nosotros/familia.html"
                    }
                }
            })

            .state('cdfe', {
                url: "/cdfe",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cdfe/ubicacion.html"
                    }
                }
            })

            .state('horario', {
                url: "/horario",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cdfe/horario.html"
                    }
                }
            })

            .state('contacto', {
                url: "/contacto",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contacto/contacto.html"
                    }
                }
            })

            .state('resena', {
                url: "/resena",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cdfe/resena.html"
                    }
                }
            })

            .state('tarjeta', {
                url: "/tarjeta",
                views: {
                    'menuContent': {
                        templateUrl: "templates/ofrendar/tarjeta.html"
                    }
                }
            })
            .state('banco', {
                url: "/banco",
                views: {
                    'menuContent': {
                        templateUrl: "templates/ofrendar/banco.html"
                    }
                }
            })

            .state('estiempo', {
                url: "/estiempo",
                views: {
                    'menuContent': {
                        templateUrl: "templates/tv/estiempo.html"
                    }
                }
            })

            .state('feexpecta', {
                url: "/feexpecta",
                views: {
                    'menuContent': {
                        templateUrl: "templates/tv/feexpecta.html"
                    }
                }
            })

            .state('horariostv', {
                url: "/horariostv",
                views: {
                    'menuContent': {
                        templateUrl: "templates/tv/horariostv.html"
                    }
                }
            })
            .state('buscar', {
                url: "/buscar",
                views: {
                    'menuContent': {
                        templateUrl: "templates/buscar.html"
                    }
                }
            })

            .state('post', {
                url: "/post",
                views: {
                    'menuContent': {
                        templateUrl: "templates/post.html"
                    }
                }
            })

            .state('frasesdefe', {
                url: "/frasesdefe",
                views: {
                    'menuContent': {
                        templateUrl: "templates/frasesdefe/frasesdefe.html"
                    }
                }
            })

            .state('ensenanzas', {
                url: "/ensenanzas",
                views: {
                    'menuContent': {
                        templateUrl: "templates/ensenanzas/ensenanzas.html",
                        controller: 'ctrlHome'
                    }
                }
            })

            .state('online', {
                url: "/online",
                views: {
                    'menuContent': {
                        templateUrl: "templates/online/online.html"
                    }
                }
            })

            .state('busqueda', {
                url: "/busqueda",
                views: {
                    'menuContent': {
                        templateUrl: "templates/resultados.html"
                    }
                }
            })

    $urlRouterProvider.otherwise("/ensenanzas");
    //$rootScope.ocultarpie = true;
});

app.controller("buscandoCtrl", function ($rootScope, $scope, $state) {
    $scope.texto = '';

    $scope.busco = function () {
        $rootScope.busca = $scope.texto;
        $state.go('busqueda');
    }

});


app.controller("postCtrl", function ($scope, $http, $rootScope, $state) {

    $scope.author = $rootScope.nombreusuario;
    $scope.errorvalido = true;
    $scope.bloquear = false;
    $scope.author = '';
    $scope.comment = '';

    $scope.comentar = false;
    $scope.comentando = true;
    $scope.errorvalido2 = true;

    $scope.social = function (titulo, descripcion, imagen, link) {
        window.plugins.socialsharing.share(titulo, descripcion, imagen, link);
    }

    $scope.enviar_comentario = function () {
        $rootScope.nombreusuario = $scope.author;
        $scope.bloquear = true;
        $scope.comentar = true;
        $scope.comentando = false;
        $scope.errorvalido2 = true;

        if ($scope.author != '' && $scope.comment != '') {
            link = $rootScope.idpost + '&name=' + encodeURIComponent($scope.author) + '&email=app@email.com&content=' + encodeURIComponent($scope.comment);
            $http.get('http://aquilesazar.faithory.com/apiappmaa/submit_comment?post_id=' + link, {})
                .success(function (data) {
                    var comi = { name: $scope.author, content: $scope.comment };
                    $rootScope.comments.push(comi);
                    $scope.errorvalido = true;
                    $scope.bloquear = false;
                    $scope.comentar = false;
                    $scope.comentando = true;
                    $scope.comment = '';
                    $rootScope.cuentacomenttpost++;
                })
                .error(function (data) {
                    $scope.errorvalido = true;
                    $scope.errorvalido2 = false;
                    $scope.bloquear = false;
                    $scope.comentar = false;
                    $scope.comentando = true;
                });

        } else {
           $scope.errorvalido = false;
           $scope.bloquear = false;
           $scope.comentar = false;
           $scope.comentando = true;
        }
    }
});

app.controller("FeedController", function ($http, $scope, $sce, $rootScope, $state, $ionicScrollDelegate, $timeout) {
    $scope.cuenta = 0;
    $scope.reload = function () {
        $state.reload();
    }

    $rootScope.hideloading = false;
    $rootScope.classe = 'centralizado';
    $rootScope.ocultarmensaje = true;
    $rootScope.cargarmasboton = true;

    $scope.social = function (titulo, descripcion, imagen, link) {
        window.plugins.socialsharing.share(titulo, descripcion, imagen, link);
    }

    $scope.openpost = function (title, content, thumbnail, date, id, excerpt, cuentacomentt, comments) {
        $rootScope.imagenpost = '';
        $rootScope.imagenpost = thumbnail;
        $rootScope.contentpost = content;
        $rootScope.idpost = id;
        $rootScope.excerptpost = excerpt;
        $rootScope.cuentacomenttpost = cuentacomentt;
        $rootScope.comments = comments;
        $rootScope.titulopost = title;
        $state.go('post');
        $timeout(function () {
            $rootScope.titulopost = title;
            $ionicScrollDelegate.scrollTop();
        }, 800);
    }

    $scope.getData = function (param, identifica, cuenta) {

        $rootScope.cargarmastexto = true;
        $rootScope.cargarmasimagen = false;

        $http.get(param, { })
            .success(function (data) {
                    $rootScope.ocultarmensaje = true;
                    if (cuenta == 0) {
                        $scope.posts = data.posts;                
                    } else {
                        $scope.posts = $scope.posts.concat(data.posts);
                    }
                        window.localStorage[identifica] = JSON.stringify(data.posts);
                        $scope.cuenta = $scope.cuenta + 7;
                        $rootScope.hideloading = true;
                        $rootScope.classe = '';
                        $rootScope.cargarmasboton = false;
                        $rootScope.cargarmastexto = false;
                        $rootScope.cargarmasimagen = true;
                    if ($scope.cuenta >= data.count_total) {
                        $rootScope.cargarmasboton = true;
                    }
            })
            .error(function (data) {
                $rootScope.ocultarmensaje = false;
                if (window.localStorage[identifica] !== undefined) {
                    $scope.posts = JSON.parse(window.localStorage[identifica]);                   
                    $rootScope.hideloading = true;
                    $rootScope.classe = '';
                } else {
                    setTimeout($scope.getData, 5000, param, identifica, cuenta);
                }
                $rootScope.cargarmasboton = true;
            });
    }
});

function alazar(link) {
    var scope = angular.element(document.querySelector('#unazar')).scope();
    scope.$apply(function () {
        scope.alazar(link);
    });
}

//wv.setWebChromeClient(new WebChromeClient());