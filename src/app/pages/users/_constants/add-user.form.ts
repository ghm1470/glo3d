import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LevelEnum} from "../../../core/models/level.enum";

export const ADD_USER_FORM_CONST = {
  create: (id:number) => {

    return new FormGroup({
      users: new FormArray([
        new FormGroup({
          id: new FormControl(id, Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          status: new FormControl<boolean>(true, Validators.required),
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          level: new FormControl<LevelEnum>(LevelEnum.User, Validators.required),
          createdAt: new FormControl(new Date(), Validators.required),
        }),
      ]),
    });
  },
  addNewUser: (id:number) => {


    return new FormGroup({
      id: new FormControl(id, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl<boolean>(true, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      level: new FormControl<LevelEnum>(LevelEnum.User, Validators.required),
      createdAt: new FormControl(new Date(), Validators.required),
    })
  },

};
