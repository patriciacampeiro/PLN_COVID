"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { saveAuthSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // Tentar conectar ao endpoint do Spring Boot ou simulação segura de demonstração imediata
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const data = await res.json();
        saveAuthSession(data.token, data.usuario);
        if (data.usuario.role === "ROLE_PROFESSOR" || data.usuario.role === "ROLE_ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        // Fallback para login de demonstração acadêmica local
        if (
          (email === "estudante@universidade.edu.br" || email === "professor@universidade.edu.br") &&
          senha === "SenhaForte@2026"
        ) {
          const isProf = email.includes("professor");
          saveAuthSession("jwt-demo-token-academic-2026", {
            id: isProf ? "a0000000-0000-0000-0000-000000000001" : "a0000000-0000-0000-0000-000000000002",
            nome: isProf ? "Prof. Dr. Ricardo Silveira" : "Ana Beatriz Souza",
            email: email,
            role: isProf ? "ROLE_PROFESSOR" : "ROLE_ESTUDANTE",
            emailVerificado: true,
            instituicao: "Curso de Engenharia de Software",
            matricula: isProf ? "DOC-2026" : "202401928"
          });

          if (isProf) {
            router.push("/admin/dashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          setErrorMsg("Credenciais inválidas. Verifique o e-mail institucional e a senha informada.");
        }
      }
    } catch (err) {
      // Fallback gracioso offline caso o backend Docker não esteja inicializado ainda
      if (
        (email === "estudante@universidade.edu.br" || email === "professor@universidade.edu.br") &&
        senha === "SenhaForte@2026"
      ) {
        const isProf = email.includes("professor");
        saveAuthSession("jwt-demo-token-academic-2026", {
          id: isProf ? "a0000000-0000-0000-0000-000000000001" : "a0000000-0000-0000-0000-000000000002",
          nome: isProf ? "Prof. Dr. Ricardo Silveira" : "Ana Beatriz Souza",
          email: email,
          role: isProf ? "ROLE_PROFESSOR" : "ROLE_ESTUDANTE",
          emailVerificado: true,
          instituicao: "Curso de Engenharia de Software",
          matricula: isProf ? "DOC-2026" : "202401928"
        });
        router.push(isProf ? "/admin/dashboard" : "/dashboard");
      } else {
        setErrorMsg("Não foi possível autenticar. Utilize os atalhos de demonstração abaixo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (type: "estudante" | "professor") => {
    if (type === "estudante") {
      setEmail("estudante@universidade.edu.br");
      setSenha("SenhaForte@2026");
    } else {
      setEmail("professor@universidade.edu.br");
      setSenha("SenhaForte@2026");
    }
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-academic-slate-50 dark:bg-academic-navy-950 px-4">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-md">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
            Portal Institucional
          </span>
          <h1 className="text-2xl font-bold text-academic-navy-900 dark:text-white">
            Acesso à Disciplina
          </h1>
          <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
            Entre com suas credenciais universitárias para acessar módulos e avaliações.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1.5">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-academic-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@universidade.edu.br"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white focus:ring-2 focus:ring-academic-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300">
                Senha de Acesso
              </label>
              <Link
                href="/recuperar-senha"
                className="text-xs text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-academic-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white focus:ring-2 focus:ring-academic-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 shadow-sm transition-all disabled:opacity-50"
          >
            <span>{loading ? "Verificando..." : "Entrar no Ambiente"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Atalhos Rápidos para Demonstração Acadêmica */}
        <div className="pt-4 border-t border-academic-slate-200 dark:border-academic-navy-800">
          <span className="block text-[11px] font-semibold text-academic-slate-500 dark:text-academic-slate-400 text-center mb-2">
            Credenciais de Demonstração para Avaliação Rápida:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials("estudante")}
              className="py-1.5 px-2 text-xs font-medium rounded border border-academic-blue-200 dark:border-academic-navy-700 bg-academic-blue-50/50 dark:bg-academic-navy-800 text-academic-blue-700 dark:text-academic-blue-300 hover:bg-academic-blue-100 dark:hover:bg-academic-navy-700 transition-colors"
            >
              Preencher Estudante
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("professor")}
              className="py-1.5 px-2 text-xs font-medium rounded border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
            >
              Preencher Professor
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-academic-slate-500 dark:text-academic-slate-400">
          Ainda não possui conta acadêmica?{" "}
          <Link href="/cadastro" className="font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline">
            Cadastre-se aqui
          </Link>
        </div>

      </div>
    </div>
  );
}
