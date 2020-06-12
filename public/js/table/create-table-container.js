/**
 * Create page section where a table will reside.
 */
function createTableContainer() {
  const containerId = (() => {
    let mtbNum = 1;
    while (pickElem(`mtb${mtbNum}`)) mtbNum++;
    return mtbNum;
  })();

  const params = {
    parentId: 'mainTableBlock',
    contId: `mtb${containerId}`,
  };

  const tableId = `${params.contId}Table`;

  params.elems = [
    { parentId: params.contId, tagName: 'h2', class: ['table-title'], text: `Table ${containerId}` },
    { parentId: params.contId, tagName: 'div', class: ['buttons-block'], $name: 'buttons-block' },
    { $parentName: 'buttons-block', tagName: 'button',
      onClick: { funcName: 'addRow', funcArgs: [{ tableId }] },
      text: 'Add row',
    },
    { $parentName: 'buttons-block', tagName: 'button',
      onClick: { funcName: 'addColumn', funcArgs: [{ tableId }] },
      text: 'Add column',
    },
    { parentId: params.contId, tagName: 'div', class: ['table-block'], $name: 'table-block' },
    { $parentName: 'table-block', tagName: 'section', class: ['side-panel', 'left-panel'] },
    { $parentName: 'table-block', tagName: 'section', class: ['table-panel'] },
    { $parentName: 'table-block', tagName: 'section', class: ['side-panel', 'right-panel'] },
  ];

  buildDOM(params);

  const tableInitParams = {
    parentSelector: `#${params.contId} .table-panel`,
    contId: tableId,
    colsQty: 3,
    rowsQty: 3,
  };

  createTableTemplate(tableInitParams);
}