import * as React from 'react';
import {MemberEntity} from './model/member';


interface Props  {
  member : MemberEntity;
}

export const MemberRow = (props: Props) => {

     return (
       <tr>
         <td>
           <img src={props.member.avatar_url} className="avatar img-responsive" style={{maxWidth: '100px'}}/>
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
