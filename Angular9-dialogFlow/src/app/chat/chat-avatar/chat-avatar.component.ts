import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chat-avatar',
  templateUrl: './chat-avatar.component.html',
  styleUrls: ['./chat-avatar.component.scss']
})
export class ChatAvatarComponent implements OnInit {
  @Input() public image: string;
  constructor() { }

  ngOnInit(): void {
  }

}
