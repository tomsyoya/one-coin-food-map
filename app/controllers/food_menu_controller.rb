class FoodMenuController < ApplicationController
  def top
  end

  def search
    latitude = params[:lat]
    longtitude = params[:long]

    get_shop_info(latitude, longtitude)
  end

  def show
  end
  
  def index
  end

  private
  def get_shop_info(lat, long)
    #apiを叩くqueryを作成
    params = URI.encode_www_form({ 
      key: ENV["HOTPEPPER_ACCESS_KEY"],
      format: "jsonp",
      lunch: 1,
      lat: lat,
      lng: long
    })
    
    uri = URI.parse("http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?#{params}")
    puts "request: " + uri.request_uri
    begin
      # [GETリクエスト]
      # Net::HTTP.startでHTTPセッションを開始する
      # 既にセッションが開始している場合はIOErrorが発生
      response = Net::HTTP.start(uri.host, uri.port) do |http|
        # Net::HTTP.open_timeout=で接続時に待つ最大秒数の設定をする
        # タイムアウト時はTimeoutError例外が発生
        http.open_timeout = 10
    
        # Net::HTTP.read_timeout=で読み込み1回でブロックして良い最大秒数の設定をする
        # デフォルトは60秒
        # タイムアウト時はTimeoutError例外が発生
        http.read_timeout = 30
    
        # Net::HTTP#getでレスポンスの取得
        # 返り値はNet::HTTPResponseのインスタンス
        http.get(uri.request_uri)
      end
    
      case response
      when Net::HTTPSuccess
        # JSONオブジェクトをHashへパースする
        JSON.parse(response.body)
      when Net::HTTPRedirection
        # リダイレクト先のレスポンスを取得する際は
        # response['Location']でリダイレクト先のURLを取得してリトライする必要がある
        p "Redirection: code=#{response.code} message=#{response.message}"
      else
        p "HTTP ERROR: code=#{response.code} message=#{response.message}"
      end
    
    rescue IOError => e
      p e.message
    rescue TimeoutError => e
      p e.message
    rescue JSON::ParserError => e
      p e.message
    rescue => e
      p e.message
    end
  end  

  def get_menues(url)
     charset = nil

     html = open(url) do |f|
         charset = f.charset
         f.read
     end
     
     doc = Nokogiri::HTML.parse(html, nil, charset)
     doc.xpath('//div[@class="shopInner"]').each do |node|
       p node.css('h3').children[0].inner_text
       p node.css('dd').children[0].inner_text
     end
  end
end
