import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as sortF from '../../helperfunction/Sort';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: '110%',
    backgroundColor: '#2196f3',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class ShowAllInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 0,
      colName: '',
      orderUser: []
    };
  }

  render() {
    console.log(this.state);

    return (
      <Table style={{ margminTop: 10, marginBottom: 10 }}>
        <TableHead>
          <TableRow>
            <CustomTableCell onClick={this.props.sortFn}>First Name</CustomTableCell>
            <CustomTableCell onClick={this.props.sortLn}>Last Name</CustomTableCell>
            <CustomTableCell onClick={this.props.sortSex}>Sex</CustomTableCell>
            <CustomTableCell onClick={this.props.sortAge}>Age</CustomTableCell>
            <CustomTableCell>Edit</CustomTableCell>
            <CustomTableCell>Delete</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.users.map(user => (
            <UserInfo
              id={user._id}
              del={this.props.deleteUser}
              getUserList={this.props.getUserList}
              getOne={this.props.getOneUser}
              updateOne={this.props.updateUser}
              key={user._id}
              FirstName={user.FirstName}
              LastName={user.LastName}
              Sex={user.Sex}
              Age={user.Age}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

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
  null,
  mapDispatchToProps
)(ShowAllInfo);
