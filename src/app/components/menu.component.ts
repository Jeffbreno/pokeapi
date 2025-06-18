import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  template: `
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title class="ion-text-center">Pokédex</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-list>
          <ion-menu-toggle auto-hide="true">
            <ion-item
              button
              routerLink="/home"
              routerDirection="root"
              lines="none"
            >
              <ion-icon
                name="home-outline"
                slot="start"
                color="medium"
              ></ion-icon>
              <ion-label>Início</ion-label>
            </ion-item>

            <ion-item
              button
              routerLink="/favorites"
              routerDirection="root"
              lines="none"
            >
              <ion-icon
                name="star-outline"
                slot="start"
                color="medium"
              ></ion-icon>
              <ion-label>Favoritos</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
  `,
})
export class MenuComponent {}
