-- Migração Inicial Flyway: V1__init_schema.sql
-- Disciplina: Mineração de Texto e Linguagem Natural na Pandemia de COVID-19

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Usuários e Perfis
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_ESTUDANTE',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    email_verificado BOOLEAN NOT NULL DEFAULT FALSE,
    consentimento_lgpd BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    biografia TEXT,
    instituicao VARCHAR(150) DEFAULT 'Curso de Engenharia de Software',
    matricula VARCHAR(50),
    avatar_url VARCHAR(255),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Módulos e Aulas
CREATE TABLE modulos (
    id SERIAL PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    descricao_curta TEXT NOT NULL,
    icone VARCHAR(50) DEFAULT 'BookOpen',
    carga_horaria_horas INT NOT NULL DEFAULT 4,
    publicado BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    modulo_id INT NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
    ordem INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    objetivos TEXT NOT NULL,
    conceito_markdown TEXT NOT NULL,
    algoritmo_explicacao TEXT NOT NULL,
    exemplo_covid_markdown TEXT NOT NULL,
    exercicio_interativo_config JSONB,
    referencias_bibliograficas TEXT,
    publicado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_modulo_ordem UNIQUE (modulo_id, ordem)
);

-- 3. Progresso do Estudante
CREATE TABLE progresso_aulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    aula_id INT NOT NULL REFERENCES aulas(id) ON DELETE CASCADE,
    concluida BOOLEAN NOT NULL DEFAULT TRUE,
    data_conclusao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_usuario_aula UNIQUE (usuario_id, aula_id)
);

-- 4. Questionários e Avaliações
CREATE TABLE questionarios (
    id SERIAL PRIMARY KEY,
    modulo_id INT NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    nota_minima INT NOT NULL DEFAULT 70
);

CREATE TABLE questoes (
    id SERIAL PRIMARY KEY,
    questionario_id INT NOT NULL REFERENCES questionarios(id) ON DELETE CASCADE,
    enunciado TEXT NOT NULL,
    explicacao_resposta TEXT NOT NULL
);

CREATE TABLE opcoes_questao (
    id SERIAL PRIMARY KEY,
    questao_id INT NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    correta BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE tentativas_questionario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    questionario_id INT NOT NULL REFERENCES questionarios(id) ON DELETE CASCADE,
    pontuacao NUMERIC(5,2) NOT NULL,
    total_questoes INT NOT NULL,
    aprovado BOOLEAN NOT NULL DEFAULT FALSE,
    data_tentativa TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE respostas_tentativa (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tentativa_id UUID NOT NULL REFERENCES tentativas_questionario(id) ON DELETE CASCADE,
    questao_id INT NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
    opcao_selecionada_id INT NOT NULL REFERENCES opcoes_questao(id) ON DELETE CASCADE,
    acertou BOOLEAN NOT NULL
);

-- 5. Corpus Documentado da COVID-19
CREATE TABLE documentos_corpus (
    id VARCHAR(64) PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    texto_completo TEXT NOT NULL,
    fonte VARCHAR(100) NOT NULL,
    url_origem VARCHAR(500) NOT NULL,
    data_publicacao DATE NOT NULL,
    periodo_pandemia VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    idioma VARCHAR(10) DEFAULT 'pt-br',
    licenca VARCHAR(150) NOT NULL,
    limitacoes_conhecidas TEXT
);

-- Índices para performance em consultas
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_aulas_modulo ON aulas(modulo_id);
CREATE INDEX idx_progresso_usuario ON progresso_aulas(usuario_id);
CREATE INDEX idx_tentativas_usuario ON tentativas_questionario(usuario_id);
CREATE INDEX idx_corpus_periodo ON documentos_corpus(periodo_pandemia);
CREATE INDEX idx_corpus_categoria ON documentos_corpus(categoria);
