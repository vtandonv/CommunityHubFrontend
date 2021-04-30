import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/common/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  message: Message = {
    title: '',
    description: '',
    published: false,
    postedby: ''
  };
  submitted = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  saveMessage(): void {
    const data = {
      title: this.message.title,
      description: this.message.description,
      postedby: this.message.postedby
    };

    this.messageService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMessage(): void {
    this.submitted = false;
    this.message = {
      title: '',
      description: '',
      published: false,
      postedby: ''
    };
  }

}