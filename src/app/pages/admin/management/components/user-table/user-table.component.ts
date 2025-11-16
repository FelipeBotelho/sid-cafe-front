import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() users: User[] = [];
}