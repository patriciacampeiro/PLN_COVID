"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-academic-slate-50 dark:bg-academic-navy-950 px-4">
      <div className="max-w-md w-full space-y-6 p-8 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-md">
        
        <div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao login</span>
          </Link>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-academic-navy-900 dark:text-white">
            Recuperação de Senha
          </h1>
          <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
            Digite seu e-mail institucional para receber um link de redefinição seguro.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Instruções enviadas!</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
              Caso o e-mail <strong>{email}</strong> esteja cadastrado na base acadêmica, você receberá em instantes as orientações de redefinição de senha.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-academic-slate-700 dark:text-academic-slate-300 mb-1.5">
                E-mail Cadastrado
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

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-academic-blue-600 hover:bg-academic-blue-700 dark:bg-academic-blue-500 dark:hover:bg-academic-blue-600 shadow-sm transition-all"
            >
              Enviar Link de Redefinição
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
