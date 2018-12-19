import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { OwnerProvider } from "../../providers/owner/owner";
import { DataProvider } from "../../providers/data/data";
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the ClubownerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clubowner',
  templateUrl: 'clubowner.html',
})
export class ClubownerPage {

  date: string;
  events_items: Array<any>=[];

  reservations_items: Array<any>=[];

  maint_items: Array<any>=[];
  clubName:any='';
  clubRating:any=0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public activeProvider: ActiveProvider,
    public ownerProvider: OwnerProvider,
    public dataProvider: DataProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.activeProvider.set_component('owner');
    
  }
  ngOnInit(){
    this.ownerProvider.GetClub(this.dataProvider.get_user().userName).subscribe(
      data=>{
        console.log("****************esht8aaaaaaaaaaaaaaaaaaaaaaaaaal********************")
        console.log(data[0])
        this.clubName=data[0].name;
        this.clubRating=data[0].rating;
      }
    )
  }
  getEvents() {
    this.ownerProvider.getEvents(this.dataProvider.get_user().userName, this.date).subscribe(data => {
      this.events_items=[];
      if (data) {
        this.events_items = data;
      }
    })
  }
  getReservations() {
    this.ownerProvider.getReservations(this.dataProvider.get_user().userName, this.date).subscribe(data => {
     this.reservations_items=[];
      if (data) {
        for(let d of data){
          d['pitch_number'] = d['pitch#'];
        }
        this.reservations_items = data;
      }
    })
  }
  getMaint() {
    this.ownerProvider.getMaint(this.dataProvider.get_user().userName, this.date).subscribe(data => {
     this.maint_items=[];
      if (data) {
        this.maint_items =[];
        for(let d of data){
          d['pitch_number'] = d['pitch#'];
        }  
        this.maint_items = data;
      }
    })
  }
  dateChanged() {
    this.getEvents();
    this.getReservations();
    this.getMaint();
  }




  view(item, type) {
    let msg: string;

    console.log('type is ', type)

    switch (type) {
      case 'Event':
        msg = `<ul>
    <li>Start Time: ${item.startTime.split('T')[1]}</li>
    <li>End Time: ${item.endTime.split('T')[1]}</li>
    <li>Number Of Teams: ${item.noOfTeams}</li>
    <li>Number Of Team Members: ${item.noOfTeamMembers}</li>
    <li>Available Places: ${item.availablePlaces}</li>
    <li>Number Of Teams: ${item.noOfTeams}</li>
    <li>Prize: ${item.prize}</li>
    <li>Price Per Team: ${item.pricePerTeam}</li> 
    </ul>`
        this.showConfirm(item, type, msg);
        break;

      case 'Reservation':
        msg = `<ul>
    <li>Player Username: ${item.playerUserName}</li>
    <li>Paid: ${item.paid}</li>
    <li>Unpaid: ${item.unpaid}</li>
    </ul>`
        this.showConfirm(item, type, msg)
        break;

      case 'Maintenance':
        msg = `<ul>
    <li>Start Time: ${item.startTime.split('T')[1]}</li>
    <li>End Time: ${item.endTime.split('T')[1]}</li>
    <li>Cost: ${item.cost}</li>
    <li>Description: ${item.description}</li>
    </ul>`
        this.showConfirm(item, type, msg)
        break;
    }

  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'Delete Operation',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm(item, type, msg) {
    let name;
    switch (type){
      case 'Event':
      name=item.name;
      break;
      case 'Reservation':
      name='';
      break;
      case 'Maintenance':
      name='';
      break;
    }
    const confirm = this.alertCtrl.create({

      title: name + ' ' + type,
      message: msg,
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log("InsideDelete")
            switch(type)
            {
              case 'Event':
                this.ownerProvider.deleteEvent(item.eventId,this.dataProvider.get_user().userName).subscribe(
                  data =>{
                      this.showAlert("successed");

                      this.dateChanged();
                  }
                );
                
                break;
              case 'Reservation':
                this.ownerProvider.deleteReservation(item.startTime.split('T')[0],
                item.startTime.split('T')[1].split(":")[0],item.pitch_number,
                  this.dataProvider.get_user().userName).subscribe(
                    data =>{
                        this.showAlert("successed");
                        this.dateChanged();
                    }
                  );
                break;
              case 'Maintenance':
              console.log(item.startTime.split('T')[0])
              console.log(item.startTime.split('T')[1].split(":")[0])
              console.log(item.pitch_number)
              console.log(this.dataProvider.get_user().userName)
              console.log(item.startTime.split('T')[1].split(":")[1])
                this.ownerProvider.deleteMaint(item.startTime.split('T')[0],
                item.startTime.split('T')[1].split(":")[0],item.pitch_number,
                  this.dataProvider.get_user().userName,item.startTime.split('T')[1].split(":")[1]
                  ).subscribe(
                    data =>{
                      console.log(data)
                        this.showAlert("successed");
                      
                        this.dateChanged();
                    }
                  );
              }
            console.log('Delete clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
