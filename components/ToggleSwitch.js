import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkMode } from '../atoms/HomeAtom';

const Lable = styled.label`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 2rem;
  margin: 0px 0;
  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 2rem;
    width: 2rem;
    left: ${({ isDark }) => (!isDark ? '0px' : '1rem')};

    top: 0px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${({ theme, isDark }) =>
      !isDark ? theme.LIGHT.MAIN_COLOR_DARK : theme.LIGHT.MAIN_COLOR};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(50px);
    -ms-transform: translateX(50px);
    transform: translateX(50px);
  }

  .slider.strip {
    border-radius: 15px;
    font-size: 1rem;
    display: flex;
    padding: ${({ isDark }) =>
      !isDark ? '0rem 1rem 0rem 0rem' : '0rem 0rem 0rem 1rem'};
    justify-content: ${({ isDark }) => (!isDark ? 'flex-end' : 'flex-start')};
    align-items: center;
    color: white;
  }

  .slider.strip:before {
    background: #fff;
    box-shadow: 0 0 10px 3px #ccc;
    border-radius: 50%;
    bottom: -9px;
  }
`;

const ToggleSwitch = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const { t } = useTranslation();
  return (
    <Lable className={'switch strip'} isDark={isDark}>
      <input
        value={isDark}
        type="checkbox"
        onChange={(e) => setIsDark(!isDark)}
      />
      <span className={'slider strip'}>
        {isDark ? `${t('common:Nav.Light')}` : `${t('common:Nav.Dark')}`}
      </span>
    </Lable>
  );
};

export default ToggleSwitch;
