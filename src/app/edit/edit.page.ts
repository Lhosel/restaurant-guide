import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  restaurant: any;
  name: string;
  address: string;
  description: string;
  phone: string;
  tag: string;
  rating: string;

  constructor(private activatedRouter: ActivatedRoute, public toastController: ToastController, private router: Router) {
    this.restaurant = JSON.parse(this.activatedRouter.snapshot.paramMap.get('restaurant'));

    this.name = this.restaurant.name;
    this.address = this.restaurant.address;
    this.description = this.restaurant.description;
    this.phone = this.restaurant.phone;
    this.tag = this.restaurant.tag;
    this.rating = this.restaurant.rating;
  }

  ngOnInit() { }

  async editRestaurant() {
    let restaurant = { "name": this.name, "address": this.address, "description": this.description, "phone": this.phone, "tag": this.tag, "rating": this.rating }

    window.localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

    const toast = await this.toastController.create({
      message: 'Restaurant Successfully Editted',
      duration: 2000
    });

    toast.present();

    window.location.href = '/list';
  }

  home() {
    window.location.href = '/list';
  }

}
