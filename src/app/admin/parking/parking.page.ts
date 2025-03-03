import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  createOutline,
  closeOutline,
  closeCircleOutline,
  locationOutline,
  accessibilityOutline,
  carOutline,
  bicycleOutline,
  stopCircleOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { ZoneService } from '@/app/services/zone.service';
import { ZoneType } from '@/app/models/zone.model';
import { SpaceType } from '@/app/models/space.model';
import { SpaceService } from '@/app/services/space.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ParkingPage implements OnInit {
  zones: Array<ZoneType> = [];
  spaces: Array<SpaceType> = [];
  buttonFocus: number = -1;

  constructor(
    private zoneService: ZoneService,
    private spaceService: SpaceService
  ) {
    addIcons({
      addCircleOutline,
      locationOutline,
      createOutline,
      closeOutline,
      accessibilityOutline,
      carOutline,
      bicycleOutline,
      stopCircleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
    });
  }

  calcHourString(fee: string, max_time: number) {
    const fee_n = parseFloat(fee);
    return `$${fee_n}/hora * Máx ${
      Math.round((max_time * 100) / (60 * 60)) / 100
    }h`;
  }

  onFocusZone(id: number) {
    this.buttonFocus = id;
    this.spaces = [];
    this.spaceService.getAll(id).subscribe({
      next: (response) => {
        this.spaces = response.data ?? [];
      },
    });
  }

  ngOnInit() {
    this.zoneService.getAll().subscribe({
      next: (response) => {
        this.zones = response.data ?? [];
      },
    });
  }
}
