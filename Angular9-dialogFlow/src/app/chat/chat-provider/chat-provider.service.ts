import { Injectable } from '@angular/core';
import  serviceAccount from './service-account.json'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatProviderService {
  DialogueFlowGetaw:string="http://localhost:3200/ChatResponse";

  sessionId = Math.random().toString(36).slice(-5);
  constructor(private http:HttpClient) {
  }

  talkToDialogueBot(msg:string){
    return  this.http.post<any>(
      this.DialogueFlowGetaw      ,
      {
        sessionId:this.sessionId,
        queryInput: {
          text: {
            "text":msg,
            "languageCode": "fr"
          }
        },
        serviceAccount:serviceAccount
      }
    )

  }
}

export class dialogueResponse{
  platform :string;
  text :textFlow;
  message:string;
}
export class textFlow{
  text:Array<string>;
}
