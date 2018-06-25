import {Route,Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import S from './style.scss';

import SignIn from 'view/user/SignIn';
import SignUp from 'view/user/SignUp';

import MyPage from 'view/user/MyPage';
import Write from 'view/write/Write';
import LoginHint from 'layout/LoginHint';

import cfg from 'config/config.json';

export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo:null,
            signInMsg:null,
            signUpMsg:null,
            hasLoginReq:false,
            myPagePreviews:[],
            notebooks:[],
            previewName:'所有文章'
        }

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewName = this.changePreviewName.bind(this);
        this.changePreviews = this.changePreviews.bind(this);
        this.updateUserIntro = this.updateUserIntro.bind(this);
    }

    componentDidMount(){
        $.post(`${cfg.url}/autologin`).done(({code,data})=>{
            if(code === 0){
               
                this.setState({myInfo:data});
            }

            this.setState({hasLoginReq:true})
        }); 

        let {state,pathname} = this.props.location;
        if(state){
            let{user_id} = state.userInfo;
            if(pathname === '/my_page'){
                this.initMyPage(user_id,{user_id},'所有文章');
            }
            
        }
    }

    signInAjax(reqData){

        $.post(`${cfg.url}/login`,reqData).done(res=>{
            let {code,data} = res;
            if(code === 0){
               //密码正确 
                this.setState({myInfo:data});
            }else{
                
                this.setState({signInMsg:res});
            }

        })
    }

    signUpAjax(reqData){

        $.post(`${cfg.url}/register`,reqData).done(res=>{
            let {code,data} = res;
            this.setState({signUpMsg:res});

        })
    }

    clearLoginMsg(){
        this.setState({
            signInMsg:null,
            signUpMsg:null
        })
    }

    logOut(){
        $.post(`${cfg.url}/logout`).done(({code})=>{
            if(code === 0){
                this.setState({myInfo:null});
            }
        })
        
    }

    getPreview(data,previewName){
        $.post(`${cfg.url}/getPreview`,data).done(({code,data})=>{
            if(code === 0){
                this.setState({
                    myPagePreviews:data,
                    previewName
                });
            }
        })
    }

    initMyPage(user_id,previewsData,previewName){
        this.getPreview(previewsData,previewName);

        $.post(`${cfg.url}/getCollection`,{user_id}).done(({code,data})=>{
            if(code === 0){
                this.setState({
                    notebooks:data
                });
            }
        });

    }

    changePreviewName(previewName){
        this.getPreview({previewName});
    }

    changePreviews(data,previewName){
        this.getPreview(data,previewName);
    }

    updateUserIntro(intro){
        let {myInfo} = this.state;
        myInfo.user_intro = intro;
        this.setState({myInfo});
    }

    render(){

        let {signInAjax,signUpAjax,clearLoginMsg,logOut,initMyPage,changePreviews,updateUserIntro} = this;
        let {signInMsg,signUpMsg,myInfo,hasLoginReq,myPagePreviews,notebooks,previewName} = this.state;
        let {history} = this.props;

        if(!hasLoginReq){
            return <div></div>
        }

        return (
            <div className={S.layout}>
                <Nav {...{
                    myInfo,
                    logOut,
                    initMyPage,
                    history
                }} />
                <Route exact path="/" render={(props)=>(
                    <Home 
                        {...{
                            initMyPage
                        }}
                        {...props}
                    />
                )}/>
                <Route path="/sign_in" render={(props)=>(
                    myInfo ? 
                    (<Redirect to="/" />) 
                    : 
                    (<SignIn 
                        {...{
                            signInAjax,
                            signInMsg,
                            clearLoginMsg
                        }}

                    />) 
                    
                )}/> 
                <Route path="/sign_Up" render={(props)=>(
                    myInfo ? 
                    (<Redirect to="/" />) 
                    : 
                    (
                        <SignUp 
                            {...{
                                signUpAjax,
                                signUpMsg,
                                clearLoginMsg
                            }}

                        /> 
                    )
                    
                )}/>
                <Route path="/my_page" render={(props)=>(
                    props.location.state ? (
                        <MyPage 
                        {...{
                            myPagePreviews,
                            notebooks,
                            previewName,
                            changePreviews,
                            initMyPage,
                            myInfo,
                            updateUserIntro
                        }}
                        {...props}
                    />
                    ) : (
                        <Redirect to="/" />
                    )
                    
                    
                )}/>
                <Route  path="/write" render={(props)=>(
                    myInfo ? (<Write 
                        {...{myInfo}}
                    />) : (
                        <Redirect to="/login_hint" />
                    )
                    
                )}/>
                <Route  path="/login_hint" component={LoginHint}/>
                
            </div>
        );
    }
}
