
import S from './style.scss';
import cfg from 'config/config.json';

export default class Aside extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			inEdit:false,
			editVal:''
		}

		this.inEditChange = this.inEditChange.bind(this);
		this.editValChange = this.editValChange.bind(this);
		this.editCancel = this.editCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	inEditChange(){
		this.setState({
			inEdit:true,
			editVal:this.props.myInfo.user_intro
		});
	}

	editValChange(ev){
		this.setState({editVal:ev.target.value})
	}

	editCancel(){
		this.setState({inEdit:false});
	}

	onSubmit(ev){
		ev.stopPropagation();
		ev.preventDefault();

		let intro = this.state.editVal;
		let {user_id} = this.props.userInfo;
		let {updateUserIntro} = this.props;
		$.post(`${cfg.url}/editIntro`,{user_intro:intro,user_id}).done(({code})=>{
			if(code === 0){
				this.setState({inEdit:false});
				updateUserIntro(intro);
				
			}
		})
		updateUserIntro(intro);
	}

	render(){

		let {notebooks,userInfo,notebookClick,myInfo,updateUserIntro} = this.props;
		let {bookClick,inEditChange,editValChange,editCancel,onSubmit} = this;
		let {inEdit,editVal} = this.state;

		let isMe = false;

		if(myInfo){
			isMe = userInfo.user_id === myInfo.id;
			userInfo = myInfo;
		} 

		notebooks = notebooks.map((item,index)=>{
			let {id:collection_id,collection_name} = item;
			return (
				<div className="item" key={index}>
					<i className="book icon"></i>
					<div 
						className="content"
						onClick={()=>{
							notebookClick(collection_id,collection_name,userInfo);
						}}
					>
						{collection_name}
					</div>
				</div>
			)
		})

		return (
			<div className={S.aside}>

				<div className="introduce">
					<div className="title">
						个人介绍
						{isMe ? (
							<div 
								className="ui button tiny basic right floated"
								onClick={inEditChange}
							>
								<i className="icon write"></i>
								编辑
							</div>
						) : null}
						<div className="ui divider hidden"></div>
						
						{ inEdit ? (
							<form 
								action="" 
								className="ui form"
								onSubmit={onSubmit}
							>
								<div className="field">
									<textarea 
										value={editVal}
										onChange={editValChange}
									></textarea>
								</div>
								<button className="ui positive button" type="submit">
									提交
								</button>
								<button 
									className="ui negative button" type="submit"
									onClick={editCancel}
								>
									取消
								</button>
							</form>
						) : (<p>{userInfo.user_intro}</p>)}
						
					</div>
				</div>

				<div className="ui divider hidden"></div>

				<div className={S.volume}>
					<div className={S.title}>
						我的文章
					</div>
					<div className="ui list">
						{notebooks}
					</div>
				</div>

			</div>
		)
	}
}