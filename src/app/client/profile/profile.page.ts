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
  IonModal,
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
    IonModal,
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
    IonTitle,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage implements OnInit {
  editForm: FormGroup;
  passwordForm: FormGroup;
  infoEdit: boolean = false;
  user?: UserType | null = null;
  editError: string | null = null;
  isPasswordOpen = false;

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
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(1)]],
      'new-password': ['', [Validators.required, Validators.minLength(1)]],
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

  onSubmitUpdatePassword() {
    if (!this.passwordForm.valid) return;
    const { password, 'new-password': newPassword } = this.passwordForm.value;
    this.profileService.updatePassword(password, newPassword).subscribe({
      next: (response) => {
        this.isPasswordOpen = false;
      },
    });
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

  closeModal() {
    this.isPasswordOpen = false;
  }
  openModal() {
    this.isPasswordOpen = true;
  }

  ngOnInit() {
    this.profileService.info().subscribe({
      next: (response) => {
        this.user = response.data;
      },
    });
  }
}
