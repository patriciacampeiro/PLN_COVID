"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

interface Question {
  id: number;
  enunciado: string;
  opcoes: { id: number; texto: string; correta: boolean }[];
  explicacao: string;
}

const QUESTIONS_BY_MODULE: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      enunciado: "Qual a principal diferença entre dados estruturados e dados não estruturados gerados na pandemia de COVID-19?",
      opcoes: [
        { id: 1, texto: "Dados estruturados seguem modelos rígidos de banco relacional, enquanto relatórios e notícias possuem formato livre em linguagem natural.", correta: true },
        { id: 2, texto: "Dados não estruturados são sempre falsos ou sintéticos.", correta: false },
        { id: 3, texto: "Dados estruturados não podem ser lidos por computadores digitais.", correta: false },
        { id: 4, texto: "Não há diferença técnica: ambos são analisados por comandos SQL idênticos.", correta: false }
      ],
      explicacao: "Textos em linguagem natural (artigos científicos, notícias, relatos) não possuem colunas fixas e requerem tratamento semântico e morfológico via PLN."
    },
    {
      id: 2,
      enunciado: "Por que a mineração de texto tornou-se essencial durante a crise da COVID-19?",
      opcoes: [
        { id: 1, texto: "Para substituir integralmente os médicos em atendimentos presenciais de urgência.", correta: false },
        { id: 2, texto: "Devido ao volume massivo de publicações científicas e comunicados impossíveis de serem lidos manualmente em tempo hábil.", correta: true },
        { id: 3, texto: "Porque a internet foi desativada durante os períodos de quarentena.", correta: false },
        { id: 4, texto: "Para criptografar notícias e impedir seu acesso pelo público geral.", correta: false }
      ],
      explicacao: "Apenas nos primeiros meses da pandemia foram publicados dezenas de milhares de artigos, tornando a leitura manual um gargalo operacional crítico."
    },
    {
      id: 3,
      enunciado: "O que caracteriza a etapa de 'Tokenização' em um pipeline de mineração textual?",
      opcoes: [
        { id: 1, texto: "Segmentar uma sequência contínua de caracteres em unidades linguísticas individuais (tokens).", correta: true },
        { id: 2, texto: "Traduzir o texto de português para código de máquina binário instantaneamente.", correta: false },
        { id: 3, texto: "Excluir todas as palavras que possuam mais de quatro letras.", correta: false },
        { id: 4, texto: "Classificar se um documento é positivo ou negativo sem ler seu conteúdo.", correta: false }
      ],
      explicacao: "Tokenização é a primeira fase de pré-processamento, delimitando as fronteiras de palavras, números e símbolos de pontuação."
    },
    {
      id: 4,
      enunciado: "O que são 'Stopwords' na preparação de dados textuais?",
      opcoes: [
        { id: 1, texto: "Vírus biológicos que atacam os servidores de dados.", correta: false },
        { id: 2, texto: "Palavras de altíssima frequência gramatical (ex: preposições e artigos) com baixo teor discriminativo semântico.", correta: true },
        { id: 3, texto: "Termos científicos exclusivos da medicina intensiva.", correta: false },
        { id: 4, texto: "Erros de digitação cometidos pelos autores do texto.", correta: false }
      ],
      explicacao: "Palavras como 'de', 'a', 'o', 'em' aparecem em praticamente todos os textos e agregam ruído a algoritmos de frequência estatística como Bag of Words."
    },
    {
      id: 5,
      enunciado: "Por que a análise de sentimentos sobre a COVID-19 exige salvaguardas pedagógicas e éticas?",
      opcoes: [
        { id: 1, texto: "Porque termos técnicos biomédicos (ex: 'óbito', 'vírus') podem induzir polaridade negativa automática mesmo em textos descritivos e objetivos.", correta: true },
        { id: 2, texto: "Porque computadores possuem sentimentos humanos genuínos e podem sofrer estresse emocional.", correta: false },
        { id: 3, texto: "Porque é proibido analisar sentimentos de textos em língua portuguesa segundo as normas da ABNT.", correta: false },
        { id: 4, texto: "Porque modelos matemáticos nunca erram previsões de humor.", correta: false }
      ],
      explicacao: "A classificação de polaridade textual não reflete necessariamente a opinião ou a emoção da população, demandando análise contextual crítica."
    }
  ]
};

export default function QuestionarioModuloPage() {
  const params = useParams();
  const moduloId = Number(params.id) || 1;
  const module = MODULES_DATA.find((m) => m.id === moduloId) || MODULES_DATA[0];

  const questions = QUESTIONS_BY_MODULE[moduloId] || QUESTIONS_BY_MODULE[1];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, optionId: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const correctOption = q.opcoes.find((o) => o.correta);
      if (selected === correctOption?.id) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const isApproved = score >= 70;

  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <Link
            href={`/modulos/${moduloId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao {module.title}</span>
          </Link>
        </div>

        {/* Cabeçalho do Questionário */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
            Avaliação Formativa Individual
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Questionário Avaliativo: {module.title}
          </h1>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300">
            Responda às {questions.length} questões de múltipla escolha para validar sua compreensão conceitual. Nota mínima de aprovação: 70%.
          </p>
        </div>

        {/* Resultado Final (quando submetido) */}
        {submitted && (
          <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
            isApproved 
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900" 
              : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base">
                <Award className={`w-5 h-5 ${isApproved ? "text-emerald-600" : "text-amber-600"}`} />
                <span className={isApproved ? "text-emerald-900 dark:text-emerald-200" : "text-amber-900 dark:text-amber-200"}>
                  {isApproved ? "Parabéns! Módulo Concluído com Sucesso!" : "Nota Insuficiente para Aprovação"}
                </span>
              </div>
              <span className={`text-xl font-extrabold ${isApproved ? "text-emerald-600" : "text-amber-600"}`}>
                {score}%
              </span>
            </div>
            <p className={`text-xs ${isApproved ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>
              {isApproved 
                ? "Seu progresso acadêmico foi registrado no banco de dados. Você já pode avançar para o próximo módulo da disciplina."
                : "Revise os conceitos e tente novamente para atingir a nota mínima de 70%."
              }
            </p>
            <div className="pt-2 flex gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 text-xs font-semibold hover:bg-white dark:hover:bg-academic-navy-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer Questionário</span>
              </button>
              {isApproved && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 transition-colors"
                >
                  <span>Voltar ao Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Lista de Questões */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const selectedOpt = selectedAnswers[q.id];
            const correctOpt = q.opcoes.find((o) => o.correta);

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-academic-blue-100 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-academic-navy-900 dark:text-white leading-relaxed">
                    {q.enunciado}
                  </h3>
                </div>

                <div className="space-y-2 pt-2">
                  {q.opcoes.map((opcao) => {
                    const isSelected = selectedOpt === opcao.id;
                    const showCorrect = submitted && opcao.correta;
                    const showWrong = submitted && isSelected && !opcao.correta;

                    return (
                      <button
                        key={opcao.id}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, opcao.id)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border flex items-center justify-between ${
                          showCorrect
                            ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-medium"
                            : showWrong
                            ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100"
                            : isSelected
                            ? "bg-academic-blue-50 dark:bg-academic-blue-950/40 border-academic-blue-600 text-academic-blue-800 dark:text-academic-blue-200 font-medium"
                            : "border-academic-slate-200 dark:border-academic-navy-800 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 text-academic-slate-700 dark:text-academic-slate-200"
                        }`}
                      >
                        <span>{opcao.texto}</span>
                        {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                        {showWrong && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explicativo */}
                {submitted && (
                  <div className="mt-3 p-3 rounded-lg bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-xs text-academic-slate-600 dark:text-academic-slate-300">
                    <span className="font-bold text-academic-navy-900 dark:text-white">Explicação Pedagógica: </span>
                    <span>{q.explicacao}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botão de Envio */}
        {!submitted && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all disabled:opacity-50"
            >
              Corrigir e Registrar Respostas
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
