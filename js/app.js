// Main application logic
class AlgoPrep {
    constructor() {
        this.nav = document.getElementById('roadmap-nav');
        this.mobileNav = document.getElementById('mobile-roadmap-nav');
        this.contentDisplay = document.getElementById('content-display');
        this.loader = document.getElementById('loader');
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTopicTitle = document.getElementById('current-topic-title');
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenuClose = document.getElementById('mobile-menu-close');
        this.mobileSidebar = document.getElementById('mobile-sidebar');
        this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        
        this.init();
    }

    async init() {
        try {
            // Initialize theme
            initializeTheme();
            
            // Initialize database
            await openDB();
            
            // Create navigation menu for both desktop and mobile
            createNavMenu(this.nav);
            if (this.mobileNav) {
                createNavMenu(this.mobileNav);
            }
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize icons
            lucide.createIcons();
            
        } catch (error) {
            console.error("Failed to initialize application:", error);
        }
    }

    setupEventListeners() {
        // Theme toggle
        this.themeToggle.addEventListener('click', toggleTheme);

        // Home icon click handlers (both desktop and mobile)
        const homeIcon = document.getElementById('home-icon');
        const mobileHomeIcon = document.getElementById('mobile-home-icon');
        
        if (homeIcon) {
            homeIcon.addEventListener('click', () => {
                this.showHomeScreen();
            });
        }
        
        if (mobileHomeIcon) {
            mobileHomeIcon.addEventListener('click', () => {
                this.showHomeScreen();
                this.closeMobileMenu();
            });
        }

        // Mobile menu controls
        if (this.mobileMenuButton) {
            this.mobileMenuButton.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }

        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Navigation click handlers (both desktop and mobile)
        [this.nav, this.mobileNav].forEach(nav => {
            if (nav) {
                nav.addEventListener('click', async (e) => {
                    const link = e.target.closest('a');
                    if (link && link.dataset.topic) {
                        e.preventDefault();
                        await this.handleTopicSelection(link);
                        // Close mobile menu if open
                        if (window.innerWidth < 1024) {
                            this.closeMobileMenu();
                        }
                    }
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        if (this.mobileSidebar && this.mobileMenuOverlay) {
            this.mobileSidebar.classList.remove('-translate-x-full');
            this.mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        if (this.mobileSidebar && this.mobileMenuOverlay) {
            this.mobileSidebar.classList.add('-translate-x-full');
            this.mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    showHomeScreen() {
        // Reset active states
        document.querySelectorAll('.topic-link').forEach(link => {
            link.classList.remove('bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-700', 'dark:text-primary-300');
        });

        // Update title
        this.currentTopicTitle.textContent = 'Welcome to Interview Prep Hub';
        
        // Show the default home content
        this.contentDisplay.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <div class="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <i data-lucide="graduation-cap" class="w-10 h-10 text-white"></i>
                    </div>
                    <h2 class="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Complete Interview Preparation</h2>
                    <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        Master technical interviews with our comprehensive guide covering algorithms, system design, and behavioral questions.
                    </p>
                </div>
                
                <!-- Main Categories -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div class="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                            <i data-lucide="brain-circuit" class="w-6 h-6 text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Algorithms</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 mb-4">Master data structures, algorithms, and coding patterns with detailed explanations and implementations.</p>
                        <ul class="text-sm text-neutral-500 dark:text-neutral-500 space-y-2">
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Graph Algorithms & Trees</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Dynamic Programming</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Sorting & Searching</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Data Structures</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group">
                        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                            <i data-lucide="server" class="w-6 h-6 text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">System Design</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 mb-4">Learn to design scalable systems with architecture patterns and real-world examples.</p>
                        <ul class="text-sm text-neutral-500 dark:text-neutral-500 space-y-2">
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Scalability & Load Balancing</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Database Design</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Microservices Architecture</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Popular System Designs</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group">
                        <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                            <i data-lucide="users" class="w-6 h-6 text-green-600 dark:text-green-400"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Behavioral</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 mb-4">Excel in behavioral interviews with STAR method frameworks and question guides.</p>
                        <ul class="text-sm text-neutral-500 dark:text-neutral-500 space-y-2">
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Leadership & Management</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Problem Solving</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>Communication Skills</li>
                            <li class="flex items-center gap-2"><span class="w-1 h-1 bg-neutral-400 rounded-full"></span>STAR Method Framework</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Features -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                        <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="code-2" class="w-5 h-5 text-orange-600 dark:text-orange-400"></i>
                        </div>
                        <h3 class="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Code Examples</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">Complete implementations</p>
                    </div>
                    <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                        <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="timer" class="w-5 h-5 text-red-600 dark:text-red-400"></i>
                        </div>
                        <h3 class="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Complexity Analysis</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">Time & space analysis</p>
                    </div>
                    <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                        <div class="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="lightbulb" class="w-5 h-5 text-cyan-600 dark:text-cyan-400"></i>
                        </div>
                        <h3 class="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Interview Strategies</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">Expert tips & questions</p>
                    </div>
                    <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                        <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="sparkles" class="w-5 h-5 text-indigo-600 dark:text-indigo-400"></i>
                        </div>
                        <h3 class="font-medium text-neutral-900 dark:text-neutral-100 mb-2">AI-Powered</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">Generated content</p>
                    </div>
                </div>
            </div>
        `;
        
        // Regenerate icons for the new content
        lucide.createIcons();
    }

    async handleTopicSelection(link) {
        const topic = link.dataset.topic;
        const category = link.dataset.category;
        const subcategory = link.dataset.subcategory;
        const cacheKey = `${category}-${subcategory}-${topic}`;

        // Update UI state
        setActiveTopicLink(link);
        updateTopicTitle(this.currentTopicTitle, topic);
        this.contentDisplay.innerHTML = '';
        showLoader(this.loader);

        try {
            // Try to get content from cache first
            const cachedContent = await getTopicFromCache(cacheKey);
            if (cachedContent) {
                renderContent(this.contentDisplay, cachedContent);
            } else {
                // Fetch from API if not cached
                const content = await fetchExplanation(topic, category, subcategory, cacheKey);
                renderContent(this.contentDisplay, content);
            }
        } catch (error) {
            console.error('Error loading content:', error);
            renderError(this.contentDisplay, "Could not load content. Please try again.");
        } finally {
            hideLoader(this.loader);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgoPrep();
});
