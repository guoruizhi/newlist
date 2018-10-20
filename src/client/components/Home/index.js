import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ShowAllInfo from '../../components/ShowAllInfo';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as sortF from '../../helperfunction/Sort';

let filteredUsers = [];
let usersBeforeFilter = [];
let totalPage;
let sortedUsers = [];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      autenticated: false,
      currentPage: 1,
      flag: 0,
      colName: '',
      orderUser: []
    };
  }

  componentDidMount() {
    this.props.getUserList();
  }

  sortFn = () => {
    if (this.state.flag === 0 && !this.state.colName) {
      this.setState({ colName: 'FirstName', flag: 1 });
    } else if (this.state.flag === 1) {
      this.setState({ colName: 'FirstName', flag: 2 });
    } else {
      this.setState({ colName: 'FirstName', flag: 1 });
    }
  };

  sortLn = () => {
    if (this.state.flag === 0 && !this.state.colNmame) {
      this.setState({ colName: 'LastName', flag: 1 });
    } else if (this.state.flag === 1) {
      this.setState({ colName: 'LastName', flag: 2 });
    } else {
      this.setState({ colName: 'LastName', flag: 1 });
    }
  };

  sortSex = () => {
    if (this.state.flag === 0 && !this.state.colName) {
      this.setState({ colName: 'Sex', flag: 1 });
    } else if (this.state.flag === 1) {
      this.setState({ colName: 'Sex', flag: 2 });
    } else {
      this.setState({ colName: 'Sex', flag: 1 });
    }
  };

  sortAge = () => {
    if (this.state.flag === 0 && !this.state.colName) {
      this.setState({ colName: 'Age', flag: 1 });
    } else if (this.state.flag === 1) {
      this.setState({ colName: 'Age', flag: 2 });
    } else {
      this.setState({ colName: 'Age', flag: 1 });
    }
  };

  handleInput = e => {
    this.setState({ input: e.target.value, autenticated: true });
  };

  setPage = pageNum => {
    this.setState({ currentPage: pageNum });
  };

  render() {
    const { flag } = this.state;
    let pageSize = 5;
    usersBeforeFilter = [...this.props.users.users];
    if (usersBeforeFilter.length % pageSize === 0) {
      totalPage = Math.floor(usersBeforeFilter.length / pageSize);
    } else {
      totalPage = Math.floor(usersBeforeFilter.length / pageSize) + 1;
    }
    let currentPage = this.state.currentPage;
    let startPage, endPage;

    if (totalPage <= 3) {
      startPage = 1;
      endPage = 3;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage + 1 >= totalPage) {
        startPage = totalPage - 2;
        endPage = totalPage;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, this.props.users.users.length - 1);

    console.log(startPage, currentPage, endPage);
    console.log(startIndex, endIndex);
    console.log('users in Home', usersBeforeFilter);
    const { autenticated } = this.state;

    if (flag === 0) {
      sortedUsers = [...this.props.users.users];
    } else if (flag === 1) {
      let ascSort = [...this.props.users.users];
      sortF.sortFuncAsc(ascSort, this.state.colName);
      sortedUsers = [...ascSort];
    } else {
      let desSort = [...this.props.users.users];
      sortF.sortFuncDes(desSort, this.state.colName);
      sortedUsers = [...desSort];
    }

    if (!autenticated || this.state.input.length === 0) {
      filteredUsers = [...sortedUsers].slice(startIndex, endIndex + 1);
    } else {
      filteredUsers = [
        ...sortedUsers.filter(
          user =>
            user.FirstName.includes(this.state.input) ||
            user.LastName.includes(this.state.input) ||
            user.Sex.includes(this.state.input) ||
            user.Age.toString().includes(this.state.input)
        )
      ];
    }
    return (
      <div>
        <Typography color="primary" variant="h2" className="app-title">
          User Management
        </Typography>
        <Button variant="outlined" color="primary" style={{ position: 'relative', top: '25px' }}>
          <Link style={{ textDecoration: 'none' }} to="/new">
            Create New Users
          </Link>
        </Button>
        {/* Search: */}
        {/* <input type="text" value={this.state.input} onChange={this.handleInput} /> */}
        <TextField
          label="Search"
          margin="normal"
          value={this.state.input}
          onChange={this.handleInput}
          style={{ float: 'right' }}
        />
        <br />
        <br />
        <ShowAllInfo
          users={filteredUsers}
          sortFn={this.sortFn}
          sortLn={this.sortLn}
          sortSex={this.sortSex}
          sortAge={this.sortAge}
        />
        <div
          style={{
            display: 'flex',
            width: '200px',
            justifyContent: 'space-around'
          }}
        >
          {this.state.currentPage > 2 && (
            <a onClick={() => this.setPage(1)}>
              <i class="fa fa-fast-backward" aria-hidden="true" />
            </a>
          )}
          {this.state.currentPage > 1 && (
            <a className="pagenation" onClick={() => this.setPage(this.state.currentPage - 1)}>
              <Typography className="">{this.state.currentPage - 1}</Typography>
            </a>
          )}
          <span>
            <Typography color="error">{this.state.currentPage}</Typography>
          </span>
          {this.state.currentPage < totalPage && (
            <a className="pagenation" onClick={() => this.setPage(this.state.currentPage + 1)}>
              <Typography>{this.state.currentPage + 1}</Typography>
            </a>
          )}
          {this.state.currentPage < totalPage - 2 && (
            <a className="pagenation" onClick={() => this.setPage(totalPage)}>
              <i class="fa fa-fast-forward" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(actions.getUserList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
