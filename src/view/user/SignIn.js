
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';
import {Route} from 'react-router-dom';

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        let {signInAjax,signInMsg,clearLoginMsg} = this.props;
        return (

            <EntryPanel >
                <SignInPanel {...{
                    signInAjax,
                    signInMsg,
                    clearLoginMsg
                }} />
            </EntryPanel>
        );
    }
}
