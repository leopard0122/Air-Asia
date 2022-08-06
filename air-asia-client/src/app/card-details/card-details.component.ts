import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { RouterModule, Routes, Router, RouterState, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  item: any;
  state$: any
  sub: any
  constructor(private location: Location, private router: Router, public activatedRoute: ActivatedRoute) { 
    // this.item = { title: "card1", type: "", value: 100, image: "https://d2e70e9yced57e.cloudfront.net/wallethub/posts/68808/best-gift-cards.png", description: "Chick Fila-A $10 Gift Card", points: 10}
  }

  displayCardDeleteComponent(): void {
    console.log("displayCardDeleteComponent")
    this.router.navigateByUrl('/card-delete', { state: { item: this.item  } });
  }

  displayCardUpdateComponent(): void {
    console.log("displayCardUpdateComponent")
    this.router.navigateByUrl('/card-update', { state: { item: this.item  } });
  }

  ngOnInit() {
    console.log(this.location.getState());
    this.state$ = this.location.getState();

    if (!this.state$.item){
        this.router.navigateByUrl('/card-list');
    } else{
      this.item = this.state$.item;
    }
  }

}
