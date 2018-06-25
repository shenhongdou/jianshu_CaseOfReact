
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';
import cfg from 'config/config.json';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previews:[],
            authors:[]
        }
        this.collectionClick = this.collectionClick.bind(this);
    }

    componentDidMount(){

        $.post(`${cfg.url}/getPreview`).done(res=>{
           if(res.code === 0){
                this.setState({previews:res.data});
           }
        });

        $.post(`${cfg.url}/getAuthor`).done(res=>{
            if(res.code === 0){
                this.setState({authors:res.data});
           }
        });

    }

    collectionClick(collection_id,collction_name,userInfo){
        let {history,initMyPage} = this.props;
        history.push('/my_page',{userInfo});
        initMyPage(collection_id,{collection_id},collction_name);
    }

    render(){

        let {previews,authors} = this.state;
        let {initMyPage,history} = this.props;
        let {collectionClick} =this;

        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList {...{
                        previews,
                        initMyPage,
                        collectionClick
                    }}/>
                </div>
                <div className="column four wide">
                    <Recommend {...{
                        authors,
                        history,
                        initMyPage

                    }} />
                </div>
            </div>
        );
    }
}

