export interface ICentreTag
{
  TagContent: string;
  TagLink?: any;
  FallbackText?: any;
  TagType: string;
}

export interface IImageTag
{
  TagContent: string;
  TagLink: string;
  FallbackText: string;
  TagType: string;
}

export interface IHeaderTag
{
  BackgroundColor: string;
  BorderColor: string;
  TextColor: string;
  Content: string;
  TagLink?: any;
  Promotion: string;
}

export interface IFooterTag
{
  TagContent: string;
  TagLink?: any;
  FallbackText?: any;
  TagType: string;
}

export interface IAdditionalAttributes
{
  sapdepartmentname: string;
  sapdepartmentno: string;
  sapcategoryname: string;
  sapcategoryno: string;
  sapsubcategoryname: string;
  sapsubcategoryno: string;
  sapsegmentname: string;
  sapsegmentno: string;
  specialsgroupid: string;
  PiesProductDepartmentNodeId: string;
  piesdepartmentnamesjson: string;
  piescategorynamesjson: string;
  piessubcategorynamesjson: string;
  'servingsize-total-nip'?: any;
  'servingsperpack-total-nip'?: any;
  microwaveable: string;
  ovencook: string;
  vegetarian: string;
  freezable: string;
  containsnuts: string;
  containsgluten: string;
  description: string;
  ingredients: string;
  nutritionalinformation?: any;
  storageinstructions?: any;
  usageinstructions?: any;
  brand: string;
  manufacturer?: any;
  countryoforigin?: any;
  productheightmm?: any;
  productwidthmm?: any;
  productdepthmm?: any;
  wool_productpackaging?: any;
  recyclableinformation?: any;
  importantinformation?: any;
  allergencontains?: any;
  allergenmaybepresent?: any;
  allergystatement: string;
  lifestyleanddietarystatement?: any;
  lifestyleclaim?: any;
  wool_dietaryclaim?: any;
  boxedcontents?: any;
  suitablefor?: any;
  fragrance?: any;
  colour?: any;
  antioxidant: string;
  addedvitaminsandminerals: string;
  bpafree: string;
  sulfatefree: string;
  parabenfree: string;
  claims?: any;
  alcoholfree?: any;
  'anti-dandruff'?: any;
  dermatologicallyapproved?: any;
  dermatologistrecommended?: any;
  dermatologisttested?: any;
  'fragrance - free'?: any;
  haircolour?: any;
  hairtype?: any;
  'hypo - allergenic'?: any;
  'non - comedogenic'?: any;
  oilfree?: any;
  ophthalmologistapproved?: any;
  ophthalmologisttested?: any;
  'paba - free'?: any;
  skincondition?: any;
  skintype?: any;
  'soap - free'?: any;
  spf?: any;
  sweatresistant?: any;
  timer?: any;
  waterresistant?: any;
  phbalanced?: any;
  antiseptic: string;
  antibacterial: string;
  activeconstituents?: any;
  contains?: any;
  microwavesafe: string;
  productimagecount: string;
  friendlydisclaimer?: any;
  productimages: string;
  healthstarrating: string;
}

export interface IRating
{
  ReviewCount: number;
  RatingCount: number;
  OneStarCount: number;
  TwoStarCount: number;
  ThreeStarCount: number;
  FourStarCount: number;
  FiveStarCount: number;
  Average: number;
  OneStarPercentage: number;
  TwoStarPercentage: number;
  ThreeStarPercentage: number;
  FourStarPercentage: number;
  FiveStarPercentage: number;
}

export interface IProductInner
{
  Stockcode: number;
  Barcode: string;
  GtinFormat: number;
  CupPrice: number;
  CupMeasure: string;
  CupString: string;
  HasCupPrice: boolean;
  Price: number;
  Name: string;
  UrlFriendlyName: string;
  Description: string;
  SmallImageFile: string;
  MediumImageFile: string;
  LargeImageFile: string;
  IsNew: boolean;
  IsOnSpecial: boolean;
  IsEdrSpecial: boolean;
  SavingsAmount: number;
  WasPrice: number;
  QuantityInTrolley: number;
  Unit: string;
  MinimumQuantity: number;
  HasBeenBoughtBefore: boolean;
  IsInTrolley: boolean;
  Source: string;
  SupplyLimit: number;
  IsRanged: boolean;
  IsInStock: boolean;
  PackageSize: string;
  IsPmDelivery: boolean;
  IsForCollection: boolean;
  IsForDelivery: boolean;
  IsForExpress: boolean;
  ProductRestrictionMessage?: any;
  CentreTag: ICentreTag;
  IsCentreTag: boolean;
  ImageTag: IImageTag;
  HeaderTag: IHeaderTag;
  HasHeaderTag: boolean;
  UnitWeightInGrams: number;
  SupplyLimitMessage: string;
  SmallFormatDescription: string;
  FullDescription: string;
  IsAvailable: boolean;
  IsPurchasable: boolean;
  AgeRestricted: boolean;
  DisplayQuantity: number;
  RichDescription: string;
  IsDeliveryPass: boolean;
  HideWasSavedPrice: boolean;
  SapCategories?: any;
  Brand: string;
  FooterTag: IFooterTag;
  IsFooterEnabled: boolean;
  Diagnostics: string;
  IsBundle: boolean;
  ChildProducts: any[];
  UrlOverride?: any;
  AdditionalAttributes: IAdditionalAttributes;
  DetailsImagePaths: string[];
  Variety: string;
  Rating: IRating;
}

export interface IProductOuter
{
  Products: IProductInner[];
  Name: string;
}

export interface IExtraOutputFields
{
  description: string;
  displayorder: string;
  isrestricted: string;
  nodelevel: string;
  parentnodeid: string;
}

export interface IResult
{
  Name: string;
  Term: string;
  ExtraOutputFields: IExtraOutputFields;
  Min?: any;
  Max?: any;
  Applied: boolean;
  Count: number;
  Statement?: any;
}

export interface IAggregation
{
  Name: string;
  DisplayName: string;
  Type: string;
  FilterType: string;
  FilterDataType: string;
  Results: IResult[];
  ResultsGrouped?: any;
  State: string;
  Rank: number;
  AdditionalResults: boolean;
  DesignType: string;
  ShowFilter: boolean;
  Statement?: any;
}

export interface IWoolworthsResult
{
  Products: IProductOuter[];
  Corrections?: any;
  SearchResultsCount: number;
  VisualShoppingAisleResponse: any[];
  Aggregations: IAggregation[];
  HasTobaccoItems: boolean;
  Passes: number[];
}
