import { Component } from '@angular/core'
import { ViewController } from 'ionic-angular'

@Component({
    selector: 'page-popover',
    template: `
        <ion-grid text-center>
            <ion-row>
                <ion-col>
                    <h3>PopOver</h3>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline (click)="onLoad('load')">Load List</button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline (click)="onLoad('save')">Save List</button>
                </ion-col>
            </ion-row>
        </ion-grid>
    `
})
export class PopOver{
    constructor(private viewCtrl : ViewController){}
    
    onLoad(action : string){
        this.viewCtrl.dismiss({'action':action});
    }
}