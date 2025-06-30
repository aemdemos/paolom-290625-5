/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child elements of the grid (these will be the columns)
  const columnElements = Array.from(grid.children);

  // Defensive: If there are no columns, do not replace
  if (columnElements.length === 0) return;

  // Table header as required
  const headerRow = ['Columns (columns8)'];
  // Each column cell should reference the entire column content
  const contentRow = columnElements;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the created table
  element.replaceWith(table);
}
