"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Beaker, 
  Award, 
  TrendingUp, 
  PlayCircle,
  HelpCircle,
  History,
  Sparkles
} from "lucide-react";
import { getStoredUser, User } from "@/lib/auth";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  
  // Estado de progresso acadêmico simulado/carregado do estudante
  const [completedModules, setCompletedModules] = useState<number[]>([1]);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({ 1: 100 });

  useEffect(() => {
    const current = getStoredUser();
    if (!current) {
      router.push("/login");
      return;
    }
    setUser(current);
  }, [router]);

  if (!user) return null;

  const totalModules = MODULES_DATA.length;
  const progressPercentage = Math.round((completedModules.length / totalModules) * 100);
  const nextModule = MODULES_DATA.find((m) => !completedModules.includes(m.id)) || MODULES_DATA[0];

  return (
    <div className="py-10 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner de Boas-Vindas */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-academic-blue-50 dark:bg-academic-navy-800 border border-academic-blue-200 dark:border-academic-navy-700 text-academic-blue-700 dark:text-academic-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ambiente do Estudante · Engenharia de Software</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
              Olá, {user.nome}!
            </h1>
            <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 max-w-2xl">
              Bem-vindo ao seu painel acadêmico de Mineração de Texto e PLN. Continue sua jornada explorando os desafios do processamento de linguagem natural na pandemia de COVID-19.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/laboratorio"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all"
            >
              <Beaker className="w-4 h-4" />
              <span>Abrir Laboratório de Texto</span>
            </Link>
          </div>
        </div>

        {/* Métricas Principais de Progresso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-academic-slate-500 dark:text-academic-slate-400">Progresso Geral</span>
              <TrendingUp className="w-4 h-4 text-academic-blue-600" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              {progressPercentage}%
            </div>
            <div className="w-full bg-academic-slate-100 dark:bg-academic-navy-800 rounded-full h-2 mt-3">
              <div 
                className="bg-academic-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-academic-slate-500 dark:text-academic-slate-400">Módulos Concluídos</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              {completedModules.length} / {totalModules}
            </div>
            <p className="text-[11px] text-academic-slate-500 dark:text-academic-slate-400 mt-2">
              {totalModules - completedModules.length} módulos pendentes
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-academic-slate-500 dark:text-academic-slate-400">Média em Questionários</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              100%
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              Aprovado nos questionários realizados
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-academic-slate-500 dark:text-academic-slate-400">Carga Cumprida</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              4h / 54h
            </div>
            <p className="text-[11px] text-academic-slate-500 dark:text-academic-slate-400 mt-2">
              Horas computadas para a disciplina
            </p>
          </div>

        </div>

        {/* Próxima Aula Recomendada & Atalhos Rápidos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
                Próxima Etapa Recomendada
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-slate-600 dark:text-academic-slate-300">
                {nextModule.badge}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-academic-navy-900 dark:text-white">
                {nextModule.title}
              </h3>
              <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 mt-1 leading-relaxed">
                {nextModule.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 text-xs">
              <span className="font-semibold text-academic-navy-900 dark:text-white">Atividade Prática: </span>
              <span className="text-academic-slate-600 dark:text-academic-slate-300">{nextModule.practice}</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href={`/modulos/${nextModule.id}/aulas/1`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 shadow-sm transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continuar Aula</span>
              </Link>
              <Link
                href={`/modulos/${nextModule.id}`}
                className="text-xs text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
              >
                Ver grade completa do módulo →
              </Link>
            </div>
          </div>

          {/* Atalhos Rápidos e Recursos */}
          <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider">
                Ferramentas Acadêmicas
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/laboratorio" className="flex items-center justify-between p-2.5 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <Beaker className="w-4 h-4 text-academic-blue-500" />
                      <span className="font-medium text-academic-navy-900 dark:text-white">Laboratório Textual</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-academic-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/covid-historico" className="flex items-center justify-between p-2.5 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium text-academic-navy-900 dark:text-white">Corpus Histórico COVID-19</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-academic-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/modulos/1/questionario" className="flex items-center justify-between p-2.5 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-academic-navy-900 dark:text-white">Refazer Questionário Módulo 1</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-academic-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-academic-slate-200 dark:border-academic-navy-800 text-[11px] text-academic-slate-500 dark:text-academic-slate-400">
              Precisa de ajuda com conceitos de PLN? Consulte o material de apoio em cada aula.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
