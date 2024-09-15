import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'languageLevel',
  standalone: true
})
export class LanguageLevelPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    let level = 0;

    // Convert the language proficiency to a level (1-5)
    switch (value.toLowerCase()) {
      case 'native':
        level = 5;
        break;
      case 'fluent':
        level = 4;
        break;
      case 'advanced':
        level = 3;
        break;
      case 'intermediate':
        level = 2;
        break;
      case 'beginner':
        level = 1;
        break;
      default:
        level = 0;
    }

    // Calculate the percentage width based on the level (1-5 -> 20% to 100%)
    const percentage = level * 20;

    // Build the HTML with inline CSS for the bar
    const barHtml = `
      <div style="display: flex; align-items: center;">
        <div style="width: 150px; height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden; margin-left: 10px;">
          <div style="width: ${percentage}%; height: 100%; background-color: #4CAF50; border-radius: 5px;"></div>
        </div>
      </div>
    `;

    // Sanitize the HTML and return it as SafeHtml
    return this.sanitizer.bypassSecurityTrustHtml(barHtml);
  }

}
