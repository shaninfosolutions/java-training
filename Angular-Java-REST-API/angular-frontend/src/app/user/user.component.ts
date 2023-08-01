import { Component ,OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service'
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {


  users: User[]  | undefined;
  //users: User[];
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUsers();
    });
  }
}
