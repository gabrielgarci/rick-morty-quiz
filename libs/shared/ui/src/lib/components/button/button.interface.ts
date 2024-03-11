export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Error = 'error',
}

export interface ButtonProps {
  children: string;
  click?: () => void;
  type?: ButtonType;
  shadow?: boolean;
}
