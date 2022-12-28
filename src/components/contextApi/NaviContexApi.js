import React, { Component } from 'react';
const NaviContext=React.createContext();
const reducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE_SELECTED_MENU_ITEM":
            return{
                ...state,
                selectedMenuItem:action.payload
            };
        default:
            return{
                ...state,
            };
    }
}
export class NaviProvider extends Component {
    state={
        menuItem:["anasayfa","hakkimizda","haberler","iletisim"],
        selectedMenuItem:"anasayfa",
        dispatch:action=>{
            this.setState(state=>reducer(state,action))
        }
    }
    render() {
        return (
            <NaviContext.Provider value={this.state}>
                {this.props.children}
            </NaviContext.Provider>
        );
    }
}

const NaviConsumer=NaviContext.Consumer;
export default NaviConsumer;
