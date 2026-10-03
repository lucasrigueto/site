import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CalendarCheck, CircleDollarSign, MessageCircleMore, RefreshCw, Sparkles } from 'lucide-react';
import { BrandIcon, useInView, usePrefersReducedMotion } from '../shared';
import type { Brand } from '../brandPaths';

const COLUMNS = ['Novo contato', 'Em conversa', 'Agendado', 'Vendido'] as const;
const CAP = [4, 4, 3, 3];

const NAMES = ['Mariana C.', 'Rafael S.', 'Carol M.', 'Júlia A.', 'Pedro L.', 'Ana P.', 'Bruno T.', 'Lívia R.', 'Fernanda O.', 'Gustavo N.', 'Beatriz F.', 'Marcos V.', 'Patrícia D.', 'Renata G.', 'Diego M.', 'Sofia B.'];
const INTERESTS = [
  { t: 'Botox', v: 890 },
  { t: 'Harmonização facial', v: 2400 },
  { t: 'Limpeza de pele', v: 220 },
  { t: 'Bioestimulador', v: 1800 },
  { t: 'Preenchimento labial', v: 1200 },
  { t: 'Peeling químico', v: 350 },
];
const CHANNELS: Brand[] = ['whatsapp', 'instagram', 'whatsapp', 'messenger', 'instagram'];
const SLOTS = ['Qui 14h', 'Sex 10h30', 'Seg 9h', 'Ter 16h', 'Qua 11h', 'Sáb 9h30'];

type Card = { id: number; col: number; name: string; interest: (typeof INTERESTS)[number]; ch: Brand; slot: string; idle: number; leaving?: boolean };

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function makeCard(id: number, col = 0): Card {
  return {
    id,
    col,
    name: NAMES[id % NAMES.length],
    interest: INTERESTS[(id * 7) % INTERESTS.length],
    ch: CHANNELS[id % CHANNELS.length],
    slot: SLOTS[id % SLOTS.length],
    idle: 0,
  };
}

const SEED: Card[] = [
  makeCard(1, 0),
  makeCard(2, 0),
  makeCard(3, 1),
  makeCard(4, 1),
  { ...makeCard(5, 1), idle: 3 },
  makeCard(6, 2),
  makeCard(7, 2),
  makeCard(8, 3),
];

/* One step of the simulated pipeline: new contacts arrive, cards advance on their own. */
function step(cards: Card[], nextId: () => number): Card[] {
  const live = cards.filter((c) => !c.leaving);
  const count = (col: number) => live.filter((c) => c.col === col).length;
  let next = cards.filter((c) => !c.leaving).map((c) => ({ ...c, idle: c.idle + 1 }));

  const r = Math.random();
  const wantNew = count(0) < 2 || (r < 0.38 && count(0) < CAP[0]);
  if (wantNew) {
    next = [makeCard(nextId(), 0), ...next];
  } else {
    // Move the longest-waiting card from the furthest column that can advance.
    for (const col of [2, 1, 0]) {
      const target = col + 1;
      if (target < 3 && count(target) >= CAP[target]) continue;
      const pool = next.filter((c) => c.col === col);
      if (!pool.length || (col === 2 && Math.random() < 0.35 && count(1) > 1)) continue;
      const mover = pool[pool.length - 1];
      next = next.filter((c) => c !== mover);
      next = [{ ...mover, col: target, idle: 0 }, ...next];
      break;
    }
  }

  // Overflowing "Venda fechada" drops its oldest card.
  const won = next.filter((c) => c.col === 3);
  if (won.length > CAP[3]) {
    const oldest = won[won.length - 1];
    next = next.map((c) => (c === oldest ? { ...c, leaving: true } : c));
  }
  return next;
}

function tagFor(c: Card) {
  if (c.col === 0)
    return (
      <span className="kc-tag">
        <Sparkles size={12} /> IA respondeu
      </span>
    );
  if (c.col === 1)
    return c.idle >= 3 ? (
      <span className="kc-tag is-follow">
        <RefreshCw size={12} /> Retomada {Math.min(c.idle - 2, 3)} de 3
      </span>
    ) : (
      <span className="kc-tag">
        <MessageCircleMore size={12} /> Qualificando
      </span>
    );
  if (c.col === 2)
    return (
      <span className="kc-tag">
        <CalendarCheck size={12} /> {c.slot}
      </span>
    );
  return (
    <span className="kc-tag is-won">
      <CircleDollarSign size={12} /> {brl(c.interest.v)} · pago
    </span>
  );
}

export default function Kanban() {
  const reduced = usePrefersReducedMotion();
  const [boardRef, inView] = useInView<HTMLDivElement>(0.3);
  const [cards, setCards] = useState<Card[]>(SEED);
  const idRef = useRef(9);
  const els = useRef(new Map<number, HTMLElement>());
  const rects = useRef(new Map<number, { x: number; y: number }>());

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setCards((c) => step(c, () => idRef.current++)), 1600);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  // Drop cards whose exit transition has finished.
  useEffect(() => {
    if (!cards.some((c) => c.leaving)) return;
    const t = window.setTimeout(() => setCards((c) => c.filter((x) => !x.leaving)), 420);
    return () => window.clearTimeout(t);
  }, [cards]);

  // FLIP: animate every card from where it was to where it is now.
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const origin = board.getBoundingClientRect();
    const nextRects = new Map<number, { x: number; y: number }>();
    els.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      const pos = { x: r.left - origin.left, y: r.top - origin.top };
      nextRects.set(id, pos);
      if (reduced) return;
      const prev = rects.current.get(id);
      if (!prev) {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(-18px) scale(0.94)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        );
        return;
      }
      const dx = prev.x - pos.x;
      const dy = prev.y - pos.y;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      const moved = Math.abs(dx) > 40;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)${moved ? ' rotate(-1.5deg) scale(1.03)' : ''}`, zIndex: moved ? 3 : 1 },
          { transform: 'none', zIndex: moved ? 3 : 1 },
        ],
        { duration: moved ? 760 : 480, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    });
    rects.current = nextRects;
  }, [cards, reduced, boardRef]);

  const live = cards.filter((c) => !c.leaving);
  const wonTotal = live.filter((c) => c.col === 3).reduce((s, c) => s + c.interest.v, 0);

  return (
    <section className="funnel" id="funil" aria-labelledby="funnel-title">
      <div className="wrap funnel-grid">
        <div className="funnel-copy">
          <h2 id="funnel-title" className="headline">
            O funil se atualiza enquanto o agente conversa.
          </h2>
          <p>
            Chegou mensagem, nasce um card. Qualificou, agendou, pagou: o card muda de coluna sem ninguém arrastar. Você
            abre o painel e sabe na hora quem está perto de comprar e quem precisa de um empurrão.
          </p>
          <ul className="ticks">
            <li>Quem parou de responder entra na cadência de retomada sozinho</li>
            <li>Cada card mostra o interesse, a origem e o anúncio que trouxe</li>
            <li>Agendamento entra direto na sua agenda</li>
          </ul>
        </div>

        <div className="board-wrap">
          <div className="board" ref={boardRef} aria-label="Funil de vendas simulado se atualizando sozinho" role="img">
            {COLUMNS.map((title, col) => {
              const colCards = live.filter((c) => c.col === col).concat(cards.filter((c) => c.leaving && c.col === col));
              return (
                <div className={`board-col ${col === 3 ? 'is-won' : ''}`} key={title} aria-hidden="true">
                  <div className="board-col-head">
                    <strong>{title}</strong>
                    <span>{col === 3 ? brl(wonTotal) : live.filter((c) => c.col === col).length}</span>
                  </div>
                  <div className="board-col-body">
                    {colCards.map((c) => (
                      <article
                        key={c.id}
                        className={`kc ${c.col === 3 ? 'is-won' : ''} ${c.leaving ? 'is-leaving' : ''}`}
                        ref={(el) => {
                          if (el) els.current.set(c.id, el);
                          else els.current.delete(c.id);
                        }}
                      >
                        <div className="kc-top">
                          <span className="kc-ch">
                            <BrandIcon name={c.ch} size={13} />
                          </span>
                          <strong>{c.name}</strong>
                        </div>
                        <span className="kc-interest">{c.interest.t}</span>
                        {tagFor(c)}
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="board-caption">Funil simulado, rodando em tempo real. Nomes e valores fictícios.</p>
        </div>
      </div>
    </section>
  );
}
