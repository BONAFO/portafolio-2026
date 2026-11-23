const preparePage = (id, name, url, pages = []) => {
  return {
    id,
    name,
    url,
    pages: pages.map((p) => url + p),
  };
};

export const WORKS = [
  preparePage(0, "ALTOS", "https://pagina-hotel-five.vercel.app/", [
    "#preview1",
    "rooms/#preview",
    "experiences/#experiencias",
    "reservations/#preview",
  ]),
  preparePage(1, "RESTO", "https://pagina-resto-vhde-swart.vercel.app/", [
    "about/#preview",
    "about/#preview2",
    "contact/#preview",
  ]),
  preparePage(2, "RESTO-MENU", "https://menu-resto-ten.vercel.app/", [
    "#category-1",
    "#category-2",
    "#category-3",
    "#category-4",
  ]),
  preparePage(3, "FARMACIA", "https://pagina-farmacia-gamma.vercel.app/", [
    "#preview",
    "services/#preview",
    "about/#preview",
    "contact/#preview",
    "products/",
    "shipping/#preview",
  ]),
  preparePage(4, "ELECTRONICA", "https://pagina-electronica.vercel.app/", [
    "#preview",
    "#preview2",
    "about/#preview",
    "contact/#preview",
    "products/",
    "services/#preview",
  ]),
];

// {
//   id: 1,
//   name: "Electro Tec",
//   url: "https://electrotec.com",
//   pages: [
//     "https://electrotec.com",
//     "https://electrotec.com/products",
//     "https://electrotec.com/contact",
//   ],
// }
