import * as React from 'react';
import {MemberEntity} from './model/member';




export const MemberRowComponent = (props: {member : MemberEntity}) => {

     return (
       <tr>
         <td>
           <img src={props.member.avatar_url} style ={{maxWidth: '150px'}}/>
         </td>
         <td>
           <span>{props.member.id}</span>
         </td>
         <td>
           <span>{props.member.login}</span>
         </td>
       </tr>
     );
}
