"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, PlayCircle, HelpCircle, ArrowRight } from "lucide-react";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

export default function ModuloDetailPage() {
  const params = useParams();
  const idNum = Number(params.id) || 1;
  const module = MODULES_DATA.find((m) => m.id === idNum) || MODULES_DATA[0];
  const Icon = module.icon;

  // Lista didática das aulas deste módulo
  const aulas = [
    {
      ordem: 1,
      titulo: `Aula 1: Fundamentação e Conceito Central de ${module.badge}`,
      tempo: "45 min",
      resumo: "Compreensão dos alicerces teóricos e estruturação do problema textual."
    },
    {
      ordem: 2,
      titulo: "Aula 2: Descrição Algorítmica e Modelagem Computacional",
      tempo: "50 min",
      resumo: "Pseudocódigo, formulação matemática e implementação de referência em Python."
    },
    {
      ordem: 3,
      titulo: "Aula 3: Análise Empírica com Documentos da COVID-19",
      tempo: "60 min",
      resumo: "Aplicação nos boletins da Fiocruz/OMS e discussão de viés e limitações."
    }
  ];

  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <Link
            href="/modulos"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todos os módulos</span>
          </Link>
        </div>

        {/* Header do Módulo */}
        <div className="p-8 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-academic-blue-600 text-white flex items-center justify-center font-bold">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
                {module.badge} · Carga: {module.hours}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
                {module.title}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            {module.desc}
          </p>

          <div className="p-4 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-xs">
            <span className="font-semibold text-academic-navy-900 dark:text-white">Aplicação Prática na Pandemia: </span>
            <span className="text-academic-slate-600 dark:text-academic-slate-300">{module.practice}</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/modulos/${module.id}/aulas/1`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Iniciar Aula 1</span>
            </Link>

            <Link
              href={`/modulos/${module.id}/questionario`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-academic-navy-900 dark:text-white bg-white dark:bg-academic-navy-800 border border-academic-slate-300 dark:border-academic-navy-700 hover:bg-academic-slate-50 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Ir para o Questionário Avaliativo</span>
            </Link>
          </div>
        </div>

        {/* Grade de Aulas */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-academic-navy-900 dark:text-white">
            Grade de Aulas do Módulo
          </h2>

          <div className="space-y-3">
            {aulas.map((aula) => (
              <div
                key={aula.ordem}
                className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-academic-blue-400 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-academic-slate-400">
                    <span className="font-bold text-academic-blue-600 dark:text-academic-blue-400">Aula 0{aula.ordem}</span>
                    <span>•</span>
                    <span>{aula.tempo}</span>
                  </div>
                  <h3 className="text-sm font-bold text-academic-navy-900 dark:text-white">
                    {aula.titulo}
                  </h3>
                  <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                    {aula.resumo}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/modulos/${module.id}/aulas/${aula.ordem}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 border border-academic-blue-200 dark:border-academic-navy-700 hover:bg-academic-blue-50 dark:hover:bg-academic-navy-800 transition-colors"
                  >
                    <span>Acessar Aula</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
