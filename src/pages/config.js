import config from '../assets/utils/config';

import Overview from './overview/index';
import Pricing from './pricing/index';
import Login from './login/index';
import Register from './register/register';
import PreDashboard from './preDashboard/index';

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.overview, Component: Overview },
    {link: pages.pricing, Component: Pricing },
    {link: pages.login, Component: Login },
    {link: pages.register, Component: Register },
    {link: pages.predashboard, Component: PreDashboard },
    
] 