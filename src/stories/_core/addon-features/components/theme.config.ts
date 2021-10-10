import {
  CHANGE_CSSVARS,
  CHANGE_DISABLEHOVERCSS,
  CHANGE_THEME,
  CSSVARS_STORAGE_KEY,
  DISABLEHOVERCSS_STORAGE_KEY,
  THEME_STORAGE_KEY
} from "../constants";
import { Dispatch, SetStateAction } from 'react'

import { useStorage } from "beautiful-react-hooks";

export function useStored<T>(storageKey: string, defaultValue?: any): [T, Dispatch<SetStateAction<T>>] {
  return useStorage("local")(storageKey, defaultValue);
}

export function useStoredDisableHoverCSS<T>(defaultValue?: any): [T, Dispatch<SetStateAction<T>>] {
  return useStored<T>(DISABLEHOVERCSS_STORAGE_KEY, defaultValue);
}

export function useStoredCssVarsMode<T>(defaultValue?: any): [T, Dispatch<SetStateAction<T>>] {
  return useStored<T>(CSSVARS_STORAGE_KEY, defaultValue);
}


export function useStoredTheme<T>(defaultValue?: any): [T, Dispatch<SetStateAction<T>>] {
  return useStored(THEME_STORAGE_KEY, defaultValue);
}