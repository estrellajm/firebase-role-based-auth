export interface Nav {
  icon: string;
  title: string;
  route: string;
}

export const navs: Nav[] = [
  {
    icon: 'home',
    title: 'Home',
    route: '/home',
  },
  {
    icon: 'computer',
    title: 'Menu',
    route: '/menu',
  },
  {
    icon: 'article',
    title: 'Content',
    route: '/content',
  },
  {
    icon: 'lock',
    title: 'Secret',
    route: '/secret',
  },
];
