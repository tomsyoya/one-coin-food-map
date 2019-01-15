// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

//***** ユーザーの現在の位置情報を取得 *****
function getFoodInfo(){
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

//***** 位置情報の取得に成功した場合 ******
function successCallback(position) {

 const lat = position.coords.latitude;
 const long = position.coords.longitude;
 const format = "&format=" + "jsonp"; 
 const access_key = gon.hotpepper_access_key;
 const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" 
              + access_key 
              + format
              + "&lat=" + lat 
              + "&lng=" + long;

 $.ajax({
   url: url,  
   type: 'GET',
   dataType: "jsonp",
   // 非同期ならtrue、同期ならfalse。
   async: true,
   timespan:1000
 }).done(function(data,status,requestXML){
   console.log(data.results.shop);
   renderBaseMap(lat, long);
   renderFoodIcons(data.results.shop);
 }).fail(function(jqXHR, textStatus, errorThrown){
   console.log(jqXHR);
   console.log(textStatus);
   console.log(errorThrown);
 });

//  document.getElementById("map").style.visibility="visible";
}

//***** 位置情報の取得に失敗した場合  ******
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

var map;

//***** 現在地付近のマップを描画する *****
function renderBaseMap(lat, lng){
  let coordinates = {lat: lat, lng: lng};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16, //地図の縮尺を1〜21で設定数が大きいほど拡大する
    center: coordinates //現在地をマップの中心地として設定
  });

  //マーカーの描画
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    title: "現在地" //マウスオーバーした際の表示文字
  });
}

function renderFoodIcons(data){
  let markers = [];
  let bounds = new google.maps.LatLngBounds(); 

  for(var i = 0; i < data.length; i++){
    let latitude = Number.parseFloat(data[i].lat);
    let longtitude = Number.parseFloat(data[i].lng);
    let coordinates = {lat: latitude, lng: longtitude}
    let title = data[i].name;
    let icon = data[i].logo_image;
    let food_menu_url = data[i].urls.pc;

    var marker = new google.maps.Marker({
      map: map,
      position: coordinates,
      title: title,
      icon: icon,
      animation: google.maps.Animation.DROP,
      id: i
    });
    //アイコンにクリックイベントハンドラを付与
    google.maps.event.addListener(marker, 'click', (function(url){
      return function(){ location.href = food_menu_url; };
    })(data[i].url));
    markers.push(marker);
    bounds.extend(markers[i].position); //マーカーの場所に表示範囲を指定
  }

  map.fitBounds(bounds);//全マーカが地図内に収まるように調整
}