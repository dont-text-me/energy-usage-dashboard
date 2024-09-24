interface DateReading {
  date: string; // dd-mm-yyyy
  amount: number;
}
interface Usage {
  maxBound: number;
  count: number;
}

export type { DateReading, Usage };
