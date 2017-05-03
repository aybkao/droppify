import React from 'react';

// Created to implement Table view for the chart. Standard template created by JT. 
// TO DO:
const TableView = (props) => (
  <table>
	  <tr> TableView </tr>
		<tc>	    
		    { props.items.map((row)=>
		    	<td>{row}</td>
		    )}
	  </tc>
	  <tc>
		    { props.items.map((val)=> 
		    	<td>{val[1]}</td>
		    )}
    </tc>
    <tc>
		    { props.items.map((val)=> 
		    	<td>{val[2]}</td>
		    )}
    </tc>
    <tc>
		    { props.items.map((val)=> 
		    	<td>{val[3]}</td>
		    )}
    </tc>
  </table>
)

export default TableView;

/* This renders a table but the x and y axis is reversed
<tr>	    
    { props.items.map((val)=>
    	<td>{val[0]}</td>
    )}
</tr>
<tr>
    { props.items.map((val)=> 
    	<td>{val[1]}</td>
    )}
</tr>
*/