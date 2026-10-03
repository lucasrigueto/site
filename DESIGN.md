---
name: Rigueto · Agente SDR + Tráfego
description: Landing de venda em que a operação roda ao vivo sobre chão preto fosco, com campos Royal Blue e dourado só como sinal.
colors:
  ink: "#1e1e1d"
  matte: "#2b2b2b"
  raise: "#33332f"
  royal-blue: "#11224e"
  blue-deep: "#0b1735"
  sapphire: "#3b507b"
  quicksand-gold: "#ddc28d"
  gold-hi: "#e9d4aa"
  cream: "#f1efe7"
  shellstone: "#d8cac1"
  muted: "rgba(241, 239, 231, 0.7)"
  faint: "rgba(241, 239, 231, 0.12)"
  hair-gold: "rgba(221, 194, 141, 0.3)"
typography:
  display:
    fontFamily: "'Instrument Sans', 'Arial', sans-serif"
    fontSize: "clamp(2.45rem, 5.3vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: "-0.038em"
  display-sm:
    fontFamily: "'Instrument Sans', 'Arial', sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "'Instrument Sans', 'Arial', sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3.05rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  title:
    fontFamily: "'Instrument Sans', 'Arial', sans-serif"
    fontSize: "1.18rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "'Inter', system-ui, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Inter', system-ui, Arial, sans-serif"
    fontSize: "1.04rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Inter', system-ui, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
  button:
    fontFamily: "'Inter', system-ui, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.09em"
rounded:
  sm: "6px"
  md: "8px"
  card: "9px"
  panel: "14px"
  frame: "16px"
  pill: "20px"
spacing:
  gutter: "32px"
  gutter-mobile: "20px"
  container: "1240px"
  section: "128px"
  section-mobile: "88px"
  row: "18px"
components:
  button-gold:
    backgroundColor: "{colors.quicksand-gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "15px 24px"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "15px 24px"
    height: "52px"
  button-line-hover:
    textColor: "{colors.quicksand-gold}"
  button-sm:
    padding: "10px 16px"
    height: "42px"
  button-lg:
    padding: "18px 28px"
    height: "58px"
  status-pill:
    backgroundColor: "rgba(221, 194, 141, 0.13)"
    textColor: "{colors.quicksand-gold}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  kanban-card:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "11px 11px 12px"
  kanban-card-won:
    backgroundColor: "#39352b"
  tag-won:
    backgroundColor: "{colors.quicksand-gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "3px 7px"
  step-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.quicksand-gold}"
    size: "34px"
  nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.muted}"
    height: "76px"
---

# Design System: Rigueto · Agente SDR + Tráfego

Escopo: página principal do site (`index.html`, código em `src/sdr/`, tokens em `src/sdr/sdr.css`).

## Overview

**Creative North Star: "A Operação no Ar"**

A página não descreve o serviço: ela roda. O chão é preto fosco, as dobras de sistema viram campos inteiros de Royal Blue, e em cima disso aparecem interfaces desenhadas em fidelidade de produto (WhatsApp escuro, caixa de entrada unificada, kanban, anúncio do Instagram e do Google) que se mexem sozinhas enquanto estão na tela. O dourado não decora; ele marca o que acabou de acontecer: a mensagem que chegou, o canal que pulsou, o card que fechou, a frase-chave do título.

A densidade é de produto, não de folheto. Cada seção alterna um bloco de texto curto (headline Instrument Sans 600, corpo Inter 400 em creme a 70%) com uma demonstração viva. A estrutura é feita de linhas finas, quase sempre a 1px, em creme a 12% ou dourado a 30%, em vez de caixas com sombra.

Toda demonstração é rotulada como simulada numa legenda pequena logo abaixo, respeita `prefers-reduced-motion` (mostra o estado final parado) e pausa fora da tela.

**Key Characteristics:**
- Preto fosco em dois tons alternando por seção, Royal Blue em campos de largura total nas dobras de sistema (canais e chamada final).
- Dourado só como sinal de estado e ação, nunca como fundo de seção.
- Interfaces de terceiros reproduzidas com as cores e a fonte de sistema delas, dentro do mundo Rigueto.
- Estrutura por fios de 1px; sombras só em objetos físicos (celular, anúncios, painéis flutuantes).
- Movimento com uma curva só, de saída longa, e tudo com fallback parado.

## Colors

Paleta escura de três camadas (preto fosco, Royal Blue, dourado) com o creme como única cor de texto.

### Primary
- **Quicksand Gold** (`quicksand-gold`): o sinal. Botão principal, faixa de destaque inclinada atrás da frase-chave, ponto ativo das notas do agente, nome do remetente no chat, canal em pulso, hub da caixa de entrada, coluna "ganho" do kanban, numeração dos passos, ícone do FAQ, foco de teclado e seleção de texto.
- **Gold Hi** (`gold-hi`): só o hover do botão dourado.

### Secondary
- **Royal Blue** (`royal-blue`): campo de seção inteiro nas dobras de sistema (Omnicanal e Chamada final). Nunca em cartão isolado sobre preto.
- **Blue Deep** (`blue-deep`): painel da caixa de entrada dentro do campo azul; um degrau abaixo do Royal Blue.
- **Sapphire** (`sapphire`): avatar do contato no chat e, a 50%, a etiqueta de follow-up do kanban.

### Neutral
- **Ink** (`ink`): chão da página, nav após rolar, miolo dos círculos de passo, hub e ícones com aro dourado.
- **Matte** (`matte`): chão alternativo das seções Vazamento, Tráfego e FAQ.
- **Raise** (`raise`): superfície de card dentro de painel (cards do kanban).
- **Cream** (`cream`): texto principal, títulos, toast do celular (fundo claro).
- **Shellstone** (`shellstone`): horários da lista de mensagens perdidas.
- **Muted** (`muted`): corpo de apoio, links da nav, subtítulos de cards.
- **Faint** (`faint`): fios divisores entre linhas, borda da nav rolada, linha de fechamento do hero.
- **Hair Gold** (`hair-gold`): fio estrutural dourado: espinha das notas, topo dos passos e pontos do omnicanal, aro de ícones.

### Named Rules
**The Gold Is a Signal Rule.** Dourado marca ação, conexão ou desfecho. Se um elemento dourado não é clicável, não acabou de mudar de estado e não é a frase-chave do título, ele não deveria ser dourado.

**The Blue Field Rule.** Royal Blue entra como seção inteira de ponta a ponta, nunca como cartão solto sobre o preto. Dentro do campo azul, painéis descem para Blue Deep.

**The Borrowed Palette Rule.** Interfaces simuladas usam as cores reais do produto que imitam (WhatsApp escuro, Instagram, Google) e ficam fora da paleta de marca; elas não viram tokens e não aparecem fora das demonstrações.

## Typography

**Display Font:** Instrument Sans 600 (fallback Arial), auto-hospedada.
**Body Font:** Inter 400 / 500 / 600 (fallback system-ui), carregada via Google Fonts.
**UI simulada:** pilha de sistema (`-apple-system, Segoe UI, Roboto`) só dentro do celular, anúncios e caixa de mensagem final.

**Character:** Instrument Sans fechada e com tracking negativo dá peso de manchete; Inter fica neutra e muito legível no corpo. A hierarquia vem de peso e cor (creme pleno contra creme a 70%), não de tamanho exagerado.

### Hierarchy
- **Display** (600, `clamp(2.45rem, 5.3vw, 4.6rem)`, 0.99, -0.038em): só o H1 do hero, com `text-wrap: balance`.
- **Display Small** (600, `clamp(2.2rem, 4.4vw, 3.75rem)`, 1.02): título da chamada final.
- **Headline** (600, `clamp(2rem, 3.5vw, 3.05rem)`, 1.04, -0.032em, máx. 17ch): H2 de seção.
- **Title** (600, 1.08 a 1.3rem, -0.01 a -0.015em): pergunta do FAQ, título de passo, itens de lista com nome, desfecho da lista de perdidos.
- **Lede** (Inter 400, 1.125rem, 1.6, máx. 50ch): parágrafo logo abaixo do H1 e do título final.
- **Body** (Inter 400, 0.97 a 1.04rem, 1.65, máx. 48 a 62ch): texto de seção em Muted.
- **Label** (Inter 500, 0.7 a 0.78rem, 0.1 a 0.13em, caixa alta): links da nav, cabeçalho de coluna do kanban, fatos do hero.
- **Button** (Inter 500, 0.82rem, 0.09em, caixa alta).
- **Caption** (Inter 400, 0.75rem, creme a 55 a 60%): aviso "simulado/fictício" sob cada demonstração.

### Named Rules
**The Highlighter Strip Rule.** A frase-chave de um título de abertura ou fechamento ganha a faixa dourada com pontas inclinadas (gradiente a 100deg, 88% da altura), texto vira Ink, e ela entra uma vez num wipe de 1s. No máximo uma faixa por título.

**The Uppercase Is Inter Rule.** Caixa alta com tracking aberto é sempre Inter (botões, nav, rótulos de coluna), como na assinatura "CONSULTORIA" da marca. Instrument Sans nunca vai em caixa alta.

## Layout

Container de 1240px com gutter de 32px (20px abaixo de 640px). Seções com 128px de respiro vertical (88px no mobile), alternando chão Ink, Matte e campo Royal Blue. Quase toda seção é uma grade de duas colunas assimétrica (texto contra demonstração, proporções entre 0.78fr/1.4fr e 1.1fr/0.9fr) com gaps de 56 a 88px; o hero põe o texto em `1fr` e a demonstração em `auto`.

Listas são feitas de linhas separadas por fio, não de cards: linhas com 18px de respiro e fio Faint no topo, colunas de tempo ou ícone fixas (72px, 38px). Os passos usam grade de quatro colunas com fio Hair Gold no topo e o número montado sobre o fio.

Quebras: abaixo de 1180px as notas ao lado do celular viram uma pílula única sob ele; abaixo de 980px todas as grades colapsam para uma coluna, a nav esconde os links e os passos vão para duas colunas; abaixo de 640px o kanban vira 2x2, os passos uma coluna, o botão principal ocupa a largura e aparece um botão fixo no rodapé da tela.

## Elevation & Depth

Sistema plano com camadas tonais (Ink, Matte, Raise; Royal Blue, Blue Deep) e fios de 1px. Sombra existe só em objetos que fingem ser físicos ou flutuar sobre a página: o celular, os anúncios, a caixa de entrada, a caixa de mensagem final, o toast. São sombras longas, escuras e com spread negativo, nunca deslocadas em bloco.

### Shadow Vocabulary
- **Objeto flutuante** (`box-shadow: 0 30px 70px -30px rgba(0,0,0,0.55 a 0.7)`): anúncios e caixa de entrada.
- **Celular** (`inset 0 0 0 1px rgba(255,255,255,0.09), 0 2px 0 1px #050505, 0 40px 90px -30px rgba(0,0,0,0.75), 0 20px 40px -20px rgba(0,0,0,0.5)`): moldura do aparelho.
- **Card de kanban** (`0 6px 16px -10px rgba(0,0,0,0.6)`): separação mínima do card na coluna.
- **Brilho dourado** (`0 16px 40px -12px rgba(221,194,141,0.45)`): só no hover do botão dourado.
- **Halo de estado** (`0 0 0 4 a 5px rgba(221,194,141,0.16 a 0.2)`): ponto ativo das notas e ponto que viaja no omnicanal.

### Named Rules
**The Physical Objects Only Rule.** Sombra é para aparelho e para painel que flutua sobre a seção. Texto, listas, passos e FAQ ficam planos, separados por fio.

## Shapes

Cantos sutis e consistentes com a marca: 8px nos botões e ícones quadrados, 9 a 10px em cards e chips de canal, 14px em painéis (caixa de entrada, anúncios, toast), 16 a 18px em molduras grandes (quadro do kanban, caixa de mensagem final), 20px em pílulas de status, círculos para avatares, pontos e números de passo. O celular usa 48px por fidelidade ao aparelho. Fios são sempre de 1px; o check das listas é desenhado com duas bordas douradas de 2px giradas, sem fonte de ícones.

## Components

### Buttons
Sólidos, compactos e em caixa alta, com o ícone do WhatsApp à esquerda: todo botão leva ao mesmo WhatsApp.
- **Shape:** cantos suaves (8px), altura mínima 52px.
- **Gold:** fundo Quicksand Gold, texto Ink, 15px 24px.
- **Hover / Focus:** Gold Hi, sobe 2px e ganha brilho dourado (0.35s na curva da casa); foco é contorno dourado de 2px com 3px de afastamento.
- **Line:** transparente, fio creme a 28%, texto creme; no hover fio e texto viram dourado. No mobile do hero perde o fio e vira link Muted.
- **Tamanhos:** Small 42px (nav), Large 58px (chamada final), Block 100% (botão fixo mobile).

### Chips / Status
- **Status do atendimento:** pílula de 20px, dourado a 13% com texto dourado quando é o agente; creme a 10% com texto creme quando passou para humano.
- **Etiquetas do kanban:** 6px de canto, creme a 7%; follow-up em Sapphire a 50% com texto `#c4d2f2`; venda fechada em dourado sólido com texto Ink.

### Cards / Containers
- **Painel de demonstração:** Blue Deep (no campo azul) ou `#262625` (no preto), fio creme a 8 a 13%, 14 a 16px de canto, sombra de objeto flutuante.
- **Card de kanban:** Raise, fio creme a 8%, 9px; ao ganhar, fio dourado a 60% e fundo dourado escurecido.
- **Padding interno:** 11 a 18px.

### Navigation
Fixa, transparente sobre o hero e Ink com fio Faint depois de rolar. Logo creme de 140px à esquerda, links Inter 400 em caixa alta (0.78rem, 0.13em) em Muted que viram dourado no hover, botão Gold Small à direita. Abaixo de 980px some a lista de links e fica só o botão.

### Notas do Agente (assinatura)
Lista vertical ao lado do celular, presa numa espinha Hair Gold. Cada nota tem um ponto de 21px: pendente em creme a 22% de fio, feita com fio e check dourados, ativa em dourado sólido com halo e deslocada 4px. Acende em sincronia com a conversa.

### Hub Omnicanal (assinatura)
Chips de canal em `#0e1d45` com glifo de marca em SVG ligados por curvas douradas a 26% a um hub circular Ink com aro dourado; quando chega mensagem, a curva vai a 75%, o chip ganha borda dourada e um ponto dourado viaja até o hub, que pulsa. A linha entra na caixa de entrada à direita.

### Sequência de Follow-up (assinatura)
Seção `#follow-up`, logo depois do vazamento, escrita pra dono de pequeno negócio entender em segundos. Painel `#262625` com fio Faint e raio 18px: cabeçalho com a cliente e uma pill ("Sem resposta" em creme a 8%, vira "Respondeu" em dourado sólido) e, embaixo, uma trilha de 3 colunas (Terça, Quarta, Sexta) presa num eixo de 2px que se preenche em dourado. Cada coluna tem uma frase curta em dourado explicando o que aconteceu e a bolha verde do WhatsApp, que entra 0,7s depois da frase; a resposta da cliente aparece na última coluna com fio dourado. Ritmo lento de propósito (6,5s por retomada) pra dar tempo de ler. Abaixo de 980px a trilha vira vertical. Fecha com três pontos simples em linha (No tempo certo, Sem repetir, Sem incomodar) com fio Hair Gold. Estilos em `src/sdr/follow.css`.

### Faixa de Destaque (assinatura)
Ver The Highlighter Strip Rule. Usada no H1 ("fechando venda"), no título do vazamento, no título do follow-up ("No ponto em que parou.") e no título final.

### FAQ
`details` nativo com fios Faint em cima e embaixo, pergunta em Title, ícone de mais dourado que gira 45° ao abrir; resposta em Body Muted com máx. 62ch.

## Do's and Don'ts

### Do:
- **Do** usar o dourado (`#ddc28d`) só para ação, conexão, desfecho e a faixa da frase-chave.
- **Do** colocar Royal Blue (`#11224e`) como campo de seção inteiro e descer painéis internos para Blue Deep (`#0b1735`).
- **Do** separar linhas de lista com fios de 1px (creme a 12% ou dourado a 30%) em vez de cards com sombra.
- **Do** desenhar interfaces simuladas com as cores e a fonte de sistema do produto real e rotular cada uma com legenda "simulado/fictício" logo abaixo.
- **Do** animar com `cubic-bezier(0.16, 1, 0.3, 1)`, pausar fora da tela e mostrar o estado final parado com `prefers-reduced-motion`.
- **Do** manter caixa alta com tracking só em Inter (botões, nav, rótulos).

### Don't:
- **Don't** usar dourado como fundo de seção ou em mais de uma faixa por título.
- **Don't** pôr sombra em texto, listas, passos ou FAQ; sombra é de objeto físico.
- **Don't** levar as cores de WhatsApp, Instagram ou Google para fora das demonstrações.
- **Don't** usar travessão (— ou –) em texto visível.
- **Don't** usar emoji como elemento gráfico; emoji só dentro de mensagens simuladas.
- **Don't** usar gradientes decorativos; o único gradiente da marca é o que desenha a faixa de destaque.
