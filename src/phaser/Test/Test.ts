import * as Phaser from "phaser";
import { DropDownList } from "phaser3-rex-plugins/templates/ui/ui-components.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export class DropDownTest extends Phaser.Scene {
  x: number;
  y: number;
  name: string;
  constructor(x, y, name) {
    super({
      key: "Test",
      active: true,
      x,
      y,
      name,
    });
    this.x = x;
    this.y = y;
    this.name = name;
  }

  preload() {}
  create() {
    const createTextObject = (text) => {
      return this.add.text(0, 0, text, { fontSize: 20 });
    };
    let stringOption = false;
    let options = [];
    if (stringOption) {
      options = ["A", "BB", "CCC", "DDDD"];
    } else {
      options = [
        { text: "A", value: 0 },
        { text: "BB", value: 10 },
        { text: "CCC", value: 100 },
        { text: "DDDD", value: 1000 },
      ];
      const print = this.add.text(0, 0, "");
      const config = {
        x: 100,
        y: 100,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
        text: createTextObject("드롭다운 메뉴").setFixedSize(150, 0),
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          icon: 10,
        },

        options: options,

        list: {
          createBackgroundCallback: function (scene) {
            return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
          },
          createButtonCallback: function (scene, option, index, options) {
            const text = stringOption ? option : option.text;
            const button = scene.rexUI.add.label({
              background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

              text: createTextObject(text),

              space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                icon: 10,
              },
            });
            button.value = stringOption ? undefined : option.value;

            return button;
          },

          // scope: dropDownList
          onButtonClick: function (button, index, pointer, event) {
            // Set label text, and value
            this.text = button.text;
            this.value = button.value;
            print.text += `Select ${button.text}, value=${button.value}\n`;
          },

          // scope: dropDownList
          onButtonOver: function (button, index, pointer, event) {
            button.getElement("background").setStrokeStyle(1, 0xffffff);
          },

          // scope: dropDownList
          onButtonOut: function (button, index, pointer, event) {
            button.getElement("background").setStrokeStyle();
          },

          // expandDirection: 'up',
        },

        setValueCallback: function (dropDownList, value, previousValue) {
          console.log(value);
        },
        value: undefined,
      };
      const dropDownList = new DropDownList(this, config).layout();
      this.add.existing(dropDownList);
    }
  }

  update() {}
}
