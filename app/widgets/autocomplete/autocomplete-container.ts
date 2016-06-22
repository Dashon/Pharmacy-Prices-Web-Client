/* tslint:disable */
/**
 * bootstrap
 **/
import {Component, ElementRef, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Autocomplete} from './autocomplete.component';
import {AutocompleteOptions} from './options.class';
import {positionService} from './position';


@Component({
  selector: 'autocomplete-container',
  directives: [CORE_DIRECTIVES],
  template: `
                  <ul class="dropdown-menu"
                      [ngStyle]="{top: top, left: left, display: display}"
                      style="display: block">
                    <li *ngFor="#match of matches"
                        [class.active]="isActive(match)"
                        (mouseenter)="selectActive(match)">
                        <a href="#" (click)="selectMatch(match, $event)" tabindex="-1" [innerHtml]="hightlight(match, query)"></a>
                    </li>
                  </ul>
              `,

  encapsulation: ViewEncapsulation.None
})
export class AutocompleteContainer {
  public parent:Autocomplete;
  public query:any;
  private _matches:Array<any> = [];
  private _field:string;
  private _active:any;
  private top:string;
  private left:string;
  private display:string;
  private placement:string;

  constructor(public element:ElementRef, options:AutocompleteOptions) {
    Object.assign(this, options);
  }

  public get matches():Array<string> {
    return this._matches;
  }

  public set matches(value:Array<string>) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
    }
  }

  public set field(value:string) {
    this._field = value;
  }

  public position(hostEl:ElementRef) {
    this.display = 'block';
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
  }

  public selectActiveMatch() {
    this.selectMatch(this._active);
  }

  public prevActiveMatch() {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
  }

  public nextActiveMatch() {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
  }

  private selectActive(value:any) {
    this._active = value;
  }

  private isActive(value:any):boolean {
    return this._active === value;
  }

  private selectMatch(value:any, e:Event = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.parent.changeModel(value);
    this.parent.autocompleteOnSelect.emit({
      item: value
    });
    return false;
  }

  private hightlight(item:any, query:string) {
    let itemStr:string = (typeof item === 'object' && this._field ? item[this._field] : item).toString();
    //let itemStrHelper:string = (this.parent.autocompleteLatinize ? AutocompleteUtils.latinize(itemStr) : itemStr).toLowerCase();
    let itemStrHelper:string =itemStr.toLowerCase();
    let startIdx:number;
    let tokenLen:number;

    if (typeof query === 'object') {
      let queryLen:number = query.length;
      for (let i = 0; i < queryLen; i += 1) {
        startIdx = itemStrHelper.indexOf(query[i]);
        tokenLen = query[i].length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
          itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
        }
      }
    } else if (query) {
      startIdx = itemStrHelper.indexOf(query);
      tokenLen = query.length;
      if (startIdx >= 0 && tokenLen > 0) {
        itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
      }
    }

    return itemStr;
  }
}
