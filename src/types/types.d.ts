export interface Data {
  id: string;
  option: string;
  style: Style;
}

export interface Request {
  data: Data[];
}

export interface Style {
  backgroundColor: string;
  textColor: string;
}
