export const editStockLocationItem = (data) => ({
    type: 'CPANEL_STOCK_ITEM_EDIT',
    data: data,
    editMode: true
})

export const cancelStockLocationItemEditing = () => ({
    type: 'CPANEL_STOCK_ITEM_EDIT_CANCEL',
    data: null,
    editMode: false
});

export const deleteStockLocationItem = (data) => ({
    type: 'CPANEL_STOCK_ITEM_DELETE',
    data: data
});
