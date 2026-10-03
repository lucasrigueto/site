import { useEffect, useRef, useState } from 'react';
import { Globe, Sparkles, UserRound } from 'lucide-react';
import { BrandIcon, useInView, usePrefersReducedMotion } from '../shared';
import type { Brand } from '../brandPaths';

type ChannelId = Brand | 'site';

const CHANNELS: { id: ChannelId; label: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'messenger', label: 'Messenger' },
  { id: 'site', label: 'Chat do site' },
  { id: 'gmail', label: 'E-mail' },
  { id: 'telegram', label: 'Telegram' },
];

const POOL: { ch: number; name: string; text: string; human?: boolean }[] = [
  { ch: 0, name: 'Rafael Souza', text: 'Vocês atendem no sábado?' },
  { ch: 1, name: '@carol.mendes', text: 'Quero saber da harmonização' },
  { ch: 3, name: 'Visitante do site', text: 'Tem estacionamento aí perto?' },
  { ch: 2, name: 'Júlia Andrade', text: 'Consigo parcelar no cartão?' },
  { ch: 0, name: 'Pedro Lima', text: 'Meu caso é mais delicado, posso mandar foto?', human: true },
  { ch: 4, name: 'Fernanda Oliveira', text: 'Orçamento do pacote de 3 sessões' },
  { ch: 1, name: '@bruno.tav', text: 'Vi o vídeo de vocês, tem vaga essa semana?' },
  { ch: 5, name: 'Ana Paula', text: 'Preciso remarcar pra terça' },
  { ch: 0, name: 'Lívia Rocha', text: 'Qual o valor da limpeza de pele?' },
  { ch: 2, name: 'Marcos Vieira', text: 'Vocês emitem nota fiscal?' },
];

type Row = { key: number; ch: number; name: string; text: string; human?: boolean };
type Dot = { key: number; ch: number; t0: number };

const FLIGHT = 1500; // ms channel -> hub
const HANDOFF = 500; // ms hub -> inbox

function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.innerWidth < 820);
  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 820);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return compact;
}

/* Geometry lives in a 0..100 box that stretches with the stage. */
function geometry(compact: boolean) {
  const n = CHANNELS.length;
  if (compact) {
    const hub = { x: 50, y: 33 };
    const nodes = CHANNELS.map((_, i) => ({ x: 8 + i * (84 / (n - 1)), y: 6 }));
    const paths = nodes.map((p) => `M ${p.x} ${p.y + 4} C ${p.x} ${p.y + 16}, ${hub.x} ${hub.y - 14}, ${hub.x} ${hub.y}`);
    return { hub, nodes, paths, out: `M ${hub.x} ${hub.y} L ${hub.x} 47` };
  }
  const hub = { x: 47, y: 50 };
  const nodes = CHANNELS.map((_, i) => ({ x: 0, y: 9 + i * (82 / (n - 1)) }));
  const paths = nodes.map((p) => `M 21 ${p.y} C 34 ${p.y}, 34 ${hub.y}, ${hub.x} ${hub.y}`);
  return { hub, nodes, paths, out: `M ${hub.x} ${hub.y} L 60 ${hub.y}` };
}

function ChannelGlyph({ id, size = 18 }: { id: ChannelId; size?: number }) {
  if (id === 'site') return <Globe size={size} strokeWidth={1.8} />;
  return <BrandIcon name={id} size={size} />;
}

const SEED_ROWS: Row[] = POOL.slice(0, 4).map((p, i) => ({ ...p, key: -i - 1 }));

export default function Omnichannel() {
  const compact = useCompact();
  const reduced = usePrefersReducedMotion();
  const [stageRef, inView] = useInView<HTMLDivElement>(0.3);
  const geo = geometry(compact);

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const outRef = useRef<SVGPathElement | null>(null);
  const dotEls = useRef(new Map<number, HTMLSpanElement>());

  const [rows, setRows] = useState<Row[]>(SEED_ROWS);
  const [dots, setDots] = useState<Dot[]>([]);
  const [pulse, setPulse] = useState<{ ch: number; n: number }>({ ch: -1, n: 0 });
  const [hubHits, setHubHits] = useState(0);
  const seq = useRef(SEED_ROWS.length);

  // Launch a message every ~1.9s while visible.
  useEffect(() => {
    if (!inView || reduced) return;
    const launch = () => {
      const k = seq.current++;
      const item = POOL[k % POOL.length];
      setDots((d) => [...d, { key: k, ch: item.ch, t0: performance.now() }]);
      setPulse((p) => ({ ch: item.ch, n: p.n + 1 }));
    };
    launch();
    const id = window.setInterval(launch, 1900);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  // Animate dots along their paths imperatively, settle into the inbox on arrival.
  useEffect(() => {
    if (!dots.length) return;
    let raf = 0;
    const tick = (now: number) => {
      const arrived: Dot[] = [];
      for (const d of dots) {
        const el = dotEls.current.get(d.key);
        const path = pathRefs.current[d.ch];
        const out = outRef.current;
        if (!el || !path || !out) continue;
        const t = now - d.t0;
        let pt: DOMPoint;
        if (t < FLIGHT) {
          const p = 1 - Math.pow(1 - t / FLIGHT, 2.2);
          pt = path.getPointAtLength(p * path.getTotalLength());
        } else if (t < FLIGHT + HANDOFF) {
          const p = (t - FLIGHT) / HANDOFF;
          pt = out.getPointAtLength(p * out.getTotalLength());
        } else {
          arrived.push(d);
          continue;
        }
        el.style.left = `${pt.x}%`;
        el.style.top = `${pt.y}%`;
        el.style.opacity = '1';
      }
      if (arrived.length) {
        setDots((all) => all.filter((x) => !arrived.includes(x)));
        setHubHits((h) => h + arrived.length);
        setRows((r) => {
          const add = arrived.map((d) => ({ ...POOL[d.key % POOL.length], key: d.key }));
          return [...add.reverse(), ...r].slice(0, 5);
        });
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dots]);

  return (
    <section className="omni" id="canais" aria-labelledby="omni-title">
      <div className="wrap">
        <div className="omni-head">
          <h2 id="omni-title" className="headline">
            Todo canal caindo numa caixa só.
          </h2>
          <p>
            WhatsApp, Instagram, Messenger, chat do site e e-mail entram na mesma tela. O agente responde em todos com o
            mesmo jeito de falar da sua marca, e a sua equipe enxerga o histórico inteiro de cada cliente, venha ele de
            onde vier.
          </p>
        </div>

        <div className={`omni-stage ${compact ? 'is-compact' : ''}`} ref={stageRef}>
          <svg className="omni-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {geo.paths.map((d, i) => (
              <path
                key={`${compact}-${i}`}
                d={d}
                ref={(el) => (pathRefs.current[i] = el)}
                className={pulse.ch === i ? 'is-hot' : ''}
              />
            ))}
            <path d={geo.out} ref={outRef} className="omni-out" />
          </svg>

          <ul className="omni-channels" aria-label="Canais conectados">
            {CHANNELS.map((c, i) => (
              <li
                key={c.id}
                style={{ left: `${geo.nodes[i].x}%`, top: `${geo.nodes[i].y}%` }}
                className={pulse.ch === i ? 'is-pulse' : ''}
                data-n={pulse.ch === i ? pulse.n : undefined}
              >
                <span className="omni-glyph">
                  <ChannelGlyph id={c.id} />
                </span>
                <span className="omni-label">{c.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="omni-hub"
            style={{ left: `${geo.hub.x}%`, top: `${geo.hub.y}%` }}
            key={hubHits}
            aria-hidden="true"
          >
            <img src="/sdr/icone-r.png" alt="" width="34" height="34" />
            <span>Agente</span>
          </div>

          {dots.map((d) => (
            <span
              key={d.key}
              className="omni-dot"
              aria-hidden="true"
              ref={(el) => {
                if (el) dotEls.current.set(d.key, el);
                else dotEls.current.delete(d.key);
              }}
            />
          ))}

          <div className="inbox" role="list" aria-label="Exemplo de caixa de entrada unificada">
            <div className="inbox-head" aria-hidden="true">
              <strong>Caixa de entrada</strong>
              <span className="inbox-tabs">
                <span className="is-on">Todas</span>
                <span>Com a IA</span>
                <span>Com a equipe</span>
              </span>
            </div>
            {rows.map((r) => (
              <div className="inbox-row" role="listitem" key={r.key}>
                <div className="inbox-row-inner">
                  <span className="inbox-ch" title={CHANNELS[r.ch].label}>
                    <ChannelGlyph id={CHANNELS[r.ch].id} size={15} />
                  </span>
                  <span className="inbox-main">
                    <strong>{r.name}</strong>
                    <span>{r.text}</span>
                  </span>
                  <span className={`inbox-status ${r.human ? 'is-human' : ''}`}>
                    {r.human ? <UserRound size={12} /> : <Sparkles size={12} />}
                    {r.human ? 'Com a equipe' : 'IA respondeu'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="omni-caption">Caixa de entrada simulada. Nomes fictícios.</p>

        <ul className="omni-points">
          <li>
            <strong>Um agente, todos os canais.</strong> Mesmas respostas, mesmo tom e as mesmas regras de venda em cada
            um deles.
          </li>
          <li>
            <strong>Passa pra equipe quando precisa.</strong> Caso delicado ou cliente pedindo gente? A conversa vai pra
            alguém do time com o resumo pronto.
          </li>
          <li>
            <strong>Histórico num lugar só.</strong> Quem chamou no Instagram e depois no WhatsApp continua sendo o mesmo
            cliente, com a mesma conversa.
          </li>
        </ul>
      </div>
    </section>
  );
}
