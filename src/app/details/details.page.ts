import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  restaurant: any;
  rating?: number;

  constructor(private activatedRouter: ActivatedRoute, public toastController: ToastController, private router: Router, private socialSharing: SocialSharing, private platform: Platform) {
    this.restaurant = JSON.parse(this.activatedRouter.snapshot.paramMap.get('restaurant'));
  }

  ngOnInit() {
    this.rating = this.restaurant.rating
  }

  async setRating() {
    let restaurant = { "name": this.restaurant.name, "address": this.restaurant.address, "description": this.restaurant.description, "phone": this.restaurant.phone, "tag": this.restaurant.tag, "rating": this.rating }

    window.localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

    const toast = await this.toastController.create({
      message: 'Rating Successfully Added',
      duration: 2000
    });
    toast.present();

    window.location.href = '/list';
  }

  share() {
    var options = {
      message: `You should try out ${this.restaurant.name}! Located at: ${this.restaurant.address}! I rate it ${this.restaurant.rating} stars.`
    };
    if (this.platform.is('desktop')) {
      navigator.share({
        'title': this.restaurant.name,
        'text': options.message,
      }).then(function () {
        console.log('Successful share');
      }).catch(function (error) {
        console.log('Error sharing:', error)
      });
    }
    else {
      this.socialSharing.shareWithOptions(options);
    }
  }

  home() {
    window.location.href = '/list';
  }

  edit() {
    this.router.navigate([`edit/${this.activatedRouter.snapshot.paramMap.get('restaurant')}`]);
  }

  directions(restaurant: any) {
    this.router.navigate([`map/${JSON.stringify(restaurant)}`])
  }
}
