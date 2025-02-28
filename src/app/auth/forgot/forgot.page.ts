import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
})
export class ForgotPage implements OnInit {
  phase: number = 1;

  constructor(private router: Router) {
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
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
