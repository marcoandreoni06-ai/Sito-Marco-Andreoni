const SITE_CONFIG = {
  name: 'Marco Andreoni',
  url: 'https://www.marcandreoni.it',
  logo: 'https://www.marcandreoni.it/logo.png',
  sameAs: [
    'https://linkedin.com/in/marcoandreoni',
    'https://instagram.com/marcoandreoni',
  ],
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    sameAs: SITE_CONFIG.sameAs,
  }
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    sameAs: SITE_CONFIG.sameAs,
  }
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}
