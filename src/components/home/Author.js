import {Link} from 'react-router-dom';
import cfg from 'config/config.json';

export default function Author(props){
    
    let {user_name, avatar,id:user_id,user_intro} = props.user;
    let {history,initMyPage} = props;

    avatar = cfg.url + avatar;

    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
                onClick={ev=>{
                    ev.preventDefault();
                    ev.stopPropagation();
                    
                    history.push('/my_page',{
                        userInfo:{
                            user_id,
                            user_name,
                            avatar,
                            user_intro
                        }
                    });
                    initMyPage(user_id,{user_id},'所有文章');
                }}
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}
