import { Component, Input } from '@angular/core';
import { PersonalInfo } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUserNinja, faHouse, faPhone, faEnvelope, faVenusMars, faCakeCandles,faDumbbell} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {
  @Input({ required: true }) personalInfo! : PersonalInfo;
  faUserNinja = faUserNinja
  faHouse =faHouse
  faPhone =faPhone
  faEnvelope =  faEnvelope
  faVenusMars= faVenusMars
  faCakeCandles=faCakeCandles
  
}
