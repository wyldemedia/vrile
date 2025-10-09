// Privacy-focused download function - no email required
function showPrivateDownloadLinks(downloadInfo) {
  // Detect if user is on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Create modal overlay for download links
  const modalOverlay = document.createElement('div');
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  `;
  
  // Create download container
  const downloadContainer = document.createElement('div');
  downloadContainer.style.cssText = `
    background: white;
    padding: 25px;
    border-radius: 15px;
    max-width: 500px;
    width: 100%;
    position: relative;
    text-align: center;
    max-height: 90vh;
    overflow-y: auto;
  `;
  
  let downloadHtml = `
    <h3 style="margin-top: 0; color: #333; font-size: 24px;">🎉 Payment Successful!</h3>
    <p style="color: #666; margin-bottom: 25px; font-size: 16px;">Your VRile Last Longer Program is ready for private download.</p>
    
    <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <p style="color: #c62828; margin: 0; font-size: 13px;">
        🔐 <strong>Privacy Notice:</strong> No emails required. No tracking. Your purchase is completely private.
      </p>
    </div>
  `;
  
  if (isMobile) {
    // Mobile-optimized experience
    downloadHtml += `
      <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h4 style="color: #1565c0; margin-top: 0; font-size: 18px;">📱 Mobile Download</h4>
        <p style="color: #0d47a1; margin-bottom: 15px; font-size: 14px;">
          Tap below to open all audio files. Each opens in a new tab:
        </p>
        <ul style="color: #0d47a1; text-align: left; font-size: 14px; margin: 10px 0; padding-left: 20px;">
          <li><strong>iPhone/iPad:</strong> Tap and hold → "Download"</li>
          <li><strong>Android:</strong> Tap and hold → "Download link"</li>
          <li><strong>Or:</strong> Use share button → "Save to Files"</li>
        </ul>
        <button onclick="openAllInNewTabs()" 
                style="
                  width: 100%;
                  padding: 15px;
                  background: #2196f3;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  font-size: 16px;
                  font-weight: bold;
                  cursor: pointer;
                ">
          📂 Open All Audio Files
        </button>
      </div>
    `;
  } else {
    // Desktop experience
    downloadHtml += `
      <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h4 style="color: #7b1fa2; margin-top: 0;">💻 Desktop Download</h4>
        <p style="color: #4a148c; margin-bottom: 15px; font-size: 14px;">
          Download all 4 audio files directly to your Downloads folder:
        </p>
        <button onclick="downloadAllFiles()" 
                style="
                  width: 100%;
                  padding: 15px;
                  background: #9c27b0;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  font-size: 16px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-bottom: 10px;
                ">
          🚀 Download All Files Now
        </button>
        <p style="color: #4a148c; margin: 0; font-size: 12px;">
          No registration required - completely anonymous
        </p>
      </div>
    `;
  }
  
  // Privacy-focused bookmark section
  downloadHtml += `
    <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h4 style="color: #2e7d32; margin-top: 0;">🔖 Bookmark for Re-downloads</h4>
      <p style="color: #1b5e20; margin-bottom: 15px; font-size: 14px;">
        Save this page to download again later (payment already verified):
      </p>
      <button onclick="createBookmark()" 
              style="
                width: 100%;
                padding: 12px;
                background: #4caf50;
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              ">
        📚 Bookmark This Page
      </button>
    </div>
  `;
  
  // Individual file links as backup
  downloadHtml += `
    <details style="margin-bottom: 20px;">
      <summary style="cursor: pointer; padding: 12px; background: #f5f5f5; border-radius: 8px; font-weight: bold;">
        📁 Individual Download Links
      </summary>
      <div style="margin-top: 15px; text-align: left;">
        <p style="font-size: 13px; color: #666; margin-bottom: 15px;">
          <strong>Desktop:</strong> Right-click → "Save link as..."<br>
          <strong>Mobile:</strong> Tap and hold → Select download option
        </p>
  `;
  
  downloadInfo.forEach((item, index) => {
    downloadHtml += `
      <div style="margin: 12px 0; padding: 12px; background: #fafafa; border-radius: 6px; border-left: 3px solid #2196f3;">
        <div style="font-weight: bold; color: #333; margin-bottom: 5px;">Audio ${index + 1}</div>
        <a href="${item.url}" 
           target="_blank"
           download="${item.filename}"
           style="
             color: #1976d2;
             text-decoration: none;
             font-size: 14px;
             word-break: break-word;
             display: block;
           ">
          📎 ${item.filename}
        </a>
      </div>
    `;
  });
  
  downloadHtml += `
      </div>
    </details>
    
    <button onclick="window.location.href='${buildThankYouUrl()}'" 
            style="
              width: 100%;
              padding: 15px;
              background: #6b7280;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              cursor: pointer;
            ">
      ✅ Continue to Thank You Page
    </button>
  `;
  
  downloadContainer.innerHTML = downloadHtml;
  modalOverlay.appendChild(downloadContainer);
  document.body.appendChild(modalOverlay);
}

// Bookmark function
function createBookmark() {
  const url = window.location.href;
  const title = 'VRile Private Downloads';
  
  if (window.sidebar && window.sidebar.addPanel) {
    // Firefox
    window.sidebar.addPanel(title, url, '');
  } else if (window.opera && window.print) {
    // Opera
    const elem = document.createElement('a');
    elem.setAttribute('href', url);
    elem.setAttribute('title', title);
    elem.setAttribute('rel', 'sidebar');
    elem.click();
  } else if (document.all) {
    // IE
    window.external.AddFavorite(url, title);
  } else {
    // Other browsers
    const button = event.target;
    button.innerHTML = '✅ Press Ctrl+D (PC) or Cmd+D (Mac) to bookmark';
    button.style.background = '#10b981';
    button.disabled = true;
  }
}