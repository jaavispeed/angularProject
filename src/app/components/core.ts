import { Component } from '@angular/core';
import { Sidebar } from '@app/shared/sidebar/sidebar';

@Component({
  selector: 'app-core',
  imports: [Sidebar],
  templateUrl: './core.html',
})
export default class Core {}
