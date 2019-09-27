import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auxiliary from '../Auxiliary';
import classes from './Layout.module.css'; 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
     state = {
         showSideDrawer: false
     }

     sideDrawerCloseHandler = () => {
      this.setState({showSideDrawer: false})
     }
     sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
       }


    render(){
        return(
        <Auxiliary>
         <Toolbar 
         isAuth={this.props.isAutheniticated}
         DrawerToggleClicked={this.sideDrawerOpenHandler} />
         <SideDrawer 
         isAuth={this.props.isAutheniticated}
         open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler }/>
         <main className={classes.content}>
             {this.props.children}
         </main>
        </Auxiliary>
        )
    } 

} 

const mapStateToProps = state => {
    return {
        isAutheniticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
