from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = "user_table"

    user_id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    user_name = Column(String(255))
    user_mail = Column(String(255))


class IdeaMandalaCore(Base):
    __tablename__ = "idea_mandala_core_table"

    mandala_id = Column(Integer, Sequence("mandala_id_seq"), primary_key=True)
    mandala1_1 = Column(String(255))
    mandala1_2 = Column(String(255))
    mandala1_3 = Column(String(255))
    mandala1_4 = Column(String(255))
    mandala1_5 = Column(String(255))
    mandala1_6 = Column(String(255))
    mandala1_7 = Column(String(255))
    mandala1_8 = Column(String(255))
    mandala1_9 = Column(String(255))
    mandala2_1 = Column(String(255))
    mandala2_2 = Column(String(255))
    mandala2_3 = Column(String(255))
    mandala2_4 = Column(String(255))
    mandala2_5 = Column(String(255))
    mandala2_6 = Column(String(255))
    mandala2_7 = Column(String(255))
    mandala2_8 = Column(String(255))
    mandala2_9 = Column(String(255))
    mandala3_1 = Column(String(255))
    mandala3_2 = Column(String(255))
    mandala3_3 = Column(String(255))
    mandala3_4 = Column(String(255))
    mandala3_5 = Column(String(255))
    mandala3_6 = Column(String(255))
    mandala3_7 = Column(String(255))
    mandala3_8 = Column(String(255))
    mandala3_9 = Column(String(255))
    mandala4_1 = Column(String(255))
    mandala4_2 = Column(String(255))
    mandala4_3 = Column(String(255))
    mandala4_4 = Column(String(255))
    mandala4_5 = Column(String(255))
    mandala4_6 = Column(String(255))
    mandala4_7 = Column(String(255))
    mandala4_8 = Column(String(255))
    mandala4_9 = Column(String(255))
    mandala5_1 = Column(String(255))
    mandala5_2 = Column(String(255))
    mandala5_3 = Column(String(255))
    mandala5_4 = Column(String(255))
    mandala5_5 = Column(String(255))
    mandala5_6 = Column(String(255))
    mandala5_7 = Column(String(255))
    mandala5_8 = Column(String(255))
    mandala5_9 = Column(String(255))
    mandala6_1 = Column(String(255))
    mandala6_2 = Column(String(255))
    mandala6_3 = Column(String(255))
    mandala6_4 = Column(String(255))
    mandala6_5 = Column(String(255))
    mandala6_6 = Column(String(255))
    mandala6_7 = Column(String(255))
    mandala6_8 = Column(String(255))
    mandala6_9 = Column(String(255))
    mandala7_1 = Column(String(255))
    mandala7_2 = Column(String(255))
    mandala7_3 = Column(String(255))
    mandala7_4 = Column(String(255))
    mandala7_5 = Column(String(255))
    mandala7_6 = Column(String(255))
    mandala7_7 = Column(String(255))
    mandala7_8 = Column(String(255))
    mandala7_9 = Column(String(255))
    mandala8_1 = Column(String(255))
    mandala8_2 = Column(String(255))
    mandala8_3 = Column(String(255))
    mandala8_4 = Column(String(255))
    mandala8_5 = Column(String(255))
    mandala8_6 = Column(String(255))
    mandala8_7 = Column(String(255))
    mandala8_8 = Column(String(255))
    mandala8_9 = Column(String(255))
    mandala9_1 = Column(String(255))
    mandala9_2 = Column(String(255))
    mandala9_3 = Column(String(255))
    mandala9_4 = Column(String(255))
    mandala9_5 = Column(String(255))
    mandala9_6 = Column(String(255))
    mandala9_7 = Column(String(255))
    mandala9_8 = Column(String(255))
    mandala9_9 = Column(String(255))


class Idea5w2hIdea(Base):
    __tablename__ = "idea_5w2h_idea_table"

    idea_5w2h_id = Column(Integer, Sequence("idea_5w2h_id_seq"), primary_key=True)
    why = Column(String(255))
    when = Column(String(255))
    where = Column(String(255))
    who = Column(String(255))
    what = Column(String(255))
    how = Column(String(255))
    how_much = Column(String(255))


class Idea5w2h(Base):
    __tablename__ = "idea_5w2h_table"

    idea_5w2h_id = Column(Integer, ForeignKey("idea_5w2h_idea_table.idea_5w2h_id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("user_table.user_id"))
    idea_5w2h_title = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class Mandala(Base):
    __tablename__ = "mandala_table"

    mandala_id = Column(Integer, ForeignKey("idea_mandala_core_table.mandala_id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("user_table.user_id"))
    mandala_title = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class UserIdea(Base):
    __tablename__ = "user_idea_table"

    user_id = Column(Integer, ForeignKey("user_table.user_id"), primary_key=True)
    idea_5w2h_id = Column(Integer, Sequence("idea_5w2h_id_seq"))
    mandala_id = Column(Integer, Sequence("mandala_id_seq"))
