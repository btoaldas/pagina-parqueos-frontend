import { VehicleModel } from '@/app/models/vehicle.model';
import { VehicleService } from '@/app/services/vehicle.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonLabel,
  IonItem,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-vehicle-user-create',
  templateUrl: './vehicle-user-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, IonLabel, IonItem, IonText, IonButton],
})
export class VehicleUserCreateComponent implements OnInit {
  @Input() vehicles: VehicleModel[] = [];

  @Output() vehiclesChange: EventEmitter<VehicleModel[]> = new EventEmitter<
    VehicleModel[]
  >();

  vehicleForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [0, [Validators.required, Validators.min(0)]],
      taxable_base: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (!this.vehicleForm.valid) return;

    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;

    this.vehicleService
      .createVehicle({ ...this.vehicleForm.value, id_user: null })
      .subscribe({
        next: (vehicle) => {
          if (vehicle.data == null) return;

          this.vehicles.push({
            id: vehicle.data,
            plate: this.vehicleForm.value.plate,
          });
          this.vehiclesChange.emit(this.vehicles);

          this.successMessage = 'Vehicle created successfully';
        },
        error: (err) => {
          this.errorMessage = ErrorParser.handleError(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  ngOnInit() {}
}
