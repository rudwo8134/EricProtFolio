import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkMode } from '../atoms/HomeAtom';
import ToggleSwitch from './ToggleSwitch';


const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  return (
    <header>
      <div className="header-inner">
        <div className="logo">{t('common:Nav.HomePageName')}</div>
        <nav>
          <List>
            <li onClick={() => setIsDark(!isDark)}>
              <Link href="/">{t('common:Nav.Home')}</Link>
            </li>
            <li>
              <Link href="/">{t('common:Nav.Intro')}</Link>
            </li>
            <li>
              <Link href="/">{t('common:Nav.About')}</Link>
            </li>
            <li>
              <Link href="/">{t('common:Nav.Project')}</Link>
            </li>
            <li>
              <Link href="/">{t('common:Nav.Testimonial')}</Link>
            </li>
            <ToggleSwitch />
            <li className="btn">
              <Link href="/">{t('common:Nav.Contact')}</Link>
            </li>
          </List>
        </nav>
      </div>
    </header>
  );
}
