import type { NavItem } from "../types/navbar.type";

export const navLinks: NavItem[] = [
  { key: '1', navName: 'Home', url: '/' },
  {
    key: '4',
    navName: 'Services',
    url: '/services',
    subItems: [
      {
        title: "Business Software Solutions",
        items: [
          "POS Software",
          "ERP Software",
          "Management Software",
          "Stock Management"
        ]
      },
      {
        title: "Web Solutions & Websites",
        items: [
          "Web Development",
          "Landing Pages",
          "Blog Portals",
          "E-commerce Solutions",
          "Portfolio Websites",
          "Agency Websites"
        ]
      },
      {
        title: "Modern App & Technology Development",
        items: [
          "Next.js Development",
          "React.js Development",
          "Node.js Development",
          "React Native Development",
          "Mobile Applications"
        ]
      }
    ]
  },
  { key: '2', navName: 'About', url: '/about' },
  { key: '5', navName: 'Contact', url: '/contact' },
];