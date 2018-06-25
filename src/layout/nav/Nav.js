import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';
import cfg from 'config/config.json';

export default function Nav(props){

    let {myInfo,logOut,initMyPage,history} = props;
    let user_id = '';
    let avatar = '';
    let userLink = null;

    if(myInfo){
        user_id = myInfo.id
        avatar = cfg.url + myInfo.avatar;
      
        userLink = (
            <NavLink 
                to="/my_page"
                className={`${S.avatar} item`}
                activeClassName="active"
            >
                <img 
                    src={avatar}
                    className="ui image avatar"
                    onClick={ev=>{
                        ev.preventDefault();
                        ev.stopPropagation();

                        history.push("/my_page",{
                            userInfo:{
                                user_id:myInfo.id,
                                user_name:myInfo.username,
                                avatar,
                                user_intro:myInfo.user_intro
                            }
                        });
                        initMyPage(user_id,{user_id},'所有文章');
                        
                    }}
                />
                <div className={S.dropDown}>
                    <p 
                        onClick={ev=>{
                            
                            ev.stopPropagation();
                            ev.preventDefault();
                            
                            logOut();
                        }}
                    >注销</p>
                </div>
            </NavLink>
        )
    }else{
        userLink = [
            (
                <NavLink 
                    to="/sign_in"
                    className={`item`}
                    activeClassName="active"
                    key={0}
                >登录
                </NavLink>
            ),
            (
                <NavLink 
                    to="/sign_up"
                    className={`item`}
                    activeClassName="active"
                    key={1}
                    >注册
                </NavLink>
            )
        ]
    }


    return (
        <div className={`ui fixed secondary pointing menu ${S.nav}`}>
            <div className="ui container">

                <Link to="/"
                    className={`header item`}
                >Noods</Link>

                <NavLink exact to="/"
                    className={`item`}
                    activeClassName="active"
                >首页</NavLink>

                <div className="menu right">
                    
                    {userLink}

                    <NavLink to="/write"
                        className={`item`}
                        activeClassName="active"
                    >写文章</NavLink>
                </div>
            </div>
        </div>
    );
}
