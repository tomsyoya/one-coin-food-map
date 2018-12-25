# ワンコイン飯検索アプリ

## overview
自分の位置情報からワンコインで食事できるお店を即座に検索できるアプリです。


機能は以下の通り

- ブラウザを使用した現在位置情報の取得
- 現在位置に基づいたお店情報の検索
- ログインユーザーによるお店のお気に入り機能

## How To Use
※dockerクライアントがインストールされていることを前提としています。
### 任意の場所にダウンロード

```
$ git clone git@github.com:tomsyoya/one-coin-food-map.git
$ cd one-coin-food-map
```

### 必要なパッケージのインストール

```
$ docker-compose build
```

### アプリケーションの起動

```
$ docker-compose up -d
```