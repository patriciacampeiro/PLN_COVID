import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  return (
    <div className="py-12 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a Página Inicial</span>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <Shield className="w-3.5 h-3.5" />
            <span>Segurança da Informação e Conformidade LGPD</span>
          </div>
          <h1 className="text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            Política de Privacidade e Termos de Uso
          </h1>
          <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400">
            Última atualização: Ano Letivo 2026 · Plataforma Acadêmica de Mineração de Texto e PLN
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 space-y-6 text-xs sm:text-sm text-academic-slate-700 dark:text-academic-slate-300 leading-relaxed shadow-sm">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-academic-navy-900 dark:text-white">
              1. Princípio da Minimização de Dados (Art. 6º, III da LGPD)
            </h2>
            <p>
              Esta plataforma educacional coleta unicamente os dados estritamente necessários para o gerenciamento pedagógico do estudante: nome completo, endereço de e-mail institucional e senha de acesso devidamente criptografada através de funções hash unidirecionais com salt (BCrypt).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-academic-navy-900 dark:text-white">
              2. Textos Submetidos ao Laboratório Interativo de PLN
            </h2>
            <p>
              Por padrão de engenharia de software e segurança, <strong>os textos inseridos ou colados no Laboratório de Texto NÃO são gravados de forma permanente em banco de dados</strong>. O processamento morfológico, lematização, cálculo de similaridade e análise de sentimentos são executados em memória volátil de processamento e descartados imediatamente após a devolução da resposta à requisição do usuário.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-academic-navy-900 dark:text-white">
              3. Ausência de Dados Médicos Sensíveis de Pacientes
            </h2>
            <p>
              O corpus didático da COVID-19 utilizado nesta disciplina não contém prontuários hospitalares, nomes de pacientes, históricos clínicos ou qualquer informação privada de saúde protegida pelo sigilo médico. Todos os documentos analisados são de acesso público oficial (boletins epidemiológicos da Fiocruz, pronunciamentos da OMS e artigos científicos de periódicos abertos).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-academic-navy-900 dark:text-white">
              4. Acompanhamento de Progresso e Avaliações
            </h2>
            <p>
              As notas dos questionários formativos e o registro de aulas concluídas são mantidos no perfil individual do estudante para fins exclusivos de acompanhamento pedagógico pelo professor da disciplina, não sendo comercializados, compartilhados ou transferidos para terceiros sob hipótese alguma.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
