import { Component } from '@angular/core';
import * as lodash from 'lodash';

@Component({
  selector: 'app-test-external-libs',
  templateUrl: './test-external-libs.component.html',
  styleUrls: ['./test-external-libs.component.scss'],
})
export class TestExternalLibsComponent {
  panelOpenState = false;

  list = lodash.map([1, 2, 3], (n) => `# ${n}`);
}
