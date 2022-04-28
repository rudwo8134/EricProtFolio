import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Header from '../components/header';
import { useState } from 'react';
import { Html, RoundedBox } from '@react-three/drei';
import { Section } from '../components/section.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useRef, useTransition } from 'react';
import state from '../components/state';
import { useInView } from 'react-intersection-observer';
import useTranslation from 'next-translate/useTranslation';
import { useTheme } from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../atoms/HomeAtom';

const Model = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  return <primitive object={gltf.scene} dispose={null} />;
};
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  modelPath,
  position,
  bgColor,
}) => {
  const Chairref = useRef();
  useFrame(() => {
    Chairref.current.rotation.y += 0.01;
  });
  const [Item, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView, bgColor]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={position}>
        <mesh ref={Chairref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={Item}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function Home() {
  let { t } = useTranslation();
  const theme = useTheme();
  const [isDark] = useRecoilState(isDarkMode);
  const domContent = useRef();
  const scrollArea = useRef();
  const [backgroundColor, setBackgroundColor] = useState(theme.LIGHT);

  useEffect(() => {
    if (isDark) {
      setBackgroundColor(theme.DARK);
    } else {
      setBackgroundColor(theme.LIGHT);
    }
  }, [isDark, theme]);

  const onScroll = (e) => {
    state.top.current = e.target.scrollTop;
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Header />
      <div className="wrapper">
        <Canvas
          camera={{ position: [0, 0, 120], fov: 70 }}
          // colorManagement
        >
          <Lights />
          <Suspense fallback={null}>
            <HTMLContent
              domContent={domContent}
              modelPath="/armchairYellow.gltf"
              position={[80, 250, 0]}
              bgColor={backgroundColor.MAIN_COLOR}
            >
              <div className="container">
                <h1 className="title">{t('common:hello')}</h1>
              </div>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              modelPath="/armchairGreen.gltf"
              position={[0, 0, 0]}
              bgColor={backgroundColor.SECOND_COLOR}
            >
              <div className="container">
                <h1 className="title">BYE!</h1>
              </div>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              modelPath="/armchairGray.gltf"
              position={[-80, -250, 0]}
              bgColor={backgroundColor.THIRD_COLOR}
            >
              <div className="container">
                <h1 className="title">HAHAHA!</h1>
              </div>
            </HTMLContent>
          </Suspense>
        </Canvas>
      </div>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}
