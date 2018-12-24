// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

//***** ユーザーの現在の位置情報を取得 *****
function successCallback(position) {
  var geo_locations = {
    latitude : position.coords.latitude,
    longitude : position.coords.longitude
  };
  return geo_locations;
//   var gl_text = "緯度：" + position.coords.latitude + "<br>";
//     gl_text += "経度：" + position.coords.longitude + "<br>";
//     gl_text += "緯度・経度の誤差：" + position.coords.accuracy + "<br>";
//     gl_text += "方角：" + position.coords.heading + "<br>";
//  document.getElementById("food_map").innerHTML = gl_text;
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
  return err_msg;
  // document.getElementById("food_map").innerHTML = error.message;
}

$(function(){
    $('.search-btn').click(function() { 
      var locations = navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      $.ajax({
        url: '/food_menu/search',  
        type: 'POST',
        dataType: 'json',
        // 非同期ならtrue、同期ならfalse。
        async: true,
        data: {
          geo_location: locations
        },
      });
   });
 });