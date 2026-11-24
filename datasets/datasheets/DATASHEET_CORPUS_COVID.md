# Ficha Técnica do Corpus Textual da COVID-19 (Datasheet for Datasets)
## Disciplina: Mineração de Texto e Linguagem Natural

### 1. Motivação e Finalidade
- **Para que o conjunto de dados foi criado?**
  Servir como base de estudos empíricos para estudantes de Engenharia de Software no domínio de Mineração de Texto e PLN, explorando a evolução da comunicação institucional, literatura científica e checagem de fatos ao longo da pandemia de COVID-19 (2020–2023).
- **Quem criou o conjunto de dados?**
  Equipe pedagógica da disciplina, a partir de dados públicos abertos disponibilizados por autoridades de saúde e veículos científicos.

### 2. Composição e Proveniência dos Dados
- **Fontes Oficiais Utilizadas:**
  1. *Fundação Oswaldo Cruz (Fiocruz)*: Boletins do Observatório COVID-19 e Agência Fiocruz de Notícias.
  2. *Ministério da Saúde do Brasil*: Informes epidemiológicos oficiais e notas técnicas.
  3. *Organização Mundial da Saúde (OMS / WHO)*: Comunicados traduzidos e pronunciamentos técnicos globais.
  4. *SciELO Brasil / Cadernos de Saúde Pública*: Artigos de acesso aberto revisados por pares.
  5. *Agência Lupa*: Checagens de desinformação pública com evidências contrastadas para fins do Módulo 9.
- **Idiomas:** Português Brasileiro (pt-br).
- **Período Temporal Coberto:** Março de 2020 a Maio de 2023 (marcos do início do isolamento, surgimento da variante Gama, vacinação em massa, onda Ômicron e encerramento da ESPII).
- **Licenciamento:** Creative Commons Atribuição (CC BY 4.0), Domínio Público governamental e termos de acesso aberto acadêmico.

### 3. Considerações Éticas e de Privacidade (LGPD)
- **Minimização de Dados:** O corpus é estritamente composto por documentos públicos institucionais, notícias veiculadas em canais governamentais/jornalísticos e resumos de artigos científicos.
- **Proteção a Indivíduos:** Não constam no banco dados sensíveis, registros clínicos de prontuários, nomes de pacientes ou dados identificáveis de cidadãos anônimos.
- **Transparência:** Todos os registros preservam os campos `fonte`, `url_origem`, `data_publicacao`, `categoria` e `limitacoes_conhecidas`.

### 4. Limitações Conhecidas e Vieses
- A amostra inicial concentra-se em fontes institucionais formais em língua portuguesa padrão; consequentemente, não reflete a totalidade da linguagem informal ou gírias das redes sociais sem modelos específicos.
- Análises de sentimento em textos técnicos biomédicos demandam atenção: termos como "vírus", "mortalidade" e "colapso" podem induzir polaridade negativa automática, mesmo quando o teor é puramente descritivo e objetivo.
