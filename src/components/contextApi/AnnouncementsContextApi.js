import { onValue, ref } from 'firebase/database';
import React, { Component } from 'react';
import { db } from '../root/firebase-init';
const AnnouncementsContext=React.createContext();
export class AnnouncementsProvider extends Component {
    state={
        announcements:{},
        getDataAnnouncements:()=>this.getData()
    }
    getData=()=>{
        onValue(ref(db,"/announcements"),(snapshot)=>{
            let data=snapshot.val();
            if(data){
               this.setState({announcements:data}); 
            }
            
        })
    }
    render() {
        return (
            <AnnouncementsContext.Provider value={this.state}>
                {this.props.children}
            </AnnouncementsContext.Provider>
        );
    }
}
const AnnouncementsConsumer=AnnouncementsContext.Consumer;
export default AnnouncementsConsumer;