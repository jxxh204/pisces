import type Level1 from "../phaser/Level1/Level1";
type ColliderType = {
  floor: boolean;
  activeCount: boolean[];
  timer: NodeJS.Timeout;
};
type ScenesType = {
  level1: Phaser.Scene | Level1 | null;
};
type ActionsType = Array<"idle" | "walk">;

type ImageOptionType = {
  frameWidth: number;
  frameHeight: number;
};

type characterLocationType = {
  w: number;
  h: number;
  currentY: number;
};
