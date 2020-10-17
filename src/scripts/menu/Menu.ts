import OpenButton from './buttons/OpenButton.js';
import SaveButton from './buttons/SaveButton.js';
import TrashButton from './buttons/TrashButton.js';
import CpntButton from './buttons/CpntButton.js';
import RunButton from './buttons/RunButton.js';
import StepButton from './buttons/StepButton.js';
import ResetButton from './buttons/ResetButton.js';
import AboutButton from './buttons/AboutButton.js';
import Computer from '../Computer.js';
import Gallery from './Gallery.js';
import MenuButton from './MenuButton.js';

class Menu extends HTMLElement {
  private readonly _buttons: Map<string, MenuButton>;

  public readonly openButton: OpenButton;
  public readonly saveButton: SaveButton;
  public readonly trashButton: TrashButton;
  public readonly cpntButton: CpntButton;
  public readonly runButton: RunButton;
  public readonly stepButton: StepButton;
  public readonly resetButton: ResetButton;
  public readonly aboutButton: AboutButton;

  public constructor(computer: Computer, gallery: Gallery) {
    super();

    this._buttons = new Map();

    this.openButton = new OpenButton(computer);
    this.saveButton = new SaveButton(computer);
    this.trashButton = new TrashButton();
    this.cpntButton = new CpntButton(gallery);
    this.runButton = new RunButton(computer);
    this.stepButton = new StepButton(computer);
    this.resetButton = new ResetButton(computer);
    this.aboutButton = new AboutButton();

    this.addButton(this.openButton);
    this.addButton(this.saveButton);
    this.addButton(this.trashButton);
    this.addButton(this.cpntButton);
    this.addButton(this.runButton);
    this.addButton(this.stepButton);
    this.addButton(this.resetButton);
    this.addButton(this.aboutButton);

    computer.addEventListener('run', () => {
      this._buttons.forEach((button, key) => {
        if (key !== 'run') {
          button.style.pointerEvents = 'none';
          this.cpntButton.open = false;
        }
      });
    });

    computer.addEventListener('stop', () => {
      this._buttons.forEach(button => {
        button.style.pointerEvents = 'all';
      });
    });

    computer.addEventListener('step', () => {
      this._buttons.forEach(button => {
        button.style.pointerEvents = 'none';
        this.cpntButton.open = false;
      });
    });

    computer.addEventListener('pause', () => {
      this._buttons.forEach(button => {
        button.style.pointerEvents = 'all';
      });
    });
  }

  private addButton(button: MenuButton): void {
    button.style.pointerEvents = 'all';
    this.append(button);
  }
}

customElements.define('main-menu', Menu);

export default Menu;
