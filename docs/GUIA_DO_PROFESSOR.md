# Guia Didático e Operacional do Professor
## Mineração de Texto e Processamento de Linguagem Natural: Uma Análise da Informação durante a Pandemia de COVID-19

Este documento destina-se aos docentes da disciplina **Mineração de Texto e Linguagem Natural** em cursos de Engenharia de Software.

---

### 1. Diretrizes Pedagógicas e Curriculares
A proposta pedagógica da plataforma visa capacitar estudantes de Engenharia de Software a compreender que a Inteligência Artificial e o Processamento de Linguagem Natural não operam como "mágica", mas sim através de pipelines rigorosos de engenharia de software:
- **Engenharia de Dados Textuais:** coleta, sanitização, anonimização e conformidade com a LGPD.
- **Modelagem Estatística:** passagem do espaço textual bruto para o espaço vetorial contínuo (BoW, N-gramas, TF-IDF).
- **Inferência e Aprendizado Supervisionado:** classificação com Naive Bayes, matrizes de confusão e métricas de precisão/recall/F1-score.
- **Pensamento Crítico:** avaliação sistemática de viés e limitações, especialmente no combate à desinformação sanitária (Módulo 9).

---

### 2. Acesso ao Painel Administrativo
- **Credenciais do Docente:**
  - **E-mail:** `professor@universidade.edu.br`
  - **Senha:** `SenhaForte@2026`
- **Rota Restrita:** [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)
  *(O sistema bloqueia automaticamente qualquer tentativa de acesso por usuários que não possuam a role `ROLE_PROFESSOR` ou `ROLE_ADMIN`).*

---

### 3. Funcionalidades de Gestão Docente
1. **Acompanhamento da Turma:**
   - Lista completa de estudantes matriculados com número de matrícula, e-mail institucional e status.
   - Indicador individualizado de módulos concluídos (de 1 a 10) e média obtida nos questionários.
2. **Gerenciamento de Módulos Didáticos:**
   - Possibilidade de alternar a visibilidade de cada um dos 10 módulos (Publicado / Oculto).
   - Edição de referências bibliográficas e inserção de avisos de aula.
3. **Curadoria do Corpus da COVID-19:**
   - Consulta aos metadados e fichas técnicas (*Datasheets for Datasets*) de proveniência dos textos da Fiocruz, OMS, Ministério da Saúde e SciELO.

---

### 4. Gabarito dos Questionários e Objetivos de Aprendizagem
- **Módulo 1:** Distinção entre bancos relacionais e dados não estruturados; gargalo de leitura manual durante a crise sanitária; função da tokenização e stopwords.
- **Módulo 2 a 4:** Desafios morfológicos do português brasileiro (contrações, diacríticos); diferença prática entre Stemming (heurística por sufixos) e Lematização (dicionário formal); ponderação TF-IDF e normalização L2.
- **Módulo 5 a 8:** Salvaguardas pedagógicas sobre análise de sentimentos em domínios biomédicos; interpretação de matrizes de confusão sem vazamento de dados (*data leakage*); agrupamento não supervisionado com LDA; detecção de entidades com spaCy.
- **Módulo 9 e 10:** Análise do discurso em checagens de fatos da Agência Lupa; viés algorítmico; projeto prático integrador com relatório de desempenho emitido ao final.
