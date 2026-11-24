import React from "react";
import { 
  Target, 
  Lightbulb, 
  Code2, 
  FileSpreadsheet, 
  PlayCircle, 
  Glasses, 
  HelpCircle, 
  BookMarked,
  CheckCircle2
} from "lucide-react";

export const PEDAGOGICAL_STEPS = [
  { step: 1, title: "O que você vai aprender", desc: "Objetivos educacionais claros e habilidades que serão desenvolvidas.", icon: Target },
  { step: 2, title: "Entenda o conceito", desc: "Explicação acessível e intuitiva, conectando a teoria à realidade.", icon: Lightbulb },
  { step: 3, title: "Como funciona", desc: "Descrição técnica, pseudocódigo, formulação matemática e algoritmos em Python.", icon: Code2 },
  { step: 4, title: "Exemplo na pandemia", desc: "Aplicação direta em comunicados e artigos reais da COVID-19 (2020 a 2023).", icon: FileSpreadsheet },
  { step: 5, title: "Experimente", desc: "Exercício prático interativo integrado ao laboratório funcional de PLN.", icon: PlayCircle },
  { step: 6, title: "Interprete o resultado", desc: "Análise crítica de limitações, vieses de dados e contexto sanitário.", icon: Glasses },
  { step: 7, title: "Teste seu conhecimento", desc: "Questionário formativo com feedback pedagógico e pontuação individual.", icon: HelpCircle },
  { step: 8, title: "Para aprofundar", desc: "Referências bibliográficas acadêmicas, artigos e documentação técnica.", icon: BookMarked }
];

export const PedagogySection: React.FC = () => {
  return (
    <section id="metodologia" className="py-16 bg-academic-slate-50 dark:bg-academic-navy-950 border-b border-academic-slate-200 dark:border-academic-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-academic-blue-600 dark:text-academic-blue-400 tracking-wider uppercase">
            Metodologia de Ensino
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-academic-navy-900 dark:text-white mt-2">
            A Estrutura Padronizada das Nossas Aulas
          </h2>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 mt-2 leading-relaxed">
            Cada tópico do curso foi estruturado em um ciclo pedagógico de 8 passos sistemáticos, assegurando que o estudante construa conhecimento sólido sem lacunas conceituais.
          </p>
        </div>

        {/* Grade de 8 Passos Pedagógicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PEDAGOGICAL_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-5 rounded-xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 flex flex-col justify-between hover:border-academic-blue-400 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-academic-blue-50 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 text-xs font-bold flex items-center justify-center border border-academic-blue-200 dark:border-academic-navy-700">
                      {s.step}
                    </span>
                    <Icon className="w-4 h-4 text-academic-slate-400 dark:text-academic-slate-500" />
                  </div>
                  <h3 className="text-sm font-bold text-academic-navy-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-academic-slate-500 dark:text-academic-slate-400 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-academic-blue-50 dark:bg-academic-navy-900/60 border border-academic-blue-200 dark:border-academic-navy-700 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-academic-blue-600 dark:text-academic-blue-400 shrink-0" />
          <p className="text-xs text-academic-slate-700 dark:text-academic-slate-300">
            <strong>Rigor e Transparência:</strong> Evitamos simplificações que distorçam conceitos matemáticos. Quando pertinente, são apresentadas fórmulas formais de TF-IDF, similaridade do cosseno e matrizes de probabilidade condicional de Naive Bayes.
          </p>
        </div>

      </div>
    </section>
  );
};
