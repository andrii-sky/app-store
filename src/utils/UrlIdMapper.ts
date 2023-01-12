const URL_BASE_SEGMENT = 'api';

const keys = {
  chan_: 'channels',
  bran_: 'brands',
  seas_: 'seasons',
  epis_: 'episodes',
  asse_: 'assets',
  plac_: 'placeholders',
  coll_: 'sets',
};

const urlReg = new RegExp(`^/${URL_BASE_SEGMENT}/(?:${Object.values(keys).join('|')})/([^/]+?)/$`);

export function urlToId(url: string): string {
  const matches = urlReg.exec(url);

  if (!matches) {
    return url;
  }

  return matches[1];
}

export function idToUrl(id: string): string {
  const prefix = id.slice(0, 5);
  const key = keys[prefix];

  if (!key) {
    return id;
  }

  return `/${URL_BASE_SEGMENT}/${key}/${id}/`;
}
