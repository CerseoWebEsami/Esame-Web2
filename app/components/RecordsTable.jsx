/**
 * Tabella generica con colonne configurabili.
 *
 * @param {object} props - Props del componente
 * @param {string} props.emptyMessage - Messaggio se non ci sono record
 * @param {Array<object>} props.records - Record da visualizzare
 * @param {Array<{header: string, render: Function}>} props.columns - Colonne
 * @param {Function} [props.onDelete] - Callback rimozione riga, riceve il record
 * @param {Function} [props.onDeleteAll] - Callback cancellazione totale
 * @param {string} [props.clearAllLabel="Cancella tutti"] - Etichetta pulsante pulizia
 * @param {string} [props.deleteLabel="Rimuovi"] - Etichetta pulsante riga
 * @returns {React.JSX.Element} - Componente RecordsTable.
 */
function RecordsTable({
  emptyMessage,
  records,
  columns,
  onDelete,
  onDeleteAll,
  clearAllLabel = 'Cancella tutti',
  deleteLabel = 'Rimuovi',
}) {
  if (!Array.isArray(records) || records.length === 0) {
    return <div className="state-panel empty">{emptyMessage}</div>;
  }

  const withActions = typeof onDelete === 'function';

  function handleDeleteAll() {
    const confirmed = confirm('Vuoi svuotare completamente l\'archivio?');

    if (confirmed) {
      onDeleteAll();
    }
  }

  return (
    <section className="records-panel">
      <div className="records-header">
        {typeof onDeleteAll === 'function' && (
          <button id="btn-clear-all" className="btn btn-danger" type="button" onClick={handleDeleteAll}>
            {clearAllLabel}
          </button>
        )}
      </div>
      <div className="records-table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.header}>{column.header}</th>
              ))}
              {withActions && <th>Azioni</th>}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr className="records-row" key={index}>
                {columns.map((column) => (
                  <td key={column.header}>{String(column.render(record, index))}</td>
                ))}
                {withActions && (
                  <td>
                    <button type="button" className="btn btn-danger btn-delete" onClick={() => onDelete(record)}>
                      {deleteLabel}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecordsTable;
