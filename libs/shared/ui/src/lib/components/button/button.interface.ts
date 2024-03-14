export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Error = 'error',
}

export interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: ButtonType;
  shadow?: boolean;
  collapse?: boolean;
}
