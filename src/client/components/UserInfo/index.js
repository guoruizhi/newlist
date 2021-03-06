import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

const UserInfo = ({ FirstName, LastName, Sex, Age, del, id, getOne, updateOne, getUserList }) => {
  return (
    <TableRow>
      <CustomTableCell>{FirstName}</CustomTableCell>
      <CustomTableCell>{LastName}</CustomTableCell>
      <CustomTableCell>{Sex}</CustomTableCell>
      <CustomTableCell>{Age}</CustomTableCell>
      <CustomTableCell>
        <Button variant="flat" color="primary" aria-label="Edit">
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/edit',
              state: {
                fn: FirstName,
                ln: LastName,
                sex: Sex,
                age: Age,
                index: id
              }
            }}
          >
            edit
          </Link>
        </Button>
      </CustomTableCell>
      <CustomTableCell>
        <Button
          variant="flat"
          color="secondary"
          aria-label="Delete"
          onClick={() => {
            del(id);
            getUserList();
          }}
        >
          Delete
        </Button>
      </CustomTableCell>
    </TableRow>
  );
};

export default UserInfo;
