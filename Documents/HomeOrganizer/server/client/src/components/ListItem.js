import React, { useState } from "react";
import EditListItem from "./EditListItem";
const ListItem = (props) => {
  // creates a state in a functional component with the value of showList
  // and is updated with the function toggleShow
  const [showList, toggleShow] = useState(false);
  const [editItem, toggleEdit] = useState(false);

  const showMore = () => {
    if (showList) {
      return (
        <div className="show-list">
          {editItem ? (
            <div>
              <div className="item-options">
                <i
                  className="large icon edit outline"
                  onClick={() => toggleEdit(!editItem)}
                ></i>
                <i className="large icon trash alternate"></i>
              </div>
              <EditListItem data={props.data}></EditListItem>
            </div>
          ) : (
            <div>
              <div className="item-options">
                <i
                  className="large icon edit outline"
                  onClick={() => toggleEdit(!editItem)}
                ></i>
                <i className="large icon trash alternate"></i>
              </div>
              <h6>Category: {props.data.category}</h6>
              <p>Notes: {props.data.notes}</p>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
    // showList ? return () : null;
  };
  return (
    <div>
      <div className={` list-item-container `}>
        <div className="importance-icon">
          <i
            className={`large icon exclamation triangle ${
              props.data.importance > 7
                ? "danger"
                : props.data.importance < 7 && props.data.importance >= 5
                ? "warning"
                : "safe"
            }`}
          ></i>
        </div>
        <div>
          <h3>{props.data.body}</h3>
        </div>
        <div
          className="moreBtn"
          onClick={() => {
            toggleShow(!showList);
          }}
        >
          <h6>
            {showList ? (
              <i className="huge angle double up icon"></i>
            ) : (
              <i className="huge angle double down icon"></i>
            )}
          </h6>
        </div>
      </div>
      {showList ? showMore() : null}
    </div>
  );
};
export default ListItem;
