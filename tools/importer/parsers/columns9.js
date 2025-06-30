/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid columns container in the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: remove empty columns (shouldn't occur but guards for odd HTML)
  const cleanColumns = columns.filter(col => {
    return col.textContent.trim() !== '' || col.children.length > 0;
  });
  if (cleanColumns.length === 0) return;

  // Compose the table rows
  // The header row must be a single column
  const headerRow = ['Columns (columns9)'];
  // The columns row must have as many cells as there are columns in the grid
  const columnsRow = cleanColumns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
