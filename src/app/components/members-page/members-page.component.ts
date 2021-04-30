import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/common/message';
@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  // messageFormGroup: FormGroup;

  constructor(
               ) { }

  ngOnInit() {

    // this.messageFormGroup = this.formBuilder.group({
    //   messages: this.formBuilder.group({
    //     message: [''],
    //     postedBy: ['']
        
     // })
   // });
  }

  // onSubmit() {
  //   console.log("Handling the submit button");

  //   if (this.messageFormGroup.invalid) {
  //     this.messageFormGroup.markAllAsTouched();
  //     return;
  //   }

    

    // set up msg
    // let msg = new Message();
    
    // // populate msg - message
    // msg.message = this.messageFormGroup.controls['message'].value;
    
    // // populate msg - postedBy
    // msg.postedBy = this.messageFormGroup.controls['postedBy'].value;
    
  
    
    // call REST API via the MessageService
    // this.messageService.sendMessage(msg).subscribe({
    //     next: response => {
    //       alert(`Your message has been posted`);

    //       // reset cart
    //       // this.resetCart();

    //     },
    //     error: err => {
    //       alert(`There was an error: ${err.message}`);
    //     }
    //   }
    // );

  }

//}
