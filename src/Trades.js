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
import { createWriteStream } from 'fs';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
});
var cardStyle = {
  width: '20vw',
  height: '45vw'
}
export const UnstyledTrades = ({
  classes,
  trades,
  tradesSub,
  InstrumentId,
  dispatch
}) => {
  useTrades(InstrumentId, tradesSub, dispatch);
  return (
    <Card style={cardStyle} className={classes.root}>
      <CardHeader style={{ textAlign: 'center' }} title="Trades" />
      <CardContent>
        <Table style={{width:"30%"}} className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map(({ Price, Quantity }, i) => (
              <TableRow key={i}>
                <TableCell align="left">{Price}</TableCell>
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
