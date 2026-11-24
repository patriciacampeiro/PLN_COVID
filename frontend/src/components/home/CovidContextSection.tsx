import React from "react";
import { AlertTriangle, Activity, FileText, CheckCircle2, TrendingUp, Search } from "lucide-react";

export const CovidContextSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-academic-navy-900 border-b border-academic-slate-200 dark:border-academic-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 tracking-wider uppercase">
            Contexto Histórico & Aplicação Empírica
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-academic-navy-900 dark:text-white mt-2">
            A Crise Sanitária e o Desafio da Infodemia (2020–2023)
          </h2>
          <p className="text-sm sm:text-base text-academic-slate-600 dark:text-academic-slate-300 mt-4 leading-relaxed">
            Durante a pandemia do coronavírus, a humanidade enfrentou não apenas uma emergência biológica, mas também uma crise sem precedentes na gestão e circulação de informações. Milhões de páginas de dados não estruturados — de ensaios clínicos a comunicados governamentais — foram produzidas simultaneamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800 bg-academic-slate-50 dark:bg-academic-navy-950 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-academic-navy-900 dark:text-white">
                O Fenômeno da Infodemia
              </h3>
              <p className="text-xs leading-relaxed text-academic-slate-600 dark:text-academic-slate-300">
                A OMS cunhou o termo <em>infodemia</em> para descrever o excesso de informações — algumas precisas e muitas enganosas — que dificultou a localização de orientações confiáveis quando as pessoas mais precisavam.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 text-xs font-medium text-amber-700 dark:text-amber-400">
              Estudado no Módulo 9: Desinformação e Análise Crítica
            </div>
          </div>

          <div className="p-6 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800 bg-academic-slate-50 dark:bg-academic-navy-950 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-academic-blue-100 dark:bg-academic-blue-950/60 text-academic-blue-600 dark:text-academic-blue-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-academic-navy-900 dark:text-white">
                Textos Não Estruturados
              </h3>
              <p className="text-xs leading-relaxed text-academic-slate-600 dark:text-academic-slate-300">
                Mais de 80% do conhecimento gerado estava em linguagem natural (PDFs, relatórios técnicos, portarias e artigos). Bancos de dados SQL não conseguem processar sinônimos, contexto clínico ou nuances morfológicas sem pipelines de PLN.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 text-xs font-medium text-academic-blue-600 dark:text-academic-blue-400">
              Estudado nos Módulos 1 a 4: Pré-processamento e Vetorização
            </div>
          </div>

          <div className="p-6 rounded-xl border border-academic-slate-200 dark:border-academic-navy-800 bg-academic-slate-50 dark:bg-academic-navy-950 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-academic-navy-900 dark:text-white">
                Vigilância e Tomada de Decisão
              </h3>
              <p className="text-xs leading-relaxed text-academic-slate-600 dark:text-academic-slate-300">
                A mineração de texto permitiu a instituições como Fiocruz e Ministério da Saúde categorizar relatos epidemiológicos, identificar mutações de variantes nos artigos e monitorar o sentimento da população em relação à vacinação.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Estudado nos Módulos 5 a 8: Sentimentos, Tópicos e NER
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
