// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

//***** ユーザーの現在の位置情報を取得 *****
function successCallback(position) {

 var lat = position.coords.latitude;
 var long = position.coords.longitude;

 $.ajax({
   url: '/food_menu/search',  
   type: 'POST',
   dataType: 'js',
   // 非同期ならtrue、同期ならfalse。
   async: true,
   data: {
     latitude: lat,
     longitude: long
   },
 });
}

//***** 位置情報が取得できない場合 ******
function errorCallback(error) {
  var err_msg = "";

  switch(error.code)
  {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
  document.getElementById("error_message").innerHTML = err_msg;
}

function getFoodInfo(){
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
