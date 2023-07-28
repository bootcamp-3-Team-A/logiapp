FROM python:3.10.12
RUN apt-get update && apt-get -y install curl

# Poetryのインストール
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.poetry/bin:$PATH"

WORKDIR /usr/src/app
COPY pyproject.toml poetry.lock /usr/src/app/

# poetryを使って依存関係のインストール
RUN python3 -m pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

