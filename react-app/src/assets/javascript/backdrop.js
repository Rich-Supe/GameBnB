import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
},
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

// or 

// import Backdrop from '@material-ui/core/Backdrop';
// or
// import { Backdrop } from '@material-ui/core';


// <Backdrop />
// invisible	bool	false	If true, the backdrop is invisible. It can be used when rendering a popover or a custom select component.
// open*	bool		If true, the backdrop is open.