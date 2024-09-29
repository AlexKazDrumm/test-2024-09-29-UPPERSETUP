import { makeAutoObservable } from 'mobx';
import { UserData } from '../models';

class UserStore {
  user: UserData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUserData() {
    this.user = {
      name: 'John Doe',
      avatarUrl: '',
    };
  }
}

const userStore = new UserStore();
export default userStore;