import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base
from fastapi.testclient import TestClient
from sql.app.models.model import Idea5w2hIdea
from api.idea_5w2h_api import app


DATABASE_URL_TEST = "sqlite:///./test.db"


Base = declarative_base()


@pytest.fixture(scope="function")
def test_db():
    engine = create_engine(DATABASE_URL_TEST)
    Base.metadata.create_all(bind=engine)
    db = Session(bind=engine)

    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)


def test_create_idea_5w2h_idea(test_client: TestClient, test_db: Session):
    idea_data = {
        "why": "Test Why",
        "when": "Test When",
        "where": "Test Where",
        "who": "Test Who",
        "what": "Test What",
        "how": "Test How",
        "how_much": "Test How Much",
        "idea_5w2h_title": "Test Idea Title",
    }

    response = test_client.post("/5w2h", json=idea_data)
    assert response.status_code == 200
    data = response.json()
    assert data["why"] == idea_data["why"]
    assert data["when"] == idea_data["when"]
    assert data["where"] == idea_data["where"]
    assert data["who"] == idea_data["who"]
    assert data["what"] == idea_data["what"]
    assert data["how"] == idea_data["how"]
    assert data["how_much"] == idea_data["how_much"]
    assert data["idea_5w2h_title"] == idea_data["idea_5w2h_title"]


def test_get_idea_5w2h_idea(test_client: TestClient, test_db: Session):
    test_idea = Idea5w2hIdea(
        why="Test Why",
        when="Test When",
        where="Test Where",
        who="Test Who",
        what="Test What",
        how="Test How",
        how_much="Test How Much",
        idea_5w2h_title="Test Idea Title",
    )
    test_db.add(test_idea)
    test_db.commit()

    response = test_client.get(f"/5w2h?idea_5w2h_id={test_idea.idea_5w2h_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["idea_5w2h_id"] == test_idea.idea_5w2h_id
    assert data["why"] == test_idea.why
    assert data["when"] == test_idea.when
    assert data["where"] == test_idea.where
    assert data["who"] == test_idea.who
    assert data["what"] == test_idea.what
    assert data["how"] == test_idea.how
    assert data["how_much"] == test_idea.how_much
    assert data["idea_5w2h_title"] == test_idea.idea_5w2h_title
