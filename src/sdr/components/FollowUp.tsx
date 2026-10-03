import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useInView, usePrefersReducedMotion } from '../shared';

/*
  Simulated follow-up. One beat per phase, slow enough to read:
  0 last message · 1 day passes · 2 retomada 1 · 3 days pass · 4 retomada 2 · 5 client replies · 6 hold
*/
const DURATIONS = [4200, 1600, 6500, 1600, 6500, 4500, 7000];
const LAST = DURATIONS.length - 1;

const STEPS = [
  {
    day: 'Terça, 14h',
    note: 'Bia mandou o valor e ficou sem resposta',
    text: 'Com o parcelamento fica 10x de R$ 240. Quer que eu veja um horário de avaliação pra você?',
    at: 0,
  },
  {
    day: 'Quarta, 10h',
    note: 'Um dia sem resposta. Bia chama de novo',
    text: 'Oi, Carol! Ontem te passei os valores da harmonização. Ficou alguma dúvida?',
    at: 2,
  },
  {
    day: 'Sexta, 10h',
    note: 'Ainda nada. Bia tenta outro caminho',
    text: 'A Dra. Paula abriu dois horários de avaliação na terça. Quer que eu segure um pra você?',
    at: 4,
  },
];

function useSequence(active: boolean, reduced: boolean) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (reduced) {
      setPhase(LAST);
      return;
    }
    if (!active) return;
    const t = window.setTimeout(() => setPhase((p) => (p >= LAST ? 0 : p + 1)), DURATIONS[phase]);
    return () => window.clearTimeout(t);
  }, [phase, active, reduced]);
  return phase;
}

export default function FollowUp() {
  const reduced = usePrefersReducedMotion();
  const [demoRef, inView] = useInView<HTMLDivElement>(0.3);
  const p = useSequence(inView, reduced);

  const replied = p >= 5;
  const filled = (p >= 1 ? 1 : 0) + (p >= 3 ? 1 : 0);

  return (
    <section className="follow" id="follow-up" aria-labelledby="follow-title">
      <div className="wrap">
        <div className="follow-head">
          <h2 id="follow-title" className="display display-sm">
            Quem parou de responder volta a ser chamado. <span className="strip strip-late">No ponto em que parou.</span>
          </h2>
          <p className="follow-intro">
            No WhatsApp, quem não responde some no meio das conversas e ninguém lembra de chamar de novo. O agente
            lembra. E cada mensagem continua a conversa de onde ela parou.
          </p>
        </div>

        <div
          className="seq"
          ref={demoRef}
          role="img"
          aria-label="Exemplo simulado: a cliente Carol para de responder depois de receber o valor. Um dia depois o agente chama de novo, dois dias depois tenta outro caminho, e ela responde querendo agendar."
        >
          <div className="seq-top" aria-hidden="true">
            <span className="seq-contact">
              <span className="seq-avatar">CM</span>
              <span>
                <strong>Carol</strong>
                <small>Perguntou o preço da harmonização</small>
              </span>
            </span>
            <span className={`seq-state${replied ? ' is-replied' : ''}`}>
              {replied ? (
                <>
                  <Check size={14} strokeWidth={3} /> Respondeu
                </>
              ) : (
                'Sem resposta'
              )}
            </span>
          </div>

          <div className="seq-trackwrap" aria-hidden="true">
            <span className="seq-axis" style={{ ['--fill' as string]: filled / 2 }} />
            <ol className="seq-track">
              {STEPS.map((s, i) => {
                const shown = p >= s.at;
                return (
                  <li key={s.day} className={`seq-col${shown ? ' is-on' : ''}`}>
                    <span className="seq-node">
                      <span className="seq-day">{s.day}</span>
                    </span>
                    <span className="seq-note">{s.note}</span>
                    <span className="seq-bubble is-out">{s.text}</span>
                    {i === 2 && (
                      <span className={`seq-bubble is-in${replied ? ' is-on' : ''}`}>Quero! Terça de manhã dá?</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="seq-caption">Exemplo simulado. Nomes e valores fictícios.</p>
        </div>

        <ul className="follow-points">
          <li>
            <strong>No tempo certo.</strong> Chama de novo depois de 1, 3 e 5 dias, sempre em horário comercial.
          </li>
          <li>
            <strong>Sem repetir.</strong> Cada mensagem é escrita pra aquela conversa, nunca um texto pronto igual pra
            todo mundo.
          </li>
          <li>
            <strong>Sem incomodar.</strong> Se o cliente responde, compra ou pede pra parar, as mensagens param na hora.
          </li>
        </ul>
      </div>
    </section>
  );
}
