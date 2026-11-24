"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Moon, Sun, Menu, X, Cpu, Beaker, History, Shield, GraduationCap } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-academic-slate-200 dark:border-academic-navy-800 bg-white/90 dark:bg-academic-navy-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Identidade Institucional */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-academic-navy-900 dark:bg-academic-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-academic-blue-600 dark:text-academic-blue-400 uppercase">
                Engenharia de Software
              </span>
              <h1 className="text-sm font-bold text-academic-navy-900 dark:text-white leading-tight">
                PLN & Mineração de Texto
              </h1>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-academic-slate-700 dark:text-academic-slate-200">
            <Link href="/" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
              Início
            </Link>
            <Link href="/modulos" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
              Módulos
            </Link>
            <Link href="/laboratorio" className="flex items-center gap-1.5 hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
              <Beaker className="w-4 h-4 text-academic-blue-500" />
              <span>Laboratório</span>
            </Link>
            <Link href="/covid-historico" className="flex items-center gap-1.5 hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
              <History className="w-4 h-4 text-emerald-500" />
              <span>Acervo COVID-19</span>
            </Link>
            <Link href="/sobre" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
              Sobre o Projeto
            </Link>
          </nav>

          {/* Controles de Acesso e Tema */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Alternar modo claro e escuro"
              className="p-2 rounded-lg border border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-700 dark:text-academic-slate-200 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm font-medium text-academic-navy-900 dark:text-white hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors"
            >
              Entrar
            </Link>

            <Link
              href="/cadastro"
              className="px-4 py-2 text-sm font-medium text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 rounded-lg shadow-sm transition-all"
            >
              Cadastre-se
            </Link>
          </div>

          {/* Botão Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="p-2 rounded-lg border border-academic-slate-200 dark:border-academic-navy-700 text-academic-slate-700 dark:text-academic-slate-200"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu de navegação"
              className="p-2 rounded-lg text-academic-slate-700 dark:text-academic-slate-200 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Retrátil */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-academic-slate-200 dark:border-academic-navy-800 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-medium text-academic-slate-800 dark:text-academic-slate-100 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              Início
            </Link>
            <Link
              href="/modulos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-medium text-academic-slate-800 dark:text-academic-slate-100 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              Módulos Didáticos
            </Link>
            <Link
              href="/laboratorio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-medium text-academic-slate-800 dark:text-academic-slate-100 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              Laboratório de Texto
            </Link>
            <Link
              href="/covid-historico"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-medium text-academic-slate-800 dark:text-academic-slate-100 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              Acervo COVID-19
            </Link>
            <Link
              href="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-medium text-academic-slate-800 dark:text-academic-slate-100 hover:bg-academic-slate-100 dark:hover:bg-academic-navy-800"
            >
              Sobre o Projeto
            </Link>
            <div className="pt-2 border-t border-academic-slate-200 dark:border-academic-navy-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium border border-academic-slate-300 dark:border-academic-navy-700 rounded-lg text-academic-navy-900 dark:text-white"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-academic-blue-600 rounded-lg"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
