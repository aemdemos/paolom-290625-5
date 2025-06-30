/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab links (immediate child <a> elements)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build all tab rows: each is [label, content]
  const tabRows = tabLinks.map((tabLink) => {
    // Find label: prefer child div text, fallback to anchor text
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Content is not present in this element, so use empty string
    return [label, ''];
  });

  // The header row: a single cell with 'Tabs' (matches example)
  const headerRow = ['Tabs'];

  // Build cells array: header row, then each tab row
  const cells = [headerRow, ...tabRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
