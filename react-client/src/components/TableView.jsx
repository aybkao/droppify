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
class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: props.items,
      selected: [1]
    };
    this.isSelected = this.isSelected.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  };
  
  isSelected (index) {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection (selectedRows) {
    this.setState({ selected: selectedRows });
  };

  render() {
    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
          {this.state.data.shift().map( (item)=> (
              <TableHeaderColumn>{item}</TableHeaderColumn>
            ) )}
          </TableRow>
        </TableHeader>
        <TableBody>
          { this.state.data.map( (val, key1)=>(
            <TableRow selected={this.isSelected(key1)}>
            {val.map( (item, key2)=>(
              <TableRowColumn>{item}</TableRowColumn>
            ) )}
            </TableRow> 
          ) )}
        </TableBody>
      </Table>
    );
  }
}

export default TableView;
