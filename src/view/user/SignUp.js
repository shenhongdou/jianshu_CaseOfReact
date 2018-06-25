
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';
import {Route} from 'react-router-dom';

export default class SiginUp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {signUpAjax,signUpMsg,clearLoginMsg} = this.props;
        return (
            <EntryPanel >
                <SignUpPanel 
                    {...{
                    signUpAjax,
                    signUpMsg,
                    clearLoginMsg
                }} 
                />
            </EntryPanel>
        );
    }
}
