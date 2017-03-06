var app = angular.module('myapp', ['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvide, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/distance');
    
    //rootScope  路由参数   别名设置  地址栏参数  resolve
    $stateProvide.state('distance', {
            url: "/distance",
            templateUrl: 'view/distance.html',
            resolve: {
                getdata: function ($http) {
                    return $http({
                        method: "GET",
                        url:'data2.json'
                    })
                }
            },
            controller: "distance as disCon"
        })
        .state('info', {
            url: "/info/:id",
            templateUrl: 'view/info.html',
            resolve: {
                datial: function ($http) {
                    return $http({
                        method: "GET",
                        url: 'datial.json'
                    })
                }
            },
            controller: "info as infoCon"
        })
        .state('comment', {
            url: "/comment",
            templateUrl: 'view/comment.html',
            controller: ['$scope', function ($scope) {

        }]
        })
        .state('salas', {
            url: "/salas",
            templateUrl: 'view/salas.html',
            controller: ['$scope', function ($scope) {

        }]
        })
        .state('a', {
            url: "/a",
            templateUrl: 'view/a.html',
            controller: ['$scope', function ($scope) {

        }]
        })
        .state('b', {
            url: "/b",
            templateUrl: 'view/b.html',
            controller: ['$scope', function ($scope) {

        }]
        })

}])
app.controller("apps", ['$scope', "$filter","$http" ,function ($scope, $filter,$http) {
    $scope.list=[
		    	  {
		    	  	title:"热销菜品",
		    	    content:[
		    	    {"name":"红烧肉","price":"￥43"},
		    	    {"name":"宫保鸡丁","price":"￥78"},
		    	    {"name":"水煮鱼","price":"￥89"}
		    	    ]
		    	  },
		    	  {
		    	  	title:"热菜",
		    	  	content:[
			    	    {"name":"小炒豆腐","price":"￥23"},
			    	    {"name":"茄子","price":"￥89"}
			    	    
			    	    ]
		    	  	},
                  {
                  	title:"凉菜",
                  	content:[
			    	    {"name":"西红柿鸡蛋","price":"￥86"},
			    	    {"name":"烤鱼","price":"￥77"},
			    	    {"name":"娃娃菜","price":"￥76"}
			    	    ]
                  	},
                  {
                  	title:"套餐",
                    content:[
			    	    {"name":"红烧肉","price":"￥89"},
			    	    {"name":"宫保鸡丁","price":"￥34"},
			    	    {"name":"水煮鱼","price":"￥43"}
			    	    ]
                    }
		    	] 
		    	
}])




app.controller('distance', ['$scope', 'getdata', '$rootScope', function ($scope, getdata, $rootScope) {
    if (getdata.status == 200) {
        $rootScope.list = getdata.data.shops;
    }

  }])



app.controller('info', ['$scope', "$stateParams", 'datial', function ($scope, $stateParams, datial) {
    var getid = $stateParams.id,
        _this = this;
    if (datial.status == 200) {
        angular.forEach(datial.data.shops, function (val, index) {
            if (val.id == getid) {
                _this.item = val;
            }
        })
    }
    
}])
   app.directive('myTab',function(){
		    	return {
		    		 restrict:"EAM",
		    		 replace:true,
		    		 templateUrl:"tab.html",
		    		 transclude:true,
		    		 scope:{
		    		 	myData:'=',
		    		 	myId:'@',
		    		 	myFn:"&"
		    		 },
		    		 controller:['$scope',function($scope){ 
		             }],
                     link:function(scope,element,attr){
                     	//$(element).find("div").css({padding:'50px'})
                        $(element).on('click','a',function(){	
                        	$(this).addClass('high').siblings('a').removeClass("high");
    $(this).parent("nav").siblings(".content-box").find('div').eq($(this).index()).show().siblings('div').hide()
                        	
                        })
                     }
		    	}
		    })
