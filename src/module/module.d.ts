
interface Mushrooms {
    [key: string]: string;
    idle:string
    jump:string
    run:string
}
type MotionStatus = "up" | "down" | "left" | "right" | "space" | "shift" | "idle"
interface Motions {
    idle:boolean
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
    space:boolean;
    shift:boolean;
}