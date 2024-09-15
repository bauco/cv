import { Component, Input } from '@angular/core';
import { Education } from '../../interfaces';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @Input({ required: true }) education! : Education;

}
