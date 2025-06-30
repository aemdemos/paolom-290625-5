/* global WebImporter */
export default function parse(element, { document }) {
  // Header as in the example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Find all top-level card links (each is an <a> wrapping a grid card)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Card image (first img in card)
    const img = card.querySelector('img');

    // Card text content: find the first div after img (usually wraps all text)
    let contentCell = null;
    if (img) {
      // Get the content container (the next sibling of the image)
      let current = img.nextElementSibling;
      // Defensive: Check for div
      while (current && current.tagName !== 'DIV') {
        current = current.nextElementSibling;
      }
      contentCell = current;
    }
    // Fallback: if not found, use last div in card
    if (!contentCell) {
      const divs = card.querySelectorAll('div');
      if (divs.length > 0) {
        contentCell = divs[divs.length - 1];
      }
    }
    // Defensive: if contentCell is null, use empty div
    if (!contentCell) {
      contentCell = document.createElement('div');
    }
    // Add row: [image, text content]
    rows.push([img, contentCell]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element with new table
  element.replaceWith(table);
}
