import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(http: HttpClient) { }

  ngOnInit() {
  }

  submitdata(name, desciption, date, batch) {
    try {
      axios({
        url: `http://localhost:9008/addevents`,
        method: 'POST',
        data: [{
          name:name,
          desciption: desciption,
          event_date: date,
          batch: batch
        }]
        //     data: [{
        //       name= {{ name }},
        //       desciption: {{ desciption }},
        //       event_date: { { date } },
        //       batch: {{ batch }
        // }]
      })
        .then((response) => {
        })
        .catch(error => {
          console.log(error);
        });
      // const response = await axios.post('http://events:3000/addevents');
      // console.log(response);

    } catch (error) {
      console.error(error);
    }
    console.log(name, desciption, date, batch);
  }

}
