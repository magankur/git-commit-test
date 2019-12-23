import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/utils/api-request.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.sass']
})
export class CommitsComponent implements OnInit {

  public commitList: any[] = [];

  constructor(public api: ApiRequestService) { }

  ngOnInit() {
    // get commit list 
    this.onGetCommits();
  }

  /**
   * Get commit list.
   * @param page page number
   */
  onGetCommits() {
    this.spinner('show');
    this.api.getCommits().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.commitList = res;
      }
      this.spinner('hide');
    });
  }

  /**
   * Get sha commit code.
   * @param sha data
   */
  getInitialShaCode(sha: string) {
    return sha.substring(0, 7);
  }

  /**
   * Substring data based on type.
   * @param type data separater type
   * @param data data
   */
  getRespectiveData(type: string, data: string) {
    let dataToReturn;
    if (type == 'author') {
      dataToReturn = `${data.substring(0, data.lastIndexOf("/"))}s?author=`;
    } else if (type == 'code') {
      dataToReturn = `${data.replace('commit', 'tree')}`;
    }
    return dataToReturn;
  }

  /**
   * Copy data to clipboard.
   * @param data data
   */
  copyToClipboard(data: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = data.split("/").pop();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toast('success', 'Copied to clipboard.');
  }

  /**
   * Message popup.
   * @param type toast type
   * @param message message
   */
  toast(type: string, message: string) {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    let element = document.getElementById("snackbar");
    // Add the "show" class to DIV
    element.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(() => { element.className = element.className.replace("show", ""); }, 3000);
  }

  /**
   * Loader.
   * @param type show|hide
   */
  spinner(type: string) {
    let element = document.getElementById("spinner");

    if (type == 'show') {
      element.className = "show";
    } else if (type == 'hide') {
      element.className = "";
    }
  }

}
