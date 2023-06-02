import * as Phaser from "phaser";
import { DropDownList } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { CreateSystemIcon } from "@/module/createSystemIcon";
import system_webRTCImg from "@/assets/images/system/webRTC.png";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export class DropDownTest extends Phaser.Scene {
  rexUI: RexUIPlugin;
  x: number;
  y: number;
  name: string;
  constructor(x: number, y: number, name: string) {
    super({
      key: "Test",
      active: true,
    });
    this.x = x;
    this.y = y;
    this.name = name;
  }

  preload() {}
  create() {
    const createTextObject = (text: string) => {
      return this.add.text(0, 0, text, { fontSize: 20 }); // string 안먹힘.
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
          createBackgroundCallback: function (scene: Phaser.Scene) {
            return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
          },
          createButtonCallback: function (
            scene: Phaser.Scene,
            option: object,
            index: number,
            options: object[]
          ) {
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
          onButtonClick: function (
            button: any,
            index: number,
            pointer: number,
            event: Event
          ) {
            // Set label text, and value
            this.text = button.text;
            this.value = button.value;
            print.text += `Select ${button.text}, value=${button.value}\n`;
          },

          // scope: dropDownList
          onButtonOver: function (
            button: any,
            index: number,
            pointer: number,
            event: Event
          ) {
            button.getElement("background").setStrokeStyle(1, 0xffffff);
          },

          // scope: dropDownList
          onButtonOut: function (
            button: any,
            index: number,
            pointer: number,
            event: Event
          ) {
            button.getElement("background").setStrokeStyle();
          },

          // expandDirection: 'up',
        },

        setValueCallback: function (
          dropDownList,
          value,
          previousValue: number
        ) {
          console.log("setValueCallback", value);
        },
        value: undefined,
      };
      const dropDownList = new DropDownList(this, config).layout();
      this.add.existing(dropDownList);
    }
  }

  update() {}
}
const CreateDialog = function (scene: Phaser.Scene) {
  const rtcLocation = {
    x: 200,
    y: 300,
  };
  const rtc = new CreateSystemIcon(
    scene,
    "webRTC",
    system_webRTCImg,
    rtcLocation
  );
  rtc?.loadImage();
  rtc.setDepth(30);
  rtc?.create();
  const dialog = scene.rexUI.add
    .dialog({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

      title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(
          0,
          0,
          100,
          40,
          20,
          "#C5C5C5"
        ),
        text: scene.add.text(0, 0, "Finder", {
          fontSize: "12px",
        }),
        space: {
          left: 5,
          right: 5,
          top: 1,
          bottom: 1,
        },
      }),

      // content: scene.add.text(0, 0, "Do you want to build a snow man?", {
      //   fontSize: "24px",
      // }),

      actions: [CreateLabel(scene, "확인"), CreateLabel(scene, "취소")],

      space: {
        title: 25,
        content: 25,
        action: 15,

        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },

      align: {
        actions: "right", // 'center'|'left'|'right'
      },

      expand: {
        content: false, // Content is a pure text object
      },
      manualClose: false,

      duration: {
        in: 200,
        hold: 2000,
        out: 200,
      },
    })
    .on(
      "button.over",
      function (
        button,
        groupName: number,
        index: number,
        pointer: number,
        event: Event
      ) {
        button.getElement("background").setStrokeStyle(1, 0xffffff);
      }
    )
    .on(
      "button.out",
      function (
        button,
        groupName: number,
        index: number,
        pointer: number,
        event: Event
      ) {
        button.getElement("background").setStrokeStyle();
      }
    );
  console.log(dialog);
  dialog.setDepth(-1);
  return dialog;
};

const CreateLabel = function (scene: Phaser.Scene, text: string) {
  return scene.rexUI.add.label({
    // width: 40,
    // height: 40,

    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

    text: scene.add.text(0, 0, text, {
      fontSize: "24px",
    }),

    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  });
};
export class ModalDialog extends Phaser.Scene {
  x: number;
  y: number;
  name: string;
  constructor(x: number, y: number, name: string) {
    super({
      key: "modalDialog",
      active: true,
    });
    this.x = x;
    this.y = y;
    this.name = name;
  }

  preload() {}

  async create() {
    CreateDialog(this).setPosition(300, 300).setVisible(true).layout();
    // .moveFromPromise(1000, undefined, "-=400", "Back");
    // di.modalPromise();

    // {
    //   manaulClose: true,
    //   duration: {
    //     in: 500,
    //     out: 500,
    //   },
    // }
    // .layout()
    // .modalPromise({
    //   manaulClose: true,
    //   duration: {
    //     in: 500,
    //     out: 500,
    //   },
    // })
    // .then(function (data) {
    //   print.text = `\
    //   index: ${data.index}
    //   text : ${data.text}
    //   `;
    // });
  }

  update() {}
}
