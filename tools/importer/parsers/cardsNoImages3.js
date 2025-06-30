/* global WebImporter */
export default function parse(element, { document }) {
  // Table rows array
  const rows = [];
  // Header row: must be exactly 'Cards'
  rows.push(['Cards']);

  // Each card: direct child div of grid
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Each card has an icon (ignore) and a <p> (content). For semantic meaning, preserve <p> as is.
    // There is only one <p> per card, but be robust.
    const p = cardDiv.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });

  // Only create the Cards block table; no Section Metadata in example
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
