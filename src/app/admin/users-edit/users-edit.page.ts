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
  IonInput,
  IonIcon,
  IonSelect,
  IonToggle,
  IonText,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonButton,
  } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@/app/services/user.service';
import { UserCreateType, UserType } from '@/app/models/user.model';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  personOutline,
  arrowBackOutline,
  keyOutline, shieldCheckmarkOutline, briefcaseOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'page-users-edit',
  templateUrl: './users-edit.page.html',
  styles: [
    `
    .custom-segment-button.ion-activated {
  background-color: #007bff !important; /* Azul */
  color: #ffffff !important; /* Texto blanco */
}

.custom-segment-button.ion-activated ion-icon,
.custom-segment-button.ion-activated ion-label {
  color: #ffffff !important;
}
    .custom-segment {
  --background: #f1f3f5; /* Fondo claro para el grupo */
  --indicator-color: #007bff; /* Color del indicador de selección */
  border-radius: 8px;
  padding: 4px;
  margin: 0 auto;
  width: 100%;
  max-width: 400px; /* Opcional, para limitar el ancho */
  display: flex;
}

.custom-segment-button {
  flex: 1;  /* Hace que todos tengan el mismo ancho */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 4px;
  margin: 2px;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
}

/* Estilos para el botón activo */
.custom-segment-button.ion-activated {
  background-color: #007bff;
  color: #fff;
}

/* Opcional: ajustar los íconos */
.custom-segment-button ion-icon {
  font-size: 1.2rem;
  margin-bottom: 4px;
}
  

`,
  ],
  standalone: true,
  imports: [
    IonText,
    IonToggle,
    IonIcon,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonSelect,
    IonToolbar,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
  ],
})
export class UsersEditPage implements OnInit {
  user: UserType | null = null;
  formGroup: FormGroup;
  submitError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      state: [0, [Validators.required]],
    });
    addIcons({personOutline,mailOutline,keyOutline,shieldCheckmarkOutline,briefcaseOutline,personCircleOutline,arrowBackOutline});
  }

  onBack() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

      this.userService
        .updateOne(id, {
          email: this.formGroup.value.email,
          lastname: this.formGroup.value.lastname,
          name: this.formGroup.value.name,
          password: this.formGroup.value.password,
          role: this.formGroup.value.role,
          state: this.formGroup.value.state + 0,
        } as UserCreateType)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    this.userService.getOneById(id).subscribe({
      next: (response) => {
        this.user = response.data ?? null;

        if (this.user)
          this.formGroup.setValue({
            email: this.user.email,
            lastname: this.user.lastname,
            password: '',
            name: this.user.name,
            role: this.user.role,
            state: this.user.state,
          });
      },
      error: (err) => {
        this.router.navigate(['/users']);
      },
    });
  }
}
