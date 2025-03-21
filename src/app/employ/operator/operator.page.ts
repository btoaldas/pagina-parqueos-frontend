import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonText,
  IonSearchbar,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  peopleOutline,
  locationOutline,
  timeOutline,
  cashOutline,
  logOutOutline,
} from 'ionicons/icons';
import { debounceTime, Subject } from 'rxjs';
import { TicketService } from '@/app/services/ticket.service';
import { TicketModel } from '@/app/models/ticket.model';
import { VehicleModel } from '@/app/models/vehicle.model';
import { VehicleService } from '@/app/services/vehicle.service';
import { SpaceService } from '@/app/services/space.service';
import { SpaceResponse } from '@/app/models/space.model';
import { FineResponse } from '@/app/models/fine.model';
import { FineService } from '@/app/services/fine.service';
import { environment } from '@/environments/environment.prod';
import { TicketCreateComponent } from '../../shared/ticket-create/ticket-create.component';
import { VehicleUserCreateComponent } from '../../shared/vehicle-user-create/vehicle-user-create.component';
import { FineCreateComponent } from '../../shared/fine-create/fine-create.component';

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
    IonImg,
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
    ReactiveFormsModule,
    FormsModule,
    TicketCreateComponent,
    VehicleUserCreateComponent,
    FineCreateComponent,
  ],
})
export class OperatorPage implements OnInit {
  selectedTab: 'tickets' | 'multas' = 'tickets';

  searchTickets = new Subject<string>();
  tickets: TicketModel[] = [];

  isOpenNewOperator: boolean = false;
  isOpenNewFine: boolean = false;

  vehicles: VehicleModel[] = [];
  spaces: SpaceResponse[] = [];
  fines: FineResponse[] = [];

  constructor(
    private vehicleService: VehicleService,
    private ticketService: TicketService,
    private fineService: FineService,
    private spaceService: SpaceService,
    private fb: FormBuilder
  ) {
    this.searchTickets
      .pipe(debounceTime(250)) // Espera 1 segundo (1000ms)
      .subscribe((s) => this.performSearch(s));
    addIcons({
      peopleOutline,
      addCircleOutline,
      timeOutline,
      logOutOutline,
      cashOutline,
      locationOutline,
    });
  }

  bakeImage(fine?: FineResponse | null) {
    if (!fine) return '';
    return environment.apiUrl + '/storage/fine/' + fine.filename;
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    this.searchTickets.next(searchTerm);
  }

  onPay(id: number) {
    this.ticketService.complete(id).subscribe({
      next: (response) => {
        const ticket = this.tickets.find((t) => t.id === id);
        if (!ticket) return;
        ticket.state = 'finalizado';
      },
    });
  }

  onPayFine(id: number) {
    this.fineService.pay(id).subscribe({
      next: (response) => {
        const fine = this.fines.find((f) => f.id === id);
        if (!fine) return;
        fine.state = 'pagada';
      },
    });
  }

  performSearch(searchTerm: string): void {
    this.ticketService.getByPlate(searchTerm ? searchTerm : '_').subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets = response.data;
      },
    });
  }

  openNewFine() {
    this.isOpenNewFine = true;
  }
  openNewTicket() {
    this.isOpenNewOperator = true;
  }

  addTicket(id: number) {
    this.ticketService.get(id).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets.push(response.data);
      },
    });
  }

  addFine(id: number) {
    this.fineService.get(id).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.fines.push(response.data);
      },
    });
  }

  /* init ionic view */
  ionViewWillEnter() {
    this.spaceService.getAll().subscribe({
      next: (response) => {
        if (!response.data) return;
        console.log({ space: response.data });
        this.spaces = response.data;
      },
    });
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.vehicles = response.data;
      },
    });
    this.ticketService.getByPlate('_').subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets = response.data;
        console.log(this.tickets);
      },
    });
    this.fineService.getFines().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.fines = response.data;
      },
    });
  }

  ngOnInit() {}
}
