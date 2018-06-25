import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

export default class SignUpPanel extends Component{

    constructor(props){

        super(props);

        this.state = {
            name:'',
            passw:'',
            cfPassw:'',
            nameErr:false,
            passwErr:false,
            cfPasswErr:false
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
        this.cfPasswChange = this.cfPasswChange.bind(this);
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

        // if(this.state.cfPasswErr){
        //    this.cfPasswChange();
        // }
        this.cfPasswChange();
    }

    cfPasswChange(){

        let cfPassw = this.refs.cfPasswDom.value;
        let passw = this.refs.passwDom.value;;
        let msg = passw === cfPassw ? '' : '密码不正确';

        this.setState({
            cfPassw,
            cfPasswErr:msg
        });


    }

    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {signUpAjax} = this.props;

        let {nameDom,passwDom,cfPasswDom} = this.refs;

        let nameErr = this.validator.valiOneByValue('name',nameDom.value);
        let passwErr = this.validator.valiOneByValue('passw',passwDom.value);
        let cfPasswErr = passwDom.value === cfPasswDom.value ? '' : '密码不正确';

        this.setState({nameErr,passwErr,cfPasswErr});

        if(!nameErr && !passwErr && !cfPasswErr){
           
            signUpAjax({
                username:nameDom.value,
                passw:passwDom.value,
                cfPasswErr
            })
        }
    }

    render(){

        let {name,passw,nameErr,passwErr,cfPassw,cfPasswErr} = this.state;
        let {nameChange,passwChange,cfPasswChange,onSubmit} = this;

        let {signUpMsg} = this.props;

        let resInfo = null;

        if(signUpMsg){
            switch(signUpMsg.code){
                case 0:
                    resInfo = (
                        <div className="ui message positive">
                            <p>{signUpMsg.msg}</p>
                            <p>马上帮您登陆</p>
                        </div>
                    )
                break;
                default:
                    resInfo = (
                        <div className="ui message error">
                            <p>{signUpMsg.msg}</p>
                        </div>
                    )
            }
        }

        let nameErrMsg = nameErr ? (
            <p className={S.err} >{nameErr}</p>
        ) : null;

        let passwErrMsg = passwErr ? (
            <p className={S.err} >{passwErr}</p>
        ) : null;

        let cfPasswErrMsg = cfPasswErr ? (
            <p className={S.err} >{cfPasswErr}</p>
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
                    <div className={`field `}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            ref="cfPasswDom"
                            value={cfPassw}
                            onChange={cfPasswChange}
                        />
                        {cfPasswErrMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
