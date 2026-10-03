const LOST = [
  { time: '21:12', text: 'Mandou mensagem perguntando o preço.' },
  { time: '21:20', text: 'Sem resposta. Abriu o perfil de outra clínica.' },
  { time: '21:31', text: 'Mandou a mesma pergunta pra lá. Responderam em dois minutos.' },
  { time: '08:40', text: 'Sua equipe chegou e respondeu: “Bom dia! Ainda tem interesse?”' },
  { time: '08:41', text: 'Visualizou. Já tinha agendado com o concorrente.' },
];

export default function Leak() {
  return (
    <section className="leak" aria-labelledby="leak-title">
      <div className="wrap leak-grid">
        <div className="leak-copy">
          <h2 id="leak-title" className="headline">
            Quanto tempo o seu cliente espera depois de mandar <span className="strip strip-late">“oi”</span>?
          </h2>
          <p>
            Venda pelo WhatsApp tem prazo de validade curto. Quem pergunta preço às nove da noite está decidindo às
            nove da noite, e costuma fechar com quem responde primeiro.
          </p>
          <p>
            O agente responde na hora, de madrugada, no domingo e no feriado. E quando o cliente some no meio da
            conversa, é ele quem vai atrás.
          </p>
        </div>
        <ol className="lost" aria-label="Linha do tempo de uma venda perdida">
          {LOST.map((l, i) => (
            <li key={l.time} className={i === LOST.length - 1 ? 'is-last' : ''}>
              <time>{l.time}</time>
              <span>{l.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
