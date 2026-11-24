# Mineração de Texto e Linguagem Natural: Uma Análise da Informação durante a Pandemia de COVID-19
## Plataforma Educacional Web Institucional para Engenharia de Software

[![Docker Compose](https://img.shields.io/badge/docker--compose-v3.8-blue.svg)](https://docs.docker.com/compose/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-teal.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)

---

## 1. Visão Geral do Projeto

Esta plataforma educacional foi desenvolvida para apoiar a disciplina **Mineração de Texto e Linguagem Natural** de cursos de graduação em **Engenharia de Software**. O objetivo central é capacitar estudantes universitários a compreender e aplicar técnicas avançadas de Processamento de Linguagem Natural (PLN) e Mineração Textual, utilizando como estudo de caso empírico o acervo documental produzido durante a pandemia de COVID-19 (2020 a 2023).

A plataforma transcende a leitura estática: oferece **laboratório interativo funcional**, questionários formativos com feedback imediato, visualizações gráficas de representação vetorial e acompanhamento de progresso acadêmico individualizado.

---

## 2. Arquitetura da Solução

O sistema adota uma arquitetura em microsserviços desacoplados com separação estrita de responsabilidades:

```
plataforma-pln/
├── backend/             # API REST em Java 17/21 com Spring Boot 3 & Spring Security (JWT)
├── frontend/            # Interface institucional em Next.js (App Router, Tailwind CSS, TypeScript)
├── nlp-service/         # Motor de PLN em Python (FastAPI, spaCy pt_core_news, scikit-learn)
├── datasets/            # Corpus documentado da COVID-19 (Fiocruz, MS, OMS) e Datasheets
├── infra/               # Configurações de infraestrutura (Nginx e Docker)
└── docker-compose.yml   # Orquestração local conteinerizada
```

- **Frontend (`/frontend`)**: Interface responsiva (WCAG 2.2 AA), paleta institucional em azul-marinho e azul tecnológico, suporte a modo claro/escuro, gráficos em Recharts e validação Zod.
- **Backend (`/backend`)**: Núcleo de regras de negócio, persistência com Spring Data JPA, migrações versionadas com Flyway, autenticação stateless via JWT e controle de acesso baseado em papéis (`ROLE_VISITANTE`, `ROLE_ESTUDANTE`, `ROLE_PROFESSOR`).
- **Serviço de PLN (`/nlp-service`)**: Microsserviço de alto desempenho responsável por tokenização, lematização, TF-IDF, similaridade de cosseno, análise de sentimento com salvaguardas pedagógicas e reconhecimento de entidades nomeadas (NER).
- **Banco de Dados**: PostgreSQL 16 com esquemas normalizados e suporte a UUID.

---

## 3. Módulos Educacionais

1. **Módulo 1 — Introdução à Mineração de Texto**: Dados estruturados vs. não estruturados e o papel do PLN na crise sanitária.
2. **Módulo 2 — Fundamentos de Linguagem Natural**: Tokenização, stopwords, normalização, stemming e lematização em português.
3. **Módulo 3 — Preparação e Limpeza de Dados Textuais**: Coleta, limpeza de ruídos, tratamento ético e padronização.
4. **Módulo 4 — Frequência de Termos e Representação Textual**: Bag of Words, N-gramas, cálculo ponderado de TF-IDF e embeddings.
5. **Módulo 5 — Análise de Sentimentos**: Métodos léxicos, limites da classificação automática e contexto biomédico.
6. **Módulo 6 — Classificação Automática de Textos**: Aprendizado supervisionado, Naive Bayes, matriz de confusão e métricas (F1-score).
7. **Módulo 7 — Modelagem de Tópicos**: Descoberta não supervisionada com Latent Dirichlet Allocation (LDA) nos períodos da pandemia.
8. **Módulo 8 — Reconhecimento de Entidades Nomeadas (NER)**: Detecção de instituições de saúde, locais e termos clínicos.
9. **Módulo 9 — Desinformação e Análise Crítica**: Padrões textuais de desinformação, viés algorítmico e ética em inteligência artificial.
10. **Módulo 10 — Projeto Prático Integrador Final**: Pipeline analítico de ponta a ponta sobre dados reais com emissão de relatório.

---

## 4. Fontes dos Dados e Transparência (COVID-19)

Em estrita consonância com as diretrizes acadêmicas de **verificabilidade**, nenhum dado, estatística ou comunicado foi inventado. O acervo textual compõe-se de fontes públicas oficiais:

- **Fundação Oswaldo Cruz (Fiocruz)**: Boletins extraordinários do Observatório COVID-19 e Agência de Notícias.
- **Ministério da Saúde do Brasil**: Notas técnicas e orientações operacionais de saúde pública.
- **Organização Mundial da Saúde (OMS / WHO)**: Declarações sanitárias globais e classificação de variantes.
- **SciELO Brasil**: Artigos de periódicos científicos revisados por pares (ex: *Cadernos de Saúde Pública*).
- **Agência Lupa**: Checagens metodológicas públicas de desinformação na área da saúde (Módulo 9).

Consulte a ficha técnica detalhada em [`datasets/datasheets/DATASHEET_CORPUS_COVID.md`](datasets/datasheets/DATASHEET_CORPUS_COVID.md).

---

## 5. Como Executar

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Execução via Docker Compose (Recomendado)
Para iniciar todos os serviços simultaneamente (banco de dados, motor de PLN, backend e frontend):

```bash
docker compose up --build
```

Após a inicialização dos containers, acesse:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Documentação da API (Swagger)**: [http://localhost:8080/api/v1/swagger-ui.html](http://localhost:8080/api/v1/swagger-ui.html)
- **API do Motor de PLN**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Credenciais de Demonstração
- **Professor / Administrador**: `professor@universidade.edu.br` / `SenhaForte@2026`
- **Estudante**: `estudante@universidade.edu.br` / `SenhaForte@2026`

---

## 6. Conformidade Ética e LGPD

- O sistema não efetua coleta nem armazenamento de dados sensíveis ou informações de prontuários médicos de pacientes.
- A submissão de textos ao Laboratório de PLN é processada em memória; nenhum texto submetido é persistido sem consentimento prévio e explícito do estudante.
- Código e recursos didáticos estruturados sob licenças acadêmicas de acesso aberto.
