// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

//***** ユーザーの現在の位置情報を取得 *****
function successCallback(position) {

 let lat = "&lat=" + position.coords.latitude;
 let long = "&lng=" + position.coords.longitude;
 const format = "&format=" + "jsonp"; 
 const access_key = gon.hotpepper_access_key;
 const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" 
              + access_key 
              + format
              + lat 
              + long;

 $.ajax({
   url: url,  
   type: 'GET',
   dataType: "jsonp",
   // 非同期ならtrue、同期ならfalse。
   async: true,
   timespan:1000
 }).done(function(data,status,requestXML){
   console.log(data.results.shop)
 }).fail(function(jqXHR, textStatus, errorThrown){
   console.log(jqXHR);
   console.log(textStatus);
   console.log(errorThrown);
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
