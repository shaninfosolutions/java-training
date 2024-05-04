import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {

  appointmentObj: any = {
    "name": "",
    "mobileNo": "",
    "city": "",
    "age": 0,
    "gender": "",
    "appointmentNo":0,
    "appointmentDate": "2023-12-22T05:50:31.728Z",
    "appointmentTime": "",
    "isFirstVisit": true,
    "naration": "",
    "isDone":false
  };

  constructor(private master: MasterService){}

  onSaveAppointment() {
    debugger;
    this.master.createNew(this.appointmentObj).subscribe((res:any)=>{
      if(res.result) {
        debugger;
        alert("Appointment Done & Appintment No is -" + res.data.appointmentId);
      }
    },errror => {
      alert("API Error/ Check Form")
    })
  }

}
