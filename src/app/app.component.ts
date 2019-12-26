import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  suggestionsCtrl = new FormControl();
  suggestions: string[] = []; // selected suggestions
  allSuggestions: string[] = []; // all the suggestions
  searchQuery = '';
  searchQueryUpdate = new Subject<string>();
  @ViewChild('suggestionInput', { static: false }) suggestionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private service: AppService) {
    this.searchQueryUpdate.pipe(
      debounceTime(200))
      .subscribe(value => {
        if (value) {
          this.getSuggestionsList(value.trim());
        } else {
          this.allSuggestions = [];
        }

      }
      );
  }

  remove(suggestion: string): void {
    const index = this.suggestions.indexOf(suggestion);
    if (index >= 0) {
      this.suggestions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.suggestions.push(event.option.viewValue);
    this.suggestionInput.nativeElement.value = '';
    this.suggestionsCtrl.setValue(null);
    this.allSuggestions = [];
  }

  private getSuggestionsList(value: string): any {
    this.allSuggestions = [];
    this.service.getSuggestions(value).then((res: any) => {
      this.allSuggestions = res;
    }, err => {
      console.log(err);
    });
  }


  public highlight(content): any {
    return content.replace(new RegExp(this.searchQuery, 'gi'), match => {
      return '<span class="highlight>' + match + '</span>';
    });
  }
}
