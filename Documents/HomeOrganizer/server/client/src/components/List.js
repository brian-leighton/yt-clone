import React, { useState } from "react";
import NewListItem from "./NewListItem";
import ListItem from "./ListItem";

function renderListItems(data) {
  let items = data.map((item) => {
    return <ListItem key={item._id} data={item}></ListItem>;
  });
  return items;
}

const List = (props) => {
  const [showList, toggleShow] = useState(false);
  return (
    <div className={`list-container`} key={props.data._id}>
      <div className="list-head" onClick={() => toggleShow(!showList)}>
        <h3>{props.data.title}</h3>
        <span>{props.data.created}</span>
      </div>
      <NewListItem id={props.data._id}></NewListItem>
      {showList ? renderListItems(props.data.lists) : null}
    </div>
  );
};

export default List;
