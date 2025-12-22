'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

interface ParticlesBackgroundProps {
  id?: string;
  particleColor?: string;
  lineColor?: string;
  backgroundGradient?: string;
}

export function ParticlesBackground({
  id = 'particles-js',
  particleColor = '#87ceeb', // デフォルト: 淡い水色 (Sky Blue)
  lineColor = '#87ceeb',
  backgroundGradient = 'linear-gradient(to bottom, #ffffff, #f0f9ff)',
}: ParticlesBackgroundProps) {
  useEffect(() => {
    // particles.jsのスクリプトをロード
    const script = document.createElement('script');
    script.src = '/particles.js';
    script.async = true;
    script.onload = () => {
      // particles.jsがロードされた後に初期化
      if (window.particlesJS) {
        window.particlesJS(id, {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: particleColor
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: lineColor,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1
                }
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // クリーンアップ
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [id, particleColor, lineColor]);

  return (
    <div
      id={id}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        background: backgroundGradient
      }}
    />
  );
}

