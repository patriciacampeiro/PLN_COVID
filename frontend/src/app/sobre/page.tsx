import React from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, Users, ShieldCheck, Database, Award, ArrowLeft } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navegação de Volta */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a Página Inicial</span>
          </Link>
        </div>

        {/* Cabeçalho da Página */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 uppercase tracking-wider">
            Informações Institucionais & Acadêmicas
          </span>
          <h1 className="text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Sobre a Plataforma Educacional
          </h1>
          <p className="text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Desenvolvida no âmbito da disciplina curricular <strong>Mineração de Texto e Linguagem Natural</strong> do curso de Engenharia de Software.
          </p>
        </div>

        {/* Seção 1: Missão Pedagógica */}
        <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-academic-navy-900 dark:text-white font-bold text-lg">
            <GraduationCap className="w-5 h-5 text-academic-blue-600" />
            <h2>Missão e Propósito Educacional</h2>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            O objetivo primordial desta plataforma é oferecer uma ponte sólida entre a teoria de Processamento de Linguagem Natural e a prática da engenharia de software aplicada. Em vez de utilizar brinquedos didáticos simplórios com textos sintéticos, optamos por um corpus empírico denso e verídico: a cobertura jornalística, comunicados epidemiológicos e produção científica brasileira durante a pandemia de COVID-19 (2020–2023).
          </p>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            Dessa forma, os estudantes compreendem não apenas como invocar algoritmos de tokenização ou classificação, mas também como lidar com ambiguidades linguísticas, viés de corpora e o impacto ético de modelos computacionais no enfrentamento da desinformação em saúde coletiva.
          </p>
        </div>

        {/* Seção 2: Estrutura Institucional e Docente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
              <Users className="w-4 h-4 text-academic-blue-600" />
              <h3>Corpo Docente e Coordenação</h3>
            </div>
            <p className="text-xs text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
              Estrutura preparada para integração curricular do Departamento de Engenharia de Software:
            </p>
            <ul className="text-xs space-y-2 text-academic-slate-700 dark:text-academic-slate-200">
              <li>• <strong>Docente Responsável:</strong> Prof. Dr. Coordenador da Disciplina de PLN</li>
              <li>• <strong>Área de Concentração:</strong> Inteligência Artificial Aplicada & Ciência de Dados</li>
              <li>• <strong>Carga Horária:</strong> 60 horas semestrais (54h na plataforma + seminários)</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
              <Database className="w-4 h-4 text-emerald-600" />
              <h3>Proveniência dos Dados</h3>
            </div>
            <p className="text-xs text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
              Todos os documentos indexados foram obtidos de portais de transparência pública, repositórios de acesso aberto ou agências oficiais de saúde:
            </p>
            <ul className="text-xs space-y-1.5 text-academic-slate-700 dark:text-academic-slate-200">
              <li>• Fiocruz (Agência e Observatório COVID-19)</li>
              <li>• Ministério da Saúde do Brasil</li>
              <li>• Organização Mundial da Saúde (OMS / WHO)</li>
              <li>• SciELO Brasil (Cadernos de Saúde Pública)</li>
            </ul>
          </div>
        </div>

        {/* Seção 3: Salvaguardas Éticas e LGPD */}
        <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-academic-navy-900 dark:text-white font-bold text-base">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3>Declaração de Conformidade com a LGPD</h3>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
            A plataforma opera em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Não são coletados ou tratados quaisquer dados médicos individualizados, históricos de consultas, resultados de exames ou nomes de pacientes. Todas as análises recaem exclusivamente sobre pronunciamentos públicos, literatura científica revisada por pares e boletins institucionais de interesse coletivo.
          </p>
        </div>

      </div>
    </div>
  );
}
