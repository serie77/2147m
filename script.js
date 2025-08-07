// RuneScape Loading Screen Script
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingProgress = document.querySelector('.loading-progress');
    
    let progress = 0;
    const loadingDuration = 3000; // 3 seconds total loading time
    const updateInterval = 50; // Update every 50ms
    const progressIncrement = 100 / (loadingDuration / updateInterval);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += progressIncrement;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Wait a moment at 100%, then fade out
            setTimeout(() => {
                finishLoading();
            }, 500);
        }
        
        // Update progress bar with slight randomization for realism
        const displayProgress = Math.min(progress + (Math.random() * 5 - 2.5), 100);
        loadingProgress.style.width = Math.max(0, displayProgress) + '%';
    }, updateInterval);
    
    function finishLoading() {
        // Fade out loading screen
        loadingScreen.classList.add('fade-out');
        
        // Show main content
        setTimeout(() => {
            mainContent.classList.add('show');
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 250);
    }
    
    // Fallback: ensure loading finishes even if something goes wrong
    setTimeout(() => {
        if (!loadingScreen.classList.contains('fade-out')) {
            finishLoading();
        }
    }, loadingDuration + 2000);
});

// CA Copy Functionality
function copyCA() {
    const caText = `.................217mbonk`;

    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(caText).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopyText(caText);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyText(caText);
    }
}

function fallbackCopyText(text) {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    const button = document.querySelector('.ca-copy-btn');
    const originalText = button.innerHTML;
    
    // Change button text temporarily
    button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        Copied!
    `;
    button.style.background = 'linear-gradient(145deg, #2d5a2d, #1a3a1a)';
    button.style.borderColor = '#90ee90';
    button.style.color = '#90ee90';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
}

function showCopyError() {
    const button = document.querySelector('.ca-copy-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
        </svg>
        Failed
    `;
    button.style.color = '#ff6b6b';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.color = '';
    }, 2000);
}

// Optional: Add some RuneScape-style sound effects or additional animations
// You could add audio loading completion sounds here if desired

// Preload the main content images to ensure smooth transition
window.addEventListener('load', function() {
    // This ensures all images are loaded before we finish the loading screen
    const images = document.querySelectorAll('img:not(.loading-gif)');
    let imagesLoaded = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) return;
    
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
            });
            img.addEventListener('error', () => {
                imagesLoaded++; // Count errors as "loaded" to prevent hanging
            });
        }
    });
});