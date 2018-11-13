export interface IParentCatgroupIdSearch
{
  1083581: string;
  1083054: string;
  1083352: string;
  1083079: string;
  1083080: string;
}

export interface ICategoryView
{
  parentCatgroup_id_search: IParentCatgroupIdSearch;
}

export interface IM4
{
  p1: string;
}

export interface IValue
{
  value: string;
  label: string;
  count: number;
}

export interface IFacetView
{
  values: IValue[];
  name: string;
}

export interface IA
{
  A4: string[];
  O3: string[];
  L2: string[];
  P8: string[];
  W1: string[];
  E1: string[];
  T1: string[];
  T2: string[];
}

export interface IP1
{
  o: string;
  l4: string;
}

export interface ICatalogEntryView
{
  p: string;
  a: IA;
  p1: IP1;
  s: string;
  t: string;
  t1: string;
  u: string;
  s9: string;
  pl: string;
  m: string;
  u2: string;
  n: string;
}

export interface IColesResult
{
  categoryView: ICategoryView;
  recordSetTotal: number;
  m4: IM4;
  recordSetStartNumber: number;
  facetView: IFacetView[];
  recordSetCount: number;
  catalogEntryView: ICatalogEntryView[];
}
