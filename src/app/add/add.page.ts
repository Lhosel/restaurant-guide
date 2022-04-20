import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public toastController: ToastController, public formBuilder: FormBuilder) { }

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

  async addRestaurant() {
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

      var toast = await this.toastController.create({
        message: 'Restaurant Successfully Added',
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
