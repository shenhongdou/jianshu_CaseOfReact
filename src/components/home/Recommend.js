import {Link} from 'react-router-dom';
import S from './style.scss';
import Author from './Author';

export default function Recommend(props){

    let {history,initMyPage,authors} = props;
    
    return (
        <div className={S.recommend}>
            <div className={S.title}>
                <span>作者列表</span>
            </div>
            <div className="ui items">
                {
                    authors.map((elt, i)=>{
                        return (
                            <Author
                                {...{
                                    user: elt,
                                    history,
                                    initMyPage
                                }}
                                key={i}
                            />);
                    })
                }
            </div>
        </div>
    );
}
