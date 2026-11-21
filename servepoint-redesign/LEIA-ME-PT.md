# Guia da pasta: redesign do site da ServePoint Canada

Este guia é para você, em português. O Claude Code não precisa dele: os documentos dele estão em inglês porque o site é em inglês.

Atualizado em 20/11/2026, depois da Fase 0.

## O que é esta pasta

É um pacote completo de instruções para o Claude Code reconstruir o site da sua amiga. Você coloca a pasta inteira em uma pasta nova, abre o Claude Code nela e ele segue os documentos fase por fase. Nada aqui é o site pronto: é o briefing, o plano e a referência visual para construí-lo.

## O que eu li no site atual

Abri as 9 páginas do site atual (home, process serving, court services, corporate search, áreas, preços, firmas dos EUA, sobre e contato), mais o sitemap e o robots.txt. O documento `docs/13-page-replication-matrix.md` mostra, página por página e seção por seção, o que o site atual tem e o que acontece com cada parte no site novo: mantida, melhorada, juntada com outra, cortada (com o motivo) ou nova. Nenhum fato publicado se perde. O que foi cortado são slogans e blocos que só repetiam outro bloco.

## O que a Fase 0 mudou

A Fase 0 mediu e olhou o site no navegador. Estes seis achados já estão refletidos nos documentos:

| Achado | O que mudou |
|---|---|
| `servepointcanada.com` é uma página de domínio estacionado do GoDaddy. Só a versão de teste (staging) está no ar | Não há posição no Google a preservar. Os redirecionamentos servem só para os endereços antigos do staging. No lançamento o DNS precisa apontar para o Netlify (quem faz isso é o dono do domínio, pergunta 17 em `docs/12`) |
| O logo é azul-marinho e verde-azulado (teal), não azul | Decisão no `docs/06`, seção 4: o azul de ação continua. O verde-azulado já é a cor de "entregue" (`--served`), então usá-lo em botões confundiria os dois. Falta o arquivo do logo para ler as cores exatas (pergunta 16) |
| O formulário no ar não mostra `data-netlify` | É o esperado: o Netlify remove esse atributo quando publica a página e acrescenta um campo escondido `form-name`. Isso não prova que o formulário funciona nem que não funciona. A conferência está no `docs/07`, seção 5.3 |
| A página `/thank-you/` já existe | A primeira leitura não a encontrou. Corrigido em `docs/01` e `docs/13`, e `/thank-you/` redireciona para `/request-service/received/` |
| Descrições de página (meta description) com mais de 155 caracteres em 7 de 9 páginas | Já estava coberto: o `docs/08` limita a 120 a 155 e o `check:copy` confere |
| LCP no celular do site atual: 2,1 s | O orçamento do novo site continua em 2,0 s (`docs/07`, seção 7). O risco são as fontes: duas são pré-carregadas |

**Uma ação para sua amiga:** conferir no painel do Netlify, na aba Forms, se o formulário atual aparece lá, para onde vão os avisos por e-mail, e baixar as mensagens antigas em CSV antes de publicar o site novo. Ver pergunta 24 em `docs/12`.

## Veja primeiro a direção visual

Abra `design/direction-specimen.html` no navegador, no computador e depois no celular (ou reduzindo a janela), e **role a página devagar**: o efeito de rolagem faz parte do design. Esse arquivo é o alvo visual. O Claude Code é instruído a reproduzi-lo e depois preencher com o conteúdo real.

Esta é a **versão 3 ("cadeia de registro")**. Ela mantém o mesmo raciocínio do site atual (buscar primeiro, entregar depois; primeira tentativa em até 24 horas; até 3 tentativas; afidavit juramentado; preço a partir de $168; 15 comunidades) e muda a execução visual.

O que você vai ver:
- **Cores profissionais e calmas:** azul-marinho escuro, cinza-azulado claro, branco e um único azul de ação. Sem preto, sem gradientes, sem blocos amarelos. O amarelo claro só aparece como marca-texto em trechos da folha de exemplo.
- **Uma só família de fontes, IBM Plex:** serifa para as frases grandes, sans para o texto e botões, mono para dados de registro (horários, número de processo, relógio). Pesos e números combinam entre si.
- **A folha de afidavit de exemplo fica fixa na tela** enquanto você rola as quatro etapas (Instruir, Tentar, Entregar, Provar). Cada etapa acende o trecho da folha que ela produz e deixa o resto mais apagado. Mostra o produto em vez de prometer "serviço documentado". Em telas pequenas a folha não fica fixa.
- **Efeitos de rolagem com função**, todos reversíveis ao rolar para cima: barra de progresso e destaque da seção no menu, título que se revela, linha de 24 horas que se preenche, linhas que se desenham, mapa das 15 cidades cujas rotas se desenham, marcas-texto e assinatura que aparecem ao abrir a página. Não há animação decorativa nem a rolagem é "sequestrada".
- Preço em um bloco azul-marinho com o "$168" gigante.
- **Mapa de cobertura** das 15 cidades como diagrama de rotas, clicável e navegável pelo teclado, com uma lista de botões equivalente.
- **Buscador de documentos** (digite "subpoena" ou escolha a categoria), **relógio de Vancouver ao vivo** e **formulário em duas etapas**.
- Quem tem "reduzir movimento" ligado no aparelho, ou abre sem JavaScript, vê a página completa, sem efeitos.

## Onde está cada coisa

| O que você procura | Onde |
|---|---|
| Informações da empresa, modelo de negócio, público, o que sabemos e o que não sabemos | `docs/00-project-brief.md` |
| Tom de voz, vocabulário, frases proibidas, lista de fatos aprovados, exemplos de antes e depois | `docs/09-copy-guidelines.md` |
| Layout, cores, tipografia, componentes, efeitos de rolagem, o que é proibido | `docs/06-design-direction.md` |
| **O prompt de design para colar no Claude Code** (prompt mestre, um prompt por fase, ciclo de crítica com capturas de tela, critérios de aceite) | `docs/14-design-prompt.md` |
| Texto de cada página (rascunho já escrito) | pasta `content/` |
| Estrutura de cada página, seção por seção | pasta `docs/pages/` |
| Análise do site atual e por que ele parece "feito por IA" | `docs/01-current-site-audit.md` |
| Cada página e seção do site atual e o que vira no site novo | `docs/13-page-replication-matrix.md` |
| Concorrentes | `docs/02-competitor-analysis.md` |
| Palavras-chave e estratégia de SEO | `docs/03` e `docs/08`, mais `docs/data/keyword-seed.csv` |
| Estrutura de URLs, menu e redirecionamentos | `docs/04-information-architecture.md` |
| Experiência do usuário e formulário | `docs/05-ux-strategy.md` |
| Stack técnica, formulário Netlify, cabeçalhos de segurança, orçamento de desempenho, acessibilidade, base para as páginas de privacidade e termos | `docs/07-technical-spec.md` |
| Plano de execução em fases, com um prompt pronto por fase | `docs/10-implementation-plan.md` |
| Checklist de qualidade antes de publicar | `docs/11-qa-checklist.md` |
| Perguntas para sua amiga | `docs/12-open-questions-for-client.md` |
| Regras que o Claude Code lê primeiro | `CLAUDE.md` |
| Os cinco comandos `/phase`, `/design-audit`, `/motion-audit`, `/seo-audit` e `/copy-audit` | pasta `.claude/commands/` (pasta oculta: veja o passo 1) |

## Como usar, passo a passo

1. Crie uma pasta nova e copie o conteúdo desta pasta para dentro dela. **Copie também a pasta oculta `.claude`**, que guarda os cinco comandos. No Finder do Mac, `Cmd + Shift + .` mostra as pastas ocultas. No Terminal, `cp -R pasta-do-pacote/. pasta-nova/` copia tudo, inclusive o que é oculto. Um repositório git é opcional: sem ele, o Claude Code não faz commits e lista os arquivos que mudou no fim de cada fase.
2. Confira a cópia. Dentro da pasta nova, `ls docs/*.md | wc -l` deve mostrar 15 e `ls .claude/commands` deve listar 5 arquivos. O pacote original tem 51 arquivos no total, 42 deles em Markdown.
3. Abra o Claude Code nessa pasta. Ele lê o `CLAUDE.md` sozinho.
4. Mande para sua amiga as perguntas de `docs/12-open-questions-for-client.md`. As respostas liberam o conteúdo final enquanto as primeiras fases rodam.
5. Digite `/phase 0` e siga a ordem: 0, 1, 2, 3 e assim por diante. Cada fase tem objetivo, tarefas e critério de aceite em `docs/10`.
6. Para a parte visual, cole a **Parte A** de `docs/14-design-prompt.md` no começo e depois um prompt de fase (B1 a B6) por vez. Ao fim de cada página, rode `/design-audit`, `/motion-audit`, `/seo-audit` e `/copy-audit`. Eles conferem o resultado contra os documentos.
7. Antes de dar uma fase por encerrada, rode `npm run verify`. É o comando único que constrói o site e roda as conferências, os testes de acessibilidade, o teste da política de segurança e o Lighthouse.

Se um arquivo parecer ter o nome de outro, o Claude Code deve abrir o arquivo e ler o título (a primeira linha) para saber o que ele é. Cada documento começa com um título que confere com o nome, por exemplo `# 07. Technical specification` dentro de `docs/07-technical-spec.md`.

## Limites que você precisa saber

- **Tráfego e volume de buscas.** Não tive acesso a Semrush, Ahrefs ou Similarweb. A avaliação dos concorrentes usa escala, presença em diretórios e o que eles publicam. Há uma planilha pronta (`docs/data/competitor-metrics.csv`) e uma lista de palavras-chave sem volumes (`docs/data/keyword-seed.csv`) para preencher quando você tiver acesso a uma dessas ferramentas.
- **Teste de navegadores.** Testei o exemplo no Chrome (computador, tablet e celular simulados, movimento reduzido e sem JavaScript). Safari e Firefox ficam para a fase 6 do `docs/14`. A folha fixa precisa ser conferida em um iPhone e um Android reais.
- **Visual e código do site atual.** Li todo o texto, os títulos, os campos do formulário e as tags do site, mas eu mesmo não vi a página renderizada. O que a Fase 0 viu no navegador (logo azul-marinho e verde-azulado, `/thank-you/`, desempenho) entrou nos documentos, mas as cores exatas do logo ainda dependem do arquivo original (pergunta 3 em `docs/12`).
- **Política de segurança e formulário.** Os cabeçalhos e o formulário Netlify estão especificados com o que a documentação do Netlify descreve, mas só um teste real mostra se está tudo certo. O `docs/07` (seções 5.3 e 6.4) lista as conferências para a primeira publicação.
- **Fatos do negócio.** Anos de atividade, endereço, horário, valores de urgência e depoimentos não estão no site atual. Estão marcados como `[CONFIRM: ...]` nos textos, e um script impede a publicação enquanto algum sobrar.
- **Conteúdo jurídico.** Os guias sobre procedimento precisam ser escritos ou revisados pela fundadora antes de ir ao ar. As páginas de privacidade, termos e acessibilidade são rascunhos feitos a partir do comportamento real do site e precisam de revisão da dona (idealmente de um advogado). O site não dá aconselhamento jurídico.
- **Fotos e logo.** O site foi desenhado para funcionar sem fotos. O nome no cabeçalho do exemplo é provisório até chegar o arquivo do logo.

## Se você quiser mudar a direção

A direção visual está toda em `docs/06-design-direction.md` e em `design/direction-specimen.html`. Se quiser algo diferente (outra cor principal, mais ou menos movimento, outra tipografia), me diga o que não funcionou e eu ajusto o documento e o exemplo juntos. Assim o Claude Code nunca recebe instruções que contradizem o que você aprovou. Se sua amiga quiser o verde-azulado do logo na interface, o `docs/06` seção 4 diz exatamente qual é a única troca permitida e quais cores passam no contraste.
