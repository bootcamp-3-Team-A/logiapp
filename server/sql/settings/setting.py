from dotenv import load_dotenv
import os

# .envファイルから環境変数を読み込む
load_dotenv()

# 環境変数の取得
dialect = "mysql"
driver = "pymysql"
username = "root"
password = os.environ.get("MY_DB_PASSWORD")
<<<<<<< HEAD
host = "172.29.0.1"
port = "3306"
database = os.environ.get("MY_DATABASE")
charset_type = "utf8mb4"
=======
host = "127.0.0.1"
port = "3306"
database = os.environ.get("MY_DATABASE")
charset_type = "utf8"
>>>>>>> 6685d4c (Initial commit)
DATABASE_URL = f"{dialect}+{driver}://{username}:{password}@{host}:{port}/{database}?charset={charset_type}"
