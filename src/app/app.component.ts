import { VersionCheckService } from './services/version-check.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'auto-magic-update';

  constructor(
    private versionCheckService: VersionCheckService
  ) { }
  ngOnInit() {
    this.versionCheckService.initVersionCheck('http://127.0.0.1:8080');
  }
}
