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
import { useTrades } from './api';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
});

export const UnstyledTrades = ({
  classes,
  trades,
  tradesSub,
  InstrumentId,
  dispatch
}) => {
  useTrades(InstrumentId, tradesSub, dispatch);
  return (
    <Card className={classes.root}>
      <CardHeader title="Trades" />
      <CardContent>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map(({ Price, Quantity }, i) => (
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

const Trades = withStyles(styles)(UnstyledTrades);
export { Trades };
