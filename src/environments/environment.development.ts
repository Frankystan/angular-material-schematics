export const environment = {
    sidenav: [
        { link: '', icon: '', title: '' },
        { link: 'posts', icon: 'home', title: 'sidenav.wall' },
        { link: 'auth', icon: 'admin_panel_settings', title: 'Authentication' },
        {
            link: 'dashboard',
            icon: 'dashboard',
            title: 'sidenav.dashboard',
        },
        { link: 'uploads', icon: 'upload_file', title: 'sidenav.uploads' },
        { link: 'polls', icon: 'assignment', title: 'sidenav.polls' },
        {
            link: 'events',
            icon: 'date_range',
            title: 'sidenav.events',
        },
        { link: 'feeds', icon: 'rss_feed', title: 'sidenav.feeds' },
        { link: 'settings', icon: 'settings', title: 'sidenav.settings' },
        { link: '', icon: '', title: '' },
        { link: 'faq', icon: 'help', title: 'sidenav.help' },
        { link: 'policy', icon: 'verified_user', title: 'sidenav.policy' },
        { link: '', icon: '', title: '' },
        { link: '', icon: 'power_settings_new', title: 'sidenav.logout' },
    ],
    defaultLanguage: 'es-ES',
    supportedLanguages: ['en-US', 'es-ES'],
    supportedLanguagesEquivalence: [
        { 'en-US': 'English' },
        { 'es-ES': 'Español' },
    ],
};
