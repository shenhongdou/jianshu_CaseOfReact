import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

export default class SignInPanel extends Component{

    constructor(props){

        super(props);

        this.state = {
            name:'',
            passw:'',
            nameErr:false,
            passwErr:false
        };

        this.validator = new Validation();
        this.validator.addByValue('name',[
        {
            strategy:'isEmpty',errorMsg:'用户名不能为空'
        },
        {
            strategy:'hasSpace',errorMsg:'用户名不能有空格'
        },
        {
            strategy:'maxLength:6',errorMsg:'用户名最长为6位'
        }
        ]);

        this.validator.addByValue('passw',[
        {
            strategy:'isEmpty',errorMsg:'密码不能为空'
        },
        {
            strategy:'hasSpace',errorMsg:'密码不能有空格'
        },
        {
            strategy:'maxLength:6',errorMsg:'密码最长为6位'
        }
        ]);

        this.nameChange = this.nameChange.bind(this);
        this.passwChange = this.passwChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentWillUnmount(){
        this.props.clearLoginMsg();
    }

    nameChange(ev){

        let name = ev.target.value;
        let msg = this.validator.valiOneByValue('name',name);

        this.setState({
            name,
            nameErr:msg
        });

    }

    passwChange(ev){

        let passw = ev.target.value;
        let msg = this.validator.valiOneByValue('passw',passw);

        this.setState({
            passw,
            passwErr:msg
        });
    }

    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {signInAjax} = this.props;

        let {nameDom,passwDom} = this.refs;

        let nameErr = this.validator.valiOneByValue('name',nameDom.value);
        let passwErr = this.validator.valiOneByValue('passw',passwDom.value);

        this.setState({nameErr,passwErr});

        if(!nameErr && !passwErr){
            signInAjax({
                username:nameDom.value,
                passw:passwDom.value
            })
        }
       
    }

    render(){

        let {name,passw,nameErr,passwErr} = this.state;
        let {nameChange,passwChange,onSubmit} = this;
        let {signInMsg} = this.props;

        let resInfo = null;

        if(signInMsg && signInMsg.code !== 0 ){
            resInfo = (
                <div className="ui message error">
                    <p>{signInMsg.msg}</p>
                </div>
            )
        }

        let nameErrMsg = nameErr ? (
            <p className={S.err} >{nameErr}</p>
        ) : null;

        let passwErrMsg = passwErr ? (
            <p className={S.err} >{passwErr}</p>
        ) : null;

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className={`field ${nameErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={name}
                            onChange={nameChange}
                        />
                        {nameErrMsg}
                    </div>

                    <div className={`field ${passwErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
                            value={passw}
                            onChange={passwChange}
                        />
                        {passwErrMsg}
                    </div>

                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
