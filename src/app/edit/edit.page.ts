import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(private activatedRouter: ActivatedRoute, public toastController: ToastController, public formBuilder: FormBuilder) {
    this.restaurant = JSON.parse(this.activatedRouter.snapshot.paramMap.get('restaurant'));

    this.name = this.restaurant.name;
    this.address = this.restaurant.address;
    this.description = this.restaurant.description;
    this.phone = this.restaurant.phone;
    this.tag = this.restaurant.tag;
    this.rating = this.restaurant.rating;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      tag: ['', [Validators.required]]
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async editRestaurant() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      var toast = await this.toastController.create({
        message: 'Please input all fields',
        duration: 2000
      });

      toast.present();
      return false;
    } else {
      let restaurant = { "name": this.name, "address": this.address, "description": this.description, "phone": this.phone, "tag": this.tag, "rating": this.rating }

      window.localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

      const toast = await this.toastController.create({
        message: 'Restaurant Successfully Editted',
        duration: 2000
      });

      toast.present();

      window.location.href = '/list';
    }
  }

  home() {
    window.location.href = '/list';
  }

}
