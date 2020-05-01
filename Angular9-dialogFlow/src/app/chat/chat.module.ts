import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import {ChatProviderService} from './chat-provider/chat-provider.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent],
  exports: [ChatWidgetComponent, ],
  entryComponents: [ChatWidgetComponent ],
  providers:[ChatProviderService]
})
export class ChatModule {}
