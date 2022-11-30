export interface Block {
  start: Date;
  end: Date;
  breakLength: number;
  createdAt: Date;
}

export interface Report extends Block {
  month: string;
}

export interface ReportsDictionary {
  [k: string]: Report[];
}
