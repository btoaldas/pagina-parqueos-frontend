import { SpaceResponse } from '@/app/models/space.model';
import { VehicleModel } from '@/app/models/vehicle.model';
import { TicketService } from '@/app/services/ticket.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  standalone: true,
  imports: [
    IonText,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export class TicketCreateComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() vehicles: VehicleModel[] = [];
  @Input() spaces: SpaceResponse[] = [];

  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addTicket: EventEmitter<number> = new EventEmitter<number>();

  showVehicle: boolean = false;
  formTicket: FormGroup;

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.formTicket = this.fb.group({
      plate: ['', [Validators.required]],
      id_space: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {}

  close() {
    this.show = false;
    this.showChange.emit(false);
  }

  submit() {
    this.errorMessage = null;
    if (!this.formTicket.valid) return;
    const { plate, id_space } = this.formTicket.value;
    this.ticketService.create(id_space, plate).subscribe({
      next: (response) => {
        this.close();

        if (response.data == null) return;

        this.addTicket.emit(response.data);
      },
      error: (error) => {
        this.errorMessage = ErrorParser.handleError(error.err);
      },
    });
  }
}
