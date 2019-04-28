import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { useSubscribeLevel2 } from './api';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
});

export const UnstyledOrderBook = ({
  buys,
  sells,
  InstrumentId,
  dispatch,
  classes
}) => {
  useSubscribeLevel2({ InstrumentId, Depth: 10 }, dispatch);

  const displayBuys = Object.values(buys)
    .sort((a, b) => parseFloat(b.Price) > parseFloat(a.Price))
    .slice(0, 10);

  const displaySells = Object.values(sells)
    .sort((a, b) => parseFloat(b.Price) > parseFloat(a.Price))
    .slice(0, 10);

  return (
    <Card className={classes.root}>
      <CardHeader title="OrderBook" />
      <CardContent>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displaySells.map(({ Price, Quantity }, i) => (
              <TableRow key={i}>
                <TableCell align="right">{Price}</TableCell>
                <TableCell align="right">{Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            {displayBuys.map(({ Price, Quantity }, i) => (
              <TableRow key={i}>
                <TableCell align="right">{Price}</TableCell>
                <TableCell align="right">{Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const OrderBook = withStyles(styles)(UnstyledOrderBook);
