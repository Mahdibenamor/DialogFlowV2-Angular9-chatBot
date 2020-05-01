import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import {HttpClient} from '@angular/common/http';
import {ChatProviderService, dialogueResponse} from '../chat-provider/chat-provider.service';


@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  animations: [fadeInOut, fadeIn],

})
export class ChatWidgetComponent implements OnInit {

  @ViewChild('bottom') bottom: ElementRef;
  public theme:string='grey' ;
  show:boolean=false;
  private _visible:boolean=true;
  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage()
      }, 0)
    }
  }
  public get visible() {
    return this._visible
  }
  public messages = [];
  public focus = new Subject();
  public operator = {
    name: 'Mo7sen',
    status: 'online',
    avatar: `../../../assets/image/Chatbot.PNG`,
  };
  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `../../../assets/image/Client.png`,
  };

  constructor(private botService:ChatProviderService){}

  ngOnInit() {
    this.visible = false;
    setTimeout(() => {
      this.addMessage(this.operator, "Bonjour, je suis Mo7sen à votre service, avez-vous des questions?", 'received')
    }, 1500)
  }
  //add message.json for both operator and the client
  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
    this.scrollToBottom()
  }


  //a client evoit un message.json
  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.show=true;
    this.addMessage(this.client, message, 'sent');
    this.botService.talkToDialogueBot(message).subscribe(

      (responce:dialogueResponse) => {
        this.addMessage(this.operator, responce[0].text.text[0], 'received');
        this.show=false;
        console.log(responce[0].text)
      },
      (err)=>{
        this.show=false;
        console.log(err)},
      ()=>{console.log("bot responded")}
    );



  }






  //toujours affichier le botton of the communication
  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }
  public focusMessage() {
    this.focus.next(true)
  }
  //fermer la disscution
  public toggleChat() {
    this.visible = !this.visible
  }
  // open or close the disscution
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }
}
