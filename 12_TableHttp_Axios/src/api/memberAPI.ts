import { MemberEntity } from '../model/member';
import Axios, { AxiosError, AxiosResponse } from 'axios';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  getAllMembers(): Promise<MemberEntity[]> {
    const gitHubMembersUrl: string = 'https://api.github.com/orgs/lemoncode/members';
    
    return Axios.get<MemberEntity[]>(gitHubMembersUrl)
      .then(this.resolveMembers)
      .catch(this.onError);
  }

  private onError(err: AxiosError): MemberEntity[] {
    console.log(err.message);
    return [];
  }

  private resolveMembers({ data }: AxiosResponse<MemberEntity[]>): MemberEntity[] {
    const members: MemberEntity[] = data.map(gitHubMember => {
      let member: MemberEntity = {
        id: gitHubMember.id,
        login: gitHubMember.login,
        avatar_url: gitHubMember.avatar_url,
      };

      return member;
    });

    return members;
  }
}

export const memberAPI = new MemberAPI();
