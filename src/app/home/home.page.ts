import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

// I have addeded an interface to represent user data when creating an event
// interface Event {
//   title: string;
//   startTime: string;
//   endTime: string;
//   allDay: boolean;
// }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  public eventSource = [];
  public viewTitle: string;

  // Model the event and store it in the list
  public event: Event;
  public eventList = [];
  public calendar = {
    mode: 'day',
    currentDate: new Date(),
  };
  public selectedDate: Date;

  constructor(
    private alertController: AlertController,
    // @Inject(LOCALE_ID) private locale: string,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async openCalModal() {
    const modal = await this.modalController.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }

  // createAnEvent() {
  // create values for both start and end time
  // let startTime;
  // let endTime;
  // const date = new Date();
  // Used to classify start or end time
  // let eventType = Math.floor(Math.random() * 2);
  // define a startDay
  // let startDay = Math.floor(Math.random() * 90) - 45;
  // let endDay = Math.floor(Math.random() * 2) + startDay;

  // startTime = new Date(
  //   Date.UTC(
  //     date.getUTCFullYear(),
  //     date.getUTCMonth(),
  //     date.getUTCDate() + startDay
  //   )
  // );

  // if (endDay === startTime) {
  //   endDay += 1;
  // }

  // endTime = new Date(
  //   Date.UTC(
  //     date.getUTCFullYear(),
  //     date.getUTCMonth(),
  //     date.getUTCDate() + endDay
  //   )
  // );

  // this.event = {
  //   title: 'this is a test',
  //   startTime,
  //   endTime,
  //   allDay: false,
  // };

  // this.eventList.push(this.event);
  // this.eventSource = this.eventList;

  // console.log(date, '<==== Value of DATE');
  // console.log(eventType, '<==== Event Type Value');
  //   console.log(startDay, '<==== Value of StartDay');
  //   console.log(endDay, '<==== Value of End Of Day');
  //   console.log(startTime, '<==== Our first start time');
  //   console.log(endTime, '<==== Our first end time');
  //   console.log(this.eventList, '<===== our created list');
  // }
}
