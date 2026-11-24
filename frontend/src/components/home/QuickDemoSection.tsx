"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Check, Sparkles, AlertCircle, FileText, HelpCircle } from "lucide-react";

interface QuickDemoResult {
  tokensCount: number;
  tokens: string[];
  stopwordsRemoved: string[];
  topFrequencies: { term: string; count: number }[];
  entities: { text: string; label: string }[];
}

const SAMPLE_TEXTS = [
  {
    title: "Fiocruz (Vacinas e Bio-Manguinhos)",
    text: "A Fundação Oswaldo Cruz (Fiocruz) liberou ao Programa Nacional de Imunizações do Ministério da Saúde as primeiras doses da vacina Oxford/AstraZeneca produzidas por Bio-Manguinhos no Rio de Janeiro."
  },
  {
    title: "OMS (Ensaio Clínico Dexametasona)",
    text: "A Organização Mundial da Saúde (OMS) acolheu os resultados preliminares do ensaio clínico que comprovou que o corticoide dexametasona reduziu a mortalidade em pacientes hospitalizados com Covid-19 que necessitavam de oxigênio."
  },
  {
    title: "Alerta Variante Gama (Amazonas)",
    text: "Pesquisadores da Rede Genômica Fiocruz identificaram que a variante Gama apresentou rápida disseminação nos estados brasileiros com alta taxa de contágio e ocupação de leitos de UTI."
  }
];

export const QuickDemoSection: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);
  const [selectedOperation, setSelectedOperation] = useState<"tokenize" | "stopwords" | "frequency" | "entities">("tokenize");
  const [result, setResult] = useState<QuickDemoResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Stopwords oficiais em pt-br para execução imediata no cliente / fallback
  const PT_STOPWORDS = new Set([
    "a", "o", "de", "do", "da", "em", "um", "uma", "os", "as", "dos", "das", "no", "na", "nos", "nas",
    "para", "com", "por", "e", "que", "se", "foi", "ao", "aos", "à", "às", "seu", "sua", "seus", "suas",
    "pelo", "pela", "pelos", "pelas", "como", "mais", "mas", "já", "está", "estão", "ter", "tem", "têm"
  ]);

  const runAnalysis = () => {
    setLoading(true);
    // Algoritmo determinístico funcional direto no navegador para a demo aberta sem login
    const rawTokens = inputText.match(/\b[A-Za-zÀ-ÿ0-9\-/]+\b/g) || [];
    const lowerTokens = rawTokens.map(t => t.toLowerCase());
    
    const stopwordsFound: string[] = [];
    const nonStopwords: string[] = [];

    lowerTokens.forEach(t => {
      if (PT_STOPWORDS.has(t)) {
        stopwordsFound.push(t);
      } else if (t.length > 2) {
        nonStopwords.push(t);
      }
    });

    // Frequência
    const freqMap: Record<string, number> = {};
    nonStopwords.forEach(t => {
      freqMap[t] = (freqMap[t] || 0) + 1;
    });

    const sortedFreq = Object.entries(freqMap)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Reconhecimento de entidades por regras documentadas do domínio
    const entitiesFound: { text: string; label: string }[] = [];
    const knownEntities: Record<string, string> = {
      "Fundação Oswaldo Cruz": "ORG",
      "Fiocruz": "ORG",
      "Bio-Manguinhos": "ORG",
      "Ministério da Saúde": "ORG",
      "Organização Mundial da Saúde": "ORG",
      "OMS": "ORG",
      "Rio de Janeiro": "LOC",
      "Amazonas": "LOC",
      "Brasil": "LOC",
      "Covid-19": "DOENÇA",
      "Gama": "VARIANTE",
      "Oxford/AstraZeneca": "VACINA",
      "Dexametasona": "MEDICAMENTO"
    };

    Object.entries(knownEntities).forEach(([entity, label]) => {
      if (new RegExp(`\\b${entity}\\b`, "i").test(inputText)) {
        entitiesFound.push({ text: entity, label });
      }
    });

    setResult({
      tokensCount: rawTokens.length,
      tokens: rawTokens,
      stopwordsRemoved: stopwordsFound,
      topFrequencies: sortedFreq,
      entities: entitiesFound
    });
    setLoading(false);
  };

  return (
    <section className="py-16 bg-academic-slate-50 dark:bg-academic-navy-950 border-b border-academic-slate-200 dark:border-academic-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demonstração Aberta Sem Login</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-academic-navy-900 dark:text-white">
            Experimente o Processamento Textual em Tempo Real
          </h2>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 mt-2">
            Selecione um comunicado real da pandemia ou digite sua própria frase para inspecionar os passos de tokenização, filtragem de palavras vazias e extração de termos.
          </p>
        </div>

        {/* Card Interativo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-academic-navy-900 p-6 sm:p-8 rounded-2xl border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
          
          {/* Lado Esquerdo: Entrada de Texto e Configuração */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-academic-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-academic-blue-500" />
                <span>Texto de Entrada</span>
              </label>
              
              <div className="flex gap-1">
                {SAMPLE_TEXTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setInputText(sample.text); setResult(null); }}
                    className="text-[11px] px-2 py-1 rounded border border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-600 dark:text-academic-slate-300 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800 transition-colors"
                  >
                    Exemplo {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole ou digite aqui um comunicado sanitário para testar..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white focus:ring-2 focus:ring-academic-blue-500 focus:outline-none transition-colors"
            />

            {/* Seleção de Técnica */}
            <div>
              <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-2">
                Selecione a Técnica de Mineração Textual:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "tokenize", label: "Tokenização" },
                  { id: "stopwords", label: "Stopwords" },
                  { id: "frequency", label: "Frequência" },
                  { id: "entities", label: "Entidades (NER)" }
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSelectedOperation(op.id as any)}
                    className={`py-2 px-2.5 rounded-md text-xs font-medium border text-center transition-all ${
                      selectedOperation === op.id
                        ? "border-academic-blue-600 bg-academic-blue-50 dark:bg-academic-blue-950/40 text-academic-blue-700 dark:text-academic-blue-300 font-bold"
                        : "border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-600 dark:text-academic-slate-300 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={runAnalysis}
                disabled={loading || !inputText.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 shadow-sm transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>Executar Processamento</span>
              </button>
            </div>

          </div>

          {/* Lado Direito: Visualização e Interpretação do Resultado */}
          <div className="lg:col-span-6 bg-academic-slate-50 dark:bg-academic-navy-950 p-5 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-academic-slate-200 dark:border-academic-navy-800 mb-4">
                <span className="text-xs font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider">
                  Inspeção do Resultado
                </span>
                {result && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                    {result.tokensCount} tokens analisados
                  </span>
                )}
              </div>

              {!result ? (
                <div className="py-12 text-center text-academic-slate-400 dark:text-academic-slate-500 space-y-2">
                  <HelpCircle className="w-8 h-8 mx-auto stroke-1" />
                  <p className="text-xs">
                    Clique em <strong>Executar Processamento</strong> para visualizar o comportamento do algoritmo passo a passo.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedOperation === "tokenize" && (
                    <div>
                      <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mb-2">
                        O algoritmo segmentou o texto em unidades linguísticas individuais (tokens):
                      </p>
                      <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-2 bg-white dark:bg-academic-navy-900 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800">
                        {result.tokens.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-slate-800 dark:text-academic-slate-200 font-mono border border-academic-slate-200 dark:border-academic-navy-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOperation === "stopwords" && (
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                          Stopwords Detectadas ({result.stopwordsRemoved.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5 p-2 bg-white dark:bg-academic-navy-900 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800">
                          {Array.from(new Set(result.stopwordsRemoved)).map((sw, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 line-through">
                              {sw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-academic-slate-500 dark:text-academic-slate-400">
                        Estas palavras possuem alta frequência gramatical, porém baixo valor discriminativo para categorização temática.
                      </p>
                    </div>
                  )}

                  {selectedOperation === "frequency" && (
                    <div>
                      <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mb-2">
                        Termos mais frequentes após filtragem de ruído:
                      </p>
                      <div className="space-y-1.5">
                        {result.topFrequencies.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 px-2.5 bg-white dark:bg-academic-navy-900 rounded border border-academic-slate-200 dark:border-academic-navy-800">
                            <span className="font-medium text-academic-navy-900 dark:text-white font-mono">{item.term}</span>
                            <span className="font-bold text-academic-blue-600 dark:text-academic-blue-400">{item.count}x</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOperation === "entities" && (
                    <div>
                      <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mb-2">
                        Entidades Nomeadas (NER) identificadas no comunicado sanitário:
                      </p>
                      <div className="space-y-1.5">
                        {result.entities.length === 0 ? (
                          <p className="text-xs text-academic-slate-400 italic">Nenhuma entidade conhecida encontrada na amostragem rápida.</p>
                        ) : (
                          result.entities.map((ent, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-white dark:bg-academic-navy-900 rounded border border-academic-slate-200 dark:border-academic-navy-800">
                              <span className="font-bold text-academic-navy-900 dark:text-white">{ent.text}</span>
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300">
                                {ent.label}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-academic-slate-200 dark:border-academic-navy-800 text-[11px] text-academic-slate-500 dark:text-academic-slate-400 flex items-center justify-between">
              <span>Execução 100% determinística</span>
              <a href="/laboratorio" className="font-medium text-academic-blue-600 dark:text-academic-blue-400 hover:underline">
                Acessar Laboratório Completo (9 Técnicas) →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
