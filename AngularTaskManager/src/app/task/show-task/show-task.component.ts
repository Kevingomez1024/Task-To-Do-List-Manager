import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


declare var bootstrap: any;

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {

  constructor(private service:SharedService,private modalService: NgbModal) { }

  TaskList:any=[];


  ModalTitle!:string;
  ActivateAddEditTaskComp:boolean = false;
  task:any;

  NameFilter:string="";
  StatusFilter:string="";
  TaskListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshTaskList();

  }

  open(content:any) {
    this.task = {
      Id:null,
      Name:"",
    }
    this.ModalTitle="Add Task";
    this.ActivateAddEditTaskComp = true;
    const modalRef = this.modalService.open(content,{backdrop:"static",keyboard:false});
  }

  addClick(){
      this.task = {
        Id:null,
        Name:"",
      }
      this.ModalTitle="Add Task";
      this.ActivateAddEditTaskComp = true;
  }

  editClick(item: any,content:any){
    this.task = item;
    this.ModalTitle = "Edit Task"
    this.ActivateAddEditTaskComp=true;
    const modalRef = this.modalService.open(content,{backdrop:"static",keyboard:false});

  }

  deleteClick(item:any){
    if(confirm('Are you sure you want to delete this task?')){
      this.service.deleteTask(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshTaskList();
      });
    }
  }

  closeClick(){
    this.ActivateAddEditTaskComp=false;
    this.refreshTaskList();

  }

  refreshTaskList(){
    this.service.getTaskList().subscribe(data => {
      this.TaskList = data;
      this.TaskListWithoutFilter = data;
    });
  }

  FilterFn(){
    var TaskNameFilter = this.NameFilter;
    var TaskStatusFilter = this.StatusFilter;


    this.TaskList = this.TaskListWithoutFilter.filter(function (el:any){
        return el.Name.toString().toLowerCase().includes(
          TaskNameFilter.toString().trim().toLowerCase()
        )&&
        el.Status.toString().toLowerCase().includes(
          TaskStatusFilter.toString().trim().toLowerCase()
        )
    });
  }


  sortResult(prop:any,asc:boolean){
    this.TaskList = this.TaskList.sort(function(a:string,b:string){
      if(asc){
        return(a[prop]>b[prop])? 1 : ((a[prop]<b[prop])? -1 : 0);
      }
      else{
        return(b[prop]>a[prop])? 1 : ((b[prop]<a[prop])? -1 : 0);
      }
    })
  }
}
