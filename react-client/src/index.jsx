import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Nav from './components/Nav.jsx';  //<-- Created by JT to connect to Nav template 
import ImportBar from './components/ImportBar.jsx'; //<-- Created by JT to connect to ImportBar template
// ImportBar may be inside Nav. Let's decide. Or someone make an executive decision
import SearchBar from './components/SearchBar.jsx'; //<-- Created by JT to connect to SearchBar template
import TableView from './components/TableView.jsx'; //<-- Created by JT to connect to TableView template
import PageNumber from './components/PageNumber.jsx'; //<-- Created by JT to connect to TableView template
import ExampleTableData from '../../ExampleTableData.js'; //<-- Dummy data
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: ExampleTableData,
      filter: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    // console.log(ExampleTableData)
    // $.ajax({
    //   method: "GET",
    //   url: '/JTMBAK', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('componentDidMount err', err);
    //   }
    // });
  }

  handleClick () {
    console.log('click')
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/data',
      data: JSON.stringify({filter:this.state.filter}),
      contentType: 'application/json',
      success: function(data) {
        console.log('AJAX POST Success')
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

  render () {
    return (
      // <MuiThemeProvider>
        <div>
        <h1>RENDERING DROPPIFY</h1>
        <Nav />
        <ImportBar />
        <List items={this.state.items}/>
          <input type='text' onChange={this.handleChange}/>
          <input type='button' value='Filter Table' onClick={this.handleClick}/>
        <TableView items={this.state.items} />
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