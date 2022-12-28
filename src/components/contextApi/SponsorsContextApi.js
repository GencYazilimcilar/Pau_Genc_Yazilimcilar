import { onValue, ref } from 'firebase/database';
import React, { Component } from 'react';
import { db } from '../root/firebase-init';
const SponsorsContext=React.createContext();
export class SponsorsProvider extends Component {
    state={
        sponsors:{},
        getDataSponsors:()=>this.getData()
    }
    getData=()=>{
        onValue(ref(db,"/sponsor"),(snapshot)=>{
            let data=snapshot.val();
            this.setState({sponsors:data});
        })
    }
    render() {
        return (
            <SponsorsContext.Provider value={this.state}>
                {this.props.children}
            </SponsorsContext.Provider>
        );
    }
}

const SponsorsConsumer=SponsorsContext.Consumer;
export default SponsorsConsumer;