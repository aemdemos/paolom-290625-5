/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, must match example exactly
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  // Get all direct accordion item containers
  // Accepts both .accordion and .w-dropdown for resilience
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion, :scope > .w-dropdown'));

  accordions.forEach((accordion) => {
    // Find the title element
    // The button toggle for the accordion contains the title
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleCell = null;
    if (toggle) {
      // The title is usually in a .paragraph-lg, but fallback to toggle itself
      const title = toggle.querySelector('.paragraph-lg') || toggle;
      titleCell = title;
    }

    // Find the content element
    // The content is in the .w-dropdown-list
    const dropdownList = accordion.querySelector('.w-dropdown-list');
    let contentCell = null;
    if (dropdownList) {
      // Within the dropdown there is usually a .w-richtext, fallback to dropdownList
      const rich = dropdownList.querySelector('.w-richtext, .rich-text');
      contentCell = rich || dropdownList;
    }

    // Only add row if both cells exist
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create table using the rows and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
