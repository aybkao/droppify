import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Nav from './components/Nav.jsx';
import Input from './components/Input.jsx';
import ImportBar from './components/ImportBar.jsx';
import TableView from './components/TableView.jsx';
import PageNumber from './components/PageNumber.jsx';
import ExampleTableData from '../../ExampleTableData.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [[]],
      filter: '',
      selected: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentDidMount() {
    var ogThis = this;
    $.ajax({
      method: "GET",
      url: '/allItems',
      // url: '/items',
      success: (data) => {
        data = JSON.parse(data);
        ogThis.setState({ items: data })
      },
      error: (err) => {
        console.log('componentDidMount err', err);
      }
    });
  }

  handleClick () {
    var ogThis = this;
    $.ajax({
      method: 'POST',
      url: '/data',
      data: JSON.stringify({filter:ogThis.state.filter}),
      contentType: 'application/json',
      success: function(data) {
        console.log('AJAX POST Success')

       $.ajax({
          method: "GET",
          // url: 'http://localhost:'+port+'/items/'+ogThis.state.filter,
          url: 'items/'+ogThis.state.filter,
          success: (data) => {
            console.log('Nested Ajax request Success!')
            data = JSON.parse(data);
            ogThis.setState({ items: data })
          },
          error: (err) => {
            console.log('Nested Ajax request failure', err);
          }
        });
      },

      error: function() {
        console.log('AJAX POST Fail')
      }
    })
  }

  handleChange(e) {
    console.log('change', e.target.value)
    this.setState({filter:e.target.value})
  }

  isSelected (index) {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection (selectedRows) {
    this.setState({ selected: selectedRows });
  };

  render () {
    return (
      <div>
        <h1>RENDERING DROPPIFY</h1>
        <Input />
        <Nav />
        <ImportBar />
        <List items={this.state.items} />
          <input type='text' onChange={this.handleChange}/>
          <input type='button' value='Filter Table' onClick={this.handleClick}/>
        <TableView items={this.state.items} handleRowSelection={this.handleRowSelection} isSelected={this.isSelected}/>
        <PageNumber />
      </div>)
  }
}

const AppMUI = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render(<AppMUI />, document.getElementById('app'));

  /*
    var pdf_table_extractor = require("pdf-table-extractor");
    function success(result) {
      Result = JSON.parse( JSON.stringify(result) );
      console.log(  Result["pageTables"][0].tables );
    }
    function error(err) {
      console.error('Error: ' + err);
    }
    pdf_table_extractor("finalExams.pdf",success,error); */