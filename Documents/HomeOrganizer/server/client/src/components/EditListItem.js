import React from "react";
import axios from "axios";

class EditListItem extends React.Component {
  state = {};

  componentDidMount() {
    const { category, importance, body, notes } = this.props.data;
    this.setState({
      category,
      importance,
      body,
      notes,
    });
  }

  handleInputChange = (e) => {
    // FIGURE OUT HOW TO CHECK IF THE IMPORTANCE INPUT VALUE IS A NUMBER BETWEEN 0-10 AND DON'T ALLOW A POST WITHOUT

    // if (e.target.name === "importance") {
    //   e.target.value >= 0 && e.target.value <= 10
    //     ? this.setState({ [e.target.name]: e.target.value })
    //     : console.log("You must enter a number between 1-10");
    // }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const { category, importance, body, notes } = this.state;
    const data = { category, body, importance, notes };

    axios.post(
      `http://localhost:5000/update/listItem/${this.props.data._id}`,
      data
    );

    window.location.reload(false);
  };

  render() {
    return (
      <div className="edit-form">
        <form>
          <div>
            <label>List Title:</label>
            <input
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              name="body"
              placeholder={this.props.data.body}
            />
          </div>
          <div>
            <label>Notes:</label>
            <input
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              name="notes"
              placeholder={this.props.data.notes}
            />
          </div>
          <div>
            <label onClick={() => console.log(this.state)}>Category:</label>
            <input
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              name="category"
              placeholder={this.props.data.category}
            />
          </div>
          <div>
            <label>Importance:</label>
            <input
              onInput={(e) => this.handleInputChange(e)}
              type="text"
              name="importance"
              pattern="[0-10]"
              placeholder={this.props.data.importance}
            />
          </div>
          <div
            key="submitBtn"
            className="submit-btn"
            onClick={(e) => this.handleSubmit(e, this.props.id)}
          >
            <h5>Submit</h5>
          </div>
        </form>
      </div>
    );
  }
}

export default EditListItem;
