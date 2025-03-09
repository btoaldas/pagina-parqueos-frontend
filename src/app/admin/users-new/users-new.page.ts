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
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { UserService } from '@/app/services/user.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { keyOutline, mailOutline, personOutline } from 'ionicons/icons';
import { UserCreateType } from '@/app/models/user.model';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.page.html',
  standalone: true,
  imports: [
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonToggle,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersNewPage implements OnInit {
  formGroup: FormGroup;
  submitError: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      role: ['cliente', [Validators.required]],
      state: [0, [Validators.required]],
    });
    addIcons({
      personOutline,
      mailOutline,
      keyOutline,
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const data: UserCreateType = {
        email: this.formGroup.value.email,
        lastname: this.formGroup.value.lastname,
        name: this.formGroup.value.name,
        password: this.formGroup.value.password,
        role: this.formGroup.value.role,
        state: this.formGroup.value.state + 0,
      };

      this.userService.createOne(data).subscribe({
        next: (response) => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.submitError = JSON.stringify(error);
        },
      });
    }
  }

  ngOnInit() {}
}
