import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-academic-slate-200 dark:border-academic-navy-800 bg-white dark:bg-academic-navy-950 text-academic-slate-600 dark:text-academic-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Institucional */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 tracking-wider uppercase">
              Projeto Acadêmico
            </span>
            <h3 className="text-base font-bold text-academic-navy-900 dark:text-white">
              Mineração de Texto e PLN
            </h3>
            <p className="text-xs leading-relaxed text-academic-slate-500 dark:text-academic-slate-400">
              Ambiente educacional interativo desenvolvido para a formação prática de estudantes de Engenharia de Software, utilizando dados verídicos da pandemia de COVID-19 (2020–2023).
            </p>
            <div className="text-xs text-academic-slate-400">
              <span>Curso de Engenharia de Software</span><br />
              <span>Universidade / Departamento Acadêmico</span>
            </div>
          </div>

          {/* Coluna 2: Navegação e Módulos */}
          <div>
            <h4 className="text-xs font-semibold text-academic-navy-900 dark:text-white tracking-wider uppercase mb-3">
              Trilha de Aprendizagem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/modulos/1" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
                  Módulo 1: Introdução à Mineração
                </Link>
              </li>
              <li>
                <Link href="/modulos/2" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
                  Módulo 2: Fundamentos de PLN
                </Link>
              </li>
              <li>
                <Link href="/modulos/4" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
                  Módulo 4: TF-IDF e Representação
                </Link>
              </li>
              <li>
                <Link href="/modulos/6" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors">
                  Módulo 6: Classificação Textual
                </Link>
              </li>
              <li>
                <Link href="/laboratorio" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400 transition-colors font-medium text-academic-blue-600 dark:text-academic-blue-400">
                  Laboratório Prático de Texto →
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Fontes e Transparência de Dados */}
          <div>
            <h4 className="text-xs font-semibold text-academic-navy-900 dark:text-white tracking-wider uppercase mb-3">
              Fontes Governamentais e Científicas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://portal.fiocruz.br/observatorio-covid-19" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  <span>Fiocruz - Observatório COVID-19</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  <span>Organização Mundial da Saúde (OMS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  <span>Ministério da Saúde do Brasil</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.scielo.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  <span>SciELO Brasil (Acesso Aberto)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Conformidade Ética e LGPD */}
          <div>
            <h4 className="text-xs font-semibold text-academic-navy-900 dark:text-white tracking-wider uppercase mb-3">
              Ética e Privacidade
            </h4>
            <div className="flex items-start gap-2 text-xs text-academic-slate-500 dark:text-academic-slate-400 leading-relaxed mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Conformidade com a LGPD: o sistema não coleta prontuários médicos ou dados pessoais sensíveis de saúde.</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/politica-privacidade" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  Política de Privacidade & Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/covid-historico#datasheets" className="hover:text-academic-blue-600 dark:hover:text-academic-blue-400">
                  Ficha Técnica dos Datasets (Datasheet)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Metadados */}
        <div className="mt-8 pt-8 border-t border-academic-slate-200 dark:border-academic-navy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-academic-slate-500 dark:text-academic-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Plataforma Didática de Mineração de Texto e PLN. Uso estritamente acadêmico e educacional.
          </p>
          <div className="flex items-center gap-2">
            <span>Desenvolvido para apoio ao ensino universitário</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
