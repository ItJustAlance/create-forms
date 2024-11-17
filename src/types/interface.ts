export interface Control {
  id: any;
  control: "FORM" | "TEXT" | "LABEL" | "BUTTON" | "SELECT" | "CHECKBOX" | "RADIO";
  caption: string;
  parentID?: string;
  tabIndex?: number;
  position: number;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface FormData {
  id: string;
  title: string;
  controls: Control[];
  submitUrl: string;
}

export interface JsonData {
  title?: string;
  controls: Control[];
  submitUrl?: string;
}
