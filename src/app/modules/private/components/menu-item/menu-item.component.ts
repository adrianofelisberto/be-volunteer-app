import { Component, OnInit, Input, Attribute } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  routerLink: string;

  constructor(
    @Attribute('link') public link: string,
    @Attribute('label') public label: string,
  ) {
    this.routerLink = `/private/${link}`;
  }

  ngOnInit(): void {
  }

}
