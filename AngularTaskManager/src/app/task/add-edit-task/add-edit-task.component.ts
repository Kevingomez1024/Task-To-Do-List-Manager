import { SharedService } from './../../shared.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() task:any;
  Id!:string;
  Name!:string;
  DateAdded!: string;
  Status!:string;
  DateFinished!:string;




  ngOnInit(): void {
    this.Id = this.task.Id;
    this.Name = this.task.Name;
    this.DateAdded = this.task.DateAdded;

    if(this.Status == null){
      this.Status = "Not Started"
    }
    else{
      this.Status = this.task.Status;
    }

    this.DateFinished = this.task.DateFinished;
  }

  addTask(){
    var val = {
      Id:null,
      Name:this.Name,
      DateAdded:null,
      Status:this.Status,
      DateFinished:null
    };

    this.service.addTask(val).subscribe(res => {
      alert(res.toString());
    });


  }

  updateTask(){
    var val = {
      Id:this.Id,
      Name:this.Name,
      DateAdded:this.DateAdded,
      Status:this.Status,
      DateFinished:this.DateFinished
    };

    this.service.updateTask(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
