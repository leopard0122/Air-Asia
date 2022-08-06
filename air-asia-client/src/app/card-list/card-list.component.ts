import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { GiftCardService } from '../services/gift-card.service';
import { GiftCard } from '../models/gift-card.model';
import { AuthService } from '../services/auth.service';
// import {StateService} from '@uirouter/angular';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  items: any
  state: any
  constructor(private giftCardService: GiftCardService, private router: Router, public authService: AuthService) {
    this.state = router.routerState;
    this.items = [];
  }
  
  displayCardDetail(item): void {
    console.log("displayCardDetail")
    console.log(item)
    this.router.navigateByUrl('/card-details', { state: { item: item  } });
  }

  reloadGiftCards(): void {
    this.giftCardService.getGiftCards().subscribe((data: any)=>{
      console.log(data);
      data.forEach(card => {
        this.items.push(card)
      });
      console.log(this.items)
    })
  }
  
  ngOnInit(): void {
    this.reloadGiftCards()
  }
}
