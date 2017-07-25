import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mi-root',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Welcome to the Mitosis';
}
