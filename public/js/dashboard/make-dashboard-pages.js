/** Fetch tables and make pages - each with pageButton, dashboard rows (.dbo-items), 'Build All These Tables' button.
 * ?@param {number} tablesQty - how many tables to fetch
 * ?@param {number} maxTablesInDashboardPage
 * ?@param {number} maxButtonsInRow
 */
async function makeDashboardPages({ tablesQty, maxTablesInDashboardPage, maxButtonsInRow } = {}) {
  tablesQty = validatePositiveNumber(tablesQty);
  maxTablesInDashboardPage = validatePositiveNumber(maxTablesInDashboardPage, 10);
  maxButtonsInRow = validatePositiveNumber(maxButtonsInRow, 5);

  const tables = await getUserTables(null, { limit: tablesQty || 50 });
  // const getTables = () => JSON.parse(JSON.stringify(tables));

  shownTablesInDashboard.add(tables.slice(0, 10));
  savedTablesHyphenIds.add();

  dashboardDriver.launch({ pages: composePages(), maxTablesInDashboardPage, maxButtonsInRow });

  function composePages() {
    const pgs = { pagesQty: 0, tablesTotal: 0 };

    let pageNum = 0;
    let sliceStart = 0;
    let currPageTables = tables.slice(sliceStart, sliceStart + maxTablesInDashboardPage);

    let stop = 0;
    while (currPageTables.length) {
      pgs.pagesQty++;
      pgs[++pageNum] = addDashboardPageToPages(pgs, pageNum, currPageTables);

      sliceStart = pgs.pagesQty * maxTablesInDashboardPage;
      currPageTables = tables.slice(sliceStart, sliceStart + maxTablesInDashboardPage);
      pgs.tablesTotal += pgs[pageNum].dboItems.length;

      if (++stop === 1000) break;
    }

    return pgs;
  }
}
