# logiapp  
Bootcamp#3 TeamA最終課題のリポジトリです

## インストールについて
git cloneしたら、cd clientしてnpm install、cd serverしてpoetry installすると依存関係がインストールされます。 
compose.yamlと同じ階層に.envを設置してDBに必要な情報を記載します。（内容はDMで送りました）  
その後、yamlファイルがあるディレクトリでdocker-compose up -d --buildするとDockerが起動します。