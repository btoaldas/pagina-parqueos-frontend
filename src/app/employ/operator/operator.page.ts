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
    IonModal,
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
    IonSelect,
    IonSelectOption,
    IonItem,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class OperatorPage implements OnInit, AfterViewInit {
  selectedTab: 'tickets' | 'multas' = 'tickets';
  tickets: TicketModel[] = [];
  searchTickets = new Subject<string>();
  isOpenNewOperator: boolean = false;
  isOpenNewFine: boolean = false;
  vehicles: VehicleModel[] = [];
  spaces: SpaceResponse[] = [];
  fines: FineResponse[] = [];
  ticketForm: FormGroup;
  fineForm: FormGroup;
  image: Blob | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  videoStream!: MediaStream;

  ngAfterViewInit() {}

  useCamera() {
    this.startCamera();
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob: Blob | null) => {
      this.image = blob;
    });
  }

  startCamera() {
    if (navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          this.videoStream = stream;
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error al acceder a camara', err);
        });
    }
  }

  constructor(
    private vehicleService: VehicleService,
    private ticketService: TicketService,
    private fineService: FineService,
    private spaceService: SpaceService,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      plate: ['', [Validators.required]],
      id_space: [0, [Validators.required, Validators.min(0)]],
    });
    this.fineForm = this.fb.group({
      id_ticket: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
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
    const path =
      environment.apiUrl + '/storage/fine/' + fine.ticket.id + '_' + fine.id;

    if (fine.mime.includes('png')) return path + '.png';
    else return path + '.jpg';
  }

  onSubmit() {
    if (!this.ticketForm.valid) return;
    const { plate, id_space } = this.ticketForm.value;
    this.ticketService.create(id_space, plate).subscribe({
      next: (response) => {
        this.isOpenNewOperator = false;
      },
    });
  }
  onFineSubmit() {
    if (!this.fineForm.valid) return;
    const { id_ticket, amount, description } = this.fineForm.value;

    this.fineService
      .create(id_ticket, parseFloat(amount), description, this.image)
      .subscribe({
        next: (response) => {
          this.isOpenNewFine = false;
        },
      });
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
    this.ticketService.getByPlate(searchTerm).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets = response.data.filter((s) =>
          s.plate.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },
    });
  }

  openNewFine() {
    this.isOpenNewFine = true;
    this.useCamera();
  }
  openNewTicket() {
    this.isOpenNewOperator = true;
  }
  closeNewTicket() {
    this.isOpenNewOperator = false;
    this.isOpenNewFine = false;
  }

  ngOnInit() {
    this.spaceService.getAll().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.spaces = response.data;
      },
    });
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.vehicles = response.data;
      },
    });
    this.ticketService.getByPlate('').subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets = response.data;
      },
    });
    this.fineService.getFines().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.fines = response.data;
      },
    });
  }
}
