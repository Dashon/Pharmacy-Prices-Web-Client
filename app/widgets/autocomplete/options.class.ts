export class AutocompleteOptions {
  public placement:string;
  public animation:boolean;

  constructor(options:AutocompleteOptions) {
    Object.assign(this, options);
  }
}
