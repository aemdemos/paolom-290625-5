/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab panes and pick the first (active) one
  const panes = element.querySelectorAll('.w-tab-pane');
  if (!panes.length) return;
  const activePane = panes[0];
  if (!activePane) return;

  // Get the main grid inside the active tab
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image element (background image/hero image)
  const img = grid.querySelector('img');

  // Gather all non-image element children (to preserve all text, headings, etc.)
  const contentNodes = [];
  Array.from(grid.children).forEach(node => {
    if (node !== img) {
      contentNodes.push(node);
    }
  });

  // Compose block rows
  const rows = [];
  rows.push(['Hero']); // Header row, matches example
  rows.push([img ? img : '']); // Background Image row
  rows.push([contentNodes.length ? contentNodes : '']); // Headings/text row

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
