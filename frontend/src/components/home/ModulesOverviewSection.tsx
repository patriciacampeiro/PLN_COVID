import React from "react";
import Link from "next/link";
import { 
  FileSearch, 
  Layers, 
  Filter, 
  BarChart3, 
  Smile, 
  Cpu, 
  FolderTree, 
  Tag, 
  ShieldAlert, 
  GraduationCap, 
  ArrowRight,
  Clock
} from "lucide-react";

export const MODULES_DATA = [
  {
    id: 1,
    title: "Módulo 1 — Introdução à Mineração de Texto",
    desc: "Diferenças entre dados estruturados e não estruturados, etapas do processo e como essas tecnologias atuaram no combate à pandemia.",
    hours: "4h",
    icon: FileSearch,
    badge: "Fundamentos",
    practice: "Análise de títulos de notícias da COVID-19 e identificação de termos frequentes."
  },
  {
    id: 2,
    title: "Módulo 2 — Fundamentos de Linguagem Natural",
    desc: "Processamento de linguagem humana, ambiguidade, tokenização, normalização, stopwords, stemming e lematização em português.",
    hours: "5h",
    icon: Layers,
    badge: "Morfologia",
    practice: "Pipeline completo de pré-processamento de um comunicado sobre vacinação."
  },
  {
    id: 3,
    title: "Módulo 3 — Preparação e Limpeza de Dados",
    desc: "Coleta de dados, preparação de corpus, tratamento de ruídos, caracteres, duplicatas e diretrizes éticas da LGPD.",
    hours: "4h",
    icon: Filter,
    badge: "Engenharia de Dados",
    practice: "Inspeção visual da transformação progressiva de um relatório técnico."
  },
  {
    id: 4,
    title: "Módulo 4 — Frequência e Representação (TF-IDF)",
    desc: "Bolsa de palavras (Bag of Words), N-gramas, ponderação TF-IDF, vetorização e similaridade do cosseno.",
    hours: "6h",
    icon: BarChart3,
    badge: "Vetorização",
    practice: "Comparação de documentos de diferentes fases e extração de termos representativos."
  },
  {
    id: 5,
    title: "Módulo 5 — Análise de Sentimentos",
    desc: "Abordagens léxicas e supervisionadas, limitações contextuais em saúde, ironia e separação entre sentimento e emoção.",
    hours: "5h",
    icon: Smile,
    badge: "Semântica",
    practice: "Classificação de textos de um corpus documentado sobre vacinação."
  },
  {
    id: 6,
    title: "Módulo 6 — Classificação Automática de Textos",
    desc: "Aprendizado supervisionado, Naive Bayes, matriz de confusão, precisão, recall, F1-score e prevenção de data leakage.",
    hours: "6h",
    icon: Cpu,
    badge: "Machine Learning",
    practice: "Classificação de comunicados por temas: vacinação, sintomas e políticas."
  },
  {
    id: 7,
    title: "Módulo 7 — Modelagem de Tópicos",
    desc: "Descoberta de assuntos em coleções de documentos com Latent Dirichlet Allocation (LDA) e agrupamento.",
    hours: "5h",
    icon: FolderTree,
    badge: "Não Supervisionado",
    practice: "Exploração de tópicos latentes ao longo das fases da pandemia (2020 a 2023)."
  },
  {
    id: 8,
    title: "Módulo 8 — Reconhecimento de Entidades (NER)",
    desc: "Identificação automatizada de organizações sanitárias, localidades, patógenos e datas em textos clínicos.",
    hours: "5h",
    icon: Tag,
    badge: "Extração de Informação",
    practice: "Destaque e rotulação de entidades em notas oficiais do Ministério da Saúde."
  },
  {
    id: 9,
    title: "Módulo 9 — Desinformação e Análise Crítica",
    desc: "Linguística de conteúdos enganosos, limites de classificadores, verificação de fatos, viés de datasets e ética em IA.",
    hours: "5h",
    icon: ShieldAlert,
    badge: "Ética & Sociedade",
    practice: "Comparação de alegações públicas com checagens metodológicas da Agência Lupa."
  },
  {
    id: 10,
    title: "Módulo 10 — Projeto Prático Integrador Final",
    desc: "Atividade integradora completa: seleção de corpus, pré-processamento, extração, interpretação e emissão de relatório.",
    hours: "8h",
    icon: GraduationCap,
    badge: "Capstone Integrador",
    practice: "Pipeline analítico de ponta a ponta com avaliação de viés e limitações."
  }
];

export const ModulesOverviewSection: React.FC = () => {
  return (
    <section id="modulos" className="py-16 bg-white dark:bg-academic-navy-900 border-b border-academic-slate-200 dark:border-academic-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 tracking-wider uppercase">
              Currículo Acadêmico Estruturado
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-academic-navy-900 dark:text-white mt-2">
              Trilha Completa de Mineração de Texto e PLN
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 mt-2">
              10 módulos pedagógicos progressivos, desenhados para que o estudante compreenda desde os princípios da morfologia computacional até modelos preditivos supervisionados.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-medium text-academic-slate-500 dark:text-academic-slate-400">
            <Clock className="w-4 h-4 text-academic-blue-500" />
            <span>Carga Total: 54 horas formativas</span>
          </div>
        </div>

        {/* Grade de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_DATA.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 hover:border-academic-blue-500 dark:hover:border-academic-blue-500 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-academic-blue-100 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 flex items-center justify-center transition-colors group-hover:bg-academic-blue-600 group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-academic-slate-200 dark:bg-academic-navy-800 text-academic-slate-700 dark:text-academic-slate-300">
                        {module.badge}
                      </span>
                      <span className="text-xs font-medium text-academic-slate-500 dark:text-academic-slate-400">
                        {module.hours}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-academic-navy-900 dark:text-white group-hover:text-academic-blue-600 dark:group-hover:text-academic-blue-400 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-academic-slate-600 dark:text-academic-slate-300 mt-2.5">
                    {module.desc}
                  </p>

                  <div className="mt-4 p-3 rounded-lg bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 text-xs">
                    <span className="font-semibold text-academic-blue-600 dark:text-academic-blue-400">Aplicação na Pandemia: </span>
                    <span className="text-academic-slate-600 dark:text-academic-slate-300">{module.practice}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 flex items-center justify-between">
                  <Link
                    href={`/modulos/${module.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:text-academic-blue-700 dark:hover:text-academic-blue-300 transition-colors"
                  >
                    <span>Acessar Módulo e Aulas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-academic-slate-400">Questionário com 5 a 10 questões</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
