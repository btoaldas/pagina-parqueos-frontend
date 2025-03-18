import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
  IonModal,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
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
import { SpaceResponse } from '@/app/models/space.model';
import { SpaceService } from '@/app/services/space.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonModal,
    IonIcon,
    IonButton,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ParkingPage implements OnInit {
  zones: Array<ZoneType> = [];
  spaces: Array<SpaceResponse> = [];
  buttonFocus: number = -1;
  zoneEditForm: FormGroup;
  spaceEditForm: FormGroup;

  zoneEditIndex: number = -1;
  spaceEditIndex: number = -1;
  isZoneEditOpen: boolean = false;
  isSpaceNewOpen: boolean = false;
  isNewZone: boolean = false;

  zoneError: string | null = null;
  spaceError: string | null = null;

  constructor(
    private zoneService: ZoneService,
    private spaceService: SpaceService,
    private fb: FormBuilder
  ) {
    this.zoneEditForm = this.fb.group({
      name: ['', [Validators.required]],
      fee: [0, [Validators.required, Validators.min(0)]],
      maxTime: [0, [Validators.required, Validators.min(0)]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.spaceEditForm = this.fb.group({
      state: ['disponible', [Validators.required]],
      type: ['automovil', [Validators.required]],
      latitude: [0, [Validators.required, Validators.min(0)]],
      longitude: [0, [Validators.required, Validators.min(0)]],
    });
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

  closeModals() {
    this.isZoneEditOpen = false;
    this.isSpaceNewOpen = false;
  }

  openEditZone(id?: number) {
    this.isZoneEditOpen = true;
    this.zoneError = null;
    if (id == null) {
      this.isNewZone = true;
      return;
    }
    this.isNewZone = false;
    const zone = this.zones.find((z) => z.id === id);
    if (!zone) return;
    this.zoneEditForm.setValue({
      name: zone.name,
      fee: parseFloat(zone.fee),
      maxTime: zone.max_time,
    });
  }

  saveEditZone() {
    if (!this.zoneEditForm.valid) {
      this.zoneError = ErrorParser.handleFormError(this.zoneEditForm);
      return;
    }

    const {
      name,
      fee,
      maxTime: max_time,
      address,
      description,
    } = this.zoneEditForm.value;

    if (this.isNewZone) {
      this.zoneService
        .createZone(name, fee, max_time * 60 * 60, address, description)
        .subscribe({
          next: (response) => {
            this.isZoneEditOpen = false;
          },
          complete: () => this._loadZones(),
          error: (err) => {
            this.zoneError = ErrorParser.handleError(err);
          },
        });
    } else {
      this.zoneService
        .updateZone(
          this.zoneEditIndex,
          name,
          fee,
          max_time * 60 * 60,
          address,
          description
        )
        .subscribe({
          next: (response) => {
            const zone = this.zones.find((z) => z.id === this.zoneEditIndex);
            if (zone) {
              zone.name = name;
              zone.max_time = max_time;
              zone.fee = fee;
            }
          },
          complete: () => {
            this.isZoneEditOpen = false;
            this._loadZones();
          },
          error: (err) => (this.zoneError = ErrorParser.handleError(err)),
        });
    }
  }

  openSpaceNew(id?: number) {
    this.isSpaceNewOpen = true;
    this.spaceError = null;
    if (id == null) {
      this.isNewZone = true;
      return;
    }
    this.isNewZone = false;
    this.spaceEditIndex = id;
    const space = this.spaces.find((s) => s.id === id);
    if (!space) return;
    console.log({ space });
    this.spaceEditForm.setValue({
      state: space.state,
      type: space.type,
    });
  }

  saveSpaceNew() {
    if (!this.spaceEditForm.valid) {
      this.spaceError = ErrorParser.handleFormError(this.spaceEditForm);
      return;
    }

    const { state, type, latitude, longitude } = this.spaceEditForm.value;

    if (this.isNewZone) {
      this.spaceService
        .createSpace(type, state, latitude, longitude, this.zoneEditIndex)
        .subscribe({
          next: (response) => {
            console.log({ response });
            this.isSpaceNewOpen = false;
          },
          complete: () => this.onFocusZone(this.zoneEditIndex),
          error: (err) => (this.spaceError = ErrorParser.handleError(err)),
        });
    } else {
      this.spaceService
        .updateSpace(this.spaceEditIndex, type, state, this.zoneEditIndex)
        .subscribe({
          next: (response) => {
            const space = this.spaces.find((s) => s.id === this.spaceEditIndex);
            if (space) {
              space.type = type;
              space.state = state;
            }
          },
          complete: () => {
            this.isSpaceNewOpen = false;
            this.onFocusZone(this.zoneEditIndex);
          },
          error: (err) => (this.spaceError = ErrorParser.handleError(err)),
        });
    }
  }

  calcHourString(fee: string, max_time: number) {
    const fee_n = parseFloat(fee);
    return `$${fee_n}/hora * Máx ${
      Math.round((max_time * 100) / (60 * 60)) / 100
    }h`;
  }

  onFocusZone(id: number) {
    this.buttonFocus = id;
    this.zoneEditIndex = id;
    this.spaces = [];
    this.spaceService.getAllByZone(this.zoneEditIndex).subscribe({
      next: (response) => {
        console.log(response.data);
        this.spaces = response.data ?? [];
      },
      error: (err) => console.error('ERROR'),
      complete: () => console.log('completed'),
    });
  }

  ngOnInit() {
    this._loadZones();
  }

  _loadZones() {
    this.zoneService.getAll().subscribe({
      next: (response) => {
        this.zones = response.data ?? [];
      },
    });
  }
}
