-- Migração de Carga Inicial: V2__seed_modules_and_corpus.sql

-- 1. Usuários Padrão (Senhas com BCrypt hash para 'SenhaForte@2026')
-- Hash BCrypt para 'SenhaForte@2026': $2a$10$7Z1iI.R3rC5Xh1kG6QZt.O.yVzW7sJv4E1rR5T6Y7U8I9O0P1Q2R3 (exemplo padrão gerado)
-- Vamos inserir o usuário professor e o estudante de demonstração
INSERT INTO usuarios (id, nome, email, senha_hash, role, ativo, email_verificado)
VALUES 
('a0000000-0000-0000-0000-000000000001', 'Prof. Dr. Ricardo Silveira', 'professor@universidade.edu.br', '$2a$10$X86Z99tQkL5Jv6k9bY7iSuF8e.aQj7vE1kH6G1fE5rW8tN4yZ0lKi', 'ROLE_PROFESSOR', true, true),
('a0000000-0000-0000-0000-000000000002', 'Ana Beatriz Souza', 'estudante@universidade.edu.br', '$2a$10$X86Z99tQkL5Jv6k9bY7iSuF8e.aQj7vE1kH6G1fE5rW8tN4yZ0lKi', 'ROLE_ESTUDANTE', true, true);

INSERT INTO perfis (usuario_id, biografia, instituicao, matricula)
VALUES
('a0000000-0000-0000-0000-000000000001', 'Docente titular do Departamento de Engenharia de Software e pesquisador em PLN.', 'Universidade Federal de Engenharia', 'DOC-2026'),
('a0000000-0000-0000-0000-000000000002', 'Estudante do 6º período de Engenharia de Software.', 'Universidade Federal de Engenharia', '202401928');

-- 2. Cadastro dos 10 Módulos Didáticos Oficiais
INSERT INTO modulos (id, numero, titulo, descricao_curta, icone, carga_horaria_horas) VALUES
(1, 1, 'Introdução à Mineração de Texto', 'Conceitos fundamentais, diferenças entre dados estruturados e não estruturados e o papel do PLN na crise sanitária.', 'FileSearch', 4),
(2, 2, 'Fundamentos de Linguagem Natural', 'Como computadores processam linguagem humana, ambiguidade, tokenização e desafios morfológicos da língua portuguesa.', 'Layers', 5),
(3, 3, 'Preparação e Limpeza de Dados Textuais', 'Construção de corpus, remoção de ruídos, tratamento de pontuação e padronização com responsabilidade ética.', 'Filter', 4),
(4, 4, 'Frequência de Termos e Representação Textual', 'Bolsa de palavras (Bag of Words), N-gramas, ponderação TF-IDF e métricas de similaridade de documentos.', 'BarChart3', 6),
(5, 5, 'Análise de Sentimentos', 'Abordagens léxicas e supervisionadas, limitações contextuais em saúde pública e diferença entre sentimento e emoção.', 'Smile', 5),
(6, 6, 'Classificação Automática de Textos', 'Aprendizado supervisionado, Naive Bayes, matriz de confusão e métricas de avaliação (Precisão, Recall e F1).', 'Cpu', 6),
(7, 7, 'Modelagem de Tópicos', 'Descoberta não supervisionada de assuntos com Latent Dirichlet Allocation (LDA) nos períodos da pandemia.', 'FolderTree', 5),
(8, 8, 'Reconhecimento de Entidades Nomeadas (NER)', 'Identificação automatizada de organizações sanitárias, localidades, patógenos e personalidades.', 'Tag', 5),
(9, 9, 'Desinformação e Análise Crítica', 'Padrões linguísticos de alegações enganosas, limites de classificadores automáticos e a importância da checagem.', 'ShieldAlert', 5),
(10, 10, 'Projeto Prático Integrador Final', 'Análise textual completa de ponta a ponta sobre o acervo documental da pandemia de COVID-19.', 'GraduationCap', 8);

-- 3. Inserção de Aulas Estruturadas nos 8 Passos Pedagógicos para os Módulos Iniciais
INSERT INTO aulas (modulo_id, ordem, titulo, objetivos, conceito_markdown, algoritmo_explicacao, exemplo_covid_markdown, referencias_bibliograficas) VALUES
(1, 1, 'Dados Não Estruturados e o Volume de Informação na COVID-19',
 'Compreender a diferença entre dados estruturados (tabelas relacionais) e dados não estruturados (textos clínicos e notícias), e avaliar o gargalo de análise durante a emergência da COVID-19.',
 'Dados estruturados seguem modelos rígidos com esquemas predefinidos (ex: número de leitos em um banco relacional). Por outro lado, mais de 80% dos dados gerados durante a pandemia consistiram em artigos científicos, boletins informativos, relatos de sintomas e notícias — todos em formato textual não estruturado.',
 'O processo de extração envolve: Coleta -> Pré-processamento -> Extração de Características -> Mineração / Descoberta -> Interpretação do Conhecimento.',
 'Durante o primeiro mês da pandemia (março de 2020), mais de 20.000 artigos acadêmicos foram publicados sobre o Sars-CoV-2. A leitura manual tornou-se inviável, demandando algoritmos de mineração de texto para correlacionar sintomas e desfechos.',
 'MANNING, C. D.; SCHÜTZE, H. Foundations of Statistical Natural Language Processing. MIT Press, 1999. \nFIOCRUZ. Boletins do Observatório COVID-19, 2020.'),

(2, 1, 'Tokenização, Stopwords e Normalização em Português',
 'Aprender como segmentar sequências de caracteres em unidades linguísticas significativas e filtrar elementos de ruído gramatical.',
 'A tokenização é a porta de entrada de qualquer pipeline de PLN. Ela define a fronteira das palavras e pontuações. A língua portuguesa impõe desafios particulares, tais como contrações (do = de + o, no = em + o) e caracteres diacríticos (acentos gráficos e cedilha).',
 'Algoritmo de Normalização: 1. Conversão para minúsculas; 2. Remoção de pontuação preservando hífen quando morfologicamente relevante; 3. Filtragem de stopwords através de busca em tabela hash O(1).',
 'Considere a frase oficial da Fiocruz: "Bio-Manguinhos produz testes para o diagnóstico rápido da Covid-19". Sem tratamento adequado, "Bio-Manguinhos" pode ser erroneamente fragmentado e "o", "da", "para" sobrecarregam o vocabulário sem valor semântico discriminativo.',
 'BIRD, S.; KLEIN, E.; LOPER, E. Natural Language Processing with Python. OReilly Media, 2009.');

-- 4. Inserção dos Documentos Históricos Verificados
INSERT INTO documentos_corpus (id, titulo, texto_completo, fonte, url_origem, data_publicacao, periodo_pandemia, categoria, licenca, limitacoes_conhecidas) VALUES
('fiocruz-2020-03-emergencia', 'Fiocruz reforça ações frente à pandemia de novo coronavírus', 'A Fundação Oswaldo Cruz (Fiocruz) intensificou a mobilização institucional para apoiar o Ministério da Saúde nas ações de vigilância, diagnóstico laboratorial e pesquisa clínica voltadas ao enfrentamento do novo coronavírus (Sars-CoV-2). O Instituto de Tecnologia em Imunobiológicos (Bio-Manguinhos/Fiocruz) trabalha no escalonamento da produção de testes moleculares do tipo RT-PCR, padrão-ouro preconizado pela Organização Mundial da Saúde (OMS) para detecção do vírus. Além disso, a Fiocruz estruturou o Centro Hospitalar para a Pandemia de Covid-19 no Instituto Nacional de Infectologia Evandro Chagas (INI/Fiocruz), no Rio de Janeiro, com leitos de UTI destinados ao atendimento de casos graves da doença infecciosa.', 'Fiocruz - Agência de Notícias', 'https://portal.fiocruz.br/noticia/fiocruz-reforca-acoes-frente-pandemia-de-novo-coronavirus', '2020-03-16', '2020_INICIO_ISOLAMENTO', 'COMUNICADO_OFICIAL', 'CC BY 4.0', 'Documento inicial emitido nos primeiros dias da pandemia internacional.'),
('ms-2020-04-mascaras', 'Ministério da Saúde orienta uso de máscaras caseiras pela população em geral', 'O Ministério da Saúde atualizou as orientações técnicas para enfrentamento da Covid-19, recomendando o uso de máscaras faciais de tecido pela população geral em ambientes públicos. A medida busca criar uma barreira física suplementar contra gotículas respiratórias expelidas ao falar, tossir ou espirrar. A orientação ressalta que as máscaras cirúrgicas descartáveis e os modelos N95/PFF2 devem ser estritamente priorizados para profissionais de saúde e atendimentos ambulatoriais. As máscaras de pano devem ter dupla camada de tecido, cobrir totalmente nariz e boca e não substituem o distanciamento físico de dois metros e a frequente higienização das mãos com água e sabão ou álcool em gel 70%.', 'Ministério da Saúde do Brasil', 'https://www.gov.br/saude/pt-br/assuntos/noticias/2020/abril/ministerio-da-saude-orienta-o-uso-de-mascaras-caseiras', '2020-04-02', '2020_INICIO_ISOLAMENTO', 'MEDIDAS_RESTRITIVAS', 'Domínio Público', 'Diretrizes do início de abril de 2020 no contexto de escassez global de EPIs descartáveis.'),
('who-2020-06-dexametasona', 'OMS acolhe com entusiasmo resultados iniciais de ensaio clínico com dexametasona', 'A Organização Mundial da Saúde (OMS) comemorou os resultados preliminares do ensaio clínico randomizado RECOVERY, conduzido pela Universidade de Oxford no Reino Unido. O estudo comprovou que o corticoide dexametasona reduziu em cerca de um terço a taxa de mortalidade em pacientes hospitalizados com Covid-19 que necessitavam de ventilação mecânica invasiva. Para os pacientes sob oxigenoterapia, a mortalidade caiu em um quinto. O diretor-geral da OMS, Tedros Adhanom Ghebreyesus, enfatizou que o medicamento não demonstrou benefício terapêutico em indivíduos com sintomas leves que não demandavam suporte de oxigênio, reiterando a necessidade de uso hospitalar supervisionado.', 'Organização Mundial da Saúde (OMS)', 'https://www.who.int/pt/news/item/16-06-2020-who-welcomes-preliminary-results-about-dexamethasone-use-in-treating-critically-ill-covid-19-patients', '2020-06-16', '2020_INICIO_ISOLAMENTO', 'TRATAMENTOS', 'Open Information WHO', 'Ensaio clínico preliminar focado estritamente em pacientes hospitalizados com suporte respiratório.');

-- 5. Questionário de Demonstração para o Módulo 1
INSERT INTO questionarios (id, modulo_id, titulo, nota_minima) VALUES
(1, 1, 'Avaliação Formativa: Fundamentos da Mineração de Texto', 70);

INSERT INTO questoes (id, questionario_id, enunciado, explicacao_resposta) VALUES
(1, 1, 'Por que técnicas tradicionais de banco de dados relacional (SQL) são insuficientes para analisar o volume de informações textuais geradas na pandemia de COVID-19?',
 'Bancos de dados relacionais exigem esquemas estritos com campos predefinidos. Textos em linguagem natural não possuem estrutura fixa, apresentando sinônimos, ambiguidades e polifonia que demandam processamento linguístico e estatístico.');

INSERT INTO opcoes_questao (questao_id, texto, correta) VALUES
(1, 'Porque textos em linguagem natural são não estruturados e demandam tratamento semântico e morfológico para extração de significado.', true),
(1, 'Porque bancos relacionais não suportam campos do tipo texto com mais de 255 caracteres.', false),
(1, 'Porque dados da pandemia não puderam ser armazenados em computadores digitais.', false),
(1, 'Porque a velocidade dos discos rígidos impede a leitura de caracteres em língua portuguesa.', false);
