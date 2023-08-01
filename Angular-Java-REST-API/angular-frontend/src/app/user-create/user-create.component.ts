import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent implements OnInit {

  user: User=new User() ;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.redirectToUserList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  redirectToUserList() {
    this.router.navigate(['/user']);
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}