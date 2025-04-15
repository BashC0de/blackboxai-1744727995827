export class Router {
    constructor() {
        this.routes = [];
        this.initEventListeners();
    }

    addRoute(path, templatePath) {
        this.routes.push({ path, templatePath });
    }

    async navigate(path) {
        // Check if path matches any route
        const route = this.routes.find(r => {
            if (r.path.includes(':')) {
                const basePath = r.path.split('/:')[0];
                return path.startsWith(basePath);
            }
            return r.path === path;
        });

        if (route) {
            // Load template
            const html = await this.loadTemplate(route.templatePath);
            document.getElementById('app').innerHTML = html;
            
            // Load corresponding JS module
            const modulePath = route.templatePath.replace('.html', '.js');
            try {
                const module = await import(modulePath);
                if (module.init) module.init();
            } catch (e) {
                console.log(`No JS module found for ${path}`);
            }
        } else {
            // Default to welcome page if no route matches
            this.navigate('/');
        }
    }

    async loadTemplate(path) {
        const response = await fetch(path);
        return await response.text();
    }

    initEventListeners() {
        // Handle back/forward navigation
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname);
        });

        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                history.pushState(null, null, path);
                this.navigate(path);
            }
        });
    }
}
