import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(list: any, searchText: string): SafeHtml {

        if (!list) { return []; }
        if (!searchText) { return list; }

        const value = list.replace(
            searchText, `<span style='font-weight: 600;color: red;'>${searchText}</span>`);
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
