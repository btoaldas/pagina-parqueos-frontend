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
} from '@ionic/angular/standalone';
import {
  peopleOutline,
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '@/app/services/auth.service';

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
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    addIcons({ peopleOutline, lockClosedOutline, eyeOffOutline, eyeOutline });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Aquí iría tu lógica para el login
      console.log('Email:', email, 'Password:', password);

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error en el login:', err);
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

  ngOnInit() {}
}
