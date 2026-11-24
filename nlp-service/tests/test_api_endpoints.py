import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["plataforma"] == "Mineração de Texto e Linguagem Natural - COVID-19"

def test_health():
    response = client.get("/api/nlp/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_tokenize_api():
    response = client.post("/api/nlp/tokenize", json={"text": "A Fiocruz desenvolve imunobiológicos."})
    assert response.status_code == 200
    data = response.json()
    assert "tokens" in data
    assert len(data["tokens"]) > 0

def test_preprocess_api():
    response = client.post("/api/nlp/preprocess", json={
        "text": "O Ministério da Saúde emitiu novas notas técnicas em 2021.",
        "remove_stopwords": True,
        "lowercase": True,
        "remove_punct": True
    })
    assert response.status_code == 200
    data = response.json()
    assert "ministério" in data["final_text"]
    assert "o" not in data["final_text"].split()

def test_sentiment_api():
    response = client.post("/api/nlp/sentiment", json={"text": "Eficácia e proteção comprovadas pelo ensaio clínico."})
    assert response.status_code == 200
    data = response.json()
    assert data["classification"] == "POSITIVO"
    assert "pedagogical_disclaimer" in data

def test_similarity_api():
    response = client.post("/api/nlp/similarity", json={
        "text1": "Vacinas salvam vidas e reduzem hospitalizações graves.",
        "text2": "A vacinação em massa diminui o risco de internação em leitos de UTI."
    })
    assert response.status_code == 200
    data = response.json()
    assert "similarity_score" in data
    assert "interpretation" in data

def test_empty_text_error():
    response = client.post("/api/nlp/tokenize", json={"text": "   "})
    assert response.status_code == 400
