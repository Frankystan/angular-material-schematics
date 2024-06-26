export const environment = {
    tinyMCEconfig: {
        base_url: '/tinymce',
        content_css: ['default'],
        height: 500,
        menubar: false,
        plugins: ['wordcount', ' link', 'table', 'image', 'lists'],
        skin: 'oxide',
        suffix: '.min',
        toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | table',
    },
    sidenav: [
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

    // sidenav: [
    //     { link: 'address', icon: 'home', title: 'Address' },
    //     {
    //         link: 'dashboard',
    //         icon: 'dashboard',
    //         title: 'Dashboard',
    //     },
    //     { link: 'drag-drop', icon: 'drag_indicator', title: 'Drag and Drop' },
    //     { link: 'table', icon: 'table', title: 'Table' },
    //     { link: 'tree', icon: 'account_tree', title: 'Tree' },
    //     { link: 'list', icon: 'dns', title: 'List' },
    //     { link: 'grid', icon: 'grid_view', title: 'Grid' },
    //     { link: 'grid-demo', icon: 'grid_view', title: 'Grid List Demo' },
    //     { link: 'form', icon: 'description', title: 'Form' },
    //     { link: 'card/70', icon: 'payment', title: 'Card' },
    //     { link: '', icon: '', title: '' },
    //     { link: 'settings', icon: 'settings', title: 'Settings' },
    //     { link: 'faq', icon: 'help', title: 'FAQ' },
    //     { link: 'policy', icon: 'verified_user', title: 'Policy' },
    //     { link: '', icon: '', title: '' },
    //     { link: '', icon: 'power_settings_new', title: 'Logout' },
    // ],
    defaultLanguage: 'es-ES',
    supportedLanguages: ['en-US', 'es-ES'],
    supportedLanguagesEquivalence: [
        { 'en-US': 'English' },
        { 'es-ES': 'Español' },
    ],
};
