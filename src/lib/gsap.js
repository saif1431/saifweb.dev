import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, MotionPathPlugin, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, Draggable, MotionPathPlugin, DrawSVGPlugin, useGSAP };
