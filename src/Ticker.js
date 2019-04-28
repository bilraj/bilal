import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useSubscribeLevel1 } from './api';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
});

export const UnstyledTicker = ({ InstrumentId, dispatch, level1, classes }) => {
  useSubscribeLevel1(InstrumentId, dispatch);
  const {
    LastTradedPx,
    LastTradedQty,
    BestBid,
    BestOffer,
    Volume,
    Timestamp
  } = level1;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="right">Last Price</TableCell>
          <TableCell align="right">Last Quantity</TableCell>
          <TableCell align="right">Best Bid</TableCell>
          <TableCell align="right">Best Offer</TableCell>
          <TableCell align="right">Volume</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={Timestamp}>
          <TableCell align="right">{LastTradedPx}</TableCell>
          <TableCell align="right">{LastTradedQty}</TableCell>
          <TableCell align="right">{BestBid}</TableCell>
          <TableCell align="right">{BestOffer}</TableCell>
          <TableCell align="right">{Volume}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const Ticker = withStyles(styles)(UnstyledTicker);
export default Ticker;
