import { useCallback, useState } from 'react';
import { ArrowDown, Check } from 'lucide-react';
import ChatDemo, { NOTES } from './ChatDemo';
import { WhatsAppButton } from '../shared';

export default function Hero() {
  const [note, setNote] = useState(-1);
  const onProgress = useCallback((n: number) => setNote(n), []);

  return (
    <section className="hero" id="agente">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="display">
            Seu WhatsApp respondendo, qualificando e <span className="strip">fechando venda</span> às 23h47.
          </h1>
          <p className="lede">
            A Rigueto monta um agente de IA que atende como o seu melhor vendedor e cuida do tráfego que traz gente
            interessada até ele. Tudo ligado ao seu funil, com a sua equipe entrando só quando faz diferença.
          </p>
          <div className="hero-actions">
            <WhatsAppButton>Quero um agente desses</WhatsAppButton>
            <a className="btn btn-line" href="#canais">
              <ArrowDown size={18} />
              <span>Ver como funciona</span>
            </a>
          </div>
          <ul className="hero-facts">
            <li>Atende 24 horas, todos os dias</li>
            <li>WhatsApp, Instagram e Facebook</li>
            <li>Tráfego no Meta e no Google</li>
          </ul>
        </div>

        <div className="hero-demo">
          <ChatDemo onProgress={onProgress} />
          <ol className="notes" aria-label="O que o agente fez nessa conversa">
            {NOTES.map((n, i) => (
              <li key={n.at} className={i < note ? 'is-done' : i === note ? 'is-active' : ''}>
                <span className="notes-dot" aria-hidden="true">
                  <Check size={11} strokeWidth={3} />
                </span>
                {n.text}
              </li>
            ))}
          </ol>
          <p className="notes-live" aria-hidden="true">
            {note >= 0 ? NOTES[note].text : 'Mensagem nova às 23:47'}
          </p>
        </div>
      </div>
    </section>
  );
}
