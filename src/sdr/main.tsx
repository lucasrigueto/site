import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './sdr.css';
import './follow.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Leak from './components/Leak';
import FollowUp from './components/FollowUp';
import Omnichannel from './components/Omnichannel';
import Kanban from './components/Kanban';
import Traffic from './components/Traffic';
import { Faq, FinalCta, Footer, Process, StickyCta } from './components/Closing';

function App() {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Leak />
        <FollowUp />
        <Omnichannel />
        <Kanban />
        <Traffic />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
