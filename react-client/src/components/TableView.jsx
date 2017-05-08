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
      {props.items[0].map( (item, key1)=> ( 
          <TableHeaderColumn key={key1} style={{ whiteSpace:false, wordWrap:'break-word'}}>{item}</TableHeaderColumn>
        ) )}
      </TableRow>
    </TableHeader>
    <TableBody >
      { props.items.slice(1, props.items.length).map( (val, key1)=>(
        <TableRow selected={props.isSelected(key1)}>
        {val.map( (item, key2)=>(
          <TableRowColumn key={key2} style={{ whiteSpace:false, wordWrap:'break-word'}}>{item}</TableRowColumn>
        ) )}
        </TableRow> 
      ) )}
    </TableBody>
  </Table>
)

export default TableView;



