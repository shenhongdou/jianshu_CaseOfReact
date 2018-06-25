
import S from './style.scss';
import {Link} from 'react-router-dom';
import cfg from 'config/config.json';

export default class Aside extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let {userInfo,initMyPage} = this.props;
		let {avatar,user_name,user_id} = userInfo;
		let {userInfoClick} = this;
		
		return(
			<div className={S.author_info}>
				<Link 
					to="/my_page" 
					className={S.avatar}
					onClick={ev=>{
						ev.preventDefault();
						ev.stopPropagation();
						initMyPage(user_id,{user_id},'所有文章');	
					}}
				>
					<img src={avatar} alt=""/>
				</Link>
				<div className={S.title}>
					<Link 
						to="/my_page" 
						className={S.name} 
						onClick={ev=>{
						ev.preventDefault();
						ev.stopPropagation();
						initMyPage(user_id,{user_id},'所有文章');
					}}
					>
						{user_name}
					</Link>
				</div>
			</div>
		)
	}
}