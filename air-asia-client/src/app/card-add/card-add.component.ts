import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCardService } from '../services/gift-card.service';
import { GiftCard } from '../models/gift-card.model';
interface CardType {
  value: string;
  viewValue: string;
}

function randomNumber(min, max) {  
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
} 

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {
  newCardFormGroup: FormGroup;
  cardTypes: CardType[] = [
    {value: 'gift-0', viewValue: 'Gift'},
    {value: 'visa-1', viewValue: 'Visa'},
    {value: 'master-2', viewValue: 'Master'}
  ];
  constructor(private giftCardService: GiftCardService, private _formBuilder: FormBuilder, private router: Router) {


  }

  ngOnInit() {

    var urls = [
      'https://d2e70e9yced57e.cloudfront.net/wallethub/posts/68808/best-gift-cards.png',
      'https://gawdamedia.com/wp-content/uploads/2019/07/generic-gift-card.jpeg',
      'https://cdn.shopify.com/s/files/1/0963/1508/products/GenericGiftCard1_1024x1024.jpg?v=1575933245'      
    ]
                
    this.newCardFormGroup = this._formBuilder.group({
      cardName: ['', Validators.required],
      cardType: ['', Validators.required],
      cardValue: ['', Validators.required],
      points: ['', Validators.required],
      cardImageUrl: [urls[randomNumber(0, 2)], Validators.required]
    });
  }

  createCard(): void {
    console.log("createCard");
    console.log(this.newCardFormGroup.value);
    const card: GiftCard = this.newCardFormGroup.value
    this.giftCardService.addGiftCard(card).subscribe((data: any)=>{
      this.router.navigateByUrl('/card-list', { state: { item: data  } });
    })
  }

}
