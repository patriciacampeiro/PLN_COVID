import re
import math
from collections import Counter
from typing import List, Dict, Any, Tuple

# Tentar carregar spaCy com modelo em português ou fallback robusto
try:
    import spacy
    nlp = spacy.load("pt_core_news_sm")
except Exception:
    try:
        import spacy
        nlp = spacy.blank("pt")
    except Exception:
        nlp = None

# Tentar carregar NLTK para stemming em português
try:
    import nltk
    from nltk.stem.snowball import PortugueseStemmer
    stemmer = PortugueseStemmer()
except Exception:
    stemmer = None

# Stopwords oficiais em português
PORTUGUESE_STOPWORDS = {
    "de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "é", "com", "não", "uma", "os", "no", "se", "na",
    "por", "mais", "as", "dos", "como", "mas", "foi", "ao", "ele", "das", "tem", "à", "seu", "sua", "ou", "ser",
    "quando", "muito", "nos", "já", "está", "eu", "também", "só", "pelo", "pela", "até", "isso", "ela", "entre",
    "era", "depois", "sem", "mesmo", "aos", "ter", "seus", "quem", "nas", "me", "esse", "eles", "estão", "você",
    "tinha", "foram", "essa", "num", "nem", "suas", "meu", "às", "minha", "têm", "numa", "pelos", "elas", "havia",
    "seja", "qual", "será", "nós", "tenho", "lhe", "deles", "essas", "esses", "pelas", "este", "fosse", "dele",
    "tu", "te", "vocês", "vos", "lhes", "meus", "minhas", "teu", "tua", "teus", "tuas", "nosso", "nossa", "nossos",
    "nossas", "dela", "delas", "esta", "estes", "estas", "aquele", "aquela", "aqueles", "aquelas", "isto", "aquilo",
    "estou", "está", "estamos", "estão", "estive", "esteve", "estivemos", "estiveram", "estava", "estávamos", "estavam"
}

# Léxico de polaridade em português com foco no domínio sanitário
LEXICO_SENTIMENTOS = {
    # Positivos
    "eficácia": 0.9, "proteção": 0.8, "sucesso": 0.85, "avanço": 0.8, "cura": 0.95, "seguro": 0.75,
    "redução": 0.5, "queda": 0.4, "melhoria": 0.85, "esperança": 0.75, "imunização": 0.8, "efetivo": 0.85,
    "recuperação": 0.9, "comemorou": 0.7, "positivo": 0.7, "benefício": 0.8, "aprovado": 0.85, "estável": 0.6,
    "alívio": 0.75, "controle": 0.65, "sustentável": 0.7, "progresso": 0.8,
    # Negativos
    "morte": -0.95, "óbito": -0.95, "colapso": -0.9, "crise": -0.85, "gravidade": -0.8, "risco": -0.7,
    "ameaça": -0.8, "medo": -0.75, "pânico": -0.85, "alta": -0.4, "aumento": -0.4, "infectado": -0.7,
    "contágio": -0.65, "sintomas": -0.6, "doença": -0.7, "hospitalização": -0.65, "grave": -0.8, "falta": -0.6,
    "escassez": -0.75, "desinformação": -0.85, "falso": -0.8, "incorreto": -0.7, "letalidade": -0.9, "vírus": -0.4
}

class TextProcessor:

    @staticmethod
    def tokenize(text: str) -> List[Dict[str, Any]]:
        """Tokenização detalhada com metadados linguísticos."""
        if not text.strip():
            return []
        
        tokens = []
        if nlp:
            doc = nlp(text)
            for t in doc:
                tokens.append({
                    "text": t.text,
                    "lemma": t.lemma_,
                    "pos": t.pos_,
                    "is_stop": t.text.lower() in PORTUGUESE_STOPWORDS,
                    "is_punct": t.is_punct,
                    "is_alpha": t.is_alpha,
                    "start": t.idx,
                    "end": t.idx + len(t.text)
                })
        else:
            # Fallback regex baseado na morfologia de português
            raw_tokens = re.findall(r"\w+|[^\w\s]", text, re.UNICODE)
            cursor = 0
            for t in raw_tokens:
                start = text.find(t, cursor)
                cursor = start + len(t) if start != -1 else cursor
                tokens.append({
                    "text": t,
                    "lemma": t.lower(),
                    "pos": "NOUN" if t.isalpha() else "PUNCT",
                    "is_stop": t.lower() in PORTUGUESE_STOPWORDS,
                    "is_punct": not t.isalnum(),
                    "is_alpha": t.isalpha(),
                    "start": start,
                    "end": start + len(t)
                })
        return tokens

    @staticmethod
    def preprocess_pipeline(text: str, remove_stopwords: bool = True, lowercase: bool = True,
                            remove_punct: bool = True, remove_numbers: bool = False) -> Dict[str, Any]:
        """Apresenta a transformação didática passo a passo do texto."""
        steps = []
        current = text
        steps.append({"step": "original", "description": "Texto Bruto Original", "text": current})

        if lowercase:
            current = current.lower()
            steps.append({"step": "lowercase", "description": "Conversão para Minúsculas (Normalização)", "text": current})

        if remove_numbers:
            current = re.sub(r"\d+", " ", current)
            steps.append({"step": "remove_numbers", "description": "Remoção de Algarismos e Dígitos", "text": current})

        if remove_punct:
            current = re.sub(r"[^\w\s]", " ", current, flags=re.UNICODE)
            current = re.sub(r"\s+", " ", current).strip()
            steps.append({"step": "remove_punct", "description": "Remoção de Pontuação e Símbolos", "text": current})

        words = current.split()
        if remove_stopwords:
            filtered_words = [w for w in words if w not in PORTUGUESE_STOPWORDS and len(w) > 1]
            current = " ".join(filtered_words)
            steps.append({
                "step": "remove_stopwords",
                "description": f"Filtragem de Stopwords ({len(words) - len(filtered_words)} removidas)",
                "text": current
            })

        return {
            "original_length": len(text),
            "final_length": len(current),
            "tokens_count": len(current.split()),
            "steps": steps,
            "final_text": current
        }

    @staticmethod
    def stem_and_lemmatize(text: str) -> List[Dict[str, str]]:
        """Compara Stemming (Radicalização) e Lematização para cada palavra."""
        words = re.findall(r"\b[A-Za-zÀ-ÿ]+\b", text)
        results = []
        seen = set()

        for word in words:
            w_lower = word.lower()
            if w_lower in seen or len(w_lower) < 3:
                continue
            seen.add(w_lower)

            # Stemming
            if stemmer:
                stem_val = stemmer.stem(w_lower)
            else:
                # Regras morfológicas simplificadas de sufixos em pt-br
                stem_val = re.sub(r"(mente|ando|endo|indo|aram|eram|iram|aram|ções|ção|ar|er|ir|os|as|es)$", "", w_lower)

            # Lemmatization
            if nlp:
                doc = nlp(word)
                lemma_val = doc[0].lemma_
            else:
                lemma_val = w_lower

            results.append({
                "original": word,
                "stem": stem_val,
                "lemma": lemma_val,
                "is_same": stem_val == lemma_val
            })
        return results

    @staticmethod
    def frequency_analysis(text: str, top_n: int = 20, ngram: int = 1) -> Dict[str, Any]:
        """Calcula frequência absoluta, relativa e gera dados para nuvem de palavras."""
        clean = re.sub(r"[^\w\s]", " ", text.lower(), flags=re.UNICODE)
        words = [w for w in clean.split() if w not in PORTUGUESE_STOPWORDS and len(w) > 2]
        
        if not words:
            return {"total_words": 0, "unique_words": 0, "frequencies": []}

        if ngram == 1:
            tokens = words
        else:
            tokens = [" ".join(words[i:i+ngram]) for i in range(len(words)-ngram+1)]

        counter = Counter(tokens)
        total = sum(counter.values())
        top_items = counter.most_common(top_n)

        freq_list = []
        for term, count in top_items:
            rel_freq = round((count / total) * 100, 2)
            freq_list.append({
                "term": term,
                "count": count,
                "relative_frequency": rel_freq,
                "weight": count  # usado para nuvem de palavras
            })

        return {
            "total_tokens": total,
            "unique_terms": len(counter),
            "ngram_order": ngram,
            "frequencies": freq_list
        }

    @staticmethod
    def calculate_tfidf(documents: List[str], doc_titles: List[str] = None) -> Dict[str, Any]:
        """Calcula a matriz TF-IDF completa com fórmula explicada."""
        if not documents:
            return {"vocabulary": [], "matrix": [], "top_terms_per_doc": []}

        if not doc_titles:
            doc_titles = [f"Documento {i+1}" for i in range(len(documents))]

        # Tokenização e contagem de termos por documento
        tokenized_docs = []
        all_terms = set()
        for doc in documents:
            clean = re.sub(r"[^\w\s]", " ", doc.lower(), flags=re.UNICODE)
            tokens = [t for t in clean.split() if t not in PORTUGUESE_STOPWORDS and len(t) > 2]
            tokenized_docs.append(tokens)
            all_terms.update(tokens)

        vocab = sorted(list(all_terms))
        N = len(documents)

        # Cálculo do IDF: idf(t) = log((1 + N) / (1 + df(t))) + 1 (smoothing scikit-learn)
        df = Counter()
        for tokens in tokenized_docs:
            for term in set(tokens):
                df[term] += 1

        idf = {}
        for term in vocab:
            idf[term] = math.log((1 + N) / (1 + df[term])) + 1

        # Cálculo do TF e Matriz TF-IDF com normalização L2
        tfidf_matrix = []
        top_terms_per_doc = []

        for idx, tokens in enumerate(tokenized_docs):
            doc_len = max(len(tokens), 1)
            tf = Counter(tokens)
            row_vector = []
            term_scores = []

            for term in vocab:
                term_tf = tf[term] / doc_len
                score = term_tf * idf[term]
                row_vector.append(score)
                if score > 0:
                    term_scores.append({"term": term, "score": round(score, 4), "tf": round(term_tf, 4), "idf": round(idf[term], 4)})

            # Normalização L2
            norm = math.sqrt(sum(x*x for x in row_vector))
            if norm > 0:
                normalized_vector = [round(x / norm, 4) for x in row_vector]
            else:
                normalized_vector = [0.0] * len(row_vector)

            tfidf_matrix.append(normalized_vector)
            term_scores.sort(key=lambda x: x["score"], reverse=True)
            top_terms_per_doc.append({
                "doc_title": doc_titles[idx],
                "top_terms": term_scores[:5]
            })

        return {
            "documents_count": N,
            "vocabulary_size": len(vocab),
            "vocabulary": vocab[:40],  # amostra para visualização tabular
            "top_terms_per_doc": top_terms_per_doc,
            "formula_explanation": "TF-IDF = (Freq / TotalTermosDoc) * (ln((1 + N) / (1 + DF)) + 1)"
        }

    @staticmethod
    def calculate_similarity(text1: str, text2: str) -> Dict[str, Any]:
        """Cálculo didático da Similaridade do Cosseno."""
        tfidf_res = TextProcessor.calculate_tfidf([text1, text2], ["Texto A", "Texto B"])
        matrix = tfidf_res.get("matrix", [])
        
        # Obter vetores TF-IDF diretos
        clean1 = re.sub(r"[^\w\s]", " ", text1.lower()).split()
        clean2 = re.sub(r"[^\w\s]", " ", text2.lower()).split()
        
        words1 = [w for w in clean1 if w not in PORTUGUESE_STOPWORDS and len(w) > 2]
        words2 = [w for w in clean2 if w not in PORTUGUESE_STOPWORDS and len(w) > 2]
        
        vocab = sorted(list(set(words1 + words2)))
        c1 = Counter(words1)
        c2 = Counter(words2)
        
        v1 = [c1[w] for w in vocab]
        v2 = [c2[w] for w in vocab]
        
        dot_product = sum(a * b for a, b in zip(v1, v2))
        norm1 = math.sqrt(sum(a * a for a in v1))
        norm2 = math.sqrt(sum(b * b for b in v2))
        
        if norm1 * norm2 > 0:
            similarity = dot_product / (norm1 * norm2)
        else:
            similarity = 0.0

        common_words = list(set(words1).intersection(set(words2)))

        return {
            "similarity_score": round(similarity, 4),
            "percentage": round(similarity * 100, 2),
            "dot_product": dot_product,
            "norm_text1": round(norm1, 4),
            "norm_text2": round(norm2, 4),
            "shared_vocabulary_count": len(common_words),
            "common_words": common_words[:15],
            "interpretation": (
                "Textos altamente similares e com temática congruente." if similarity > 0.65
                else "Similaridade moderada: compartilham termos-chave da pandemia." if similarity > 0.3
                else "Baixa similaridade semântica: vocabulário disjunto."
            )
        }

    @staticmethod
    def sentiment_analysis(text: str) -> Dict[str, Any]:
        """Classificação de polaridade léxica com salvaguarda pedagógica."""
        clean = re.sub(r"[^\w\s]", " ", text.lower(), flags=re.UNICODE)
        words = clean.split()
        
        score = 0.0
        matches_pos = []
        matches_neg = []

        for word in words:
            if word in LEXICO_SENTIMENTOS:
                weight = LEXICO_SENTIMENTOS[word]
                if weight > 0:
                    matches_pos.append({"term": word, "weight": weight})
                    score += weight
                else:
                    matches_neg.append({"term": word, "weight": weight})
                    score += weight

        total_matches = len(matches_pos) + len(matches_neg)
        if total_matches > 0:
            normalized_score = score / max(total_matches, 1)
        else:
            normalized_score = 0.0

        if normalized_score > 0.15:
            label = "POSITIVO"
        elif normalized_score < -0.15:
            label = "NEGATIVO"
        else:
            label = "NEUTRO"

        return {
            "classification": label,
            "polarity_score": round(normalized_score, 3),
            "positive_terms": matches_pos,
            "negative_terms": matches_neg,
            "pedagogical_disclaimer": (
                "Atenção Acadêmica: Na análise textual de crises sanitárias, vocábulos biomédicos "
                "(ex: 'vírus', 'letalidade', 'alta hospitalar') possuem polaridade contextual específica. "
                "Classificações automáticas não traduzem diretamente a emoção humana nem substituem "
                "a interpretação qualitativa dos fatos."
            )
        }

    @staticmethod
    def extract_entities(text: str) -> List[Dict[str, Any]]:
        """Reconhecimento de Entidades Nomeadas (NER)."""
        entities = []
        if nlp:
            doc = nlp(text)
            for ent in doc.ents:
                entities.append({
                    "text": ent.text,
                    "label": ent.label_,
                    "start": ent.start_char,
                    "end": ent.end_char,
                    "description": {
                        "PER": "Pessoa",
                        "ORG": "Organização / Instituição de Saúde",
                        "LOC": "Localização / Território",
                        "MISC": "Variante, Ensaio ou Conceito"
                    }.get(ent.label_, ent.label_)
                })
        else:
            # Reconhecimento baseado em entidades predefinidas da COVID-19
            known = {
                "Fiocruz": "ORG", "Ministério da Saúde": "ORG", "OMS": "ORG", "ANVISA": "ORG",
                "Instituto Butantan": "ORG", "Universidade de Oxford": "ORG", "SUS": "ORG",
                "Brasil": "LOC", "Amazonas": "LOC", "Rio de Janeiro": "LOC", "Reino Unido": "LOC",
                "Tedros Adhanom": "PER", "Nísia Trindade": "PER",
                "Gama": "MISC", "Ômicron": "MISC", "Delta": "MISC", "Sars-CoV-2": "MISC"
            }
            for name, category in known.items():
                for match in re.finditer(re.escape(name), text, re.IGNORECASE):
                    entities.append({
                        "text": match.group(),
                        "label": category,
                        "start": match.start(),
                        "end": match.end(),
                        "description": "Organização / Instituição" if category == "ORG" else "Local / Território"
                    })
        return entities
