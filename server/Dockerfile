FROM python:3.10.12

# パッケージのインストール
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install uvicorn

WORKDIR /usr/src/app

# requirements.txtをコピーして依存関係をインストール
COPY requirements.txt /usr/src/app/
RUN python3 -m pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
