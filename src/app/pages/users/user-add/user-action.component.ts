import {Component, Inject, Input, OnInit} from '@angular/core';
import {ADD_USER_FORM_CONST} from "../_constants/add-user.form";
import {FormArray} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {
  addUserFormGroup = ADD_USER_FORM_CONST.create(this.getRandomId());
  mode: string = 'Add'

  constructor(private userService: UserService, private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this?.data?.user) {
      this.mode = 'Edit'
      this.setFormValue()
    }
  }

  getRandomId() {
    return Math.floor((Math.random() * 6) + 1);
  }

  setFormValue() {
    this.usersForm.controls[0].setValue(this.data.user)
  }

  get usersForm(): FormArray {
    return this.addUserFormGroup.controls.users as FormArray;
  }

  addUser() {
    if (this.usersForm.valid && this.usersForm.value.length <= 20) {
      this.addUserFormGroup.controls.users.push(ADD_USER_FORM_CONST.addNewUser(this.getRandomId()));
    }
  }

  deleteUser(index: number) {
    this.usersForm.removeAt(index);
  }

  onSubmitForm() {
    if (this.mode === 'Add') {

      this.userService.addUsers(this.usersForm.value)
    } else {

      this.userService.updateUser(this.usersForm.value[0])
    }
    this.dialogRef.closeAll();

  }


}
