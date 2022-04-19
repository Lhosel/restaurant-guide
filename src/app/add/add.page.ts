import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name?: string;
  address?: string;
  description?: string;
  phone?: string;
  tag?: string;
  rating?: string = "5";

  constructor(public toastController: ToastController) { }

  ngOnInit() { }

  async addRestaurant() {
    let restaurant = { "name": this.name, "address": this.address, "description": this.description, "phone": this.phone, "tag": this.tag, "rating": this.rating }

    window.localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

    const toast = await this.toastController.create({
      message: 'Restaurant Successfully Added',
      duration: 2000
    });

    toast.present();

    window.location.href = '/list';
  }

  home() {
    window.location.href = '/list';
  }
}
