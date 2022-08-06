import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCardService } from '../services/gift-card.service';
import { GiftCard } from '../models/gift-card.model';
interface CardType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-card-update',
  templateUrl: './card-update.component.html',
  styleUrls: ['./card-update.component.scss']
})
export class CardUpdateComponent implements OnInit {
  updateCardFormGroup: FormGroup;
  cardTypes: CardType[] = [
    {value: 'gift-0', viewValue: 'Gift'},
    {value: 'visa-1', viewValue: 'Visa'},
    {value: 'master-2', viewValue: 'Master'}
  ];
  item: any;
  state$: any;
  constructor(private location: Location, private giftCardService: GiftCardService, private _formBuilder: FormBuilder, private router: Router) {


  }

  
  ngOnInit() {
    console.log(this.location.getState());
    this.state$ = this.location.getState();

    if (!this.state$.item){
        this.router.navigateByUrl('/card-list');
    } else{
      this.item = this.state$.item;
    }

    var urls = [
      'https://d2e70e9yced57e.cloudfront.net/wallethub/posts/68808/best-gift-cards.png',
      'https://gawdamedia.com/wp-content/uploads/2019/07/generic-gift-card.jpeg',
      'https://cdn.shopify.com/s/files/1/0963/1508/products/GenericGiftCard1_1024x1024.jpg?v=1575933245'      
    ]

    this.updateCardFormGroup = this._formBuilder.group({
      cardName: [this.item.cardName, Validators.required],
      cardType: [this.item.cardType, Validators.required],
      cardValue: [this.item.cardValue, Validators.required],
      points: [this.item.points, Validators.required],
      id: [this.item.id, Validators.required]
    });
  }



  updateCard(): void {
    console.log("updateCard");
    console.log(this.updateCardFormGroup.value);
    const card: GiftCard = this.updateCardFormGroup.value
    this.giftCardService.updateGiftCard(card).subscribe((data: any)=>{
      this.router.navigateByUrl('/card-list', { state: { item: data  } });
    })
  }

}