import type Level1 from "../phaser/Sprites/Character";
type PlayerLocationType = {
  w: number;
  h: number;
  currentY: number;
};

type ColliderType = {
  floor: boolean;
  activeCount: boolean[];
  timer: NodeJS.Timeout;
};
type ScenesType = {
  level1: Phaser.Scene | Level1 | any;
};

type ImageOptionType = {
  frameWidth: number;
  frameHeight: number;
};

type CharacterLocationType = {
  x: number;
  y: number;
  currentY: number;
};
type ActionKeyType =
  | "left_idle"
  | "right_idle"
  | "left_walk"
  | "right_walk"
  | "run"
  | "jump"
  | "running";
type AnimationsType = {
  key: ActionKeyType;
  start: number;
  end: number;
  zeroPad?: number;
  frames?: number[];
  frameRate: number;
  repeat: number;
};

type MotionSpeedTypes = {
  walk: number;
  run: number;
  jump: number;
};
