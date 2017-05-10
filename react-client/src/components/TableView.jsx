import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// TO DO:
const TableView = (props) => (
  <Table onRowSelection={props.handleRowSelection} >
    <TableHeader >
      <TableRow >
      { Object.keys(props.items[0]).map( (key)=> ( 
          <TableHeaderColumn key={key} style={{ whiteSpace:false, wordWrap:'break-word'}}>{key}</TableHeaderColumn>
        ) )}
      </TableRow>
    </TableHeader>
    <TableBody >
      { props.items.slice(1, props.items.length).map( (val, key1)=>(
        <TableRow selected={props.isSelected(key1)}>
        {Object.keys(val).map( (key2)=>(
          <TableRowColumn key={key2} style={{ whiteSpace:false, wordWrap:'break-word'}}>{val[key2]}</TableRowColumn>
        ) )}
        </TableRow> 
      ) )}
    </TableBody>
  </Table>
)
export default TableView;