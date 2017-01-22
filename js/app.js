var app = angular.module("dropNPick", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'includes/pages/home.html',
    controller: 'homeCtrl'
  }).when('/home',{
    templateUrl: 'includes/pages/home.html',
    controller: 'homeCtrl'
  }).when('/about',{
    templateUrl: 'includes/pages/about.html',
    controller: 'homeCtrl'
  }).when('/todo',{
    templateUrl: 'includes/pages/todo.html',
    controller: 'todoCtrl'
  }).when('/quadratic',{
    templateUrl: 'includes/pages/quadratic.html',
    controller: 'quaCtrl'
  });
});

//the controller taking care of the todo list application.
app.controller('todoCtrl',function($scope){

  $scope.tasks = [];

  $scope.check = 0;

  $scope.calcRemaining = function(){
    if (this.checked == true) {
      $scope.check ++;
      $("#alert"+this.$index).removeClass("alert-info").addClass("alert-danger");
    }else{
      $scope.check --;
      $("#alert"+this.$index).addClass("alert-info").removeClass("alert-danger");
    }
  }

  $scope.addTodo = function(){
    $scope.tasks.push($scope.title);
    $scope.title = "";
  }

  $scope.removeTodo = function(){
    this.checked = false;
    $scope.tasks.splice(this.$index,1);
    $scope.check --;
    $("#alert"+this.$index).addClass("alert-info").removeClass("alert-danger");
  }

});


//the controller taking care of the todo list application.
app.controller('quaCtrl',function($scope){
  $scope.calcQua = function(){

    try{

       var firstValue = $scope.firstValue;
      var secondValue = $scope.secondValue;
      var thirdValue = $scope.thirdValue;

      var a2 = firstValue * 2;
      var dis = 4 * firstValue * thirdValue;
      dis = (Math.pow(secondValue,2)) - dis;

      if (dis < 0) {
        $scope.errMsg = "The Function Contains Two Complex Roots";
      }else if (dis > 0) {
        $scope.value1 = "X1: " + (((-secondValue ) + Math.sqrt(dis)) / a2).toFixed(4);
        $scope.value2 = "X2: " + (((-secondValue ) - Math.sqrt(dis)) / a2).toFixed(4);
        if($scope.value1 == $scope.value2){
          $scope.typeOfEqn = "The function has two real and equal roots";
        }else if($scope.value1 != $scope.value2){
          $scope.typeOfEqn = "The function has two real and distinct roots";
        }
      }
    }catch(err){
      $scope.errMsg = "Please Make Sure You Entered The Correct Values";
    }

   
  }
});
