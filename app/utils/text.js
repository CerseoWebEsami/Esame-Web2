// text.js - utility di formattazione testo

/**
 * Rimuove i tag HTML e restituisce il solo testo.
 *
 * @param {string} html - HTML di input
 * @returns {string}
 */
export function stripHtml(html) {
    if (!html) {
        return "";
    }

    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
