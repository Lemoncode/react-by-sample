import { MemberEntity } from '../model/member';
import Axios from 'axios';

const gitHubURL = 'https://api.github.com';
const gitHubMembersUrl = `${gitHubURL}/orgs/lemoncode/members`;

const getAllMembers = (): Promise<MemberEntity[]> => {
  const promise: Promise<MemberEntity[]> = new Promise((resolve, reject) => {
    try {
      Axios.get<MemberEntity[]>(gitHubMembersUrl)
        .then(response => resolve(mapMemberListApiToModel(response.data)));
    } catch (ex) {
      reject(ex);
    }
  });

  return promise;
};

const mapMemberListApiToModel = (data: MemberEntity[]) =>
  data.map(gitHubMember => gitHubMember);

export const memberAPI = {
  getAllMembers,
};
