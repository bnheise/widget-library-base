import { ICONS_ENDPOINT, SPRITE } from "./constants";
import { AppError } from "./errors";

interface Liferay {
  ThemeDisplay: ThemeDisplay;
  authToken: string;
  Util: Util;
  custom: SugarCustom;
  Icons: Icons;
}

interface ThemeDisplay {
  getPathThemeImages: () => string;
  getPortalURL: () => string;
  getLanguageId: () => string;
  getSiteAdminURL: () => string;
}

interface Icons {
  basePath: string;
  spritemap: string;
}

interface Util {
  isPhone: () => boolean;
}

interface SugarCustom {
  userPortraitUrl: string;
}

declare global {
  interface Window {
    Liferay: Liferay;
  }
}

export const getLiferay = (): Liferay => {
  const Liferay = window.Liferay;
  if (Liferay === null || Liferay === undefined)
    throw new AppError("Liferay global object not found");

  return Liferay;
};

export const getSpritemapPath = (): string => {
  const Liferay = getLiferay();
  const themeImagesBase = Liferay.ThemeDisplay.getPathThemeImages();
  return `${themeImagesBase}/${SPRITE}`;
};

export const buildPageLink = (pageUri: string): string => {
  const Liferay = getLiferay();
  const portalUrl = Liferay.ThemeDisplay.getPortalURL();
  return `${portalUrl}/${pageUri}`;
};

export const getAuthToken = (): string => {
  return getLiferay().authToken;
};

export const getLanguageId = (): string =>
  getLiferay().ThemeDisplay.getLanguageId().replace("_", "-");

export const getSpriteUrl = (): string =>
  `${getLiferay().ThemeDisplay.getPathThemeImages()}${ICONS_ENDPOINT}`;
