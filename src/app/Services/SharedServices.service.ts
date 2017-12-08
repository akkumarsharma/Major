import { Injectable } from '@angular/core'
import { ProjectComponent } from '../Components/LeftBar/project.component'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CenterIdentifier } from '../../enums/center.identifier'
import { CenterComm } from '../CommonClasses/centerComm'
@Injectable()
export class serviceForRoute {

    private centerUpdate = new Subject<CenterComm>();
    private updateResources = new Subject<boolean>();
    private updateProjects = new Subject<boolean>();
    private centerProjectSelected=new Subject<string>();
    IsFromCache: boolean = false;
    updateResourcesList(val: boolean) {
        this.updateResources.next(val);
    }

    checkIfUpdateResourcesList(): Observable<boolean> {
        return this.updateResources.asObservable();
    }

    updateProjectsList(val: boolean) {
        this.updateProjects.next(val);
    }

    checkIfUpdateProjectsList(): Observable<boolean> {
        return this.updateProjects.asObservable();
    }

    sendMessage(obj: CenterComm) {
        this.centerUpdate.next(obj);
        if(obj.CommType==CenterIdentifier.selectProject)
        {
            this.centerProjectSelected.next(obj.Id);
        }
    }
    
     makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    clearMessage() {
        this.centerUpdate.next();
    }

    getMessage(): Observable<CenterComm> {
        return this.centerUpdate.asObservable();
    }

    getcenterProjectSelectedMessage(){
        return this.centerProjectSelected.asObservable();
    }

    setIfcacheRequired(val: boolean) {
        this.IsFromCache = val;
    }
    checkIfCacheRequired(): boolean {
        return this.IsFromCache;
    }
}
