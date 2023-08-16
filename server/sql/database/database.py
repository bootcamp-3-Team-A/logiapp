from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sql.settings.setting import DATABASE_URL

# Engineの作成
ENGINE = create_engine(DATABASE_URL, echo=True)

# セッションの作成
<<<<<<< HEAD
SessionLocal = sessionmaker(bind=ENGINE)
session = scoped_session(SessionLocal)
=======
Session = sessionmaker(bind=ENGINE)
session = scoped_session(Session)
>>>>>>> 6685d4c (Initial commit)
