"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Target, 
  Lightbulb, 
  Code2, 
  FileSpreadsheet, 
  PlayCircle, 
  Glasses, 
  HelpCircle, 
  BookMarked,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

export default function AulaInterativaPage() {
  const params = useParams();
  const moduloId = Number(params.id) || 1;
  const aulaId = Number(params.aulaId) || 1;
  const module = MODULES_DATA.find((m) => m.id === moduloId) || MODULES_DATA[0];

  // Estado para o exercício interativo (Passo 5)
  const [exerciseInput, setExerciseInput] = useState(
    "A Fiocruz e o Ministério da Saúde coordenaram ensaios clínicos para avaliar a eficácia e segurança das vacinas contra o coronavírus no Brasil."
  );
  const [exerciseOutput, setExerciseOutput] = useState<string[] | null>(null);

  const runExercise = () => {
    // Algoritmo funcional do exercício (Tokenização e filtragem morfológica)
    const tokens = exerciseInput
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);
    setExerciseOutput(Array.from(new Set(tokens)));
  };

  return (
    <div className="py-10 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navegação Superior */}
        <div className="flex items-center justify-between">
          <Link
            href={`/modulos/${moduloId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao {module.title}</span>
          </Link>
          <span className="text-xs font-bold text-academic-slate-400">
            Aula {aulaId} de 3
          </span>
        </div>

        {/* Título da Aula */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
            Estrutura Pedagógica Sistemática · 8 Passos
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Aula {aulaId}: {module.badge} e Mineração de Informação na Pandemia
          </h1>
        </div>

        {/* PASSO 1: O que você vai aprender */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-academic-blue-50 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 flex items-center justify-center text-xs font-bold border border-academic-blue-200 dark:border-academic-navy-700">
              1
            </div>
            <Target className="w-4 h-4 text-academic-blue-600" />
            <h2>O que você vai aprender</h2>
          </div>
          <ul className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 space-y-1.5 pl-4 list-disc leading-relaxed">
            <li>Compreender o papel do <strong>{module.badge}</strong> na transformação de textos brutos em matrizes computáveis.</li>
            <li>Identificar as particularidades gramaticais da língua portuguesa nos comunicados da COVID-19.</li>
            <li>Avaliar como o processamento textual automatizado auxiliou na triagem de literatura médica de 2020 a 2023.</li>
          </ul>
        </section>

        {/* PASSO 2: Entenda o conceito */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-200 dark:border-amber-900/60">
              2
            </div>
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h2>Entenda o conceito</h2>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Textos em linguagem natural contêm imensa riqueza semântica, mas são inerentemente ambíguos para uma máquina. Diferentemente de uma planilha com colunas estritas, uma oração médica possui sinônimos, tempos verbais, negações e termos contextuais. O objetivo do processamento de linguagem natural é estruturar esse fluxo textual em representações discretas e ponderadas sobre as quais algoritmos matemáticos possam operar com rigor estatístico.
          </p>
        </section>

        {/* PASSO 3: Como funciona */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold border border-indigo-200 dark:border-indigo-900/60">
              3
            </div>
            <Code2 className="w-4 h-4 text-indigo-500" />
            <h2>Como funciona (Algoritmo e Código)</h2>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Abaixo ilustramos a implementação funcional em Python utilizando expressões regulares e remoção de ruído textual:
          </p>
          <div className="p-4 rounded-xl bg-academic-navy-950 text-academic-slate-100 font-mono text-xs overflow-x-auto border border-academic-navy-800">
            <pre>{`# Pipeline didático em Python
import re
from collections import Counter

def processar_texto_sanitario(texto: str, stopwords: set) -> list[str]:
    # 1. Normalização ortográfica e minúsculas
    limpo = texto.lower()
    # 2. Remoção de pontuações preservando caracteres acentuados da língua portuguesa
    palavras = re.findall(r'\\b[a-zà-ÿ0-9\\-]+\\b', limpo)
    # 3. Filtragem de stopwords e termos mínimos
    tokens_relevantes = [p for p in palavras if p not in stopwords and len(p) > 2]
    return tokens_relevantes`}</pre>
          </div>
        </section>

        {/* PASSO 4: Exemplo na pandemia */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-200 dark:border-emerald-900/60">
              4
            </div>
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h2>Exemplo real na pandemia de COVID-19</h2>
          </div>
          <div className="p-4 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-xs sm:text-sm space-y-2">
            <div className="font-semibold text-academic-navy-900 dark:text-white">
              Trecho de Comunicado Oficial da Fiocruz (Agosto de 2020):
            </div>
            <p className="italic text-academic-slate-600 dark:text-academic-slate-300">
              &quot;O Instituto Bio-Manguinhos da Fiocruz firmou acordo com a Universidade de Oxford e a AstraZeneca para transferência de tecnologia da vacina recombinante contra a Covid-19, garantindo autonomia na fabricação das doses do Ingrediente Farmacêutico Ativo no Brasil.&quot;
            </p>
            <div className="text-[11px] text-academic-slate-400 pt-1">
              Fonte Verificada: Portal Oficial da Fundação Oswaldo Cruz (Licença CC BY 4.0).
            </div>
          </div>
        </section>

        {/* PASSO 5: Experimente */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-academic-blue-50 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 flex items-center justify-center text-xs font-bold border border-academic-blue-200 dark:border-academic-navy-700">
              5
            </div>
            <PlayCircle className="w-4 h-4 text-academic-blue-600" />
            <h2>Experimente (Exercício Prático Interativo)</h2>
          </div>
          <p className="text-xs text-academic-slate-600 dark:text-academic-slate-300">
            Execute o processamento sobre o texto de demonstração ou edite com suas próprias palavras:
          </p>

          <textarea
            rows={3}
            value={exerciseInput}
            onChange={(e) => setExerciseInput(e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-mono"
          />

          <button
            onClick={runExercise}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Processar Exercício</span>
          </button>

          {exerciseOutput && (
            <div className="p-3.5 rounded-lg bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
              <span className="text-xs font-bold text-academic-navy-900 dark:text-white">
                Vocabulário Único Extraído ({exerciseOutput.length} termos):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exerciseOutput.map((term, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-700 text-xs font-mono text-academic-blue-600 dark:text-academic-blue-400">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* PASSO 6: Interprete o resultado */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-200 dark:border-purple-900/60">
              6
            </div>
            <Glasses className="w-4 h-4 text-purple-500" />
            <h2>Interprete o resultado (Análise Crítica & Vieses)</h2>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Note que ao segmentar e remover pontuações simples, compostos como <em>&quot;Bio-Manguinhos&quot;</em> e <em>&quot;Covid-19&quot;</em> correm o risco de perder sua integridade semântica se o tokenizador não for instruído com expressões de domínio. Além disso, a filtragem excessiva de palavras pode eliminar conectivos que invertem o sentido de uma alegação médica (ex: a palavra &quot;não&quot; em <em>&quot;não comprovado&quot;</em>).
          </p>
        </section>

        {/* PASSO 7: Teste seu conhecimento */}
        <section className="p-6 rounded-2xl bg-academic-blue-50 dark:bg-academic-navy-900/60 border border-academic-blue-200 dark:border-academic-navy-700 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-academic-blue-600 text-white flex items-center justify-center text-xs font-bold">
                7
              </div>
              <HelpCircle className="w-4 h-4 text-academic-blue-600 dark:text-academic-blue-400" />
              <h2>Teste seu conhecimento</h2>
            </div>
            <Link
              href={`/modulos/${moduloId}/questionario`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all"
            >
              <span>Fazer Questionário do Módulo →</span>
            </Link>
          </div>
          <p className="text-xs text-academic-slate-600 dark:text-academic-slate-300">
            Responda às questões avaliativas com correção imediata para consolidar sua aprendizagem e registrar sua pontuação no dashboard.
          </p>
        </section>

        {/* PASSO 8: Para aprofundar */}
        <section className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-slate-700 dark:text-academic-slate-300 flex items-center justify-center text-xs font-bold border border-academic-slate-200 dark:border-academic-navy-700">
              8
            </div>
            <BookMarked className="w-4 h-4 text-academic-slate-600" />
            <h2>Para aprofundar (Referências Bibliográficas)</h2>
          </div>
          <ul className="text-xs text-academic-slate-500 dark:text-academic-slate-400 space-y-1.5 pl-4 list-disc leading-relaxed">
            <li>MANNING, C. D.; RAGHAVAN, P.; SCHÜTZE, H. <em>Introduction to Information Retrieval</em>. Cambridge University Press, 2008.</li>
            <li>JURAFSKY, D.; MARTIN, J. H. <em>Speech and Language Processing</em>. 3rd ed. draft, 2023.</li>
            <li>FIOCRUZ. <em>Boletins do Observatório COVID-19: Informação para a Ação em Saúde Pública</em>. Rio de Janeiro: Fundação Oswaldo Cruz, 2020–2023.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
