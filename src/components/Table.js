import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

function createData(id, arriving, time, success) {
  return { id, arriving, time, success };
}
const tableRows = [];
export default function SimpleTable() {
  const classes = useStyles();
  const URL = "http://3.19.59.143:3000";
  const deviceName = "My Home";

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: URL,
      data: {
        deviceCode: 526068331794
      },
      headers: {
        apikey: "jDpqd7bdvqsgkCQUSPPuL7LiXwZb5sO0"
      }
    })
      .then(res => prepareWebResponseForReact(res.data))
      .catch(err => console.log(err));
  }, []);

  function prepareWebResponseForReact(responseData) {
    var logArray = responseData.split(";");

    logArray.forEach(item => {
      var id = 0;
      var eachLogContent = item.split(",");
      if (eachLogContent[0] === "") {
      } else {
        var success = "FALSE";
        if (eachLogContent[2] === "1") {
          success = "TRUE";
        }
        var date = new Date(parseInt(eachLogContent[1]));
        var dateForTable = "";
        if (date != null) {
          dateForTable =
            date.getUTCDate() +
            "/" +
            date.getUTCMonth() +
            "/" +
            date.getUTCFullYear() +
            "-" +
            date.getUTCHours() +
            ":" +
            date.getUTCMinutes() +
            ":" +
            date.getUTCSeconds();
        }

        var tableContent = createData(
          id,
          eachLogContent[0],
          dateForTable,
          success
        );
        tableRows.push(tableContent);
        id++;
      }
    });
    setRows(tableRows);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell align="right">Arriving</TableCell>
            <TableCell align="right">Time(DD/MM/YYYY-HH:MM:SS) </TableCell>
            <TableCell align="right">Success</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {deviceName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.arriving}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
              <StyledTableCell align="right">{row.success}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
