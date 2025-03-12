import { Component, OnDestroy, OnInit } from '@angular/core';
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
  IonIcon,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { shieldCheckmark, mailOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';
import { ErrorParser } from '@/app/utils/ErrorParser.util';

@Component({
  selector: 'page-two-factor',
  templateUrl: './two-factor.page.html',
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonInput,
    IonIcon,
    IonContent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
})
export class TwoFactorPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  btnDisabled: boolean = true;
  counter: number = 5;
  private interval: any;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      access: ['', [Validators.required, Validators.minLength(6)]],
    });
    addIcons({ shieldCheckmark, mailOutline });
  }

  onResendCode() {
    this.btnDisabled = true;
    this.counter = 5;
    this.startCounter();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onVerify() {
    if (!this.loginForm.valid) return;

    const { access } = this.loginForm.value;

    this.authService.loginTwoFactorVerify(access).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home').then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.loginError = ErrorParser.handleError(err);
      },
    });
  }

  ngOnInit() {
    this.startCounter();
  }

  startCounter() {
    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.btnDisabled = false;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
