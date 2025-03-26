import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonText,
  IonInput,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';
import {
  peopleOutline,
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
  personOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '@/app/services/auth.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';

@Component({
  standalone: true,
  selector: 'page-login',
  templateUrl: './login.page.html',
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonIcon,
    IonText,
    IonInput,
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonModal, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonToggle
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  loginError: string | null = null;

  // Nuevas variables para el modal y tema
  infoModalOpen: boolean = false;
  isDarkTheme: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    addIcons({
      personOutline,
      peopleOutline,
      lockClosedOutline,
      eyeOffOutline,
      eyeOutline,
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.loginTwoFactorRequest(email, password).subscribe({
        next: (response) => {
          this.router.navigate(['/two-factor'], { skipLocationChange: true });
        },
        error: (err) => {
          this.loginError = ErrorParser.handleError(err);
        },
      });
    } else {
      this.loginError =
        'Por favor ingrese su correo y contraseña correctamente.';
    }
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot']);
  }

  // Método para abrir el modal de información del proyecto
  openInfoModal() {
    this.infoModalOpen = true;
  }

  // Método para cerrar el modal
  closeInfoModal() {
    this.infoModalOpen = false;
  }

  // Método para alternar el tema claro/oscuro
  toggleTheme(event: any) {
    this.isDarkTheme = event.detail.checked;
    if (this.isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  ngOnInit() {
    // Forzamos el modo claro por defecto, sin depender de la configuración del navegador
    document.body.classList.remove('dark');
    this.isDarkTheme = false;
  }
}
