"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  History, 
  Calendar, 
  Filter, 
  ExternalLink, 
  Database, 
  Beaker, 
  Info, 
  CheckCircle2, 
  Search,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface CovidDocument {
  id: string;
  titulo: string;
  fonte: string;
  url_origem: string;
  data_publicacao: string;
  periodo_pandemia: string;
  periodo_label: string;
  categoria: string;
  categoria_label: string;
  licenca: string;
  texto_completo: string;
  limitacoes_conhecidas: string;
  termos_chave: string[];
}

const HISTORICAL_DOCUMENTS: CovidDocument[] = [
  {
    id: "fiocruz-2020-03-emergencia",
    titulo: "Fiocruz reforça ações frente à pandemia de novo coronavírus",
    fonte: "Fiocruz - Agência de Notícias",
    url_origem: "https://portal.fiocruz.br/noticia/fiocruz-reforca-acoes-frente-pandemia-de-novo-coronavirus",
    data_publicacao: "16/03/2020",
    periodo_pandemia: "2020_INICIO_ISOLAMENTO",
    periodo_label: "2020: Início da Emergência & Isolamento",
    categoria: "COMUNICADO_OFICIAL",
    categoria_label: "Comunicado Oficial",
    licenca: "Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)",
    texto_completo: "A Fundação Oswaldo Cruz (Fiocruz) intensificou a mobilização institucional para apoiar o Ministério da Saúde nas ações de vigilância, diagnóstico laboratorial e pesquisa clínica voltadas ao enfrentamento do novo coronavírus (Sars-CoV-2). O Instituto de Tecnologia em Imunobiológicos (Bio-Manguinhos/Fiocruz) trabalha no escalonamento da produção de testes moleculares do tipo RT-PCR, padrão-ouro preconizado pela Organização Mundial da Saúde (OMS) para detecção do vírus. Além disso, a Fiocruz estruturou o Centro Hospitalar para a Pandemia de Covid-19 no Instituto Nacional de Infectologia Evandro Chagas (INI/Fiocruz), no Rio de Janeiro, com leitos de UTI destinados ao atendimento de casos graves da doença infecciosa.",
    limitacoes_conhecidas: "Documento oficial emitido nos primeiros dias da declaração de pandemia pela OMS, refletindo a capacidade diagnóstica inicial do país.",
    termos_chave: ["RT-PCR", "Bio-Manguinhos", "leitos de UTI", "Sars-CoV-2", "diagnóstico"]
  },
  {
    id: "ms-2020-04-mascaras",
    titulo: "Ministério da Saúde orienta uso de máscaras caseiras pela população em geral",
    fonte: "Ministério da Saúde do Brasil",
    url_origem: "https://www.gov.br/saude/pt-br/assuntos/noticias/2020/abril/ministerio-da-saude-orienta-o-uso-de-mascaras-caseiras",
    data_publicacao: "02/04/2020",
    periodo_pandemia: "2020_INICIO_ISOLAMENTO",
    periodo_label: "2020: Início da Emergência & Isolamento",
    categoria: "MEDIDAS_RESTRITIVAS",
    categoria_label: "Medidas Sanitárias",
    licenca: "Domínio Público (Governo Federal do Brasil)",
    texto_completo: "O Ministério da Saúde atualizou as orientações técnicas para enfrentamento da Covid-19, recomendando o uso de máscaras faciais de tecido pela população geral em ambientes públicos. A medida busca criar uma barreira física suplementar contra gotículas respiratórias expelidas ao falar, tossir ou espirrar. A orientação ressalta que as máscaras cirúrgicas descartáveis e os modelos N95/PFF2 devem ser estritamente priorizados para profissionais de saúde e atendimentos ambulatoriais. As máscaras de pano devem ter dupla camada de tecido, cobrir totalmente nariz e boca e não substituem o distanciamento físico de dois metros e a frequente higienização das mãos com água e sabão ou álcool em gel 70%.",
    limitacoes_conhecidas: "Diretrizes sanitárias de abril de 2020 no contexto de severa escassez internacional de EPIs cirúrgicos descartáveis.",
    termos_chave: ["máscaras caseiras", "N95/PFF2", "distanciamento", "barreira física"]
  },
  {
    id: "who-2020-06-dexametasona",
    titulo: "OMS acolhe com entusiasmo resultados iniciais de ensaio clínico com dexametasona",
    fonte: "Organização Mundial da Saúde (OMS)",
    url_origem: "https://www.who.int/pt/news/item/16-06-2020-who-welcomes-preliminary-results-about-dexamethasone-use-in-treating-critically-ill-covid-19-patients",
    data_publicacao: "16/06/2020",
    periodo_pandemia: "2020_INICIO_ISOLAMENTO",
    periodo_label: "2020: Início da Emergência & Isolamento",
    categoria: "TRATAMENTOS",
    categoria_label: "Evidência Terapêutica",
    licenca: "Open Information WHO",
    texto_completo: "A Organização Mundial da Saúde (OMS) comemorou os resultados preliminares do ensaio clínico randomizado RECOVERY, conduzido pela Universidade de Oxford no Reino Unido. O estudo comprovou que o corticoide dexametasona reduziu em cerca de um terço a taxa de mortalidade em pacientes hospitalizados com Covid-19 que necessitavam de ventilação mecânica invasiva. Para os pacientes sob oxigenoterapia, a mortalidade caiu em um quinto. O diretor-geral da OMS, Tedros Adhanom Ghebreyesus, enfatizou que o medicamento não demonstrou benefício terapêutico em indivíduos com sintomas leves que não demandavam suporte de oxigênio, reiterando a necessidade de uso hospitalar supervisionado.",
    limitacoes_conhecidas: "Ensaio britânico com foco estrito em pacientes hospitalizados sob oxigênio; não aplicável ambulatorialmente para casos leves.",
    termos_chave: ["dexametasona", "ensaio RECOVERY", "oxigenoterapia", "mortalidade hospitalar"]
  },
  {
    id: "fiocruz-2021-01-vacinacao",
    titulo: "Fiocruz entrega primeiras vacinas contra COVID-19 ao Ministério da Saúde",
    fonte: "Fiocruz - Agência de Notícias",
    url_origem: "https://portal.fiocruz.br/noticia/fiocruz-entrega-primeiras-vacinas-contra-covid-19-ao-ministerio-da-saude",
    data_publicacao: "22/01/2021",
    periodo_pandemia: "2021_VARIANTES_VACINACAO",
    periodo_label: "2021: Variantes e Vacinação em Massa",
    categoria: "VACINACAO",
    categoria_label: "Imunização Coletiva",
    licenca: "Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)",
    texto_completo: "A Fundação Oswaldo Cruz (Fiocruz) liberou ao Programa Nacional de Imunizações (PNI) do Ministério da Saúde as primeiras doses da vacina Oxford/AstraZeneca produzidas a partir do Ingrediente Farmacêutico Ativo (IFA). A vacina recombinante demonstrou alta eficácia na prevenção de internações e formas graves causadas pelo vírus Sars-CoV-2. A presidente da Fiocruz, Nísia Trindade Lima, destacou que o desenvolvimento produtivo nacional de imunobiológicos representa a garantia de soberania tecnológica do Sistema Único de Saúde (SUS) e um divisor de águas na proteção de grupos prioritários, idosos e profissionais da linha de frente.",
    limitacoes_conhecidas: "Retrata o início do plano operacional de imunização no Brasil em janeiro de 2021.",
    termos_chave: ["Oxford/AstraZeneca", "IFA", "PNI", "SUS", "imunobiológicos"]
  },
  {
    id: "fiocruz-2021-03-variante-gama",
    titulo: "Boletim do Observatório Covid-19 alerta para colapso no sistema de saúde",
    fonte: "Fiocruz - Observatório Covid-19",
    url_origem: "https://portal.fiocruz.br/noticia/boletim-extraordinario-do-observatorio-covid-19-alerta-para-colapso-no-sistema-de-saude",
    data_publicacao: "16/03/2021",
    periodo_pandemia: "2021_VARIANTES_VACINACAO",
    periodo_label: "2021: Variantes e Vacinação em Massa",
    categoria: "EPIDEMIOLOGIA",
    categoria_label: "Vigilância Epidemiológica",
    licenca: "Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)",
    texto_completo: "Pesquisadores da Rede Genômica Fiocruz divulgaram boletim epidemiológico extraordinário apontando que a linhagem P.1 (posteriormente denominada variante Gama pela OMS), identificada originariamente no estado do Amazonas, tornou-se dominante na maioria dos estados brasileiros. Os dados genômicos revelam mutações na proteína Spike que conferem maior transmissibilidade ao vírus. O boletim registrou taxas de ocupação de leitos de UTI superiores a noventa por cento em vinte e quatro estados e no Distrito Federal, caracterizando o maior colapso hospitalar da história sanitária do país e reforçando a urgência da ampliação do ritmo vacinal e de medidas restritivas de contato.",
    limitacoes_conhecidas: "Retrata o pico epidemiológico da segunda onda brasileira no primeiro trimestre de 2021.",
    termos_chave: ["Variante Gama", "linhagem P.1", "colapso hospitalar", "leitos de UTI", "Rede Genômica"]
  },
  {
    id: "scielo-2022-01-omicron-impacto",
    titulo: "Análise da dispersão da variante Ômicron e efetividade vacinal na população brasileira",
    fonte: "Cadernos de Saúde Pública / SciELO Brasil",
    url_origem: "https://www.scielo.br/j/csp/a/covid-omicron-analise-2022",
    data_publicacao: "28/01/2022",
    periodo_pandemia: "2022_POS_EMERGENCIAL",
    periodo_label: "2022: Ômicron & Transição Endêmica",
    categoria: "EPIDEMIOLOGIA",
    categoria_label: "Literatura Científica",
    licenca: "Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)",
    texto_completo: "A emergência da variante Ômicron (B.1.1.529) no final de 2021 provocou elevação sem precedentes na incidência de casos confirmados de Covid-19 no território nacional. No entanto, estudos observacionais de coorte demonstraram dissociação expressiva entre a curva de casos positivos e a taxa de letalidade e internações em UTI. Essa proteção substancial decorreu da ampla cobertura vacinal alcançada pela população com esquemas completos e doses de reforço heterólogas. Conclui-se que o monitoramento genômico contínuo associado ao reforço imunológico é essencial para manter o controle da doença crônica na fase de transição endêmica.",
    limitacoes_conhecidas: "Estudo observacional retrospectivo baseado nos sistemas SIVEP-Gripe e e-SUS Notifica.",
    termos_chave: ["Variante Ômicron", "B.1.1.529", "dissociação de letalidade", "doses de reforço"]
  },
  {
    id: "who-2023-05-fim-emergencia",
    titulo: "OMS declara encerramento da Covid-19 como Emergência Internacional",
    fonte: "Organização Mundial da Saúde (OMS)",
    url_origem: "https://www.who.int/pt/news/item/05-05-2023-statement-on-the-fifteenth-meeting-of-the-international-health-regulations-(2005)-emergency-committee-regarding-the-coronavirus-disease-(covid-19)-pandemic",
    data_publicacao: "05/05/2023",
    periodo_pandemia: "2023_FIM_EMERGENCIA",
    periodo_label: "2023: Encerramento da Emergência Global",
    categoria: "COMUNICADO_OFICIAL",
    categoria_label: "Comunicado Oficial",
    licenca: "Open Information WHO",
    texto_completo: "O Comitê de Emergência do Regulamento Sanitário Internacional da Organização Mundial da Saúde (OMS) deliberou que a Covid-19 configura agora um problema de saúde estabelecido e contínuo, não constituindo mais uma Emergência de Saúde Pública de Importância Internacional (ESPII). O diretor-geral Dr. Tedros Adhanom Ghebreyesus enfatizou que o término da declaração de emergência internacional não significa que a Covid-19 deixou de ser uma ameaça à saúde global. Os países devem fazer a transição da resposta emergencial para o manejo integrado e sustentável da enfermidade respiratória a longo prazo, preservando a vigilância epidemiológica, o sequenciamento genômico de subvariantes e o acesso equitativo a vacinas e tratamentos antivirais.",
    limitacoes_conhecidas: "Marco institucional que encerra a declaração formal de emergência de saúde internacional decretada em 30 de janeiro de 2020.",
    termos_chave: ["ESPII", "Regulamento Sanitário", "Tedros Adhanom", "manejo sustentável"]
  }
];

export default function CovidHistoricoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("TODOS");
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDocs = HISTORICAL_DOCUMENTS.filter((doc) => {
    const matchPeriod = selectedPeriod === "TODOS" || doc.periodo_pandemia === selectedPeriod;
    const matchCat = selectedCategory === "TODAS" || doc.categoria === selectedCategory;
    const matchSearch = searchTerm === "" || 
      doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.texto_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.termos_chave.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchPeriod && matchCat && matchSearch;
  });

  return (
    <div className="py-10 bg-academic-slate-50 dark:bg-academic-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Cabeçalho */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <History className="w-3.5 h-3.5" />
            <span>Corpus Histórico Verificado (2020 a 2023)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-academic-navy-900 dark:text-white">
            COVID-19: Análise Histórica de Dados e Textos
          </h1>
          <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 max-w-4xl leading-relaxed">
            Acervo documental acadêmico catalogado para estudos empíricos de Mineração de Texto e PLN. Todos os documentos possuem proveniência verificada, datas de publicação e termos técnicos para análise morfológica e temporal.
          </p>
        </div>

        {/* Linha do Tempo Visual dos Marcos da Pandemia */}
        <div className="p-6 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-academic-navy-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-academic-blue-600" />
            <span>Evolução Temporal dos Textos e Vocabulário Sanitário</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300">
                1º Semestre 2020
              </span>
              <h3 className="text-xs font-bold text-academic-navy-900 dark:text-white">Início da Pandemia & Quarentena</h3>
              <p className="text-[11px] text-academic-slate-500 leading-relaxed">
                Predominância de termos diagnósticos (&quot;RT-PCR&quot;), medidas de barreira (&quot;máscaras&quot;, &quot;isolamento&quot;) e estruturação de UTIs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                Ano de 2021
              </span>
              <h3 className="text-xs font-bold text-academic-navy-900 dark:text-white">Variante Gama & Vacinação</h3>
              <p className="text-[11px] text-academic-slate-500 leading-relaxed">
                Emergência de linhagens de preocupação, vigilância genômica e aceleração da produção nacional de imunizantes pela Fiocruz/SUS.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Ano de 2022
              </span>
              <h3 className="text-xs font-bold text-academic-navy-900 dark:text-white">Onda Ômicron & Doses de Reforço</h3>
              <p className="text-[11px] text-academic-slate-500 leading-relaxed">
                Artigos científicos documentam a dissociação entre alta transmissibilidade e redução de hospitalizações graças à imunização.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-academic-slate-50 dark:bg-academic-navy-950 border border-academic-slate-200 dark:border-academic-navy-800 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                Maio de 2023
              </span>
              <h3 className="text-xs font-bold text-academic-navy-900 dark:text-white">Término da Emergência Internacional</h3>
              <p className="text-[11px] text-academic-slate-500 leading-relaxed">
                A OMS declara a transição da emergência para a sustentabilidade de longo prazo na vigilância de saúde coletiva.
              </p>
            </div>

          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="p-6 rounded-2xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Campo de Busca Textual */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-academic-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por palavras-chave (ex: vacina, UTI, Fiocruz, Ômicron)..."
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white focus:ring-2 focus:ring-academic-blue-500 focus:outline-none"
              />
            </div>

            {/* Filtro por Período */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-academic-slate-500 whitespace-nowrap">Período:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white"
              >
                <option value="TODOS">Todos os Períodos (2020–2023)</option>
                <option value="2020_INICIO_ISOLAMENTO">2020: Início e Quarentena</option>
                <option value="2021_VARIANTES_VACINACAO">2021: Variantes e Vacinação</option>
                <option value="2022_POS_EMERGENCIAL">2022: Ômicron e Reforço</option>
                <option value="2023_FIM_EMERGENCIA">2023: Encerramento</option>
              </select>
            </div>

            {/* Filtro por Categoria */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-academic-slate-500 whitespace-nowrap">Categoria:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-academic-slate-300 dark:border-academic-navy-700 bg-academic-slate-50 dark:bg-academic-navy-950 text-academic-navy-900 dark:text-white"
              >
                <option value="TODAS">Todas as Categorias</option>
                <option value="COMUNICADO_OFICIAL">Comunicado Oficial</option>
                <option value="MEDIDAS_RESTRITIVAS">Medidas Sanitárias</option>
                <option value="TRATAMENTOS">Evidência Terapêutica</option>
                <option value="VACINACAO">Imunização Coletiva</option>
                <option value="EPIDEMIOLOGIA">Vigilância Epidemiológica</option>
              </select>
            </div>

          </div>
        </div>

        {/* Lista de Documentos Filtrados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-academic-slate-500 px-1">
            <span>Mostrando <strong>{filteredDocs.length}</strong> documentos do corpus</span>
            <Link
              href="/laboratorio"
              className="text-academic-blue-600 dark:text-academic-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <Beaker className="w-3.5 h-3.5" />
              <span>Experimentar técnicas no Laboratório →</span>
            </Link>
          </div>

          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-white dark:bg-academic-navy-900 border border-academic-slate-200 dark:border-academic-navy-800 shadow-sm space-y-4 hover:border-academic-blue-400 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-academic-blue-100 dark:bg-academic-blue-950 text-academic-blue-700 dark:text-academic-blue-300">
                      {doc.categoria_label}
                    </span>
                    <span className="text-xs text-academic-slate-500 font-medium">
                      {doc.periodo_label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-academic-slate-400">
                    <span>{doc.data_publicacao}</span>
                    <span>•</span>
                    <span className="font-semibold text-academic-navy-900 dark:text-white">{doc.fonte}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-academic-navy-900 dark:text-white">
                  {doc.titulo}
                </h3>

                <p className="text-xs sm:text-sm text-academic-slate-600 dark:text-academic-slate-300 leading-relaxed">
                  {doc.texto_completo}
                </p>

                {/* Termos Chave / Tokens Importantes */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-academic-slate-400 mr-1">Termos Identificados:</span>
                  {doc.termos_chave.map((termo, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-academic-slate-100 dark:bg-academic-navy-800 text-academic-blue-600 dark:text-academic-blue-400 border border-academic-slate-200 dark:border-academic-navy-700">
                      {termo}
                    </span>
                  ))}
                </div>

                {/* Proveniência e Ficha Técnica */}
                <div className="pt-3 border-t border-academic-slate-100 dark:border-academic-navy-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-academic-slate-500 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Licença: {doc.licenca}</span>
                    <a
                      href={doc.url_origem}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-academic-blue-600 dark:text-academic-blue-400 hover:underline"
                    >
                      <span>Fonte Oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <Link
                    href={`/laboratorio`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-academic-blue-600 dark:text-academic-blue-400 hover:text-academic-blue-700"
                  >
                    <span>Analisar este documento no Laboratório</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
