type Menu = {
  id: number;
  title: string;
  path: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  {
    id: 1,
    title: "Search",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Sources",
    path: "/#sources",
    newTab: false,
  },
  {
    id: 3,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];

export default menuData;
