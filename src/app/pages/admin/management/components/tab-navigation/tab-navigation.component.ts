import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss']
})
export class TabNavigationComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab: string = '';
  
  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tabId: string) {
    this.tabChange.emit(tabId);
  }
}