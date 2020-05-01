export class ResponseItem{
  public answer:string;
  public nextQuestionId:number;
  constructor() {}
}

export class DiscussionItem{
  public id:number;
  public question:string;
  public response:Array<ResponseItem>;
  constructor() {
  }
}



