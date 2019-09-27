import React from 'react';
import classes from '../DrawerToggle/DrawerToggle.module.css'; 
const DrawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.openedSide}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle;