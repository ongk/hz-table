# Responsive Table

Prototypes of responsive tables hooked into smart-table with optional expandable detail rows, selection column, and action column. Columns are assigned a priority and those with lower priorities are hidden as the window width becomes narrower. If implement, selection and action columns are always visible.

To run, simply open any of the HTML files in your browser. There are several versions that include/exclude the features described above.

* ang-example.html
 - example of select-all and detail row expansion, Bootstrap table style
* no-gap.html
 - example of responsive table with no gaps in between rows

##### no-gap-batch.html
example of responsive table with selection column, no gaps in between rows, and drag-n-drop re-ordering of rows

##### with-gap.html
example of responsive table with gaps in between rows

##### with-gap-batch.html
example of responsive table with selection column and gaps in between rows

##### modern-no-gap-batch.html
example of responsive table with "modern" look, selection column, no gaps in between rows, and drag-n-drop re-ordering of rows

### Table Classes
* table-rsp - responsive table
* table-detail - responsive table with detail rows
* modern - responsive table with "modern" look

### Other Classes
* detail-row - assign to row (`<tr>`) containing details
* detail - assign to column (`<td>`) containing details
* select-col - assign to column containing selection input
* expander - assign to column containing expand icon
* action-col - assign to column containing action button(s)
