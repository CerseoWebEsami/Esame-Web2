import { Link } from 'react-router';

const STEPS = [
  { eyebrow: '01', title: 'Home', excerpt: "La porta d'ingresso del sito, pensata per capire subito dove andare." },
  { eyebrow: '02', title: 'Radar', excerpt: 'Le storie più vive del momento, pronte per essere aperte con un click.' },
  { eyebrow: '03', title: 'Focus', excerpt: 'La lettura completa di una story, con i commenti ordinati sotto.' },
  {
    eyebrow: '04',
    title: 'Archivio',
    excerpt: 'Un posto dove tenere da parte le storie da riprendere in un secondo momento.',
  },
];

/**
 * Pagina Home descrittiva del sito.
 * @returns {React.JSX.Element} - Componente Home.
 */
function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Hacker News, in modo chiaro</p>
          <h2>Entra, orientati e scegli dove leggere prima.</h2>
          <p>
            Qui trovi una panoramica semplice del sito: dove leggere le storie, dove aprire i thread e dove
            ritrovare ciò che hai salvato.
          </p>
          <div className="quick-links">
            <Link className="btn btn-primary" to="/radar">
              Apri il Radar
            </Link>
            <Link className="btn btn-secondary" to="/archive">
              Vai all'Archivio
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Come si usa</p>
            <h3>Quattro passaggi, senza perdere il filo</h3>
            <p className="section-subtitle">
              Parti dalla home, apri il radar, entra nel focus e conserva ciò che ti interessa nell'archivio.
            </p>
          </div>
        </div>
        <div className="story-grid story-grid--featured">
          {STEPS.map((step) => (
            <article className="story-card story-card--home" key={step.eyebrow}>
              <div className="story-card__top">
                <div className="story-card__heading">
                  <p className="story-card__eyebrow">{step.eyebrow}</p>
                  <h3 className="story-card__title">{step.title}</h3>
                </div>
              </div>
              <p className="story-card__excerpt">{step.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
