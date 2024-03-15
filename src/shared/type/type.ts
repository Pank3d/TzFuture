export interface Data {
    Date: string;
  PreviousDate: Date ;
  PreviousURL: string ,  
  Timestamp: Date ,
  Valute: valueProp,
}

export interface valueProp {
  ID:string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value:number;
  Previous: number;
}

export interface value {
    name:string;
    name_prop:valueProp
}

export interface dataInter {
  checkbox:boolean,
  name:string,
  phone:string
}