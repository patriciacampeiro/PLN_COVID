"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

export default function ModulosIndexPage() {
  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
            Plano Pedagógico
          </span>
          <h1 className="text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Módulos Curriculares de Mineração de Texto e PLN
          </h1>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Estrutura curricular progressiva baseada em estudos de caso e análises textuais da COVID-19 (2020 a 2023). Cada módulo encerra com uma atividade prática e um questionário formativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_DATA.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm hover:border-academic-blue-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-academic-blue-100 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-slate-700 dark:text-academic-slate-300">
                        {module.badge}
                      </span>
                      <span className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
                        {module.hours}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-academic-navy-900 dark:text-white">
                    {module.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-academic-slate-600 dark:text-academic-slate-300 mt-2">
                    {module.desc}
                  </p>

                  <div className="mt-4 p-3 rounded-lg bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-xs">
                    <span className="font-semibold text-academic-blue-600 dark:text-academic-blue-400">Prática na Pandemia: </span>
                    <span className="text-academic-slate-600 dark:text-academic-slate-300">{module.practice}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800 flex items-center justify-between">
                  <Link
                    href={`/modulos/${module.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:text-academic-blue-700 transition-colors"
                  >
                    <span>Ver Conteúdo & Aulas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/modulos/${module.id}/questionario`}
                    className="text-[11px] text-academic-slate-500 dark:text-academic-slate-400 hover:underline"
                  >
                    Questionário
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
