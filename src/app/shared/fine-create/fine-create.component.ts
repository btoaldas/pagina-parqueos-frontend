import { VehicleModel } from '@/app/models/vehicle.model';
import { FineService } from '@/app/services/fine.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonModal,
  IonItem,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-fine-create',
  standalone: true,
  templateUrl: './fine-create.component.html',
  imports: [
    IonText,
    IonModal,
    IonHeader,
    IonItem,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonLabel,
    IonText,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export class FineCreateComponent implements OnInit, OnChanges {
  @Input() show: boolean = false;
  @Input() vehicles: VehicleModel[] = [];

  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() vehicleChange: EventEmitter<VehicleModel> =
    new EventEmitter<VehicleModel>();
  @Output() addFine: EventEmitter<number> = new EventEmitter<number>();

  image: Blob | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  videoStream: MediaStream | null = null;

  fineForm: FormGroup;

  showVehicle: boolean = false;

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private fineService: FineService) {
    this.fineForm = this.fb.group({
      id_ticket: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  close() {
    this.show = false;
    this.showChange.emit(false);
  }

  onSubmit() {
    if (!this.fineForm.valid) return;
    const { id_ticket, amount, description } = this.fineForm.value;

    this.fineService
      .create(id_ticket, parseFloat(amount), description, this.image)
      .subscribe({
        next: (response) => {
          this.show = false;
          this.showChange.emit(false);

          if (response.data == null) return;
          this.addFine.emit(response.data);
        },
        error: (err) => {
          this.errorMessage = ErrorParser.handleError(err.error);
        },
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

  stopCamera() {
    if (this.videoStream) {
      const tracks = this.videoStream.getTracks();
      tracks.forEach((track) => track.stop());
      this.videoStream = null;
    }

    if (this.videoElement) {
      console.log(this.videoElement);
      this.videoElement.nativeElement.srcObject = null;
    }
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

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && changes['show'] && changes['show'].currentValue) {
      this.startCamera();
    }

    if (!this.show && changes['show'] && changes['show'].previousValue) {
      console.log('stop camera');
      this.stopCamera();
    }
  }
}
