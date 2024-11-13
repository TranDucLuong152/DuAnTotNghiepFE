import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../service/userService/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchFilterUserService } from '../../../../../service/userService/search-filter-user.service';
import { Users } from '../../../../../entity/user/users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit {
  user!: Users[];
  filteredUsers!: Users[];
  number = 0;
  totalPages = 0;
  
  theTotalElements: number = 0;
  size: number = 15;
  currentCategoryId: number = 1; 
 fullnameFilter!: string ;
  usernameFilter!: string ;
  isAdminFilter: string='123';
  isChangedPassFilter: string='123';

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private searchFilterUserService: SearchFilterUserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.searchFilterUserService.filterUser(this.usernameFilter, this.fullnameFilter, this.isAdminFilter,this.isChangedPassFilter , this.number, this.size).subscribe(
      data => {
        this.filteredUsers = data.result.content;         
        this.theTotalElements = data.result.totalElements;            
        this.totalPages = data.result.totalPages;         
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
    
}
paging(numberPage: number) {
  console.log(numberPage);
  console.log(this.totalPages);
  this.number = numberPage;
  this.getAllUsers();  
}

editUser(idUser: string) {
  this.router.navigate(['/admin/manager/managerUser/managerUser', idUser]);
}
removeUser(idUser: string){
  this.userService.removeUser(idUser).subscribe(
    () => { this.openToast("Đã khóa nhân viên thành công");
    this.getAllUsers(); 
  },
    error => this.openToast("Chưa khóa được nhân viên thành công")
);
    
  }
  
  openToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top', 
    });
  }
}

