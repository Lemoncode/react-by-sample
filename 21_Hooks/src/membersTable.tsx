import * as React from 'react';
import { MemberEntity } from './model/member';
import { memberAPI } from './api/memberAPI';
import { MemberRow } from './memberRow';
import { MemberHead } from './memberHead';
import { } from 'core-js';

function useMembers() {
  const [members, setMembers] = React.useState([]);

  const loadMembers = () => {
    memberAPI.getAllMembers().then((members) =>
      setMembers(members)
    );
  }

  return { members, loadMembers};
}

export const MembersTableComponent = () => {
  const { members, loadMembers } = useMembers();

  React.useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="row">
      <h2> Members Page</h2>
      <table className="table">
        <thead>
          <MemberHead />
        </thead>
        <tbody>
          {
            members.map((member: MemberEntity) =>
              <MemberRow key={member.id} member={member} />
            )
          }
        </tbody>
      </table>
    </div>
  );
}
