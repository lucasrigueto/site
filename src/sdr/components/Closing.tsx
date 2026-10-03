import { useEffect, useState } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';
import { BrandIcon, WHATSAPP, WhatsAppButton } from '../shared';

const STEPS = [
  {
    title: 'Diagnóstico',
    text: 'Uma conversa pra entender o que você vende, como atende hoje e em que ponto as vendas escapam.',
  },
  {
    title: 'Treinamento do agente',
    text: 'Montamos o agente com seus preços, perguntas frequentes, objeções e o jeito de falar da sua marca.',
  },
  {
    title: 'Conexão dos canais',
    text: 'Ligamos WhatsApp, Instagram e os outros canais ao funil e à agenda, e testamos tudo com você.',
  },
  {
    title: 'Tráfego e ajuste fino',
    text: 'Campanhas no ar e acompanhamento das conversas toda semana pra afinar o agente e os anúncios.',
  },
];

const FAQ = [
  {
    q: 'O cliente percebe que está falando com uma IA?',
    a: 'O agente escreve no tom da sua marca e responde com contexto, sem aquele jeito de robô de menu numerado. Mesmo assim, a gente recomenda transparência: dá pra apresentar como assistente virtual, e o cliente pode pedir pra falar com alguém da equipe quando quiser.',
  },
  {
    q: 'E quando o agente não souber responder?',
    a: 'Ele passa a conversa pra sua equipe com um resumo do que já foi falado e avisa o cliente que alguém vai assumir. Ninguém fica sem resposta e ninguém precisa repetir a história.',
  },
  {
    q: 'Preciso trocar o número do WhatsApp?',
    a: 'Dá pra usar o número que a empresa já tem. No diagnóstico a gente explica como fica a conexão e o que muda no dia a dia da sua equipe.',
  },
  {
    q: 'Funciona pro meu tipo de negócio?',
    a: 'Funciona melhor pra quem vende pelo WhatsApp e recebe perguntas que se repetem: clínicas, consultórios, escolas e cursos, imobiliárias, prestadores de serviço com agenda. Se o seu caso for diferente, a gente conversa e te fala com sinceridade se faz sentido.',
  },
  {
    q: 'Preciso contratar o tráfego junto?',
    a: 'Não precisa. Se você já tem bastante conversa chegando, o agente sozinho resolve muita coisa. Quando o volume ainda é baixo, o tráfego é o que dá trabalho pro agente.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende dos canais, do volume de conversas e de o tráfego entrar junto ou não. Chama no WhatsApp, conta como funciona a sua operação e a gente te passa um valor fechado.',
  },
];

export function Process() {
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="wrap">
        <h2 id="process-title" className="headline">
          Do primeiro papo ao agente no ar.
        </h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="steps-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <h2 id="faq-title" className="headline">
          Perguntas que a gente mais ouve.
        </h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const PREFILL = 'Olá, vim pelo site da Rigueto e quero conversar sobre tráfego e automação para o meu negócio.';

export function FinalCta() {
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(PREFILL.length);
      return;
    }
    const el = document.getElementById('fale');
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let n = 0;
        timer = window.setInterval(() => {
          n += 2;
          setTyped(Math.min(n, PREFILL.length));
          if (n >= PREFILL.length) window.clearInterval(timer);
        }, 28);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="final" id="fale" aria-labelledby="final-title">
      <div className="wrap final-grid">
        <div>
          <h2 id="final-title" className="display display-sm">
            Bora ver como fica o <span className="strip">seu agente</span>?
          </h2>
          <p className="lede">
            Chama no WhatsApp e conta como você vende hoje. A gente te mostra como ficariam o agente, os canais e as
            campanhas pro seu negócio.
          </p>
          <WhatsAppButton className="btn-lg">Chamar no WhatsApp</WhatsAppButton>
          <p className="final-note">Dessa vez quem responde é gente, em horário comercial.</p>
        </div>
        <a className="compose" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Abrir conversa com a Rigueto no WhatsApp com a mensagem pronta">
          <span className="compose-head">
            <img src="/sdr/icone-r.png" alt="" width="28" height="28" />
            <span>
              <strong>Rigueto Consultoria</strong>
              <small>
                <BrandIcon name="whatsapp" size={11} /> WhatsApp
              </small>
            </span>
          </span>
          <span className="compose-field">
            <span className="compose-text">
              {PREFILL.slice(0, typed)}
              <i className="compose-caret" aria-hidden="true" />
            </span>
            <span className="compose-send" aria-hidden="true">
              <SendHorizontal size={18} />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <img src="/sdr/logo-rigueto.png" alt="Rigueto Consultoria" width="120" height="32" />
        <p>Agente de atendimento com IA, automações e tráfego pago.</p>
        <a href="https://www.instagram.com/riguetoconsultoria" target="_blank" rel="noopener noreferrer">
          <BrandIcon name="instagram" size={16} /> @riguetoconsultoria
        </a>
        <small>© {new Date().getFullYear()} Rigueto Consultoria</small>
      </div>
    </footer>
  );
}

export function StickyCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const final = document.getElementById('fale');
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const atFinal = final ? final.getBoundingClientRect().top < window.innerHeight : false;
      setOn(pastHero && !atFinal);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-cta ${on ? 'is-on' : ''}`} aria-hidden={!on}>
      <WhatsAppButton className="btn-block">Quero um agente desses</WhatsAppButton>
    </div>
  );
}
