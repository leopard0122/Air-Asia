import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { RouterModule, Routes, Router, RouterState, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GiftCardService } from '../services/gift-card.service';
import { GiftCard } from '../models/gift-card.model';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html',
  styleUrls: ['./card-delete.component.scss']
})
export class CardDeleteComponent implements OnInit {
  item: any;
  state$: any
  constructor(private location: Location, private router: Router, public activatedRoute: ActivatedRoute, private giftCardService: GiftCardService) { 
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

  deleteCard(): void {
    console.log("deleteCard");
    console.log(this.item);
    this.giftCardService.deleteGiftCard(this.item).subscribe((data: any)=>{
      this.router.navigateByUrl('/card-list');
    })
  }

}
