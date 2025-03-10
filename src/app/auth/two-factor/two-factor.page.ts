import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { shieldCheckmark, mailOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'page-two-factor',
  templateUrl: './two-factor.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonIcon,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class TwoFactorPage implements OnInit, OnDestroy {
  btnDisabled: boolean = true;
  counter: number = 5;
  private interval: any;

  constructor(private router: Router) {
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
    this.router.navigateByUrl('/home', { skipLocationChange: true });
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
