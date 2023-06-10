import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../../core/models/user.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UserActionComponent} from "../user-add/user-action.component";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Date', 'Name', 'Email', 'Status', 'Level', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<UserModel>();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(public dialog: MatDialog,private userService: UserService, ) {
  }

  ngOnInit(): void {
    this.setDataSource()
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setDataSource() {
    let userList: any = localStorage.getItem('userList');
    if (userList) {
      this.dataSource = new MatTableDataSource<UserModel>(JSON.parse(userList));
    } else {
      this.dataSource = new MatTableDataSource<UserModel>([]);
    }
  }

  addUsers() {
    const dialogRef = this.dialog.open(UserActionComponent, {
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setDataSource()
    });
  }

  removeUsers() {
    localStorage.removeItem('userList');
    this.setDataSource()
  }

  getData(event: PageEvent) {}

  onChangeUsersStatus(status: boolean) {
    this.dataSource.filteredData.filter((user: UserModel) => {
      user.status = status
    })
  }

  filterByTerm(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByLevel(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(UserActionComponent, {
      width: '80%',
      data :{user:user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setDataSource()
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
    this.setDataSource()
  }
}

