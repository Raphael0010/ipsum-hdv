import { createTheme } from '@pikas-ui/styles';
// TODO: Remove the workaround whenever MS fixes the issue
// https://github.com/microsoft/TypeScript/issues/48212
import type {} from '@stitches/react';

export const themeDefault = createTheme({
  colors: {
    PRIMARY_DARKER: '#712432',
    PRIMARY_DARK: '#aa374b',
    PRIMARY: '#e24964',
    PRIMARY_LIGHT: '#f1a4b2',
    PRIMARY_LIGHTER: '#f8d1d8',
    PRIMARY_LIGHTEST_2: '#fcedef',
    PRIMARY_LIGHTEST_1: '#fef6f7',

    SECONDARY_DARKER: '#272027',
    SECONDARY_DARK: '#3b313a',
    SECONDARY: '#4f414e',
    SECONDARY_LIGHT: '#a7a0a6',
    SECONDARY_LIGHTER: '#d3cfd3',
    SECONDARY_LIGHTEST_2: '#edeced',
    SECONDARY_LIGHTEST_1: '#f6f5f6',

    TERTIARY_DARKER: '#7f4a2d',
    TERTIARY_DARK: '#be6e43',
    TERTIARY: '#fd935a',
    TERTIARY_LIGHT: '#fec9ac',
    TERTIARY_LIGHTER: '#fee4d6',
    TERTIARY_LIGHTEST_2: '#fff4ee',
    TERTIARY_LIGHTEST_1: '#fff9f7',

    BLACK: '#292e36',
    BLACK2: '#292E36',
    BLACK_LIGHT: 'rgba(34, 40, 49, 0.5)',
    BLACK_LIGHTER: 'rgba(34, 40, 49, 0.25)',
    BLACK_LIGHTEST_2: 'rgba(34, 40, 49, 0.1)',
    BLACK_LIGHTEST_1: 'rgba(34, 40, 49, 0.05)',

    WHITE: '#FFFFFF',
    WHITE2: '#FFFFFF',
    WHITE_LIGHT: 'rgba(249, 247, 247, 0.7)',
    WHITE_LIGHTER: 'rgba(249, 247, 247, 0.5)',
    WHITE_LIGHTEST_2: 'rgba(249, 247, 247, 0.35)',
    WHITE_LIGHTEST_1: 'rgba(249, 247, 247, 0.25)',

    BLACK_FIX: '#292E36',
    BLACK_FIX_LIGHT: 'rgba(34, 40, 49, 0.5)',
    BLACK_FIX_LIGHTER: 'rgba(34, 40, 49, 0.25)',
    BLACK_FIX_LIGHTEST_2: 'rgba(34, 40, 49, 0.1)',
    BLACK_FIX_LIGHTEST_1: 'rgba(34, 40, 49, 0.05)',

    WHITE_FIX: '#FFFFFF',
    WHITE_FIX_LIGHT: 'rgba(249, 247, 247, 0.7)',
    WHITE_FIX_LIGHTER: 'rgba(249, 247, 247, 0.5)',
    WHITE_FIX_LIGHTEST_2: 'rgba(249, 247, 247, 0.35)',
    WHITE_FIX_LIGHTEST_1: 'rgba(249, 247, 247, 0.25)',

    GRAY_DARKER: '#505050',
    GRAY_DARK: '#A5A6AF',
    GRAY: '#DCDDE9',
    GRAY_LIGHT: '#E5E5E5',
    GRAY_LIGHTER: '#F6F6F9',
    GRAY_LIGHTEST_2: '#FBFCFD',
    GRAY_LIGHTEST_1: '#FDFDFE',

    SUCCESS_DARKER: '#1e611d',
    SUCCESS_DARK: '#2d912c',
    SUCCESS: '#3cc13b',
    SUCCESS_LIGHT: '#9de09d',
    SUCCESS_LIGHTER: '#ceefce',
    SUCCESS_LIGHTEST_2: '#ebf9eb',
    SUCCESS_LIGHTEST_1: '#f5fcf5',

    WARNING_DARKER: '#7a5d0e',
    WARNING_DARK: '#b68c15',
    WARNING: '#f3bb1c',
    WARNING_LIGHT: '#f9dd8d',
    WARNING_LIGHTER: '#fceec6',
    WARNING_LIGHTEST_2: '#fef8e8',
    WARNING_LIGHTEST_1: '#fefcf4',

    DANGER_DARKER: '#781C1C',
    DANGER_DARK: '#B4292A',
    DANGER: '#F03738',
    DANGER_LIGHT: '#F79B9B',
    DANGER_LIGHTER: '#FBCDCD',
    DANGER_LIGHTEST_2: '#FDEBEB',
    DANGER_LIGHTEST_1: '#FEF5F5',

    INFO_DARKER: '#295180',
    INFO_DARK: '#3D79BF',
    INFO: '#52A2FF',
    INFO_LIGHT: '#A8D0FF',
    INFO_LIGHTER: '#D4E8FF',
    INFO_LIGHTEST_2: '#EDF6FF',
    INFO_LIGHTEST_1: '#F6FAFF',

    TRANSPARENT: 'rgba(0, 0, 0, 0)',

    BACKGROUND: '#242424',
    BACKGROUND_LIGHTER: '#171717',
  },
});
