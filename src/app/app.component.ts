import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CV } from '../interfaces';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { LanguageComponent } from './language/language.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { faBriefcase, faUserGraduate, faDumbbell, faUserNinja , faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as cvData from '../cv.json';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MilitaryComponent } from "./military/military.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [FontAwesomeModule, RouterOutlet, EducationComponent, ExperienceComponent, SkillsComponent, LanguageComponent, PersonalInfoComponent, MilitaryComponent]
})
export class AppComponent {
  faUserGraduate = faUserGraduate;
  faDumbbell = faDumbbell;
  faUserNinja = faUserNinja;
  faShieldBlank = faUserShield;
  textTypes : string = 'h1, h2, h3, p, li, span, strong';

  constructor() {
    console.log(this.cv);
  }

  brefcase = faBriefcase;

  exportPdf() {
    const element = document.getElementById('cv');

    if (element) {
      // Hide text before capturing canvas to avoid duplication
      this.toggleTextVisibility(element, false);

      html2canvas(element).then((canvas) => {
        const doc = new jsPDF('p', 'mm', 'a4');

        const img = canvas.toDataURL('image/png');
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const scaleFactor = pdfWidth / element.clientWidth;

        // Add image (non-text elements) to PDF
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        // Show the text again so we can add it manually to the PDF
        this.toggleTextVisibility(element, true);

        // Now add the text manually to PDF
        this.addTextContentToPDF(doc, element, bufferX, bufferY, scaleFactor);

        doc.save('cv.pdf');
      });
    }
  }
  toggleTextVisibility(element: HTMLElement, isVisible: boolean) {
    const textElements = element.querySelectorAll(this.textTypes); // Select text elements

    textElements.forEach((textElement: any) => {
      textElement.style.visibility = isVisible ? 'visible' : 'hidden';
    });
  }

  isInsideIconOrLink = (el: HTMLElement): boolean => {
    if (!el) return false;
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'i' || tagName === 'a' || tagName === 'fa-icon' || tagName === 'svg' || tagName === 'img') {
      return true;
    }
    return el.parentElement ? this.isInsideIconOrLink(el.parentElement) : false;
  }

  addTextContentToPDF(doc: jsPDF, element: HTMLElement, bufferX: number, bufferY: number, scaleFactor: number) {
    
    const addedText = new Set<Element>(); // Track added text to avoid duplicates
    const textElements = element.querySelectorAll(this.textTypes); // Add more selectors as needed
    textElements.forEach((textElement: Element) => {
      // Skip if text has already been added or is inside an icon/link
        const text = textElement.textContent || '';
        const rect = textElement.getBoundingClientRect();
        const x = (rect.left - element.getBoundingClientRect().left) * scaleFactor + bufferX;
        const y = (rect.top - element.getBoundingClientRect().top) * scaleFactor + bufferY;

        // Retrieve styles from the DOM element
        const style = window.getComputedStyle(textElement);
        const fontSize = parseFloat(style.fontSize) * 0.39; // Scale font size

        let fontWeight = style.fontWeight;
        const fontFamily = style.fontFamily;
        if (textElement.tagName.toLowerCase() === 'strong' || textElement.tagName.toLowerCase() === 'b') {
          fontWeight = 'bold';
        }

        // Set the styles in jsPDF
        doc.setFont(fontFamily, fontWeight === 'bold' ? 'bold' : 'normal');
        doc.setFontSize(fontSize);
        //doc.setTextColor(style.color);

        // Add the text to the PDF
        const maxWidth = rect.width * scaleFactor; // Ensure text wraps within bounds
        doc.text(text, x, y, { maxWidth });
        // Add links manually
        const links = textElement.querySelectorAll('a');
        links.forEach(link => {
          const rect = link.getBoundingClientRect();
          const x = (rect.left - element.getBoundingClientRect().left) * scaleFactor + bufferX;
          const y = (rect.top - element.getBoundingClientRect().top) * scaleFactor + bufferY;
          const width = rect.width * scaleFactor;
          const height = rect.height * scaleFactor;

          doc.link(x, y, width, height, { url: link.href });
        });
        addedText.add(textElement); // Mark text as added
    });
  }

  title = 'cv';
  cv: CV = cvData;
}
