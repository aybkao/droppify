import React from 'react';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.items.length } items.
  </div>
)

export default List;