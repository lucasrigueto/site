import { useEffect, useState } from 'react';
import { WhatsAppButton } from '../shared';

const LINKS = [
  { href: '#agente', label: 'Agente' },
  { href: '#follow-up', label: 'Follow-up' },
  { href: '#canais', label: 'Canais' },
  { href: '#funil', label: 'Funil' },
  { href: '#trafego', label: 'Tráfego' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo" aria-label="Rigueto Consultoria, voltar ao topo">
          <img src="/sdr/logo-rigueto.png" alt="Rigueto Consultoria" width="140" height="37" />
        </a>
        <nav aria-label="Seções">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton className="btn-sm">Falar no WhatsApp</WhatsAppButton>
      </div>
    </header>
  );
}
