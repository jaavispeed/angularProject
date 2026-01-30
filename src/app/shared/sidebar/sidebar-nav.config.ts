import { IconsMenu } from '../icons/font-awesome.icons';

export interface NavItem {
  nombre: string;
  routerLink: string;
  icon: string;
}

export const SideBarMenu: NavItem[] = [
  {
    nombre: 'Dashboard',
    routerLink: '/core',
    icon: IconsMenu.PANEL,
  },

  // Se pueden agregar más elementos de menú aquí
];
