import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'
//import { authenticate, loadClient, execute } from '../apis/googleSheetAPI';
import { handleClientInit } from '../apis/googleSheetAPI';

class GoogleAuth extends React.Component{

    componentDidMount() {
        window.gapi.load('client:auth2', ()=>{
            handleClientInit().then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
                
            });
        });
    }

    // action creator 실행
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getBasicProfile().getEmail());
            
        
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();

    }
    renderAuthButton(){

        if (this.props.isSignedIn === null) {
            return <div>로딩중</div>;
        
        }else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        }else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }
    
    render (){
        return (   
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        isSignedIn : state.auth.isSignedIn,
        userId : state.auth.userId
    };
    
}

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);

//720033180170-cqlgt2l5o1gaqeuc1vtn140aitrm0sga.apps.googleusercontent.com