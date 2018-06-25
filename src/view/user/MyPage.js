
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'layout/preview/PreviewList';

export default class MyPage extends React.Component{
	constructor(props){
		super(props);
		this.collectionClick = this.collectionClick.bind(this);
		this.notebookClick = this.notebookClick.bind(this);
	}

	collectionClick(collection_id,collection_name){
		this.props.changePreviews({collection_id},collection_name);
	}

	notebookClick(collection_id,collection_name){
		this.collectionClick(collection_id,collection_name);
	}

	render(){

		let {myPagePreviews, notebooks, previewName,location,initMyPage,myInfo,updateUserIntro} = this.props;
		let {userInfo} = location.state;
		let {collectionClick,notebookClick} = this;

		return (
			<div className="ui container grid">

				<div className="twelve wide column">
					<AuthorInfo 
						{...{
							userInfo,
							initMyPage
						}}
					/>

					<div className="ui secondary pointing menu">
						<span className="active item">
							{previewName}	
						</span>
					</div>

					<PreviewList 
						{...{
							previews:myPagePreviews,
							notebookClick,
							initMyPage,
							collectionClick
						}}
					/>
					
				</div>

				<div className="four wide column">
					<Aside 
						{...{
							notebooks,
							userInfo,
							notebookClick,
							myInfo,
							updateUserIntro
						}}
					/>
				</div>

			</div>
		)
	}

}