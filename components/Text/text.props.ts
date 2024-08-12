import {TextProps as RNTextProps} from 'react-native';
import {TextPreset} from './text.presets';

export interface ITextProps extends RNTextProps {
  preset?: TextPreset;
}
