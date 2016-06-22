/* tslint:disable */
/**
 * bootstrap
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
  Directive, Input, Output, HostListener,
  EventEmitter, OnInit,
  ElementRef, Renderer,
  DynamicComponentLoader, ComponentRef, Provider, Injector
} from 'angular2/core';
import {NgModel}from 'angular2/common';

function setProperty(renderer:Renderer, elementRef:ElementRef, propName:string, propValue:any) {
  renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
}

import {positionService} from './position';
import {AutocompleteUtils} from './sanitize';
import {AutocompleteContainer} from './autocomplete-container';
import {AutocompleteOptions} from './options.class';




@Directive({
  selector: 'autocomplete[ngModel], [ngModel][autocomplete]'
})
export class Autocomplete implements OnInit {
  @Output() public autocompleteLoading:EventEmitter<boolean> = new EventEmitter();
  @Output() public autocompleteNoResults:EventEmitter<boolean> = new EventEmitter();
  @Output() public autocompleteOnSelect:EventEmitter<{item: any}> = new EventEmitter();

  @Input() public autocomplete:any;
  @Input() public autocompleteMinLength:number;
  @Input() public autocompleteWaitMs:number;
  @Input() public autocompleteOptionsLimit:number;
  @Input() public autocompleteOptionField:string;
  @Input() public autocompleteAsync:boolean = null;
  @Input() public autocompleteLatinize:boolean = true;
  @Input() public autocompleteSingleWords:boolean = true;
  @Input() public autocompleteWordDelimiters:string = ' ';
  @Input() public autocompletePhraseDelimiters:string = '\'"';



  public container:AutocompleteContainer;

  private debouncer:Function;
  private _matches:Array<any> = [];
  private placement:string = 'bottom-left';
  private popup:Promise<ComponentRef>;

  constructor(private cd:NgModel,
              private element:ElementRef,
              private renderer:Renderer,
              private loader:DynamicComponentLoader) {
  }

  public get matches() {
    return this._matches;
  }

  private debounce(func:Function, wait:number):Function {
    let timeout:any;
    let args:Array<any>;
    let timestamp:number;
    let waitOriginal:number = wait;

    return function () {
      // save details of latest call
      args = [].slice.call(arguments, 0);
      timestamp = Date.now();

      // this trick is about implementing of 'autocompleteWaitMs'
      // in this case we have adaptive 'wait' parameter
      // we should use standard 'wait'('waitOriginal') in case of
      // popup is opened, otherwise - 'autocompleteWaitMs' parameter
      wait = this.container ? waitOriginal : this.autocompleteWaitMs;

      // this is where the magic happens
      let later = function () {

        // how long ago was the last call
        let last = Date.now() - timestamp;

        // if the latest call was less that the wait period ago
        // then we reset the timeout to wait for the difference
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
          // or if not we can null out the timer and run the latest
        } else {
          timeout = null;
          func.apply(this, args);
        }
      };

      // we only need to set the timer now if one isn't already running
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  }

  private processMatches() {
    this._matches = [];
    if (this.cd.model.toString().length >= this.autocompleteMinLength) {
      // If singleWords, break model here to not be doing extra work on each iteration
      let normalizedQuery = (this.autocompleteLatinize ? AutocompleteUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      normalizedQuery = this.autocompleteSingleWords ? AutocompleteUtils.tokenize(normalizedQuery, this.autocompleteWordDelimiters, this.autocompletePhraseDelimiters) : normalizedQuery;
      for (let i = 0; i < this.autocomplete.length; i++) {
        let match:string;

        if (typeof this.autocomplete[i] === 'object' &&
          this.autocomplete[i][this.autocompleteOptionField]) {
          match = this.autocompleteLatinize ? AutocompleteUtils.latinize(this.autocomplete[i][this.autocompleteOptionField].toString()) : this.autocomplete[i][this.autocompleteOptionField].toString();
        }

        if (typeof this.autocomplete[i] === 'string') {
          match = this.autocompleteLatinize ? AutocompleteUtils.latinize(this.autocomplete[i].toString()) : this.autocomplete[i].toString();
        }

        if (!match) {
          console.log('Invalid match type', typeof this.autocomplete[i], this.autocompleteOptionField);
          continue;
        }

        if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
          this._matches.push(this.autocomplete[i]);
          if (this._matches.length > this.autocompleteOptionsLimit - 1) {
            break;
          }
        }
      }
    }
  }

  private testMatch(match:string, test:any) {
    let spaceLength:number;

    if (typeof test === 'object') {
      spaceLength = test.length;
      for (let i = 0; i < spaceLength; i += 1) {
        if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
          return false;
        }
      }
      return true;
    } else {
      return match.indexOf(test) >= 0;
    }
  }

  private finalizeAsyncCall() {
    this.autocompleteLoading.emit(false);
    this.autocompleteNoResults.emit(this.cd.model.toString().length >=
      this.autocompleteMinLength && this.matches.length <= 0);

    if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
      this.hide();
      return;
    }

    if (this.container && this._matches.length > 0) {
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.autocompleteLatinize ? AutocompleteUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      this.container.query = this.autocompleteSingleWords ? AutocompleteUtils.tokenize(normalizedQuery, this.autocompleteWordDelimiters, this.autocompletePhraseDelimiters) : normalizedQuery;
      this.container.matches = this._matches;
    }

    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

  ngOnInit() {
    this.autocompleteOptionsLimit = this.autocompleteOptionsLimit || 20;
    this.autocompleteMinLength = this.autocompleteMinLength || 1;
    this.autocompleteWaitMs = this.autocompleteWaitMs || 0;

    // async should be false in case of array
    if (this.autocompleteAsync === null && typeof this.autocomplete !== 'function') {
      this.autocompleteAsync = false;
    }

    // async should be true for any case of function
    if (typeof this.autocomplete === 'function') {
      this.autocompleteAsync = true;
    }

    if (this.autocompleteAsync === true) {
      this.debouncer = this.debounce(() => {
        if (typeof this.autocomplete === 'function') {
          this.autocomplete().then((matches:any[]) => {
            this._matches = [];
            if (this.cd.model.toString().length >= this.autocompleteMinLength) {
              for (let i = 0; i < matches.length; i++) {
                this._matches.push(matches[i]);
                if (this._matches.length > this.autocompleteOptionsLimit - 1) {
                  break;
                }
              }
            }

            this.finalizeAsyncCall();
          });
        }

        // source is array
        if (typeof this.autocomplete === 'object' && this.autocomplete.length) {
          this.processMatches();
          this.finalizeAsyncCall();
        }
      }, 100);
    }
  }

  @HostListener('keyup', ['$event'])
  onChange(e:KeyboardEvent) {
    if (this.container) {
      // esc
      if (e.keyCode === 27) {
        this.hide();
        return;
      }

      // up
      if (e.keyCode === 38) {
        this.container.prevActiveMatch();
        return;
      }

      // down
      if (e.keyCode === 40) {
        this.container.nextActiveMatch();
        return;
      }

      // enter
      if (e.keyCode === 13) {
        this.container.selectActiveMatch();
        return;
      }
    }

    this.autocompleteLoading.emit(true);

    if (this.autocompleteAsync === true) {
      this.debouncer();
    }

    if (this.autocompleteAsync === false) {
      this.processMatches();
      this.finalizeAsyncCall();
    }
  }

  public changeModel(value:any) {
    let valueStr:string = ((typeof value === 'object' && this.autocompleteOptionField) ? value[this.autocompleteOptionField] : value).toString();
    this.cd.viewToModelUpdate(valueStr);
    setProperty(this.renderer, this.element, 'value', valueStr);
    this.hide();
  }

  show(matches:Array<any>) {
    let options = new AutocompleteOptions({
      placement: this.placement,
      animation: false
    });

    let binding = Injector.resolve([
      new Provider(AutocompleteOptions, {useValue: options})
    ]);


    this.popup = this.loader
      .loadNextToLocation(AutocompleteContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
        componentRef.instance.position(this.element);
        this.container = componentRef.instance;
        this.container.parent = this;
        // This improves the speedas it won't have to be done for each list item
        let normalizedQuery = (this.autocompleteLatinize ? AutocompleteUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
        this.container.query = this.autocompleteSingleWords ? AutocompleteUtils.tokenize(normalizedQuery, this.autocompleteWordDelimiters, this.autocompletePhraseDelimiters) : normalizedQuery;
        this.container.matches = matches;
        this.container.field = this.autocompleteOptionField;
        this.element.nativeElement.focus();
        return componentRef;
      });
  }

  hide() {
    if (this.container) {
      this.popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        this.container = null;
        return componentRef;
      });
    }
  }
}


