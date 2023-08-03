from sql.app.models.model import Base, User
from sql.database.database import ENGINE
from sqlalchemy.orm import sessionmaker

Base.metadata.create_all(bind=ENGINE)

Session = sessionmaker(bind=ENGINE)
session = Session()


seed_data = [{"user_name": "John", "user_mail": "john@example.com"}]


session.bulk_insert_mappings(User, seed_data)


session.commit()

# Sessionをクローズします
session.close()

# 実行の際はmain.pyにfrom sql.app.views import viewを記載してpython main.py
