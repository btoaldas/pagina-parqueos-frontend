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
  IonText,
  IonLabel,
  IonItem,
  IonAvatar,
  IonIcon,
  IonList,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { ProfileService } from '@/app/services/profile.service';
import { UserType } from '@/app/models/user.model';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  peopleOutline,
  personOutline,
  key,
  star,
  arrowForward,
  logOutOutline,
} from 'ionicons/icons';
import { AuthService } from '@/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonList,
    IonIcon,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonInput,
    IonText,
    ReactiveFormsModule,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage implements OnInit {
  editForm: FormGroup;
  infoEdit: boolean = false;
  user?: UserType | null = null;
  editError: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
    });
    addIcons({
      personOutline,
      mailOutline,
      key,
      arrowForward,
      logOutOutline,
      star,
      peopleOutline,
    });
  }

  onSubmitEdit() {
    if (this.editForm.valid) {
      const { name, lastname } = this.editForm.value;
      this.profileService.updateInfo(name, lastname).subscribe({
        next: (response) => {
          if (this.user) {
            this.user.name = name;
            this.user.lastname = lastname;
          }
          this.editError = null;
        },
        error: (err) => {
          this.editError = err;
        },
        complete: () => {
          this.infoEdit = false;
        },
      });
    }
  }

  onEditInfo() {
    this.infoEdit = true;
  }

  onCancelEditInfo() {
    this.infoEdit = false;
  }

  onEndSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.profileService.info().subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }
}
