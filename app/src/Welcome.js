
import React, { useEffect, useRef,useState  } from 'react';
import mojs from '@mojs/core';
import './Welcome.css';

const e = document.documentElement;
const g = document.getElementsByTagName('body')[0];

const COLORS = {
  white: '#ffffff',
  black: '#000000',
  green: '#49F2CC',
  lightGrey: '#777',
  grey: '#29363B',
  cyan: 'cyan',
  yellow: '#FFE202',
  hotpink: 'deeppink',
};

const _getWindowSize = () => {
  const w = window;
  return Math.max(
    w.innerHeight || e.clientHeight || g.clientHeight,
    w.innerWidth || e.clientWidth || g.clientWidth
  );
};

const _calcScale = (radius) => {
  return 1.4 * (_getWindowSize() / radius / 2);
};

const circleSize = 500;
const scale = _calcScale(circleSize);

const circle1 = new mojs.Shape({
  radius: circleSize,
  fill: COLORS.grey,
  scale: { 0.05: 0.2 },
  duration: 465,
  easing: 'cubic.out',
  isShowEnd: false,
  isForce3d: true,
}).then({
  easing: 'cubic.inout',
  scale: 0.125,
  duration: 350,
}).then({
  easing: 'cubic.inout',
  scale: scale,
  duration: 465,
});

const circle2 = new mojs.Shape({
  radius: circleSize,
  fill: COLORS.lightGrey,
  scale: { 0: 0.1125 },
  duration: 407,
  delay: 580,
}).then({
  easing: 'cubic.inout',
  scale: scale,
  duration: 350,
});

const circle3 = new mojs.Shape({
  radius: circleSize,
  fill: COLORS.grey,
  scale: { 0: scale },
  duration: 580,
  delay: 1160,
  isShowStart: true,
});

const smallCircle = new mojs.Shape({
  radius: { 5: 25 },
  fill: 'none',
  stroke: COLORS.grey,
  strokeWidth: { 20: 0 },
  isShowEnd: false,
  delay: 700,
  duration: 290,
});

const triangleOpts = {
  shape: 'polygon',
  radius: 15,
  duration: 407,
  fill: COLORS.lightGrey,
  y: { 80: -15 },
  scale: { 1: 0 },
  delay: 495,
  isForce3d: true,
  easing: 'cubic.out',
};

const triangle1 = new mojs.Shape(triangleOpts);

const triangle2 = new mojs.Shape({
  ...triangleOpts,
  y: { '-80': 15 },
  angle: 180,
});

const lineOpts = {
  shape: 'line',
  x: -180,
  radius: 50,
  radiusY: 0,
  stroke: COLORS.grey,
  strokeWidth: { 15: 0 },
  duration: 580,
  isShowEnd: false,
  strokeDasharray: '100% 100%',
  strokeDashoffset: { '-100%': '100%' },
  easing: 'cubic.out',
};

const line1 = new mojs.Shape(lineOpts);

const line2 = new mojs.Shape({
  ...lineOpts,
  angle: 180,
  x: -lineOpts.x,
});

const timeline = new mojs.Timeline();
timeline.add(
  circle1,
  circle2,
  circle3,
  smallCircle,
  triangle1,
  triangle2,
  line1,
  line2
);

const Welcome = () => {
    const [animationFinished, setAnimationFinished] = useState(false);
    const animationRef = useRef(null);
  
    useEffect(() => {
      timeline.replay();
  
      animationRef.current = timeline;
  
      // set update status
      setTimeout(() => {
        setAnimationFinished(true);
      }, timeline._timelines.slice(-1)[0].props.duration + timeline._timelines.slice(-1)[0].props.delay);
  
      return () => {
        timeline.reset();
        animationRef.current = null;
      };
    }, []);
  
    //  if animation finished return null
    if (animationFinished) {
      return null;
    }
  
    return <div id="animation-container"></div>;
  };
  

export default Welcome;
