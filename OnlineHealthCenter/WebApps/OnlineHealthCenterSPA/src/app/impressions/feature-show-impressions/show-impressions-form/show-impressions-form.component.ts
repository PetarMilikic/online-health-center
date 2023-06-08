import { Component } from '@angular/core';
import { ImpressionsFascadeService } from '../../domain/application-services/impressions-fascade.service';
import { IImpressionEntity } from '../../domain/model/impressionEntity';
import { IDoctorEntity } from 'src/app/common/domain/model/doctorEntity';
import { EmployeesFascadeService } from 'src/app/common/domain/application-services/employees-fascade.service';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

interface IImpressionFormData {
  id: string;
  doctor: string;
  patientID: string;
  headline: string;
  content: string;
  mark: number;
  impressionDateTime: string;
}

@Component({
  selector: 'app-show-impressions-form',
  templateUrl: './show-impressions-form.component.html',
  styleUrls: ['./show-impressions-form.component.css']
})
export class ShowImpressionsFormComponent {

  public showImpressionForm: FormGroup;

  public allImpressions: Array<IImpressionFormData> = this.getImpressionsByPatientId("a15a4178-2964-4973-b1fe-425ef1fdc0a4");

  public doctors: Array<IDoctorEntity> = this.getDoctors();

  public doctor?: IDoctorEntity;

  public impressions?: Array<IImpressionFormData>;

  constructor(private impressionsService:  ImpressionsFascadeService, private employeesService: EmployeesFascadeService) {
    this.showImpressionForm = new FormGroup({
      id: new FormControl(''),
      doctor: new FormControl(''),
      patientID: new FormControl(''),
      headline: new FormControl(''),
      content: new FormControl(''),
      mark: new FormControl(''),
      impressionDateTime: new FormControl('')
    })
  }

  private getImpressionsByPatientId(patientID: string): Array<IImpressionFormData> {
    this.impressionsService.getImpressionsByPatientId(patientID).subscribe((impressions: Array<IImpressionEntity>) => {
      this.allImpressions = this.getFormDataFromImpressionEntities(impressions);
    })

    return this.allImpressions;
  }

  private getFormDataFromImpressionEntities(entities: Array<IImpressionEntity>): Array<IImpressionFormData> {
    var uiDataCollection = Array<IImpressionFormData>();

    entities.forEach(entity => {
      const impressionUIData: IImpressionFormData = {
        id: entity.id,
        doctor: entity.doctorID,
        patientID: entity.patientID,
        headline: entity.headline,
        content: entity.content,
        mark: entity.mark,
        impressionDateTime: new Date(entity.impressionDateTime).toLocaleString()
      }

      uiDataCollection.push(impressionUIData);
    });

    return uiDataCollection;
  }

  private getDoctors(): Array<IDoctorEntity> {
    this.employeesService.getDoctors().subscribe(
      (doctors: Array<IDoctorEntity>) => {
        this.doctors = doctors;
      });
      
    return this.doctors;
  }

  private getSelectedDoctor(): IDoctorEntity
  {
    const data: IImpressionFormData = this.showImpressionForm.value as IImpressionFormData;
    return this.doctors.filter(doc => doc.id == data.doctor)[0] as IDoctorEntity;
  }

  public onSelectionChanged(): void
  {
    const selectedDoctor = this.getSelectedDoctor();
    this.doctor = selectedDoctor;
    this.impressions = this.allImpressions.filter(i => i.doctor == selectedDoctor.id);
  }

  public onDeleteImpression(id: string): void
  {
    this.impressionsService.deleteImpression(id)
    .subscribe((successfully: boolean) => {

      if (successfully)
      {
        window.alert("Impression has been deleted.");
        window.location.reload();
      }
      else
        window.alert("An error occured. Please try later.");
    });
  }

}