app.controller("homeCtrl",function($scope, $http, $location, $rootScope, $interval, $timeout){

  $(".progressDiv").hide();
  $(".goHome").hide();
  $(".dropAgain").hide();
  $(".progress-bar").removeClass("progress-bar-danger")
  .removeClass("progress-bar-success");

  var dropDiv = $(".dropDiv");
  dropDiv.on("dragover",function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).css("border-color","#2c3e50");
  });

  dropDiv.on("drop",function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).css("border-color","#bdc3c7");

     var securityQuestion = $("#securityWord").val();
     var notes = $("#notes").val();
     var isFolder = false;
     var isTooLarge = false;
     var folderName = "";
     var fileName = "";
     var files = e.originalEvent.dataTransfer.files;

     for (var i = 0, f = files[i]; i < files.length; i++) {
       if (!f.type && f.size%4096 == 0) {
            isFolder = true;
            folderName = f.name;
        }
      }

      for (var i = 0, f = files[i]; i < files.length; i++) {
        if (f.size > 2147483648) {
             isTooLarge = true;
             fileName = f.name;
         }
       }

     if (securityQuestion == "") {

       alert("Please enter a security question before dropping a file");

     }else if (!securityQuestion == "" && isFolder){

       alert("Please zip '"+ folderName +"' before dropping.");

     }else if (!securityQuestion == "" && isTooLarge){

       alert("The file '"+ fileName +"' must not exceed 2GB");

     }else{

       var formData = new FormData();
       var fileLength = 0;
       for (var i = 0; i < files.length; i++){
        formData.append("files" + i, files[i]);
        fileLength ++;
       }

       var xhr = new window.XMLHttpRequest();
       $(".progressDiv").show();
       $(".formFieldSet").prop("disabled",true);
       if (fileLength == 1) {
         dropDiv.html(fileLength + " file is being dropped");
       } else if (fileLength > 1){
         dropDiv.html(fileLength + " files are being dropped");
       }

       $.ajax({
         xhr: function(){
           xhr.upload.addEventListener("progress", function(event){
             if(event.lengthComputable){
               var percentageCompleted = Math.round((event.loaded / event.total) * 100);
               console.log(percentageCompleted);
               $(".progress-bar").width(percentageCompleted + "%").html(percentageCompleted + "%");
               $(".goHome").hide();
               $(".dropAgain").hide();
               $(".closeProgress").show();
             }
           },false);
           xhr.upload.addEventListener("load", function(event){
             $(".progress-bar").addClass("progress-bar-success").html("Complete");

           });
           return xhr;
         },
         url: "includes/api/drop.php?securityQstn="+securityQuestion+"&note="+notes,
         type: "POST",
         data: formData,
         enctype: 'multipart/form-data',
         contentType: false,
         processData: false,
         success: function(data, textStatus, jqXHR){

           //var responseMessage = data.message;
           //var responseContent = data.content;
           alert(data);
           $(".formFieldSet").prop("disabled",false);
           $(".closeProgress").hide();
           $("#securityWord").val('');
           $("#notes").val('');
           dropDiv.html("Drag &amp; Drop File(s) Here");
           $(".progIntro").html("File dropped successfully");
           $(".goHome").show()
           $(".dropAgain").show()
         },
         error: function(jqXHR, textStatus, errorThrown){
           console.log('ERRORS: ' + textStatus + jqXHR + " "+errorThrown);
           $(".formFieldSet").prop("disabled",false);
         }
       });

       $(".closeProgress").on("click", function(){
         xhr.abort();
         $(".progress-bar").addClass("progress-bar-danger").removeClass("progress-bar-success").html("Aborted");
         $(".formFieldSet").prop("disabled",false);
         $("#securityWord").val('');
         $("#notes").val('');
         $(".goHome").show()
         $(".dropAgain").show()
       });

       $(".goHome").on("click", function(){
         document.location.hash = '#/home';
       });
       $(".dropAgain").on("click", function(){
         $(".progressDiv").hide();
       });
     }
  });


  $("#dropForm").on("submit",function(){
    var files = document.getElementById('uploadFile').files;

    var securityQuestion = $("#securityWord").val();
    var notes = $("#notes").val();
    var isFolder = false;
    var isTooLarge = false;
    var folderName = "";
    var fileName = "";

    for (var i = 0, f = files[i]; i < files.length; i++) {
      if (!f.type && f.size%4096 == 0) {
           isFolder = true;
           folderName = f.name;
       }
     }

     for (var i = 0, f = files[i]; i < files.length; i++) {
       if (f.size > 2147483648) {
            isTooLarge = true;
            fileName = f.name;
        }
      }

    if (securityQuestion == "") {

      alert("Please enter a security question before dropping a file");

    }else if (!securityQuestion == "" && isFolder){

      alert("Please zip '"+ folderName +"' before dropping.");

    }else if (!securityQuestion == "" && isTooLarge){

      alert("The file '"+ fileName +"' must not exceed 2GB");

    }else{

      var formData = new FormData();
      var fileLength = 0;
      for (var i = 0; i < files.length; i++){
       formData.append("files" + i, files[i]);
       fileLength ++;
      }

      var xhr = new window.XMLHttpRequest();
      $(".progressDiv").show();
      dropDiv.hide();
      $("#or").hide();
      $(".formFieldSet").prop("disabled",true);
      if (fileLength == 1) {
        $("#uploadFileIntro").text(fileLength + " file is being dropped");
      } else if (fileLength > 1){
        $("#uploadFileIntro").text(fileLength + " files are being dropped");
      }

      $.ajax({
        xhr: function(){
          xhr.upload.addEventListener("progress", function(event){
            if(event.lengthComputable){
              var percentageCompleted = Math.round((event.loaded / event.total) * 100);
              console.log(percentageCompleted);
              $(".progress-bar").width(percentageCompleted + "%").html(percentageCompleted + "%");
              $(".goHome").hide();
              $(".dropAgain").hide();
              $(".closeProgress").show();
            }
          },false);
          xhr.upload.addEventListener("load", function(event){
            $(".progress-bar").addClass("progress-bar-success").html("Complete");

          });
          return xhr;
        },
        url: "includes/api/drop.php?securityQstn="+securityQuestion+"&note="+notes,
        type: "POST",
        data: formData,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        success: function(data, textStatus, jqXHR){

          var responseMessage = data.message;
          alert(responseMessage);
          $(".formFieldSet").prop("disabled",false);
          $(".closeProgress").hide();
          $("#securityWord").val('');
          $("#notes").val('');
          dropDiv.html("Drag &amp; Drop File(s) Here");
          $(".progIntro").html("File dropped successfully");
          $(".goHome").show()
          $(".dropAgain").show()
          dropDiv.show();
          $("#or").show();
          $("#uploadFileIntro").text("Select file(s) to upload");
          $("#uploadFile").val('');
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log('ERRORS: ' + textStatus);
          $(".formFieldSet").prop("disabled",false);
        }
      });

      $(".closeProgress").on("click", function(){
        xhr.abort();
        $(".progress-bar").addClass("progress-bar-danger").removeClass("progress-bar-success").html("Aborted");
        $(".formFieldSet").prop("disabled",false);
        $("#securityWord").val('');
        $("#notes").val('');
        $(".goHome").show();
        $(".dropAgain").show();
        dropDiv.show();
        $("#or").show();
        $("#uploadFile").val('');
        $("#uploadFileIntro").text("Select file(s) to upload");
      });

      $(".goHome").on("click", function(){
        document.location.hash = '#/home';
      });
      $(".dropAgain").on("click", function(){
        $(".progressDiv").hide();
        dropDiv.show();
        $("#uploadFile").val('');
      });
    }
  });


  $("#uploadFile").on("change", function(){
    dropDiv.hide();
    $("#or").hide();
    var files = document.getElementById('uploadFile').files;
    var fileLength = 0;
    for (var i = 0; i < files.length; i++){
     fileLength ++;
    }

    if (fileLength == 1) {

      $("#uploadFileIntro").text(fileLength + " file is selected");
    } else if (fileLength > 1){
      $("#uploadFileIntro").text(fileLength + " files are selected");
    }

  });

});
