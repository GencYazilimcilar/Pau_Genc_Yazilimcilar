import React,{useEffect} from 'react';

const Index = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return (
        <div>
            <img style={{width:"100%"}} src='assets/images/404.webp'/>
        </div>
    );
}
export default Index;
