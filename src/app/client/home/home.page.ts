import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { people, cashOutline, carOutline, warning } from 'ionicons/icons';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  constructor() {
    addIcons({ people, cashOutline, carOutline, warning });
  }

  getDate(): string {
    const fecha = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return fecha.toLocaleDateString('es-ES', options);
  }

  ngOnInit() {}
}
