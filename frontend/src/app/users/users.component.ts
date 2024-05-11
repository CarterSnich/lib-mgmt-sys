import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminSideLinksComponent } from '../admin-side-links/admin-side-links.component';
import { User } from '../shared/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [AdminSideLinksComponent, CommonModule],
})
export class UsersComponent implements OnInit {
  user?: User;
  users: User[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<User[]>('http://localhost:8000/api/users')
      .subscribe((users) => (this.users = users));
  }
}
