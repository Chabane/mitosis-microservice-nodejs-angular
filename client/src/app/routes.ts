import { ProcaryotePageComponent } from './procaryotes/page';
import { EucaryotePageComponent } from './eucaryotes/page';
import { FeedbackFormComponent } from './feedback/page';

export const appRoutes = [
  { path: '', redirectTo: '/procaryotes', pathMatch: 'full' },
  { path: 'procaryotes', component: ProcaryotePageComponent },
  { path: 'eucaryotes', component: EucaryotePageComponent },
  { path: 'feedback', component: FeedbackFormComponent },
];
