import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, CheckCheck, FileText, Mic, Paperclip, Phone, Video } from 'lucide-react';
import { BrandIcon, useInView, usePrefersReducedMotion } from '../shared';

type ChatItem =
  | { from: 'lead' | 'agent'; kind: 'text'; text: string; time: string }
  | { from: 'agent'; kind: 'pix'; text: string; time: string }
  | { from: 'lead'; kind: 'receipt'; time: string };

/* Conversa simulada. Clínica, nomes e valores são fictícios. */
const SCRIPT: ChatItem[] = [
  { from: 'lead', kind: 'text', time: '23:47', text: 'Oi! Vi o anúncio de vocês no Instagram. Quanto tá o botox?' },
  { from: 'agent', kind: 'text', time: '23:47', text: 'Oi, Mariana! Aqui é a Bia, da Clínica Aurora. Pra te passar o valor certinho: é a sua primeira vez ou você já fez antes?' },
  { from: 'lead', kind: 'text', time: '23:48', text: 'Primeira vez. Queria suavizar essas linhas da testa' },
  { from: 'agent', kind: 'text', time: '23:48', text: 'Ótimo, é um dos procedimentos que mais fazemos aqui. Testa e entre as sobrancelhas fica R$ 890, com o retorno de 15 dias pra ajuste incluso.' },
  { from: 'lead', kind: 'text', time: '23:49', text: 'Hmm, achei um pouco salgado 😅' },
  { from: 'agent', kind: 'text', time: '23:49', text: 'Entendo! Dá pra fazer em 6x de R$ 148,33 sem juros. E na avaliação a Dra. Paula te mostra o resultado esperado antes de você decidir qualquer coisa.' },
  { from: 'lead', kind: 'text', time: '23:50', text: 'Ah, assim fica bom. Tem horário essa semana?' },
  { from: 'agent', kind: 'text', time: '23:50', text: 'Tenho quinta às 14h ou sexta às 10h30. Qual fica melhor pra você?' },
  { from: 'lead', kind: 'text', time: '23:51', text: 'Sexta 10h30' },
  { from: 'agent', kind: 'pix', time: '23:51', text: 'Fechado! Pra segurar o horário, o sinal é de R$ 100, abatido no dia. Segue o Pix:' },
  { from: 'lead', kind: 'receipt', time: '23:52' },
  { from: 'agent', kind: 'text', time: '23:52', text: 'Pagamento confirmado. Sexta, 10h30, com a Dra. Paula. Te mando um lembrete na quinta à tarde. Até lá!' },
];

export const NOTES: { at: number; text: string }[] = [
  { at: 1, text: 'Respondeu na hora, às 23:47' },
  { at: 3, text: 'Qualificou antes de falar preço' },
  { at: 5, text: 'Contornou a objeção de valor' },
  { at: 7, text: 'Conduziu pro agendamento' },
  { at: 10, text: 'Cobrou o sinal no Pix' },
  { at: 11, text: 'Moveu o card pra Vendido' },
];

const lengthOf = (item: ChatItem) => ('text' in item ? item.text.length : 40);

function typingMs(item: ChatItem) {
  return Math.min(3000, Math.max(1400, lengthOf(item) * 20));
}

/* Time to read the message already on screen before the next beat starts. */
function readMs(item: ChatItem | undefined) {
  if (!item) return 1200;
  return Math.min(7000, Math.max(1800, lengthOf(item) * 55));
}

export function useChatPlayback(active: boolean, reduced: boolean) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(SCRIPT.length);
      setTyping(false);
      return;
    }
    if (!active) return;
    let t: number;
    if (count >= SCRIPT.length) {
      t = window.setTimeout(() => {
        setResetting(true);
        t = window.setTimeout(() => {
          setCount(0);
          setResetting(false);
        }, 600);
      }, 9000);
      return () => window.clearTimeout(t);
    }
    const next = SCRIPT[count];
    const prev = SCRIPT[count - 1];
    if (next.from === 'agent') {
      if (!typing) t = window.setTimeout(() => setTyping(true), readMs(prev));
      else
        t = window.setTimeout(() => {
          setTyping(false);
          setCount((c) => c + 1);
        }, typingMs(next));
    } else {
      t = window.setTimeout(() => setCount((c) => c + 1), readMs(prev));
    }
    return () => window.clearTimeout(t);
  }, [count, typing, active, reduced]);

  const activeNote = NOTES.reduce((acc, n, i) => (count > n.at ? i : acc), -1);
  return { count, typing, resetting, activeNote, done: count >= SCRIPT.length };
}

function Bubble({ item, first }: { item: ChatItem; first: boolean }) {
  const mine = item.from === 'agent';
  return (
    <div className={`wa-row ${mine ? 'is-out' : 'is-in'} ${first ? 'is-first' : ''}`}>
      <div className="wa-bubble">
        {mine && first && <span className="wa-sender">Bia · agente IA</span>}
        {item.kind === 'receipt' ? (
          <div className="wa-doc">
            <span className="wa-doc-icon">
              <FileText size={18} />
            </span>
            <span>
              <strong>comprovante-pix.pdf</strong>
              <small>R$ 100,00 · 1 página</small>
            </span>
          </div>
        ) : (
          <p>{item.text}</p>
        )}
        {item.kind === 'pix' && (
          <div className="wa-pix">
            <span className="wa-pix-label">Pix copia e cola</span>
            <strong>R$ 100,00</strong>
            <span className="wa-pix-sub">Clínica Aurora · sinal da avaliação</span>
            <span className="wa-pix-code">00020126580014br.gov.bcb.pix…</span>
          </div>
        )}
        <span className="wa-meta">
          {item.time}
          {mine && <CheckCheck size={15} className="wa-ticks" />}
        </span>
      </div>
    </div>
  );
}

export default function ChatDemo({ onProgress }: { onProgress?: (note: number, done: boolean) => void }) {
  const reduced = usePrefersReducedMotion();
  const [wrapRef, inView] = useInView<HTMLDivElement>(0.35);
  const { count, typing, resetting, activeNote, done } = useChatPlayback(inView, reduced);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onProgress?.(activeNote, done);
  }, [activeNote, done, onProgress]);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTo({ top: body.scrollHeight, behavior: reduced || count === 0 ? 'auto' : 'smooth' });
  }, [count, typing, reduced]);

  const shown = SCRIPT.slice(0, count);

  return (
    <div className="phone-wrap" ref={wrapRef}>
      <div className="phone" role="img" aria-label="Conversa simulada no WhatsApp: o agente de IA responde a cliente às 23h47, explica o valor do procedimento, contorna a objeção de preço, agenda a avaliação e recebe o sinal no Pix.">
        <div className="phone-notch" aria-hidden="true" />
        <div className="wa" aria-hidden="true">
          <div className="wa-status">
            <span>23:52</span>
            <span className="wa-status-icons">
              <i /> <i /> <i />
            </span>
          </div>
          <header className="wa-head">
            <ArrowLeft size={18} />
            <span className="wa-avatar">MC</span>
            <span className="wa-who">
              <strong>Mariana Costa</strong>
              <small>{typing ? 'Bia está respondendo…' : 'veio do anúncio · Instagram'}</small>
            </span>
            <span className="wa-head-actions">
              <Video size={18} />
              <Phone size={16} />
            </span>
          </header>
          <div className={`wa-body ${resetting ? 'is-resetting' : ''}`} ref={bodyRef}>
            <div className="wa-day">Hoje</div>
            <div className="wa-sys">
              <BrandIcon name="instagram" size={12} />
              Conversa iniciada pelo anúncio “Avaliação gratuita”
            </div>
            {shown.map((item, i) => (
              <Bubble key={i} item={item} first={i === 0 || SCRIPT[i - 1].from !== item.from} />
            ))}
            {typing && (
              <div className="wa-row is-out is-first">
                <div className="wa-bubble wa-typing">
                  <span className="wa-sender">Bia · agente IA</span>
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            )}
          </div>
          <footer className="wa-input">
            <span className="wa-field">
              <Paperclip size={16} />
              Mensagem
            </span>
            <span className="wa-mic">
              <Mic size={17} />
            </span>
          </footer>
        </div>
        <div className={`phone-toast ${done && !resetting ? 'is-on' : ''}`} aria-hidden="true">
          <span className="phone-toast-icon">
            <Check size={16} strokeWidth={3} />
          </span>
          <span>
            <strong>Avaliação agendada</strong>
            <small>Sinal de R$ 100 recebido · card movido pra Vendido</small>
          </span>
        </div>
      </div>
      <p className="phone-caption">Conversa simulada. Clínica, nomes e valores fictícios.</p>
    </div>
  );
}
