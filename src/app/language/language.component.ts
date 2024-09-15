import { Component, Input } from '@angular/core';
import { Language } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { LanguageLevelPipe } from '../language-level.pipe';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, LanguageLevelPipe],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  @Input({ required: true }) language! : Language;
}
