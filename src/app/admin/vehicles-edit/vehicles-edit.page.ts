import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonSearchbar,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { VehicleUserCreateComponent } from '../../shared/vehicle-user-create/vehicle-user-create.component';
import { VehicleService } from '@/app/services/vehicle.service';
import { VehicleModel, VehicleRequest } from '@/app/models/vehicle.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@/app/services/user.service';
import { UserType } from '@/app/models/user.model';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.page.html',
  standalone: true,
  imports: [
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    VehicleUserCreateComponent,
  ],
})
export class VehiclesEditPage implements OnInit {
  vehicles: VehicleModel[] = [];
  user: UserType | null = null;
  loading: boolean = false;
  loadingSecondary: boolean = false;

  kind: 'new' | 'existing' | null = null;

  vehiclesWithoutUser: VehicleModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private userService: UserService
  ) {
    addIcons({ addOutline });
  }

  onClose() {
    this.loading = false;
    this.loadingSecondary = false;
    this.kind = null;
  }

  onNew() {
    this.loading = true;
    this.loadingSecondary = false;
    this.kind = 'new';
  }

  onExisting() {
    this.vehiclesWithoutUser = [];
    this.loading = true;
    this.loadingSecondary = false;
    this.kind = 'existing';
    this.vehicleService.getVehiclesWithoutUser().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.vehiclesWithoutUser = response.data;
      },
    });
  }

  onSelectExisting(id: number) {
    this.loadingSecondary = true;
    this.vehicleService.updateVehicleUser(id, this.user?.id ?? 0).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.loading = false;
        this.kind = null;
        const vehicle = this.vehiclesWithoutUser.find((v) => v.id === id);
        if (!vehicle) return;
        this.vehicles.push(vehicle);
      },
    });
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    this.userService.getOneById(id).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.user = response.data;
      },
    });

    this.vehicleService.getVehiclesByUser(id).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.vehicles = response.data;
      },
    });
  }
}
