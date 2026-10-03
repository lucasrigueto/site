import { Bookmark, ChevronRight, Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { BrandIcon, useInView } from '../shared';

function InstagramAd() {
  return (
    <figure className="ig-ad" aria-hidden="true">
      <header>
        <span className="ig-avatar">CA</span>
        <span className="ig-who">
          <strong>clinicaaurora</strong>
          <small>Patrocinado</small>
        </span>
        <MoreHorizontal size={18} />
      </header>
      <div className="ig-creative">
        <strong>
          Linhas de expressão?
          <br />
          Avaliação gratuita.
        </strong>
        <span className="ig-creative-foot">
          <span>Botox em até 6x sem juros</span>
          <span>Clínica Aurora</span>
        </span>
      </div>
      <div className="ig-cta">
        <BrandIcon name="whatsapp" size={16} />
        <span>Enviar mensagem</span>
        <ChevronRight size={16} />
        <span className="ig-tap" />
      </div>
      <div className="ig-icons">
        <Heart size={20} />
        <MessageCircle size={20} />
        <Send size={19} />
        <Bookmark size={19} className="ig-save" />
      </div>
      <div className="ig-pop">
        <BrandIcon name="whatsapp" size={13} />
        Oi! Vi o anúncio de vocês no Instagram…
      </div>
    </figure>
  );
}

function GoogleAd() {
  return (
    <figure className="g-ad" aria-hidden="true">
      <div className="g-query">botox bh preço</div>
      <div className="g-result">
        <span className="g-sponsored">Patrocinado</span>
        <span className="g-site">
          <span className="g-fav">A</span>
          <span>
            Clínica Aurora
            <small>clinicaaurora.com.br</small>
          </span>
        </span>
        <strong className="g-title">Botox em BH | Avaliação gratuita | Parcele em 6x</strong>
        <p>Converse com a gente pelo WhatsApp e agende sua avaliação ainda hoje, inclusive à noite.</p>
        <span className="g-links">
          <span>Chamar no WhatsApp</span>
          <span>Procedimentos</span>
          <span>Como chegar</span>
        </span>
      </div>
    </figure>
  );
}

export default function Traffic() {
  const [adsRef, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="traffic" id="trafego" aria-labelledby="traffic-title">
      <div className="wrap traffic-grid">
        <div className={`ads ${inView ? 'is-live' : ''}`} ref={adsRef}>
          <InstagramAd />
          <GoogleAd />
          <p className="ads-caption">Anúncios ilustrativos de uma clínica fictícia.</p>
        </div>
        <div className="traffic-copy">
          <h2 id="traffic-title" className="headline">
            Agente bom precisa de conversa chegando.
          </h2>
          <p>
            O mesmo time que monta o agente cuida dos seus anúncios. As campanhas são pensadas pra gerar conversa no
            WhatsApp com quem tem perfil de comprar, e a gente acompanha cada uma até a venda no funil.
          </p>
          <ul className="traffic-list">
            <li>
              <span className="traffic-ico">
                <BrandIcon name="meta" size={16} />
              </span>
              <span>
                <strong>Meta Ads</strong>
                Campanhas de mensagem no Instagram e no Facebook, com criativo e público testados toda semana.
              </span>
            </li>
            <li>
              <span className="traffic-ico">
                <BrandIcon name="googleads" size={16} />
              </span>
              <span>
                <strong>Google Ads</strong>
                Pra aparecer na hora em que a pessoa já está procurando o que você vende.
              </span>
            </li>
            <li>
              <span className="traffic-ico traffic-ico-r">
                <img src="/sdr/icone-r.png" alt="" width="18" height="18" />
              </span>
              <span>
                <strong>Anúncio que aprende com a venda</strong>
                O que o agente fecha volta pro Meta como conversão, e as campanhas passam a buscar mais gente parecida
                com quem compra.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
