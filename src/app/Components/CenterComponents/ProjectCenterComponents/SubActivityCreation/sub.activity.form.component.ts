import { Component,Output,EventEmitter,Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubActivityModel } from '../../../../Models/SubActivityModel';
import { ApiCommunicationService } from '../../../../Services/api.communication.service'
import { ApiActionList } from '../../../../CommonClasses/api.action.list'
@Component({
  selector: 'sub-activity-form',
  templateUrl: './sub.activity.form.component.html',
})
export class SubActivityFormComponent{
  @Input() NewId;
  @Output() cancelSubActivityCreation = new EventEmitter();
  @Output() subActivityModelToAdd = new EventEmitter<SubActivityModel>();
  constructor(private fb: FormBuilder, public datepipe: DatePipe,private appcommService:ApiCommunicationService) { }
  subActivityForm: FormGroup;
  eventEndDateControl: FormControl;
  state: string;
  ngOnInit(): void {
    this.subActivityForm = this.fb.group({
      EventNameControl: ['', Validators.required],
      EventDescControl: ['', Validators.required],
      eventStartDateControl:[null,Validators.required],
      eventEndDateControl:[null,Validators.required]
    });
}


  showDialog = false;
  subActivityModel: SubActivityModel;
  onSubmit(formData: any) {
    this.subActivityModel = new SubActivityModel();
    this.subActivityModel.SubActivityName = formData.value.EventNameControl;
    this.subActivityModel.SubActivityDesc = formData.value.EventDescControl;
    this.subActivityModel.SelectedMainActivity = this.NewId.replace(/"/g,'');
    this.subActivityModel.SubActivityStartDate = this.datepipe.transform(formData.value.eventStartDateControl, 'yyyy-MM-dd');
    this.subActivityModel.SubActivityEndDate = this.datepipe.transform(formData.value.eventEndDateControl, 'yyyy-MM-dd');
     let actionName=ApiActionList.Post_SubActivity_New;
    this.appcommService.post(this.subActivityModel,actionName).subscribe(
                    data => {
                        if (data.status==200) //Success
                        {  
                            this.showDialog = true;
                        
                        }
                        else
                        {
                            // this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        
                    },
                    error => {
                      // this.msg = error;
                    }
              
                );
    console.log(this.subActivityModel);
  }
 
  ClearFormData():void{
   this.subActivityForm.reset();
  }
  
  SubActivityCancel():void{
    this.showDialog=!this.showDialog;
    this.cancelSubActivityCreation.emit();
    // this.ClearFormData();
  }
  SubActivityContinue():void{
    this.showDialog=!this.showDialog;
    this.cancelSubActivityCreation.emit();
    this.subActivityModelToAdd.emit(this.subActivityModel);
  }

  // customErrorStateMatcher(c: FormControl): boolean {
  //    const hasInteraction = c.dirty || c.touched;
  //   const isInvalid = c.invalid;

  //   return !!(hasInteraction && isInvalid);
  // }
}