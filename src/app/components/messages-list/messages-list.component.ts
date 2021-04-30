import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/common/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messages?: Message[];
  currentMessage?: Message;
  currentIndex = -1;
  title = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveMessages();
  }

  retrieveMessages(): void {
    this.messageService.getAll()
      .subscribe(
        data => {
          this.messages = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveMessages();
    this.currentMessage = undefined;
    this.currentIndex = -1;
  }

  setActiveMessage(message: Message, index: number): void {
    this.currentMessage = message;
    this.currentIndex = index;
  }

  removeAllMessages(): void {
    this.messageService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentMessage = undefined;
    this.currentIndex = -1;

    this.messageService.findByTitle(this.title)
      .subscribe(
        data => {
          this.messages = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}