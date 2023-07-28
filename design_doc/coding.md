## 目的  

本コーディング規約はBootCamp#3 Team-Aの最終プロジェクトにおける開発時に適用されます。既存開発メンバーの情報共有はもちろんのこと、これから新しく入ってくるメンバーに対しても速やかに情報共有されるべく、記述されています。  

本コーディング規約はごく基本的な項目に限って記述しています。新しく出てきた不明点があれば、随時更新されます。  

## プロジェクトの構成  

ファイル構成は次のようになっています。  

| フォルダ名 | 用途 |
|-----------|-----------|
| client      | フロントサイド |
| server      | サーバーサイド |
| design_doc  | 規約など |

## 規約について    
TypescriptについてはTypescript Deep Dive日本語版のスタイルガイド（https://typescript-jp.gitbook.io/deep-dive/styleguide ）に従います。   
PythonについてはPEP8（https://pep8-ja.readthedocs.io/ja/latest ）に従います。  
メンバーは上記2つの規約を通読してからコーディング作業を行います。  

クライアントサイドはprettierとESLintを導入し、スタイルの整形に活用します。  
サーバーサイドはpycodestyleを導入し、スタイルの整形に活用します。
