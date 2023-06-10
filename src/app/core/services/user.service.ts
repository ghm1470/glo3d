import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  addUsers(userList: UserModel[]) {
    let oldUserList: any = localStorage.getItem('userList');
    if (oldUserList) {
      oldUserList = JSON.parse(oldUserList);
      userList = oldUserList.concat(userList);
    }
    localStorage.setItem('userList', JSON.stringify(userList))
  }

  updateUser(user: UserModel) {
    let userList: any = localStorage.getItem('userList');
    if (userList) {
      userList = JSON.parse(userList);
      const index = userList.findIndex((u: UserModel) => u.id == user.id);
      userList[index] = user;
    }
    localStorage.setItem('userList', JSON.stringify(userList))
  }

  deleteUser(id: number) {
    let userList: any = localStorage.getItem('userList');
    if (userList) {
      userList = JSON.parse(userList);
      const index = userList.findIndex((u: UserModel) => u.id == id);
      userList.splice(index, 1);
    }
    localStorage.setItem('userList', JSON.stringify(userList))
  }

}
