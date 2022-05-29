# Twitter clone app

"Twitter clone app"は主にDjango Rest Framework, TypeScript, Redux tool kit, material uiによって作成された
ツイッターをモデルにしたWebアプリケーションです。

# DEMO
デプロイについては今現在学習中のため、簡易的な機能紹介動画を記載しています。  
[動画はこちら](https://youtu.be/dMcffr7eMzc)

# Features
・今回のユーザー認証方式はJWT認証を用いています。  
・公開可能なユーザー情報やツイート内容はReduxのStateに保持しており、Extra reducerで情報が更新(APIと非同期処理)されたときに  
Stateが更新されるように処理を行っている。

# Requirement
```
Docker
docker-compose
Python 3.x
Nodejs
Redux tool kit
```

# Installation
Dockerfile参照

# I learned what
何も計画せずにとりあえずAPIを作り、とりあえず必要なComponentを作っていった。
あとでこんな構成にしておけばよかったと思うことが多くあった。
初めにどのような構造で開発するのかを決めることがどれだけ大事かを学ぶことがこのアプリ開発をすすめる中で学んだ。

# Author
* Logarithm
* University
* kosuke.eng@gmail.com
