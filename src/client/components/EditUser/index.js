import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import validation from "../../helperfunction/Validation";
import * as actions from "../../actions";
import Button from "@material-ui/core/Button";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fn: "",
      ln: "",
      sex: "",
      age: "",
      pwd: "",
      rpt: "",
      authenticated: false
    };
  }

  componentDidMount() {
    const { fn, ln, sex, age } = this.props.location.state;
    this.setState({ fn: fn, ln: ln, sex: sex, age: age });
  }

  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = e => {
    let pendingUser = {
      FirstName: this.state.fn,
      LastName: this.state.ln,
      Sex: this.state.sex,
      Age: this.state.age,
      Password: this.state.pwd
    };
    console.log(pendingUser);
    const { index } = this.props.location.state;
    this.props.updateUser(index, pendingUser);
    this.props.getUserList();
    this.setState({
      fn: "",
      ln: "",
      sex: "",
      age: "",
      pwd: "",
      rpt: "",
      authenticated: true
    });
  };

  render() {
    console.log(this.props.users.user);
    const { user } = this.props.users;
    console.log(user);
    const isDisabled = validation(
      this.state.fn,
      this.state.ln,
      this.state.sex,
      this.state.age,
      this.state.pwd,
      this.state.rpt
    );
    return (
      <div className="content">
        {this.state.authenticated === true && (
          <Redirect to={{ pathname: "/", state: { from: "/edit" } }} />
        )}
        <h1>Edit User:</h1>
        <div className="spanL">
          <div className="nameField">First Name: </div>
          <div className="inputField">
            <input
              type="text"
              name="fn"
              value={this.state.fn}
              onChange={this.handleChange}
              required={true}
              placeholder="First Name"
            />
          </div>
        </div>
        <div className="spanL">
          <div className="nameField">Last Name: </div>
          <div className="inputField">
            <input
              type="text"
              name="ln"
              value={this.state.ln}
              onChange={this.handleChange}
              required={true}
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="spanL">
          <div className="nameField">Sex : </div>

          <div className="inputField">
            <input
              type="text"
              name="sex"
              value={this.state.sex}
              onChange={this.handleChange}
              required={true}
              placeholder="Sex"
            />
          </div>
        </div>
        <div className="spanL">
          <div className="nameField"> Age : </div>
          <div className="inputField">
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
              required={true}
              placeholder="Age"
            />
          </div>
        </div>
        <div className="spanL">
          <div className="nameField">Password: </div>
          <div className="inputField">
            <input
              type="password"
              name="pwd"
              value={this.state.pwd}
              onChange={this.handleChange}
              required={true}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="spanL">
          <div className="nameField">Repeat: </div>
          <div className="inputField">
            <input
              type="password"
              name="rpt"
              value={this.state.rpt}
              onChange={this.handleChange}
              required={true}
              placeholder="Repeat Password"
            />
          </div>
        </div>
        <div className="btn">
          <Button
            style={{ textAlign: "center" }}
            variant="extendedFab"
            color="#2196f3"
            disabled={isDisabled}
            onClick={this.handleSubmit}
          >
            Confirm
          </Button>
          <Button
            style={{ textAlign: "center" }}
            variant="extendedFab"
            color="#2196f3"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Cancel
            </Link>{" "}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(actions.getUserList());
    },
    deleteUser: id => {
      dispatch(actions.deleteUser(id));
    },
    getOneUser: id => {
      dispatch(actions.getOneUserById(id));
    },
    updateUser: (id, newInfo) => {
      dispatch(actions.updateUser(id, newInfo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
