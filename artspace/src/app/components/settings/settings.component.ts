import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    const id = parseInt(this.route.parent!.snapshot.paramMap.get('id')!);
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => location.reload());
  }

}
