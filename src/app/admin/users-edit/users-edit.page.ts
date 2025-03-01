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
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@/app/services/user.service';
import { UserCreateType, UserType } from '@/app/models/user.model';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  personOutline,
  arrowBackOutline,
  keyOutline,
} from 'ionicons/icons';

@Component({
  selector: 'page-users-edit',
  templateUrl: './users-edit.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonToggle,
    IonIcon,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonSelect,
    IonToolbar,
    IonSelectOption,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersEditPage implements OnInit {
  user: UserType | null = null;
  formGroup: FormGroup;
  submitError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
    addIcons({ arrowBackOutline, personOutline, mailOutline, keyOutline });
  }

  onBack() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

      this.userService
        .updateOne(id, {
          email: this.formGroup.value.email,
          lastname: this.formGroup.value.email,
          name: this.formGroup.value.name,
          password: this.formGroup.value.password,
          role: this.formGroup.value.role,
          state: `${parseInt(this.formGroup.value.state)}`,
        } as UserCreateType)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/users']);
          },
        });
    }
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    this.userService.getOneById(id).subscribe({
      next: (response) => {
        this.user = response.data ?? null;

        if (this.user)
          this.formGroup.setValue({
            email: this.user.email,
            lastname: this.user.lastname,
            password: '',
            name: this.user.name,
            role: this.user.role,
            state: this.user.state,
          });
      },
      error: (err) => {
        this.router.navigate(['/users']);
      },
    });
  }
}
