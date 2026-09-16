import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard.jsx';
import { getItemsByIds } from '../services/api.js';
import { clearReadLater, getReadLaterIds, isReadLater, toggleReadLater } from '../services/storage.js';

function sortItems(items, mode) {
  const sorted = [...items];

  switch (mode) {
    case 'saved-asc':
      sorted.sort((left, right) => (left.score || 0) - (right.score || 0));
      break;
    case 'time-desc':
      sorted.sort((left, right) => (right.time || 0) - (left.time || 0));
      break;
    case 'time-asc':
      sorted.sort((left, right) => (left.time || 0) - (right.time || 0));
      break;
    default:
      sorted.sort((left, right) => (right.score || 0) - (left.score || 0));
      break;
  }

  return sorted;
}

/**
 * Pagina Archivio: story salvate per la lettura successiva.
 * @returns {React.JSX.Element} - Componente Archive.
 */
function Archive() {
  const [sortMode, setSortMode] = useState('saved-desc');
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function hydrateReadLater() {
      const ids = getReadLaterIds();

      if (ids.length === 0) {
        setStatus('empty');
        return;
      }

      setStatus('loading');

      try {
        const stories = await getItemsByIds(ids);

        if (cancelled) {
          return;
        }

        const filtered = stories.filter((item) => item && (item.type === 'story' || item.type === 'job'));
        const sorted = sortItems(filtered, sortMode);

        if (sorted.length === 0) {
          setStatus('empty');
          return;
        }

        setItems(sorted);
        setStatus('ready');
      } catch (error) {
        if (cancelled) {
          return;
        }

        setErrorMessage(error.message || 'Impossibile recuperare la lista salvata.');
        setStatus('error');
      }
    }

    hydrateReadLater();

    return () => {
      cancelled = true;
    };
  }, [sortMode, reloadKey]);

  function handleToggleSave() {
    setReloadKey((current) => current + 1);
  }

  function handleClearArchive() {
    clearReadLater();
    setReloadKey((current) => current + 1);
  }

  const totalScore = items.reduce((sum, item) => sum + (item.score || 0), 0);
  const totalComments = items.reduce((sum, item) => sum + (item.descendants || 0), 0);
  const newest = [...items].sort((left, right) => (right.time || 0) - (left.time || 0))[0];

  return (
    <>
      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Archivio</p>
            <h3>Le storie che hai scelto di tenere da parte</h3>
            <p className="section-subtitle">
              Qui ritrovi in un attimo ciò che hai salvato dal radar, con la stessa lista interattiva della sezione
              principale.
            </p>
          </div>
        </div>

        <div className="archive-toolbar">
          <div className="controls-group">
            <div className="field">
              <label htmlFor="archive-sort-select">Ordina la lista</label>
              <select
                id="archive-sort-select"
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
              >
                <option value="saved-desc">Score decrescente</option>
                <option value="saved-asc">Score crescente</option>
                <option value="time-desc">Più recenti</option>
                <option value="time-asc">Più vecchie</option>
              </select>
            </div>
          </div>
          <button id="clear-archive-button" className="btn btn-danger" type="button" onClick={handleClearArchive}>
            Svuota lista
          </button>
        </div>
      </section>

      <section className="page-section archive-layout">
        <div id="archive-summary" className="archive-summary">
          {status === 'loading' && <div className="state-panel loading">Rileggo l'archivio...</div>}
          {status === 'error' && (
            <div className="state-panel error">
              <strong>Errore</strong>
              <p>{errorMessage}</p>
            </div>
          )}
          {status === 'empty' && (
            <div className="state-panel empty">Non hai ancora salvato nulla.</div>
          )}
          {status === 'ready' && (
            <>
              <div className="stat-card">
                <span className="stat-label">Nella tua lista</span>
                <strong className="stat-value">{items.length}</strong>
                <p className="stat-note">Le storie che hai scelto di conservare.</p>
              </div>
              <div className="stat-card">
                <span className="stat-label">Totale score</span>
                <strong className="stat-value">{totalScore}</strong>
                <p className="stat-note">Una misura rapida di quanto pesa la selezione.</p>
              </div>
              <div className="stat-card">
                <span className="stat-label">Commenti</span>
                <strong className="stat-value">{totalComments}</strong>
                <p className="stat-note">Ti aiuta a capire quanto è viva la discussione.</p>
              </div>
              <div className="stat-card">
                <span className="stat-label">Ultima aggiunta</span>
                <strong className="stat-value">{newest ? newest.timeLabel : 'N/D'}</strong>
                <p className="stat-note">{newest ? newest.title : 'Nessun elemento disponibile'}</p>
              </div>
            </>
          )}
        </div>
        <div id="archive-root" className="story-list">
          {status === 'loading' && <div className="state-panel loading">Ricarico le story salvate...</div>}
          {status === 'error' && (
            <div className="state-panel error">
              <strong>Errore</strong>
              <p>{errorMessage}</p>
            </div>
          )}
          {status === 'empty' && (
            <div className="state-panel empty">Quando salvi una story, la ritrovi qui.</div>
          )}
          {status === 'ready' &&
            items.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                showActions
                showThreadButton={false}
                feedVariant="list"
                isSaved={isReadLater(story.id)}
                onToggleSave={handleToggleSave}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default Archive;
