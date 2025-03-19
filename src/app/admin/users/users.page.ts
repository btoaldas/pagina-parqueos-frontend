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
  IonButton,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  closeCircleOutline,
  createOutline,
  personCircle,
  personCircleOutline,
  checkmarkCircleOutline,
  carOutline,
} from 'ionicons/icons';
import { debounceTime, Subject } from 'rxjs';
import { UserType } from '@/app/models/user.model';
import { UserService } from '@/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-users',
  templateUrl: './users.page.html',
  standalone: true,
  imports: [
    IonSearchbar,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    CommonModule,
    FormsModule,
  ],
})
export class UsersPage implements OnInit {
  users: UserType[] = [];
  searchSubject = new Subject<string>();

  constructor(private router: Router, private userService: UserService) {
    this.searchSubject
      .pipe(debounceTime(250)) // Espera 1 segundo (1000ms)
      .subscribe((searchTerm: string) => {
        this.performSearch(searchTerm);
      });
    addIcons({
      addOutline,
      personCircleOutline,
      carOutline,
      closeCircleOutline,
      checkmarkCircleOutline,
      createOutline,
      personCircle,
    });
  }

  onSwitch(id: number, switchTo: number) {
    this.userService.switchUser(id, switchTo).subscribe({
      next: (response) => {
        const user = this.users.find((u) => u.id === id);
        if (user) {
          user.state = user.state === 0 ? 1 : 0;
        }
      },
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  performSearch(searchTerm: string): void {
    this.userService.getUserByText(searchTerm).subscribe({
      next: (users) => {
        this.users = users.data ?? [];
      },
    });
  }

  ngOnInit() {
    this.userService.getUserByText('').subscribe({
      next: (users) => (this.users = users.data ?? []),
    });
  }

  onNewUser() {
    this.router.navigate(['/users/new']);
  }

  onEditUser(id: number) {
    this.router.navigate(['/users/edit/' + id]);
  }

  onVehicleUpdate(id: number) {
    this.router.navigateByUrl('/vehicles/edit/' + id).then(() => {
      window.location.reload();
    });
  }
}
