import React, { Component } from 'react';
const AdminContext=React.createContext();
const reducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE_SELECTED_MENU_ITEM":
            return{
                ...state,
                selectedMenuItem:action.payload
            };
        case "CHANGE_URL":
            return{
                ...state,
                url:action.payload
            }
        case "CHANGE_SPONSOR_URL":
            return{
                ...state,
                sponsorUrl:action.payload
            }
        case "CHANGE_ACTIVITY_URL":
            return{
                ...state,
                activityUrl:action.payload
            }
        default:
            return{
                ...state,
            };
    }
}
export class AdminProvider extends Component {
    state={
        menuItem:["duyuru ekle/güncelle","etkinlik ekle/güncelle","sponsor ekle/güncelle","haber ekle/güncelle","iletisim ekle/güncelle","hakkımızda ekle/güncelle","admin ekle/güncelle","editor3 haber kabul et"],
        menuItem2:["sponsor ekle/güncelle","haber ekle/güncelle","iletisim ekle/güncelle","editor3 haber kabul et"],
        menuItem3:["haber gönder/güncelle"],
        selectedMenuItem:"",
        url:undefined,
        sponsorUrl:undefined,
        activityUrl:undefined,
        dispatch:action=>{
            this.setState(state=>reducer(state,action))
        }
    }
    render() {
        return (
            <AdminContext.Provider value={this.state}>
                {this.props.children}
            </AdminContext.Provider>
        );
    }
}

const AdminConsumer=AdminContext.Consumer;
export default AdminConsumer;
