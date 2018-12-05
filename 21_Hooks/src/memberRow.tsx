import * as React from 'react';
import {MemberEntity} from './model/member';

export const MemberRow = (props: {member : MemberEntity}) =>
       <tr>
         <td>
           <img src={props.member.avatar_url} style ={{maxWidth: '10rem'}}/>
         </td>
         <td>
           <span>{props.member.id}</span>
         </td>
         <td>
           <span>{props.member.login}</span>
         </td>
       </tr>
