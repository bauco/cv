import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Military } from '../../interfaces';

@Component({
  selector: 'app-military',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './military.component.html',
  styleUrl: './military.component.scss'
})
export class MilitaryComponent {
  @Input({ required: true }) military! : Military;

}
