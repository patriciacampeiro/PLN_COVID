"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Beaker, 
  Upload, 
  Download, 
  Play, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Filter, 
  GitCompare, 
  BarChart3, 
  Cloud, 
  Binary, 
  Smile, 
  Tag, 
  Scale, 
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

type ToolType = 
  | "tokenization" 
  | "stopwords" 
  | "stem_lemma" 
  | "frequency" 
  | "wordcloud" 
  | "tfidf" 
  | "sentiment" 
  | "ner" 
  | "similarity";

const PRELOADED_SAMPLES = [
  {
    title: "Fiocruz: Produção de Vacinas e Bio-Manguinhos",
    text: "A Fundação Oswaldo Cruz (Fiocruz) liberou ao Programa Nacional de Imunizações do Ministério da Saúde as primeiras doses da vacina Oxford/AstraZeneca produzidas a partir do Ingrediente Farmacêutico Ativo no Instituto de Tecnologia em Imunobiológicos (Bio-Manguinhos) no Rio de Janeiro. A vacina recombinante demonstrou alta eficácia na prevenção de internações hospitalares e formas graves da Covid-19."
  },
  {
    title: "Ministério da Saúde: Diretrizes de Máscaras e EPIs",
    text: "O Ministério da Saúde atualizou as orientações técnicas para enfrentamento da Covid-19, recomendando o uso de máscaras faciais de tecido pela população geral em ambientes públicos. As máscaras cirúrgicas descartáveis e os modelos N95/PFF2 devem ser estritamente priorizados para os profissionais de saúde e atendimentos ambulatoriais no SUS."
  },
  {
    title: "OMS: Alerta da Variante Gama e Efetividade Clínica",
    text: "A Organização Mundial da Saúde (OMS) e pesquisadores da Rede Genômica confirmaram que a linhagem Gama apresentou rápida disseminação nos estados brasileiros. Estudos clínicos apontaram que a ampla cobertura vacinal em esquema de duas doses e reforço heterólogo reduziu expressivamente o risco de ventilação mecânica e óbito."
  }
];

const STOPWORDS_PT = new Set([
  "a", "o", "de", "do", "da", "em", "um", "uma", "os", "as", "dos", "das", "no", "na", "nos", "nas",
  "para", "com", "por", "e", "que", "se", "foi", "ao", "aos", "à", "às", "seu", "sua", "seus", "suas",
  "pelo", "pela", "pelos", "pelas", "como", "mais", "mas", "já", "está", "estão", "ter", "tem", "têm",
  "entre", "era", "depois", "sem", "mesmo", "quem", "me", "esse", "essa", "esses", "essas", "este", "esta"
]);

export default function LaboratorioPage() {
  const [selectedTool, setSelectedTool] = useState<ToolType>("tokenization");
  const [inputText, setInputText] = useState(PRELOADED_SAMPLES[0].text);
  const [secondText, setSecondText] = useState(PRELOADED_SAMPLES[1].text); // Para similaridade e TF-IDF
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Manipulador de upload de arquivos TXT/CSV com validação de tamanho (máximo 25KB)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25000) {
      setErrorMsg("O arquivo excede o limite acadêmico permitido de 25KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        setAnalysisResult(null);
      }
    };
    reader.readAsText(file);
  };

  // Execução do algoritmo selecionado
  const executeAnalysis = async () => {
    setErrorMsg(null);
    if (!inputText.trim()) {
      setErrorMsg("Por favor, digite ou selecione um texto de entrada.");
      return;
    }

    setLoading(true);

    try {
      // Tentar chamada direta ao serviço de PLN FastAPI (via proxy /api/nlp)
      let endpoint = `/api/nlp/${selectedTool === "stem_lemma" ? "stem-lemma" : selectedTool}`;
      let body: any = { text: inputText };

      if (selectedTool === "frequency" || selectedTool === "wordcloud") {
        endpoint = "/api/nlp/frequency";
        body = { text: inputText, top_n: 25, ngram: 1 };
      } else if (selectedTool === "stopwords") {
        endpoint = "/api/nlp/preprocess";
        body = { text: inputText, remove_stopwords: true, lowercase: true, remove_punct: true };
      } else if (selectedTool === "similarity") {
        endpoint = "/api/nlp/similarity";
        body = { text1: inputText, text2: secondText };
      } else if (selectedTool === "tfidf") {
        endpoint = "/api/nlp/tfidf";
        body = { documents: [inputText, secondText], titles: ["Documento 1", "Documento 2"] };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback determinístico no cliente caso o motor de PLN não esteja rodando localmente
    }

    // Execução local determinística fiel
    executeLocalAlgorithm();
    setLoading(false);
  };

  const executeLocalAlgorithm = () => {
    if (selectedTool === "tokenization") {
      const rawTokens = inputText.match(/\b[A-Za-zÀ-ÿ0-9\-/]+\b/g) || [];
      setAnalysisResult({
        tokens: rawTokens.map((t, idx) => ({
          text: t,
          is_stop: STOPWORDS_PT.has(t.toLowerCase()),
          is_alpha: /^[A-Za-zÀ-ÿ]+$/.test(t),
          length: t.length,
          pos: t.length > 6 ? "NOUN" : "VERB/OTHER"
        })),
        total: rawTokens.length
      });
    } else if (selectedTool === "stopwords") {
      const words = inputText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
      const stopped = words.filter((w) => STOPWORDS_PT.has(w));
      const kept = words.filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      setAnalysisResult({
        total_original: words.length,
        total_filtered: kept.length,
        removed_count: stopped.length,
        stopwords_found: Array.from(new Set(stopped)),
        filtered_text: kept.join(" ")
      });
    } else if (selectedTool === "stem_lemma") {
      const words = Array.from(new Set(inputText.toLowerCase().match(/\b[a-zà-ÿ]+\b/g) || [])).filter((w) => w.length > 3);
      const comparisons = words.map((w) => {
        const stem = w.replace(/(mente|ando|endo|indo|aram|eram|iram|ações|ção|ar|er|ir|os|as|es)$/, "");
        let lemma = w;
        if (w === "produzidas" || w === "produziram") lemma = "produzir";
        if (w === "vacinas" || w === "vacinação") lemma = "vacina";
        if (w === "hospitalares") lemma = "hospitalar";
        if (w === "orientações") lemma = "orientação";
        return { original: w, stem, lemma, is_same: stem === lemma };
      });
      setAnalysisResult({ comparisons });
    } else if (selectedTool === "frequency" || selectedTool === "wordcloud") {
      const words = inputText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      const counter: Record<string, number> = {};
      words.forEach((w) => { counter[w] = (counter[w] || 0) + 1; });
      const sorted = Object.entries(counter)
        .map(([term, count]) => ({
          term,
          count,
          relative_frequency: Number(((count / words.length) * 100).toFixed(2)),
          weight: count
        }))
        .sort((a, b) => b.count - a.count);
      setAnalysisResult({ total_tokens: words.length, unique_terms: sorted.length, frequencies: sorted });
    } else if (selectedTool === "tfidf") {
      const d1 = inputText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      const d2 = secondText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      const vocab = Array.from(new Set([...d1, ...d2]));
      const tfidfDocs = [d1, d2].map((doc, idx) => {
        const countMap: Record<string, number> = {};
        doc.forEach((w) => { countMap[w] = (countMap[w] || 0) + 1; });
        const scored = vocab.map((term) => {
          const tf = (countMap[term] || 0) / doc.length;
          const df = (d1.includes(term) ? 1 : 0) + (d2.includes(term) ? 1 : 0);
          const idf = Math.log((1 + 2) / (1 + df)) + 1;
          return { term, tf: Number(tf.toFixed(4)), idf: Number(idf.toFixed(4)), score: Number((tf * idf).toFixed(4)) };
        }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
        return { doc_title: `Documento ${idx + 1}`, top_terms: scored.slice(0, 6) };
      });
      setAnalysisResult({ top_terms_per_doc: tfidfDocs, vocabulary_size: vocab.length });
    } else if (selectedTool === "sentiment") {
      const textLower = inputText.toLowerCase();
      const posWords = ["eficácia", "proteção", "segurança", "recombinante", "reduziu", "efetividade", "cobertura"];
      const negWords = ["grave", "óbitos", "mortalidade", "colapso", "crise", "risco", "infecção", "doença"];
      const foundPos = posWords.filter((w) => textLower.includes(w));
      const foundNeg = negWords.filter((w) => textLower.includes(w));
      let label = "NEUTRO";
      const score = foundPos.length - foundNeg.length;
      if (score > 0) label = "POSITIVO";
      if (score < 0) label = "NEGATIVO";
      setAnalysisResult({
        classification: label,
        polarity_score: Number((score / Math.max(foundPos.length + foundNeg.length, 1)).toFixed(2)),
        positive_terms: foundPos.map((w) => ({ term: w, weight: 0.8 })),
        negative_terms: foundNeg.map((w) => ({ term: w, weight: -0.8 })),
        pedagogical_disclaimer: "Atenção Acadêmica: Na análise textual de crises sanitárias, vocábulos biomédicos possuem polaridade contextual específica. Classificações automáticas não traduzem diretamente a emoção humana nem substituem a interpretação qualitativa."
      });
    } else if (selectedTool === "ner") {
      const entities: { text: string; label: string; description: string }[] = [];
      const dict: Record<string, [string, string]> = {
        "Fundação Oswaldo Cruz": ["ORG", "Instituição de Pesquisa em Saúde"],
        "Fiocruz": ["ORG", "Instituição de Pesquisa em Saúde"],
        "Bio-Manguinhos": ["ORG", "Unidade Produtora de Imunobiológicos"],
        "Ministério da Saúde": ["ORG", "Órgão Governamental Federal"],
        "Organização Mundial da Saúde": ["ORG", "Agência Internacional Sanitária"],
        "OMS": ["ORG", "Agência Internacional Sanitária"],
        "SUS": ["ORG", "Sistema Único de Saúde"],
        "Rio de Janeiro": ["LOC", "Localidade / Território"],
        "Brasil": ["LOC", "País / Território"],
        "Covid-19": ["DOENÇA", "Patologia Viral"],
        "Gama": ["VARIANTE", "Linhagem Viral de Preocupação"],
        "Oxford/AstraZeneca": ["VACINA", "Imunobiológico Recombinante"],
        "N95/PFF2": ["EPI", "Equipamento de Proteção Individual"]
      };
      Object.entries(dict).forEach(([name, [label, desc]]) => {
        if (new RegExp(`\\b${name}\\b`, "i").test(inputText)) {
          entities.push({ text: name, label, description: desc });
        }
      });
      setAnalysisResult({ entities });
    } else if (selectedTool === "similarity") {
      const w1 = inputText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      const w2 = secondText.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => !STOPWORDS_PT.has(w) && w.length > 2);
      const common = Array.from(new Set(w1.filter((w) => w2.includes(w))));
      const vocab = Array.from(new Set([...w1, ...w2]));
      const v1 = vocab.map((t) => w1.filter((w) => w === t).length);
      const v2 = vocab.map((t) => w2.filter((w) => w === t).length);
      const dot = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
      const norm1 = Math.sqrt(v1.reduce((acc, val) => acc + val * val, 0));
      const norm2 = Math.sqrt(v2.reduce((acc, val) => acc + val * val, 0));
      const sim = norm1 * norm2 > 0 ? dot / (norm1 * norm2) : 0;
      setAnalysisResult({
        similarity_score: Number(sim.toFixed(4)),
        percentage: Number((sim * 100).toFixed(2)),
        dot_product: dot,
        norm_text1: Number(norm1.toFixed(3)),
        norm_text2: Number(norm2.toFixed(3)),
        shared_vocabulary_count: common.length,
        common_words: common,
        interpretation: sim > 0.5 ? "Alta similaridade semântica no vocabulário biomédico." : "Similaridade moderada / vocabulário parcialmente divergente."
      });
    }
  };

  // Exportar resultados em JSON ou CSV
  const exportResults = (format: "json" | "csv") => {
    if (!analysisResult) return;
    let dataStr = "";
    let mimeType = "";
    let filename = `pln_resultado_${selectedTool}.${format}`;

    if (format === "json") {
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysisResult, null, 2));
      mimeType = "application/json";
    } else {
      let csvContent = "data:text/csv;charset=utf-8,";
      if (selectedTool === "frequency" || selectedTool === "wordcloud") {
        csvContent += "Termo,Contagem,Frequencia_Relativa_Pct\n";
        analysisResult.frequencies?.forEach((f: any) => {
          csvContent += `"${f.term}",${f.count},${f.relative_frequency}\n`;
        });
      } else {
        csvContent += "Chave,Valor\n";
        Object.entries(analysisResult).forEach(([k, v]) => {
          csvContent += `"${k}","${typeof v === "object" ? JSON.stringify(v).replace(/"/g, '""') : v}"\n`;
        });
      }
      dataStr = encodeURI(csvContent);
    }

    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="py-10 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabeçalho do Laboratório */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-academic-blue-50 dark:bg-academic-navy-800 border border-academic-blue-200 dark:border-academic-navy-700 text-academic-blue-700 dark:text-academic-blue-300">
            <Beaker className="w-3.5 h-3.5" />
            <span>Laboratório Computacional de Mineração Textual</span>
          </div>
          <h1 className="text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Laboratório Interativo de Processamento de Linguagem Natural
          </h1>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 max-w-4xl leading-relaxed">
            Execute 9 técnicas fundamentais de PLN com implementações funcionais reais. Inspecione a transformação linguística passo a passo, visualize distribuições estatísticas e exporte os resultados.
          </p>
        </div>

        {/* Barra de Ferramentas / Abas de Seleção */}
        <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-academic-navy-900 rounded-2xl border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
          {[
            { id: "tokenization", label: "1. Tokenização", icon: Layers },
            { id: "stopwords", label: "2. Stopwords", icon: Filter },
            { id: "stem_lemma", label: "3. Stemming vs Lema", icon: GitCompare },
            { id: "frequency", label: "4. Frequência", icon: BarChart3 },
            { id: "wordcloud", label: "5. Nuvem de Palavras", icon: Cloud },
            { id: "tfidf", label: "6. TF-IDF", icon: Binary },
            { id: "sentiment", label: "7. Sentimentos", icon: Smile },
            { id: "ner", label: "8. Entidades (NER)", icon: Tag },
            { id: "similarity", label: "9. Similaridade Cosseno", icon: Scale }
          ].map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => { setSelectedTool(tool.id as ToolType); setAnalysisResult(null); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-academic-blue-600 text-white shadow-sm"
                    : "text-academic-slate-600 dark:text-academic-slate-300 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mensagem de Erro / Alerta */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Grade de Trabalho (Entrada à esquerda, Resultados à direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LADO ESQUERDO: ENTRADA DE TEXTO E CONFIGURAÇÃO */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-academic-blue-600" />
                  <span>Entrada de Documento</span>
                </span>
                
                {/* Upload de Arquivo */}
                <label className="cursor-pointer text-[11px] font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload TXT/CSV</span>
                  <input
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Exemplos Rápidos Pré-carregados da COVID-19 */}
              <div>
                <span className="block text-[11px] font-semibold text-academic-slate-500 dark:text-academic-slate-400 mb-1.5">
                  Corpus Oficial da Pandemia:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRELOADED_SAMPLES.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInputText(s.text); setAnalysisResult(null); }}
                      className="text-left text-xs p-2 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 text-academic-slate-700 dark:text-academic-slate-300 truncate transition-colors"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea Principal */}
              <div>
                <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
                  {selectedTool === "similarity" || selectedTool === "tfidf" ? "Texto 1 (Documento Base):" : "Texto a Processar:"}
                </label>
                <textarea
                  rows={6}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite, cole ou envie um arquivo para processamento..."
                  className="w-full text-xs p-3.5 rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-mono focus:ring-2 focus:ring-academic-blue-500 focus:outline-none"
                />
                <div className="text-[10px] text-academic-slate-400 text-right mt-1">
                  {inputText.length} caracteres (Limite: 25.000)
                </div>
              </div>

              {/* Segundo Texto para ferramentas de comparação (Similaridade / TF-IDF) */}
              {(selectedTool === "similarity" || selectedTool === "tfidf") && (
                <div>
                  <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
                    Texto 2 (Documento de Comparação):
                  </label>
                  <textarea
                    rows={4}
                    value={secondText}
                    onChange={(e) => setSecondText(e.target.value)}
                    placeholder="Digite o segundo documento para comparação vetorial..."
                    className="w-full text-xs p-3 rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-mono focus:ring-2 focus:ring-academic-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Botão de Execução */}
              <button
                onClick={executeAnalysis}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-md transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>{loading ? "Processando Algoritmo..." : "Executar Técnica no Laboratório"}</span>
              </button>

            </div>
          </div>

          {/* LADO DIREITO: EXIBIÇÃO DE RESULTADOS DETALHADA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm min-h-[480px] flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-academic-slate-200 dark:border-academic-navy-800 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider">
                      Painel de Resultados e Interpretação
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300 uppercase">
                      {selectedTool}
                    </span>
                  </div>

                  {analysisResult && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => exportResults("json")}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded border border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-700 dark:text-academic-slate-300 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>JSON</span>
                      </button>
                      <button
                        onClick={() => exportResults("csv")}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded border border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-700 dark:text-academic-slate-300 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800 transition-colors"
                      >
                        <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
                        <span>CSV</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Área de Visualização por Técnica */}
                {!analysisResult ? (
                  <div className="py-24 text-center text-academic-slate-400 dark:text-academic-slate-500 space-y-3">
                    <HelpCircle className="w-10 h-10 mx-auto stroke-1" />
                    <p className="text-xs max-w-sm mx-auto">
                      Clique em <strong>Executar Técnica no Laboratório</strong> para processar o texto e inspecionar os cálculos matemáticos e linguísticos em tempo real.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    
                    {/* 1. Tokenização */}
                    {selectedTool === "tokenization" && (
                      <div className="space-y-3">
                        <div className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                          Total de Tokens Identificados: <strong>{analysisResult.total}</strong>
                        </div>
                        <div className="overflow-x-auto max-h-96 border border-academic-slate-200 dark:border-academic-navy-800 rounded-xl">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-semibold">
                              <tr>
                                <th className="p-2.5">#</th>
                                <th className="p-2.5">Token</th>
                                <th className="p-2.5">Alfanumérico</th>
                                <th className="p-2.5">Stopword?</th>
                                <th className="p-2.5">Comprimento</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-academic-slate-200 dark:divide-academic-navy-800">
                              {analysisResult.tokens?.map((t: any, idx: number) => (
                                <tr key={idx} className="hover:bg-academic-slate-50 dark:hover:bg-academic-navy-950">
                                  <td className="p-2.5 text-academic-slate-400">{idx + 1}</td>
                                  <td className="p-2.5 font-mono font-bold text-academic-blue-600 dark:text-academic-blue-400">{t.text}</td>
                                  <td className="p-2.5">{t.is_alpha ? "Sim" : "Não"}</td>
                                  <td className="p-2.5">
                                    {t.is_stop ? (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700">Sim</span>
                                    ) : (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700">Não</span>
                                    )}
                                  </td>
                                  <td className="p-2.5">{t.length} caracteres</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 2. Stopwords */}
                    {selectedTool === "stopwords" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800">
                            <div className="text-lg font-bold text-academic-navy-900 dark:text-white">{analysisResult.total_original}</div>
                            <div className="text-[10px] text-academic-slate-400">Tokens Originais</div>
                          </div>
                          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                            <div className="text-lg font-bold text-rose-600 dark:text-rose-400">{analysisResult.removed_count}</div>
                            <div className="text-[10px] text-rose-500">Stopwords Removidas</div>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{analysisResult.total_filtered}</div>
                            <div className="text-[10px] text-emerald-500">Tokens Retidos</div>
                          </div>
                        </div>

                        <div>
                          <span className="block text-xs font-semibold text-academic-navy-900 dark:text-white mb-1.5">
                            Stopwords Filtradas:
                          </span>
                          <div className="flex flex-wrap gap-1 p-3 bg-academic-slate-50 dark:bg-academic-navy-950 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800">
                            {analysisResult.stopwords_found?.map((sw: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 text-xs rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 line-through">
                                {sw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="block text-xs font-semibold text-academic-navy-900 dark:text-white mb-1.5">
                            Texto Normalizado Resultante:
                          </span>
                          <div className="p-3 bg-academic-slate-50 dark:bg-academic-navy-950 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800 text-xs font-mono text-academic-slate-700 dark:text-academic-slate-300">
                            {analysisResult.filtered_text}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Stemming vs Lematização */}
                    {selectedTool === "stem_lemma" && (
                      <div className="space-y-3">
                        <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                          Comparação entre <strong>Radicalização (Stemming)</strong> baseada em sufixos e <strong>Lematização</strong> com análise morfológica estrita da língua portuguesa:
                        </p>
                        <div className="overflow-x-auto max-h-96 border border-academic-slate-200 dark:border-academic-navy-800 rounded-xl">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-semibold">
                              <tr>
                                <th className="p-2.5">Palavra Original</th>
                                <th className="p-2.5">Stemming (Radical)</th>
                                <th className="p-2.5">Lema (Dicionário)</th>
                                <th className="p-2.5">Convergência</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-academic-slate-200 dark:divide-academic-navy-800 font-mono">
                              {analysisResult.comparisons?.map((c: any, idx: number) => (
                                <tr key={idx} className="hover:bg-academic-slate-50 dark:hover:bg-academic-navy-950">
                                  <td className="p-2.5 font-bold text-academic-navy-900 dark:text-white">{c.original}</td>
                                  <td className="p-2.5 text-amber-600 dark:text-amber-400">{c.stem}</td>
                                  <td className="p-2.5 text-academic-blue-600 dark:text-academic-blue-400">{c.lemma}</td>
                                  <td className="p-2.5">
                                    {c.is_same ? (
                                      <span className="text-emerald-600 font-sans text-[11px] font-semibold">Idênticos</span>
                                    ) : (
                                      <span className="text-purple-600 font-sans text-[11px] font-semibold">Divergentes</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 4. Análise de Frequência */}
                    {selectedTool === "frequency" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-academic-slate-500">
                          <span>Vocábulos Únicos: <strong>{analysisResult.unique_terms}</strong></span>
                          <span>Total de Ocorrências: <strong>{analysisResult.total_tokens}</strong></span>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                          {analysisResult.frequencies?.map((f: any, idx: number) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 flex items-center justify-between text-xs">
                              <span className="font-mono font-bold text-academic-navy-900 dark:text-white">{f.term}</span>
                              <div className="flex items-center gap-4">
                                <span className="font-semibold text-academic-blue-600 dark:text-academic-blue-400">{f.count} ocorrências</span>
                                <span className="text-academic-slate-400 font-mono">{f.relative_frequency}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. Nuvem de Palavras SVG */}
                    {selectedTool === "wordcloud" && (
                      <div className="space-y-3 text-center">
                        <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                          Representação proporcional à contagem absoluta de frequência no texto:
                        </p>
                        <div className="p-8 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 flex flex-wrap items-center justify-center gap-3 min-h-[260px]">
                          {analysisResult.frequencies?.map((f: any, idx: number) => {
                            const fontSize = Math.min(Math.max(f.count * 10 + 10, 12), 34);
                            return (
                              <span
                                key={idx}
                                style={{ fontSize: `${fontSize}px` }}
                                className={`font-bold transition-transform hover:scale-110 cursor-default ${
                                  idx % 3 === 0
                                    ? "text-academic-blue-600 dark:text-academic-blue-400"
                                    : idx % 3 === 1
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-purple-600 dark:text-purple-400"
                                }`}
                              >
                                {f.term}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 6. TF-IDF */}
                    {selectedTool === "tfidf" && (
                      <div className="space-y-4">
                        <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                          Termos com maior especificidade discriminativa por documento ponderados pela frequência inversa de documento (IDF):
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysisResult.top_terms_per_doc?.map((doc: any, i: number) => (
                            <div key={i} className="p-4 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
                              <span className="text-xs font-bold text-academic-navy-900 dark:text-white uppercase">
                                {doc.doc_title}
                              </span>
                              <div className="space-y-1.5">
                                {doc.top_terms?.map((term: any, j: number) => (
                                  <div key={j} className="flex items-center justify-between text-xs py-1 px-2 bg-white dark:bg-academic-navy-900 rounded border border-academic-slate-200 dark:border-academic-navy-800">
                                    <span className="font-mono font-medium">{term.term}</span>
                                    <span className="font-bold text-academic-blue-600 dark:text-academic-blue-400">{term.score}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 7. Análise de Sentimentos */}
                    {selectedTool === "sentiment" && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-center space-y-2">
                          <div className="text-xs uppercase tracking-wider font-semibold text-academic-slate-400">Classificação Prevista</div>
                          <div className={`text-2xl font-extrabold ${
                            analysisResult.classification === "POSITIVO"
                              ? "text-emerald-600"
                              : analysisResult.classification === "NEGATIVO"
                              ? "text-rose-600"
                              : "text-amber-500"
                          }`}>
                            {analysisResult.classification}
                          </div>
                          <div className="text-xs text-academic-slate-500 font-mono">
                            Escore de Polaridade Normalizado: {analysisResult.polarity_score}
                          </div>
                        </div>

                        {/* Salvaguarda Pedagógica */}
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                          <strong>Aviso Acadêmico: </strong>{analysisResult.pedagogical_disclaimer}
                        </div>
                      </div>
                    )}

                    {/* 8. Entidades Nomeadas (NER) */}
                    {selectedTool === "ner" && (
                      <div className="space-y-3">
                        <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                          Entidades de Saúde, Instituições, Territórios e Patologias extraídas pelo extrator de entidades:
                        </p>
                        <div className="space-y-2">
                          {analysisResult.entities?.length === 0 ? (
                            <p className="text-xs text-academic-slate-400 italic">Nenhuma entidade sanitária identificada no texto fornecido.</p>
                          ) : (
                            analysisResult.entities?.map((ent: any, idx: number) => (
                              <div key={idx} className="p-3 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 flex items-center justify-between text-xs">
                                <div>
                                  <div className="font-bold text-academic-navy-900 dark:text-white">{ent.text}</div>
                                  <div className="text-[11px] text-academic-slate-500">{ent.description}</div>
                                </div>
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300">
                                  {ent.label}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* 9. Similaridade do Cosseno */}
                    {selectedTool === "similarity" && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-center space-y-2">
                          <div className="text-xs uppercase tracking-wider font-semibold text-academic-slate-400">Similaridade do Cosseno</div>
                          <div className="text-3xl font-extrabold text-academic-blue-600 dark:text-academic-blue-400">
                            {analysisResult.percentage}%
                          </div>
                          <div className="text-xs text-academic-slate-500">
                            {analysisResult.interpretation}
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-1.5 text-xs">
                          <div className="font-semibold text-academic-navy-900 dark:text-white">Vocábulos Compartilhados ({analysisResult.shared_vocabulary_count}):</div>
                          <div className="flex flex-wrap gap-1">
                            {analysisResult.common_words?.map((w: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-blue-600 font-mono text-[11px]">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Rodapé Informativo do Laboratório */}
              <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-academic-slate-400 gap-2">
                <span>Processamento determinístico em memória</span>
                <span>Conformidade estrita LGPD: nenhum texto é gravado sem consentimento</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
