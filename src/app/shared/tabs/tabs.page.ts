import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import {
  home,
  homeOutline,
  personOutline,
  carOutline,
  eyeOutline,
  peopleOutline,
  statsChartOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
    CommonModule,
    FormsModule,
  ],
})
export class TabsPage implements OnInit {
  role: string = 'cliente';

  constructor() {
    addIcons({
      homeOutline,
      personOutline,
      carOutline,
      eyeOutline,
      peopleOutline,
      statsChartOutline,
      home,
    });
  }

  ngOnInit() {
    this.role = localStorage['authRole'];
  }
}
