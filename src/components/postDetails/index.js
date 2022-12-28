import { onValue ,ref,} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../root/firebase-init';
import "../../assets/css/Dashboard.css";
const Index = () => {
    const {search}=useLocation();
    const [name,setName]=useState(undefined);
    const [id,setId]=useState(undefined);
    const [data,setData]=useState();
    const [control,setControl]=useState(true);
    const [control2,setControl2]=useState(true);
    const [control4,setControl4]=useState(true);
    const [string,setString]=useState("");
    const [date,setDate]=useState("");
    let queryy=React.useMemo(()=>new URLSearchParams(search),[search]);
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const getDate=(date)=>{
        if(control2){setControl2(false);}
        let data=date.split("/");
        switch(data[1].toString()){
            case "1":
                setDate(`Ocak ${data[0]}, ${data[2]}`);
                break;
            case "2":
                setDate(`Şubat ${data[0]}, ${data[2]}`);
                break;
            case "3":
                setDate(`Mart ${data[0]}, ${data[2]}`);
                break;
            case "4":
                setDate(`Nisan ${data[0]}, ${data[2]}`);
                break;
            case "5":
                setDate(`Mayıs ${data[0]}, ${data[2]}`);
                break;
            case "6":
                setDate(`Haziran ${data[0]}, ${data[2]}`);
                break;
            case "7":
                setDate(`Temmuz ${data[0]}, ${data[2]}`);
                break;
            case "8":
                setDate(`Ağustos ${data[0]}, ${data[2]}`);
                break;
            case "9":
                setDate(`Eylül ${data[0]}, ${data[2]}`);
                break;
            case "10":
                setDate(`Ekim ${data[0]}, ${data[2]}`);
                break;
            case "11":
                setDate(`Kasım ${data[0]}, ${data[2]}`);
                break;
            case "12":
                setDate(`Aralık ${data[0]}, ${data[2]}`);
                break;
            default:
                setDate(`${data[0]}, ${data[2]}`);
                break;
                                
                        
        }
    }
    const getData=(url)=>{
        onValue(ref(db,url),(snapshot)=>{
            let data2=snapshot.val();
            if(data2){
                setData(data2);  
            }
            else{
                setData(undefined);
            }
        })
    }
    useEffect(()=>{
        if(data && document.getElementById("parser")){
            document.getElementById("parser").innerHTML=data.content;
        }
    },[document.getElementById("parser"),data])
    const getTickets=()=>{
        if(control4){
            setControl4(false);
        }
        let string2="| ";
        
        data.tickets.forEach(item=>{
            string2+=item;
            string2+=" | "
        });
        setString(string2);
    }
    const getContent=()=>{
        if(control){
            getData(`/${name}/${id}`);
            setControl(false);
        }
        if(name==="news"){
            if(data){
                return(
                    <div key={data.title+"ContainerDiv"} className='container'>
                        <div key={data.title+"MainDiv"} className="row">
                            <div key={data.title+"ColLg8Div"} className='col-lg-8' style={{}} >
                                <section key={data.title+"MainSection"} className="blog-posts grid-system">
                                    <div key={data.title+"ContainerDiv"}>
                                        <div key={data.title+"RowDiv"}>
                                            <div key={data.title+"Col-8Div"} >
                                                <div key={data.title+"AllBlogPostDiv"} className="all-blog-posts">
                                                    <div key={data.title+"RowDiv2"} className="row">
                                                        <div key={data.title+"Col-12Div"} className="col-lg-12">
                                                            <div key={data.title+"BlogPost2Div"} className="blog-post">
                                                                <div key={data.title+"BlogThumbDiv"} className="blog-thumb">
                                                                    <img key={data.title+"ImageDiv"} src={`data:image/png;base64, ${data.coverPhoto}`} alt=""/>
                                                                </div>
                                                                <div key={data.title+"ContentDiv"} className="down-content">
                                                                    {(control4)&&getTickets()}
                                                                    <span key={"MainTicketsP"} >
                                                                        {string}
                                                                    </span>
                                                                    <h4 key={data.title+"h4"}>{data.title}</h4>
                                                                    {(control2)&&getDate(data.date)}
                                                                    <ul key={data.title+"DateUl"} className="post-info" style={{padding:0,margin:0}}>
                                                                        <li key={data.date+"li1"} className="my-2" style={{left:0}}>
                                                                            <a key={data.date+"a1"} href="#">{date}</a>
                                                                        </li>
                                                                    </ul>
                                                                    <hr style={{color:"#393E46"}}></hr>
                                                                    <div key={data.title+"parser"} id='parser'>
                                                                        
                                                                    </div>
                                                                    
                                                                    <div key={data.title+"PostOptionsDiv"} className="post-options">
                                                                        <div key={data.title+"PostOptionsDiv2"} className="row">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                if(data!==undefined){setData(undefined);}
                return(
                    <div style={{height:"50vh"}}>
                        <div className='outercube cube'>
                            <div className='innerCube cube'>
                                <div className='innerCube2 cube'></div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(name==="activity"){
            /*if(data){

            }
            else{
                if(data!==undefined){setData(undefined);}
                return(
                    <div style={{height:"50vh"}}>
                        <div className='outercube cube'>
                            <div className='innerCube cube'>
                                <div className='innerCube2 cube'></div>
                            </div>
                        </div>
                    </div>
                );
            }*/
            return(<h2 style={{marginBottom:"50vh"}}>Bu özellik henüz kullanıma açık değil :( </h2>)
        }
        else if(name==="announcements"){
            if(data){
                return(
                <div key={data.title+"ContainerDiv"} className='container'>
                    <div key={data.title+"MainDiv"} className="row" style={{alignItems:"center",justifyContent:"center"}}>
                        <div key={data.title+"ColLg8Div"} className='col-lg-8' style={{}}>
                            <section key={data.title+"MainSection"} className="blog-posts grid-system">
                                <div key={data.title+"ContainerDiv"}>
                                    <div key={data.title+"RowDiv"}>
                                        <div key={data.title+"Col-8Div"} >
                                            <div key={data.title+"AllBlogPostDiv"} className="all-blog-posts">
                                                <div key={data.title+"RowDiv2"} className="row">
                                                    <div key={data.title+"Col-12Div"} className="col-lg-12">
                                                        <div key={data.title+"BlogPost2Div"} className="blog-post">
                                                            <div key={data.title+"BlogThumbDiv"} className="blog-thumb">
                                                                <img key={data.title+"ImageDiv"} src={`data:image/png;base64, ${data.photo}`} alt=""/>
                                                            </div>
                                                            <div key={data.title+"ContentDiv"} className="down-content">
                                                                <h4 key={data.title+"h4"}>{data.title}</h4>
                                                                <ul key={data.title+"DateUl"} className="post-info" style={{padding:0,margin:0}}>
                                                                    <li key={data.date+"li1"} className="my-2" style={{left:0}}>
                                                                        <a key={data.date+"a1"} href="#">{data.date}</a>
                                                                    </li>
                                                                </ul>
                                                                <hr style={{color:"#393E46"}}></hr>
                                                                <div key={data.title+"parser"} id='parser'>
                                                                    
                                                                </div>
                                                                <div key={data.title+"PostOptionsDiv"} className="post-options">
                                                                    <div key={data.title+"PostOptionsDiv2"} className="row">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>);
            }
            else{
                if(data!==undefined){setData(undefined);}
                return(
                    <div style={{height:"50vh"}}>
                        <div className='outercube cube'>
                            <div className='innerCube cube'>
                                <div className='innerCube2 cube'></div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else{
            return(<h2>Geçersiz Parametre!!!</h2>);
        }
    }
    return (
        <div>
            {(name===undefined)&&setName(queryy.get("name"))}
            {(id===undefined)&&setId(queryy.get("id"))}
            {
                (name!==undefined&&name!==null&&name!=="",id!==undefined&&id!==null&&id!=="")?
                <div>
                    {
                        getContent()
                    }
                </div>
                :
                <div className='container' style={{alignItems:"center",justifyContent:"center",textAlign:"center",height:"50vh"}}>
                    <h2>Geçrsiz Özellik...</h2>
                </div>
            }
            
        </div>
    );
}

export default Index;