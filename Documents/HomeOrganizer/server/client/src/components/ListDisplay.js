import React from "react";
import axios from "axios";

import List from "./List";

class ListDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      showList: null,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/get/list").then((response) => {
      response.data.map((list) => {
        this.setState({ lists: [...this.state.lists, list] });
        return this.state.lists;
      });
    });
  }

  renderLists(listArr) {
    let displayedList = listArr.map((list, index) => {
      return <List data={list} key={index}></List>;
    });
    return displayedList;
  }
  render() {
    return (
      <div className="project-container">
        {this.renderLists(this.state.lists)}
      </div>
    );
  }
}

export default ListDisplay;
