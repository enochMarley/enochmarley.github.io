
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
  }).when('/timer',{
    templateUrl: 'includes/pages/timer.html',
    controller: 'timerCtrl'
  }).when('/gcd',{
    templateUrl: 'includes/pages/gcd.html',
    controller: 'gcdCtrl'
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
    if ($scope.check <= 0) {
      $scope.check = 0;
    }
    $("#alert"+this.$index).addClass("alert-info").removeClass("alert-danger");
  }

});


//the controller taking care of the quadratic calculator application.
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

//the controller taking care of the quadratic calculator application.
app.controller('timerCtrl', function($scope,$interval){
  $scope.archives = [];
  $scope.summary = 0;
  $scope.hours = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;
  var interval = 0;
  var paused = false;
  $(".stop").prop("disabled",true);
  $(".reset").prop("disabled",true);
  $(".historyTitle").hide();

  $scope.startTimer = function(){

    $(".start").prop("disabled",true).html("Start");
    $(".stop").prop("disabled",false).html("Stop");
    $(".reset").prop("disabled",false);

    interval = $interval(function(){
      if ($scope.seconds < 10) {
        $scope.seconds = "0"+$scope.seconds;
      }
      $scope.seconds ++;
      if ($scope.seconds < 10) {
        $scope.seconds = "0"+$scope.seconds;
      }
      if ($scope.seconds == 60) {
        $scope.minutes ++;
        if ($scope.minutes < 10) {
          $scope.minutes = "0"+$scope.minutes;
        } 
        $scope.seconds = 0;
        startTimer();
      }
      if ($scope.minutes == 60) {
        $scope.hours ++;
        if ($scope.hours < 10) {
          $scope.hours = "0"+$scope.hours;
        }
        $scope.minutes = 0;
        $scope.seconds = 2;
        startTimer();
      }
    },1000);
  }
  
  $scope.pauseTimer = function(){

    $interval.cancel(interval);
    $(".stop").prop("disabled",true).html("Stopped");
    $(".start").prop("disabled",false).html("Continue");
  }

  $scope.stopTimer = function(){
    $scope.day = new Date().toDateString();
    $scope.theTime = new Date().toLocaleTimeString();
    $scope.summary = $scope.hours + " hour(s) : " +  $scope.minutes + " minute(s) : " + $scope.seconds + " second(s). On " 
      + $scope.day + ". " + $scope.theTime;
    $scope.archives.push($scope.summary);
    $interval.cancel(interval);
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;
    $(".historyTitle").show();
    $(".start").prop("disabled",false).html("Start");
    $(".stop").prop("disabled",true).html("Stop");
    $(".reset").prop("disabled",true);
  }

});

app.controller('gcdCtrl', function($scope){

  /*var bigNumber = 0;
  var smallNumber = 0;
  var remainder = 0;
  $scope.gcd = 0;*/

  $scope.calcGCD = function(firstNumber, secondNumber){

    if (firstNumber > secondNumber) {
      var bigNumber = firstNumber;
      var smallNumber = secondNumber;
    } else if (secondNumber > firstNumber){
      bigNumber = secondNumber;
      smallNumber = firstNumber;
    }

    var remainder = bigNumber % smallNumber;

    if (remainder == 0) {
      $scope.gcd = "The GCD of " + $scope.firstValue + " and " + $scope.secondValue + " is " + smallNumber;
    } else {
      bigNumber = smallNumber;
      smallNumber = remainder;
      this.calcGCD(bigNumber, smallNumber);
    }

  }

});