import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonLabel,
  IonItem,
  IonAvatar,
  IonIcon,
  IonList,
  IonInput,
} from '@ionic/angular/standalone';
import { ProfileService } from '@/app/services/profile.service';
import { UserType } from '@/app/models/user.model';
import { addIcons } from 'ionicons';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [
    IonInput,
    IonList,
    IonIcon,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage implements OnInit {
  user?: UserType | null = null;

  constructor(private profileService: ProfileService) {
    addIcons({});
  }

  // HttpInterceptorFn

  ngOnInit() {
    this.profileService.info().subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }
}
