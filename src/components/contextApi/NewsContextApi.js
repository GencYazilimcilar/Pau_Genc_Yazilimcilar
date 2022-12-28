import { onValue, ref } from 'firebase/database';
import React, { Component } from 'react';
import { db } from '../root/firebase-init';
const NewsContext=React.createContext();
const reducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE_SELECTED_PAGE":
            return{
                ...state,
                selectionPage:action.payload
            };
        default:
            return{
                ...state,
            };
    }
}
export class NewsProvider extends Component {
    state={
        news:{},
        selectionPage:1,
        getDataNews:()=>this.getData(),
        dispatch:action=>{
            this.setState(state=>reducer(state,action))
        }
    }
    getData=()=>{
        onValue(ref(db,"/news"),(snapshot)=>{
            let data=snapshot.val();
            this.setState({news:data});
        })
    }
    render() {
        return (
            <NewsContext.Provider value={this.state}>
                {this.props.children}
            </NewsContext.Provider>
        );
    }
}

const NewsConsumer=NewsContext.Consumer;
export default NewsConsumer;