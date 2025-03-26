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
  @Input() id_user: number | null = null;

  @Output() vehiclesChange: EventEmitter<VehicleModel[]> = new EventEmitter<
    VehicleModel[]
  >();

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

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
      .createVehicle({ ...this.vehicleForm.value, id_user: this.id_user })
      .subscribe({
        next: (vehicle) => {
          if (vehicle.data == null) return;

          this.vehicles.push({
            id: vehicle.data,
            plate: this.vehicleForm.value.plate,
            brand: this.vehicleForm.value.brand,
            model: this.vehicleForm.value.model,
            year: this.vehicleForm.value.year,
            taxable_base: this.vehicleForm.value.taxable_base,
            id_user: this.id_user,
          });
          this.vehiclesChange.emit(this.vehicles);
          this.onClose.emit();

          this.successMessage = 'Vehiculo creado correctamente';
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
