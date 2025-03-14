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
  IonIcon,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import {
  arrowBackOutline,
  peopleOutline,
  lockClosedOutline,
  mailOutline,
  keyOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'page-forgot',
  templateUrl: './forgot.page.html',
  imports: [
    IonButton,
    IonInput,
    IonContent,
    IonIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ForgotPage implements OnInit {
  phase: number = 1;
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  enableSendCode: boolean = false;
  enableValidateCode: boolean = false;
  enableRestoreCode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
    addIcons({
      arrowBackOutline,
      mailOutline,
      keyOutline,
      lockClosedOutline,
      peopleOutline,
    });
  }

  onSendCode() {
    this.enableSendCode = true;

    if (!this.emailForm.valid) return;
    const { email } = this.emailForm.value;

    this.authService.requestPassword(email).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.phase++;
      },
      complete: () => {
        this.enableRestoreCode = false;
      },
    });
  }

  onValidateCode() {
    this.enableValidateCode = true;

    if (!this.emailForm.valid) return;
    if (!this.codeForm.valid) return;
    const { email } = this.emailForm.value;
    const { code } = this.codeForm.value;

    this.authService.validateRequest(email, code).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.phase++;
      },
      complete: () => {
        this.enableValidateCode = false;
      },
    });
  }

  onSubmit() {
    this.enableRestoreCode = true;

    if (!this.emailForm.valid) return;
    if (!this.codeForm.valid) return;
    if (!this.passwordForm.valid) return;

    const { email } = this.emailForm.value;
    const { code } = this.codeForm.value;
    const { newPassword: password } = this.passwordForm.value;

    this.authService.updatePassword(email, code, password).subscribe({
      next: (response) => {
        if (!response.data) return;
        this.phase++;
        this.router.navigate(['/login']);
      },
      complete: () => {
        this.enableRestoreCode = false;
      },
    });
  }

  backtoLoggin() {
    if (this.phase > 1) this.phase--;
    else this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
