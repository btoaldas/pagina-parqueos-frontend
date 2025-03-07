import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonText,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, peopleOutline } from 'ionicons/icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.page.html',
  styles: [
    `
      ion-segment-button::part(indicator-background) {
        background: rgb(107 114 128);
      }
    `,
  ],
  standalone: true,
  imports: [
    IonSearchbar,
    IonText,
    IonButton,
    IonIcon,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class OperatorPage implements OnInit {
  ticketSubject = new Subject<string>();
  selectedTab: 'entrada' | 'salida' | 'multas' = 'entrada';

  constructor() {
    this.ticketSubject.subscribe((searchTerm: string) => {
      console.log({ searchTerm });
    });
    addIcons({ peopleOutline, addCircleOutline });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    this.ticketSubject.next(searchTerm);
  }

  ngOnInit() {}
}
