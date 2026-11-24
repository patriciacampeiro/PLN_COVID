import React from "react";
import Link from "next/link";
import { BookOpen, Beaker, ArrowRight, Shield, Award, Database, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-academic-slate-200 dark:border-academic-navy-800 bg-gradient-to-b from-academic-slate-50 via-white to-academic-slate-100 dark:from-academic-navy-950 dark:via-academic-navy-900 dark:to-academic-navy-950">
      
      {/* Background Decorativo Geométrico Sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-academic-blue-400 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-indigo-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge Institucional */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-academic-blue-50 dark:bg-academic-navy-800 border border-academic-blue-200 dark:border-academic-navy-700 text-academic-blue-700 dark:text-academic-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Disciplina: Mineração de Texto e Linguagem Natural · Engenharia de Software</span>
          </div>

          {/* Título Principal Institucional */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-academic-navy-900 dark:text-white leading-tight">
            Mineração de Texto e Processamento de Linguagem Natural:{" "}
            <span className="text-academic-blue-600 dark:text-academic-blue-400">
              uma análise da informação durante a pandemia de COVID-19
            </span>
          </h1>

          {/* Subtítulo Descritivo */}
          <p className="text-base sm:text-lg text-academic-slate-600 dark:text-academic-slate-300 max-w-3xl mx-auto leading-relaxed">
            Aprenda a transformar dados textuais não estruturados em inteligência acionável. Explore algoritmos reais de PLN aplicados sobre comunicados oficiais da OMS, notas da Fiocruz e artigos científicos de 2020 a 2023.
          </p>

          {/* Ações / Botoes de Acesso */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/modulos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 shadow-md transition-all hover:gap-3"
            >
              <span>Explorar Módulos Educacionais</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/laboratorio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-academic-navy-900 dark:text-white bg-white dark:bg-academic-navy-800 border border-academic-slate-300 dark:border-academic-navy-700 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-700 shadow-sm transition-all"
            >
              <Beaker className="w-4 h-4 text-academic-blue-500" />
              <span>Acessar Laboratório Interativo</span>
            </Link>

            <Link
              href="/covid-historico"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-academic-slate-700 dark:text-academic-slate-200 hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors"
            >
              <Database className="w-4 h-4 text-emerald-500" />
              <span>Ver Acervo COVID-19</span>
            </Link>
          </div>

          {/* Indicadores Acadêmicos de Credibilidade */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/80 dark:bg-academic-navy-800/80 border border-academic-slate-200 dark:border-academic-navy-700 shadow-sm">
              <div className="text-2xl font-bold text-academic-blue-600 dark:text-academic-blue-400">10 Módulos</div>
              <div className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mt-1">Trilha progressiva com 8 etapas pedagógicas por aula</div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-academic-navy-800/80 border border-academic-slate-200 dark:border-academic-navy-700 shadow-sm">
              <div className="text-2xl font-bold text-academic-navy-900 dark:text-white">9 Ferramentas</div>
              <div className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mt-1">Algoritmos reais de PLN no laboratório interativo</div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-academic-navy-800/80 border border-academic-slate-200 dark:border-academic-navy-700 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100% Real</div>
              <div className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mt-1">Corpus documental oficial (Fiocruz, OMS, MS e SciELO)</div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-academic-navy-800/80 border border-academic-slate-200 dark:border-academic-navy-700 shadow-sm">
              <div className="text-2xl font-bold text-academic-navy-900 dark:text-white">Ética & LGPD</div>
              <div className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mt-1">Garantia estrita de privacidade e descarte de dados clínicos</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
