/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as a single cell matching the example structure
  const headerRow = ['Columns (columns2)'];

  // Get all immediate child divs, each representing a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column likely contains a wrapper div > img, so extract the img if present
  const columnCells = columns.map(col => {
    // Try to find an img inside this column
    const img = col.querySelector('img');
    if (img) {
      return img;
    }
    // Fallback: use the column div itself (in case of unexpected structure)
    return col;
  });

  // Build the table rows: header as a single cell row, then the columns row
  const cells = [
    headerRow,          // One cell
    columnCells         // As many columns as found
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
