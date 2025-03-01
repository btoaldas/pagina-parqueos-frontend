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

  constructor(private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
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
    this.phase++;
  }

  onValidateCode() {
    this.phase++;
  }

  onSubmit() {}

  backtoLoggin() {
    if (this.phase > 1) this.phase--;
    else this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
