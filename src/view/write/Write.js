
import {Component} from 'react';
import cfg from 'config/config.json';
import S from './style.scss';

export default class Write extends Component{

    constructor(props){
        super(props);
        this.state = {
            collections:[],
            cltId:null,
            titleVal:'',
            cltVal:'',
            contentVal:''
        }

        this.titleChange = this.titleChange.bind(this);
        this.cltChange = this.cltChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addCollection = this.addCollection.bind(this);

        this.collectionName = [];
    }

    titleChange(ev){
        this.setState({titleVal:ev.target.value});
    }

    cltChange(ev){
        this.setState({cltVal:ev.target.value});
    }

    contentChange(ev){
        this.setState({contentVal:ev.target.value});
    }


    componentDidMount(){
        let user_id = this.props.myInfo.id;
        $.post(`${cfg.url}/getCollection`,{user_id}).done(({code,data})=>{
            if(code === 0){
                this.setState({collections:data});
               
            }
        });

        $(this.refs.dropdown).dropdown();
    }

    componentWillUnmount(){
        $(this.refs.dropdown).off();
    }

    onSubmit(ev){
        ev.stopPropagation();
        ev.preventDefault();

        let {value:cltId} = this.refs.cltIdInput;

        if(!cltId) return;

        let {
            titleVal:article_title,
            contentVal:article_content
        } = this.state;

        let user_id = this.props.myInfo.id;

        $.post(`${cfg.url}/addArticle`,{
            article_title,
            article_content,
            user_id,
            collection_id:cltId,
            collection_name:this.collectionName[cltId]
        }).done(({code})=>{
            if(code === 0){
                this.setState({
                    titleVal:'',
                    contentVal:''
                })
            }
        })
    }

    addCollection(ev){
        if(ev.keyCode !== 13) return;
        $.post(`${cfg.url}/addCollection`,{
            name:this.state.cltVal,
            user_id:this.props.myInfo.id
        }).done(({code,data})=>{
            if(code === 0){
                this.setState({cltVal:'',collections:data});
            }
        })

    }

    render(){

        let {collections,titleVal,cltVal,contentVal} = this.state;
        let {titleChange,cltChange,contentChange,onSubmit,collectionName,addCollection} = this;

        collections = collections.map(({id,collection_name},index)=>{
            collectionName[id] = collection_name;
            return (
                <div 
                    className="item" 
                    key={index}
                    data-value={id}
                >
                    {collection_name}
                </div>
            )
        });

        return(
            <div className="ui container">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <form
                    className="ui form"
                >
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                            value={titleVal}
                            onChange={titleChange}
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div 
                                className="ui selection dropdown" 
                                id="writeArtical"
                                ref="dropdown"
                            >
                                <input
                                    type="hidden"
                                    name="album"
                                    ref="cltIdInput"
                                />
                                <div className="default text">选择一个文集</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    {collections}
                                </div>
                            </div>
                        </div>
                        <div className="field eleven wide column">
                            <input
                                type="text"
                                className=""
                                placeholder="回车, 添加文集"
                                value={cltVal}
                                onChange={cltChange}
                                onKeyDown={addCollection}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="随便写点文字. . ."
                            value={contentVal}
                            onChange={contentChange}
                        >
                        </textarea>
                    </div>
                    <div className="field">
                        <button 
                            type="submit"
                            className="ui button primary"
                            onClick={onSubmit}

                        >保存</button>
                    </div>

                </form>
            </div>
        )
    }
}
