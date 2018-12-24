class FoodMenuController < ApplicationController
  
  def top
  end

  def search
    #ブラウザから現在地の緯度/経度を取得
    location_data = JSON.parse(params[:geo_location])

    # 現在地からお店情報を取得するクエリを作成
    latitude_code = "lat=" + location_data.latitude
    longitude_code = "lng=" + location_data.longitude
    query = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=7991055f07ed4925"
    query += "&" + latitude_code
    query += "&" + longitude_code

    uri = URI.parse(query)

    #クエリ実行
    response = Net::HTTP.start(uri.host, uri.port) do |http|
      # 接続時に待つ最大秒数を設定
      http.open_timeout = 5
      # 読み込み一回でブロックして良い最大秒数を設定
      http.read_timeout = 10
      
      http.get(uri.request_uri)
    end

    # 例外処理の開始
    begin
      # responseの値に応じて処理を分ける
      case response
      # 成功した場合
      when Net::HTTPSuccess
        # responseのbody要素をJSON形式で解釈し、hashに変換
        result = JSON.parse(response.body)
        redirect_to food_menu_show(location: result)
      # 別のURLに飛ばされた場合
      when Net::HTTPRedirection
        @message = "Redirection: code=#{response.code} message=#{response.message}"
      # その他エラー
      else
        @message = "HTTP ERROR: code=#{response.code} message=#{response.message}"
      end
    # エラー時処理
    rescue IOError => e
      @message = "e.message"
    rescue TimeoutError => e
      @message = "e.message"
    rescue JSON::ParserError => e
      @message = "e.message"
    rescue => e
      @message = "e.message"
    end
    
  end
  
  def show
  end

  def index
  end
end
