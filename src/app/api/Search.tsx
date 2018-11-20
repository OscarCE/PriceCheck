import ISearchResult from '../interfaces/ISearchResult';
import { IWoolworthsResult, IProductInner, IProductOuter } from './../interfaces/IWoolworthsResult';
import { IColesResult, ICatalogEntryView } from '../interfaces/IColesResult';
import ICard, { IPrice } from '../interfaces/ICard';
import { Promise as Promis } from 'bluebird';

const proxy = '/api/type2/';

export const barcodeListSearch = (barcode: string[]): Array<Promise<ICard>> =>
{
  if (barcode.length === 0) { return [] };

  return barcode.map(async (bc: string) =>
  {
    const results = await busqueda(bc);
    if (results.length > 0)
    {
      results[0].added = true;
      return results[0];
    }
  });
};
export const busqueda = async (term: string) =>
{
  const isBarcode = term.match(/\d+/gm) ? true : false;

  const resultadosW: ISearchResult[] = await buscaWoolworthsAsync(term, isBarcode);
  let resultadosC: ISearchResult[] = [];
  if (isBarcode)
  {
    resultadosC = await buscaColesAsync(term, isBarcode);
  }
  else
  {
    resultadosC = await Promis.map(resultadosW, async (item) =>
    {
      const a = await buscaColesAsync((item).barcode, true);
      if (a.length > 0 && a[0] !== undefined)
      {
        return a[0];
      }
    });
  }

  return await combinaResultados([resultadosW, resultadosC]);
};
const ordenaPreciosComparador = (a: IPrice, b: IPrice) =>
{
  return a.price - b.price;
};
export const combinaResultados = (resultados: ISearchResult[][]) =>
{
  if (resultados.length <= 0) { return; }

  const tarjetas: ICard[] = [];

  let unArray = resultados.reduce((acc, item) =>
  {
    return acc.concat(item);
  });

  while (unArray.length > 0)
  {
    const primerItem: ISearchResult = unArray.shift();
    if (!primerItem) { continue; }

    const iguales = unArray.filter((item) =>
    {
      return item && item.barcode === primerItem.barcode;
    });

    const diferentes = unArray.filter((item) =>
    {
      return item && item.barcode !== primerItem.barcode;
    });

    unArray = diferentes;

    const tarjeta: ICard = {
      added: false,
      barcode: primerItem.barcode,
      imageUrl: primerItem.image,
      name: primerItem.name,
      size: primerItem.packageSize,
      prices: [{
        id: primerItem.origin + primerItem.barcode,
        cupString: primerItem.cupString,
        price: primerItem.price,
        store: primerItem.origin,
      }],
    };

    iguales.forEach((item) =>
    {
      if (item)
      {
        tarjeta.prices.push({
          id: item.origin + item.barcode,
          cupString: item.cupString,
          price: item.price,
          store: item.origin,
        });
      }
    });

    tarjeta.prices.sort(ordenaPreciosComparador);

    tarjetas.push(tarjeta);
  }
  return tarjetas;
};
export const buscaWoolworthsAsync = async (term: string, isBarcode: boolean = false) =>
{
  if (isBarcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const queryUrl = proxy +
    'https://www.woolworths.com.au/apis/ui/Search/products';
  const query = {
    SearchTerm: term,
    PageSize: 6,
    PageNumber: 1,
    SortType: 'TraderRelevance',
    Location: '/shop/search/products?searchTerm=' + term,
  };

  try
  {
    const resultados = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    const productsRaw: IWoolworthsResult = await resultados.json();
    const products: ISearchResult[] = [];

    if (productsRaw.Products === null) { return products; }
    productsRaw.Products.map((productOuter: IProductOuter) =>
    {
      productOuter.Products.map((productInner: IProductInner) =>
      {
        if (!isBarcode || productInner.Barcode === term)
        {
          const data: ISearchResult = {
            barcode: productInner.Barcode,
            hasCupString: productInner.HasCupPrice,
            cupString: productInner.CupString,
            image: productInner.MediumImageFile,
            name: productInner.Name,
            price: productInner.Price,
            special: productInner.IsOnSpecial,
            savingsAmount: productInner.SavingsAmount,
            packageSize: productInner.PackageSize,
            origin: 'W',
          };

          products.push(data);
        }
      });
    });

    return products;
  }
  catch (err)
  {
    throw new Error('buscaWoolworthsAsync: ' + err);
  }
};
export const buscaColesAsync = async (term: string, isBarcode: boolean = false) =>
{
  if (isBarcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const queryUrl = proxy +
    'https://shop.coles.com.au/search/resources/store/20501/productview/bySearchTerm/' + term;

  try
  {
    const resultados = await fetch(queryUrl, {
      method: 'GET',
    });

    const productsRaw: IColesResult = await resultados.json();
    const products = productsRaw.catalogEntryView.map((product: ICatalogEntryView) =>
    {
      const data: ISearchResult = {
        barcode: isBarcode ? term : undefined,
        hasCupString: true,
        cupString: product.u2.toUpperCase().replace('PER', ' / '),
        image: 'https://shop.coles.com.au' + product.t,
        name: product.n,
        price: Number(product.p1.o),
        special: product.t1 && product.t1.toUpperCase() === 'S',
        savingsAmount: product.p1.l4 && (Number(product.p1.l4) - Number(product.p1.o)),
        packageSize: product.a.O3[0].toLowerCase(),
        origin: 'C',
      };

      return data;
    });

    return products;
  }
  catch (err)
  {
    throw new Error('Error al buscar producto: ' + err);
  }
};
