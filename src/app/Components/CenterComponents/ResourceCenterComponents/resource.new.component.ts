import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewResourceDetailModel } from '../../../Models/NewResourceDetailModel';
import { DatePipe } from '@angular/common';
import { serviceForRoute } from '../../../Services/SharedServices.service'
import { CenterComm } from '../../../CommonClasses/centerComm'
import { CenterIdentifier } from '../../../../enums/center.identifier'
import { ApiCommunicationService } from '../../../Services/api.communication.service'
import { ApiActionList } from '../../../CommonClasses/api.action.list'
@Component({
  selector: 'resource-new',
  templateUrl: './resource.new.component.html'
})
export class ResourceNewComponent implements OnInit {
  resourceNewForm: FormGroup;
  DOJControl: FormControl;
  DOJControlBind: string;
  ResourceName:string
  ResourceSupervisor:string
  newResourceDetailModel:NewResourceDetailModel;
  showDialog:boolean
  centerCommObj: CenterComm;
  //
  users: any;
    msg: string;
  //
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private sharedService: serviceForRoute, private appcommService:ApiCommunicationService) { }
  ngOnInit(): void {
    this.resourceNewForm = this.fb.group({
      ResourceName: ['', Validators.required],
      ResourceSupervisor: ['', Validators.required],
    });
    this.DOJControl = new FormControl(null, [
      Validators.required])
  }
   
   onSubmit(formData: any) {
    this.newResourceDetailModel = new NewResourceDetailModel();
    this.newResourceDetailModel.ResourceName = formData.value.ResourceName;
    this.newResourceDetailModel.ResourceSupervisor = formData.value.ResourceSupervisor;
    this.newResourceDetailModel.ResourceDOJ = this.datepipe.transform(this.DOJControlBind, 'yyyy-MM-dd');
    
    // let actionName=ApiActionList.Post_Resource_New;
    // this.appcommService.post(this.newResourceDetailModel,actionName);
    let actionName=ApiActionList.Post_Resource_New;
    this.appcommService.post(this.newResourceDetailModel,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {
                            this.showDialog = true;
                            this.sharedService.updateResourcesList(true);
                        
                        }
                        else
                        {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        
                    },
                    error => {
                      this.msg = error;
                    }
              
                );
  // this.appcommService.getAll(actionName)
  //           .subscribe(users => { console.log(users) },
  //           error => this.msg = <any>error);
} 

GotoHomePage():void{
   this.showDialog = false;
    this.centerCommObj = new CenterComm;
    this.centerCommObj.CommType = CenterIdentifier.homePage;
    this.centerCommObj.Id =null;
    this.sharedService.sendMessage(this.centerCommObj);
}

Continue():void{
  debugger;
  this.showDialog = !this.showDialog;
  this.resourceNewForm.reset();
}

}   