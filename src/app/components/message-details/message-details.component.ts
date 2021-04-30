import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/common/message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  currentMessage: Message = {
    title: '',
    description: '',
    published: false,
    postedby: ''
  };
  message = '';

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getMessage(this.route.snapshot.params.id);
  }

  getMessage(id: string): void {
    this.messageService.get(id)
      .subscribe(
        data => {
          this.currentMessage = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentMessage.title,
      description: this.currentMessage.description,
      published: status,
      postedby: this.currentMessage.postedby
    };

    this.message = '';

    this.messageService.update(this.currentMessage.id, data)
      .subscribe(
        response => {
          this.currentMessage.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'This message was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateMessage(): void {
    this.message = '';

    this.messageService.update(this.currentMessage.id, this.currentMessage)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This message was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteMessage(): void {
    this.messageService.delete(this.currentMessage.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/messages']);
        },
        error => {
          console.log(error);
        });
  }
}