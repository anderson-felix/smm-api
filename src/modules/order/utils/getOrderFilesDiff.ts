import { File } from '@shared/interfaces';

type FuncType = (arr1: File[], arr2: File[]) => File[];

export const getOrderFilesDiff: FuncType = (arr1, arr2) =>
  arr1.filter(e => arr2.find(f => f.link === e.link));
