import * as Phaser from "phaser";
import system_trashImg from "@/assets/images/system/Trash.png";
import system_webRTCImg from "@/assets/images/system/webRTC.png";
import system_folder from "@/assets/images/system/folder-default.png";
import system_contact from "@/assets/images/system/Contact.png";
import system_codec from "@/assets/images/system/movie.png";
import system_audio from "@/assets/images/system/music.png";
import { CreateSystemIcon } from "@/module/createSystemIcon";

type IconType = {
  scene: Phaser.Scene;
  name: string;
  image: string;
  location: {
    x: number;
    y: number;
  };
};
export class Icons extends Phaser.Scene {
  iconClass: CreateSystemIcon[];

  constructor() {
    super({
      key: "icons",
      active: true,
    });
    this.iconClass = [];
  }
  preload() {
    const icons: IconType[] = [
      {
        scene: this,
        name: "Trash",
        image: system_trashImg,
        location: {
          x: 500,
          y: 100,
        },
      },
      {
        scene: this,
        name: "WebRTC",
        image: system_webRTCImg,
        location: {
          x: 500,
          y: 200,
        },
      },
      {
        scene: this,
        name: "Folder",
        image: system_folder,
        location: {
          x: 500,
          y: 300,
        },
      },
      {
        scene: this,
        name: "Contact",
        image: system_contact,
        location: {
          x: 500,
          y: 400,
        },
      },
      {
        scene: this,
        name: "Codec",
        image: system_codec,
        location: {
          x: 500,
          y: 500,
        },
      },
      {
        scene: this,
        name: "Audio",
        image: system_audio,
        location: {
          x: 500,
          y: 600,
        },
      },
    ];

    icons.map((icon: IconType) => {
      const createdIcon = new CreateSystemIcon(
        icon.scene,
        icon.name,
        icon.image,
        icon.location
      );
      this.iconClass.push(createdIcon);
    });
    this.iconClass.map((icon) => {
      icon.loadImage();
    });
  }
  create() {
    this.iconClass.map((icon) => {
      icon.create();
    });
  }
  update() {}
}
