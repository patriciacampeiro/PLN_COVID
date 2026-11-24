import pytest
from app.services.text_processor import TextProcessor

def test_tokenize_identifies_tokens():
    text = "A Fiocruz desenvolve vacinas contra a Covid-19."
    tokens = TextProcessor.tokenize(text)
    assert len(tokens) > 0
    words = [t["text"] for t in tokens]
    assert "Fiocruz" in words
    assert "vacinas" in words

def test_preprocess_removes_stopwords_and_lowercases():
    text = "O Ministério da Saúde publicou novas diretrizes em 2021!"
    res = TextProcessor.preprocess_pipeline(text, remove_stopwords=True, lowercase=True, remove_punct=True)
    final = res["final_text"]
    assert "o" not in final.split()
    assert "da" not in final.split()
    assert "ministério" in final
    assert "saúde" in final
    assert len(res["steps"]) >= 4

def test_stem_and_lemmatize():
    text = "vacinação vacinaram vacinas"
    comparisons = TextProcessor.stem_and_lemmatize(text)
    assert len(comparisons) > 0
    for item in comparisons:
        assert "stem" in item
        assert "lemma" in item

def test_frequency_analysis():
    text = "vacina vacina vacina imunização imunização eficácia"
    res = TextProcessor.frequency_analysis(text, top_n=5)
    assert res["total_tokens"] == 6
    top_term = res["frequencies"][0]
    assert top_term["term"] == "vacina"
    assert top_term["count"] == 3

def test_tfidf_computation():
    doc1 = "vacinas da Fiocruz apresentaram alta eficácia clínica."
    doc2 = "o Ministério da Saúde comprou vacinas contra o coronavírus."
    res = TextProcessor.calculate_tfidf([doc1, doc2], ["Doc 1", "Doc 2"])
    assert res["documents_count"] == 2
    assert len(res["top_terms_per_doc"]) == 2

def test_similarity_calculation():
    text1 = "A vacina da Fiocruz protege contra formas graves da doença."
    text2 = "A vacina desenvolvida pela Fiocruz garante proteção contra o vírus."
    res = TextProcessor.calculate_similarity(text1, text2)
    assert res["similarity_score"] > 0.3
    assert "vacina" in res["common_words"]

def test_sentiment_analysis():
    pos_text = "O ensaio clínico comprovou alta eficácia, proteção e recuperação dos pacientes."
    neg_text = "O colapso hospitalar resultou em aumento de óbitos e grave crise sanitária."
    res_pos = TextProcessor.sentiment_analysis(pos_text)
    res_neg = TextProcessor.sentiment_analysis(neg_text)
    assert res_pos["classification"] == "POSITIVO"
    assert res_neg["classification"] == "NEGATIVO"
