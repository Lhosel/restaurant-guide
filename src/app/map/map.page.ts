import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

  restaurant: any;

  currLocation: any;
  resLocation: any;

  currLatitude: number;
  currLongitude: number;
  resLatitude: number;
  resLongitude: number;

  zoom: number;
  address: string;
  private geoCoder;
  restaurants = [];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private activatedRouter: ActivatedRoute, private router: Router, private geo: Geolocation) {
    this.restaurant = JSON.parse(this.activatedRouter.snapshot.paramMap.get('restaurant'));
  }

  ngOnInit() {
    this.getRestaurants();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      console.log(this.setCurrentLocation);
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.resLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          this.resLatitude = place.geometry.location.lat();
          this.resLongitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.resLatitude, this.resLongitude);
        });
      });
    });
  }

  setCurrentLocation() {
    this.geo.getCurrentPosition({
      timeout: 1000,
      enableHighAccuracy: true
    }).then((res) => {
      this.currLatitude = res.coords.latitude;
      this.currLongitude = res.coords.longitude;
      this.currLocation = { lat: res.coords.latitude, lng: res.coords.longitude };
    }).catch((e) => {
      console.log(e);
    });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((postion) => {
        this.currLatitude = postion.coords.latitude;
        console.log(postion);
        console.log(postion.coords.latitude);
        console.log(typeof (postion.coords.latitude));
        this.currLongitude = postion.coords.longitude;
        this.currLocation = { lat: postion.coords.latitude, lng: postion.coords.longitude };
        console.log(this.currLocation);
        this.zoom = 15;
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  getRestaurants() {
    this.restaurants = [];

    for (var i = 0; i < localStorage.length; i++) {
      this.restaurants[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }

  back() {
    this.router.navigate([`details/${JSON.stringify(this.restaurant)}`]);
  }
}