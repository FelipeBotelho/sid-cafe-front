import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  showScrollTop = false;

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > 50;
    this.showScrollTop = scrollPosition > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
