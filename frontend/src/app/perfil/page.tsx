"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Building, BookOpen, Save, LogOut, CheckCircle2, Shield } from "lucide-react";
import { getStoredUser, clearAuthSession, saveAuthSession, User as UserType } from "@/lib/auth";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [nome, setNome] = useState("");
  const [biografia, setBiografia] = useState("");
  const [matricula, setMatricula] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const current = getStoredUser();
    if (!current) {
      router.push("/login");
      return;
    }
    setUser(current);
    setNome(current.nome);
    setBiografia(current.biografia || "");
    setMatricula(current.matricula || "");
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, nome, biografia, matricula };
    saveAuthSession("jwt-demo-token-academic-2026", updated);
    setUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    clearAuthSession();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
              Conta de Usuário
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-navy-900 dark:text-white">
              Perfil Acadêmico
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair da Conta</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Dados cadastrais atualizados com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-6 shadow-sm">
          
          <div className="flex items-center gap-4 pb-6 border-b border-academic-slate-200 dark:border-academic-navy-800">
            <div className="w-16 h-16 rounded-full bg-academic-blue-600 text-white flex items-center justify-center font-bold text-xl">
              {nome.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-academic-navy-900 dark:text-white">{nome}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-academic-slate-500 dark:text-academic-slate-400">{user.email}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300">
                  {user.role === "ROLE_PROFESSOR" ? "Professor / Docente" : "Estudante"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
                Matrícula Acadêmica
              </label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ex: 202401928"
                className="w-full text-xs p-2.5 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
              Instituição / Curso
            </label>
            <input
              type="text"
              disabled
              value={user.instituicao || "Curso de Engenharia de Software"}
              className="w-full text-xs p-2.5 rounded-lg border border-academic-slate-200 dark:border-academic-navy-800 bg-academic-slate-100 dark:bg-academic-navy-800/60 text-academic-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1">
              Biografia Acadêmica
            </label>
            <textarea
              rows={3}
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
              placeholder="Descreva seus interesses de pesquisa em PLN, ciência de dados e engenharia de software..."
              className="w-full text-xs p-2.5 rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
