// UI generation and management - Minimal Modern Version
function createNavMenu(nav) {
    roadmap.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-6';

        const categoryTitle = document.createElement('button');
        categoryTitle.className = 'w-full text-left p-3 rounded-lg text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 flex items-center justify-between group';
        categoryTitle.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <i data-lucide="${iconMap[category.title] || 'folder'}" class="w-4 h-4 text-white"></i>
                </div>
                <span class="font-medium">${category.title}</span>
            </div>
            <i data-lucide="chevron-down" class="w-4 h-4 text-neutral-400 transition-transform duration-200"></i>
        `;
        categoryDiv.appendChild(categoryTitle);

        const sublist = document.createElement('div');
        sublist.className = 'mt-2 space-y-1 hidden overflow-hidden transition-all duration-200';

        category.children.forEach(subcategory => {
            // Create subcategory header
            const subcategoryItem = document.createElement('div');
            const subcategoryHeader = document.createElement('button');
            subcategoryHeader.className = 'w-full text-left ml-6 p-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 flex items-center justify-between group';
            subcategoryHeader.innerHTML = `
                <div class="flex items-center gap-2">
                    <i data-lucide="${iconMap[subcategory.title] || 'folder'}" class="w-3 h-3 text-neutral-500"></i>
                    <span>${subcategory.title}</span>
                </div>
                <i data-lucide="chevron-right" class="w-3 h-3 text-neutral-400 transition-transform duration-200"></i>
            `;
            subcategoryItem.appendChild(subcategoryHeader);

            // Create topics list for this subcategory
            const topicsList = document.createElement('div');
            topicsList.className = 'ml-8 mt-1 space-y-1 hidden transition-all duration-200';

            subcategory.children.forEach(topic => {
                const listItem = document.createElement('div');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = topic;
                link.className = 'topic-link block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200';
                link.dataset.topic = topic;
                link.dataset.category = category.title;
                link.dataset.subcategory = subcategory.title;
                listItem.appendChild(link);
                topicsList.appendChild(listItem);
            });

            subcategoryItem.appendChild(topicsList);
            sublist.appendChild(subcategoryItem);

            // Add click handler for subcategory toggle
            subcategoryHeader.addEventListener('click', () => {
                const chevron = subcategoryHeader.querySelector('[data-lucide="chevron-right"]');
                const isHidden = topicsList.classList.contains('hidden');
                
                if (isHidden) {
                    topicsList.classList.remove('hidden');
                    chevron.style.transform = 'rotate(90deg)';
                } else {
                    topicsList.classList.add('hidden');
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        });

        categoryDiv.appendChild(sublist);
        nav.appendChild(categoryDiv);

        categoryTitle.addEventListener('click', () => {
            const chevron = categoryTitle.querySelector('[data-lucide="chevron-down"]');
            const isHidden = sublist.classList.contains('hidden');
            
            if (isHidden) {
                sublist.classList.remove('hidden');
                chevron.style.transform = 'rotate(180deg)';
            } else {
                sublist.classList.add('hidden');
                chevron.style.transform = 'rotate(0deg)';
            }
        });
    });
    lucide.createIcons();
}

function renderContent(contentDisplay, markdown) {
    try {
        // Fallback to basic rendering if markdown is empty or invalid
        if (!markdown || typeof markdown !== 'string') {
            contentDisplay.innerHTML = '<p>No content available.</p>';
            return;
        }

        // Configure marked with basic options
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true,
            sanitize: false
        });

        // Try basic rendering first
        const basicContent = marked.parse(markdown);
        
        // Render content directly with A4 paper styling applied to container
        contentDisplay.innerHTML = `
            <div class="markdown-content prose prose-lg dark:prose-invert max-w-none">
                ${basicContent}
            </div>
        `;
        
        // Re-highlight all code blocks
        document.querySelectorAll('#content-display pre code').forEach((block) => {
            try {
                hljs.highlightElement(block);
            } catch (hlError) {
                console.warn('Syntax highlighting failed for a code block:', hlError);
            }
        });

        // Add copy buttons to code blocks
        addCopyButtonsToCodeBlocks();

        // Regenerate icons
        lucide.createIcons();
        
    } catch (error) {
        console.error('Error rendering markdown content:', error);
        contentDisplay.innerHTML = `
            <div class="p-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                <h3 class="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Content Rendering Error</h3>
                <p class="text-yellow-700 dark:text-yellow-300">There was an error rendering the markdown content. Please try refreshing the page.</p>
                <details class="mt-4">
                    <summary class="cursor-pointer text-sm">Error Details</summary>
                    <pre class="mt-2 text-xs bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded">${error.message}</pre>
                </details>
            </div>
        `;
    }
}

// Function to add copy buttons to existing code blocks
function addCopyButtonsToCodeBlocks() {
    document.querySelectorAll('#content-display pre').forEach((pre) => {
        // Skip if already has a copy button
        if (pre.querySelector('.copy-btn')) return;
        
        const codeElement = pre.querySelector('code');
        if (!codeElement) return;
        
        const code = codeElement.textContent;
        const language = codeElement.className.match(/language-(\w+)/)?.[1] || 'code';
        
        // Create wrapper if not exists
        if (!pre.parentElement.classList.contains('code-block-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-container relative group mb-6';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            
            // Add header
            const header = document.createElement('div');
            header.className = 'code-block-header flex justify-between items-center px-4 py-2 bg-stone-100 dark:bg-slate-700 border-b border-stone-200 dark:border-slate-600 rounded-t-lg';
            header.innerHTML = `
                <span class="text-sm font-medium text-stone-600 dark:text-slate-300 capitalize">${language}</span>
                <button class="copy-btn opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" 
                        onclick="copyToClipboard(this)" 
                        data-code="${escapeHtml(code)}"
                        aria-label="Copy code to clipboard">
                    <i data-lucide="copy" class="w-3 h-3 inline mr-1"></i>
                    Copy
                </button>
            `;
            wrapper.insertBefore(header, pre);
            
            // Update pre styling
            pre.className += ' !mt-0 !rounded-t-none';
        }
    });
}

function renderError(contentDisplay, message) {
    contentDisplay.innerHTML = `
        <div class="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-800 dark:text-red-200 backdrop-blur-sm shadow-lg">
            <div class="flex items-center gap-3 mb-4">
                <div class="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                    <i data-lucide="alert-triangle" class="w-6 h-6 text-red-600 dark:text-red-400"></i>
                </div>
                <h3 class="font-bold text-xl">Error</h3>
            </div>
            <p class="text-lg">${message}</p>
        </div>
    `;
    lucide.createIcons();
}

function showLoader(loader) {
    loader.classList.remove('hidden');
}

function hideLoader(loader) {
    loader.classList.add('hidden');
}

function setActiveTopicLink(link) {
    // Remove active state from all topic links
    document.querySelectorAll('.topic-link').forEach(topicLink => {
        topicLink.classList.remove('active');
    });
    
    // Add active state to clicked link
    link.classList.add('active');
}

function updateTopicTitle(currentTopicTitle, topic) {
    currentTopicTitle.textContent = topic;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/"/g, '&quot;');
}

// Global function for copy to clipboard functionality
function copyToClipboard(button) {
    const code = button.getAttribute('data-code');
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyToClipboard(code, button);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyToClipboard(code, button);
    }
}

// Fallback copy method
function fallbackCopyToClipboard(text, button) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    const originalClasses = button.className;
    
    button.innerHTML = '<i data-lucide="check" class="w-3 h-3 inline mr-1"></i>Copied!';
    button.className = button.className.replace('bg-blue-500 hover:bg-blue-600', 'bg-green-500 hover:bg-green-600');
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.className = originalClasses;
        button.disabled = false;
        lucide.createIcons();
    }, 2000);
    
    lucide.createIcons();
}

// Show copy error feedback
function showCopyError(button) {
    const originalHTML = button.innerHTML;
    const originalClasses = button.className;
    
    button.innerHTML = '<i data-lucide="x" class="w-3 h-3 inline mr-1"></i>Failed';
    button.className = button.className.replace('bg-blue-500 hover:bg-blue-600', 'bg-red-500 hover:bg-red-600');
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.className = originalClasses;
        button.disabled = false;
        lucide.createIcons();
    }, 2000);
    
    lucide.createIcons();
}
