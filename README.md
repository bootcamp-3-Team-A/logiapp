# logiapp  
Bootcamp#3 TeamA最終課題のリポジトリです

## インストールについて
git cloneしたら、cd clientしてnpm install、cd serverしてpoetry installすると依存関係がインストールされます。 
compose.yamlと同じ階層に.envを設置してDBに必要な情報を記載します。（内容はDMで送りました）  
その後、yamlファイルがあるディレクトリでdocker-compose up -d --buildするとDockerが起動します。  
※もし、commit時にprittierが起動しなかった場合は、コマンドで「export PATH=$PATH:./node_modules/.bin」を入力して見てください

## 規約について  
githubにpushできるものはdesign_docにドキュメントを含みます。  
pushできないものはNotionの規約まとめ（https://www.notion.so/41b7c666117d4132b14279f821172d37?pvs= ）に含みます。