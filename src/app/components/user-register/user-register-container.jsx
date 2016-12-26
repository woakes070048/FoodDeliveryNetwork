 import React, {
   Component,
 } from 'react';
 import UserRegisterEmailPasswordContainer from './user-register-email-password-container';
 import SocialLoginContainer from '../social-login/social-login-container';

 class UserRegisterContainer extends Component {
   render() {
     return (
         <div>
             <UserRegisterEmailPasswordContainer />
             <SocialLoginContainer />
         </div>
     );
   }
 }

 export default UserRegisterContainer;
