import Component from './Component.js';
import CpntItem from './CpntItem.js';

abstract class CpntWithScreen extends Component {
  private _value: number;
  private _radix: number;

  private readonly _screen: HTMLDivElement;

  public get value(): number {
    return parseInt(this._screen.textContent || '', 16);
  }

  public set value(value: number) {
    this._value = value;
    this._updateScreen();
  }

  public get radix(): number {
    return this._radix;
  }

  public set radix(radix: number) {
    if (radix >= 2 && radix <= 36) {
      this._radix = radix;
      this._updateScreen();
    }
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._screen = document.createElement('div');
    this._screen.setAttribute('is', 'cpnt-ws-screen');
    this.append(this._screen);

    this._value = 0;
    this._radix = 16;

    this._updateScreen();
  }

  private _updateScreen() {
    let text = '';

    switch (this._radix) {
    case 2:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0b' + text.padStart(11, '0');
      break;
    case 8:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0o' + text.padStart(11, '0');
      break;
    case 16:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 8);
      text = '0x' + text.padStart(8, '0');
      break;
    default:
      text = this._value.toString(this._radix);
      text = text.toUpperCase();
      break;
    }

    this._screen.textContent = text;
  }

}

export default CpntWithScreen;
