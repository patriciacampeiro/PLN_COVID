"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Edit3, 
  Plus, 
  Download,
  GraduationCap
} from "lucide-react";
import { getStoredUser, User } from "@/lib/auth";
import { MODULES_DATA } from "@/components/home/ModulesOverviewSection";

interface StudentRecord {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  modulosConcluidos: number;
  mediaQuestionarios: number;
  dataRegistro: string;
  status: "Ativo" | "Pendente";
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [modulesState, setModulesState] = useState(
    MODULES_DATA.map((m) => ({ ...m, publicado: true }))
  );

  // Lista simulada da turma acadêmica
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "std-01",
      nome: "Ana Beatriz Souza",
      email: "estudante@universidade.edu.br",
      matricula: "202401928",
      modulosConcluidos: 4,
      mediaQuestionarios: 92,
      dataRegistro: "10/02/2026",
      status: "Ativo"
    },
    {
      id: "std-02",
      nome: "Carlos Eduardo de Oliveira",
      email: "carlos.oliveira@universidade.edu.br",
      matricula: "202401833",
      modulosConcluidos: 3,
      mediaQuestionarios: 85,
      dataRegistro: "12/02/2026",
      status: "Ativo"
    },
    {
      id: "std-03",
      nome: "Juliana Mendes da Silva",
      email: "juliana.mendes@universidade.edu.br",
      matricula: "202401755",
      modulosConcluidos: 6,
      mediaQuestionarios: 96,
      dataRegistro: "15/02/2026",
      status: "Ativo"
    },
    {
      id: "std-04",
      nome: "Lucas Ferreira Ramos",
      email: "lucas.ramos@universidade.edu.br",
      matricula: "202401901",
      modulosConcluidos: 2,
      mediaQuestionarios: 74,
      dataRegistro: "18/02/2026",
      status: "Pendente"
    }
  ]);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "ROLE_PROFESSOR" && user.role !== "ROLE_ADMIN") {
      router.push("/dashboard");
      return;
    }
    setCurrentUser(user);
  }, [router]);

  if (!currentUser) return null;

  const togglePublish = (id: number) => {
    setModulesState(
      modulesState.map((m) => (m.id === id ? { ...m, publicado: !m.publicado } : m))
    );
  };

  return (
    <div className="py-10 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner do Docente */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Restrito ao Corpo Docente</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
              Gestão Acadêmica da Disciplina
            </h1>
            <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300">
              Acompanhamento de turmas, progresso nos 10 módulos de PLN, métricas de questionários e publicação de conteúdos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 hover:bg-academic-slate-50 dark:hover:bg-academic-navy-800 transition-colors"
            >
              Visão de Estudante
            </Link>
          </div>
        </div>

        {/* Indicadores da Turma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-academic-slate-500">
              <span>Estudantes Matriculados</span>
              <Users className="w-4 h-4 text-academic-blue-600" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              {students.length} alunos
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Turma Ativa 2026/1</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-academic-slate-500">
              <span>Média Global da Turma</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              86.7%
            </div>
            <p className="text-[11px] text-academic-slate-400 mt-1">Em 28 tentativas avaliativas</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-academic-slate-500">
              <span>Módulos Publicados</span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              {modulesState.filter((m) => m.publicado).length} / 10
            </div>
            <p className="text-[11px] text-academic-slate-400 mt-1">Todos os 10 ativos</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-academic-slate-500">
              <span>Corpus Documental Ativo</span>
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-academic-navy-900 dark:text-white mt-2">
              7 comunicados
            </div>
            <p className="text-[11px] text-academic-slate-400 mt-1">Fiocruz, OMS, MS e SciELO</p>
          </div>

        </div>

        {/* Tabela de Estudantes e Desempenho */}
        <div className="p-6 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-academic-blue-600" />
              <span>Acompanhamento de Alunos Cadastrados</span>
            </h2>
          </div>

          <div className="overflow-x-auto border border-academic-slate-200 dark:border-academic-navy-800 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-3">Nome do Estudante</th>
                  <th className="p-3">Matrícula</th>
                  <th className="p-3">E-mail Institucional</th>
                  <th className="p-3">Módulos Concluídos</th>
                  <th className="p-3">Média em Questionários</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-academic-slate-200 dark:divide-academic-navy-800">
                {students.map((std) => (
                  <tr key={std.id} className="hover:bg-academic-slate-50 dark:hover:bg-academic-navy-950">
                    <td className="p-3 font-semibold text-academic-navy-900 dark:text-white">{std.nome}</td>
                    <td className="p-3 font-mono text-academic-slate-500">{std.matricula}</td>
                    <td className="p-3 text-academic-slate-500">{std.email}</td>
                    <td className="p-3">
                      <span className="font-bold text-academic-blue-600 dark:text-academic-blue-400">
                        {std.modulosConcluidos} / 10
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold ${std.mediaQuestionarios >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                        {std.mediaQuestionarios}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gerenciamento de Módulos e Publicação */}
        <div className="p-6 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Gerenciamento de Conteúdo e Visibilidade dos Módulos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulesState.map((mod) => (
              <div
                key={mod.id}
                className="p-4 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-academic-slate-200 dark:bg-academic-navy-800 text-academic-slate-700">
                      Módulo {mod.id}
                    </span>
                    <span className="text-xs font-bold text-academic-navy-900 dark:text-white">{mod.title}</span>
                  </div>
                  <p className="text-[11px] text-academic-slate-500 line-clamp-1">{mod.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(mod.id)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      mod.publicado
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                        : "bg-academic-slate-200 dark:bg-academic-navy-800 text-academic-slate-600"
                    }`}
                  >
                    {mod.publicado ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{mod.publicado ? "Publicado" : "Oculto"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
