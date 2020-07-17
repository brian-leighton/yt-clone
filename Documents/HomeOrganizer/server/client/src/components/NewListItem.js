import React from "react";
import axios from "axios";

class NewListItem extends React.Component {
  state = {
    listItem: {},
    toggleForm: false,
  };

  toggleForm = (e) => {
    this.setState({ toggleForm: !this.state.toggleForm });
  };

  handleInputChange = (e) => {
    // e.persist() prevents an error from being thrown....
    e.persist();

    this.setState((prevState) => ({
      listItem: {
        ...prevState.listItem,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleSubmit = async (e, id) => {
    e.preventDefault();
    const { category, body, importance, notes } = this.state.listItem;
    const data = {
      category,
      body,
      importance,
      notes,
    };
    await axios.post(`http://localhost:5000/new/listItem/${id}`, data);

    window.location.reload(false);
  };

  formValues = () => {
    const arr = ["category", "body", "importance", "notes"];
    const closeWindow = (
      <div className="close-window">
        <h4>Add a new Item to your list!</h4>
        <div className="icon-container" onClick={this.toggleForm}>
          <i className="x icon"></i>
        </div>
      </div>
    );
    const submitBtn = (
      <div
        key="submitBtn"
        className="submit-btn"
        onClick={(e) => this.handleSubmit(e, this.props.id)}
      >
        <h5>Submit</h5>
      </div>
    );
    let values = arr.map((value) => {
      return (
        <div key={value}>
          <label>{value}</label>
          <input type="text" name={value} onChange={this.handleInputChange} />
        </div>
      );
    });
    values.unshift(closeWindow);
    // adds the submitBtn to the end of the created Inputs
    values.push(submitBtn);

    return (
      <div className="new-list-item">
        <form className="formContainer">{values}</form>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="toggle-form" onClick={this.toggleForm}>
          {this.state.toggleForm ? null : <i className="plus icon"></i>}
        </div>

        {this.state.toggleForm ? this.formValues() : null}
      </div>
    );
  }
}

export default NewListItem;
