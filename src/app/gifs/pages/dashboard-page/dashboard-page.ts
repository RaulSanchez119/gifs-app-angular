import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../components/side-menu/side-menu";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  imports: [RouterOutlet, SideMenu],
})
export default class DashboardPage {


}
