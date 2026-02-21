/* 
   NEWS EDITOR AI v11.0 - CHROME EXTENSION EDITION (FINAL LAYOUT FIX)
   Core: Ege Ajans Haber Asistanı (Gemini 3 Flash Preview)
*/

(function() {
    // 1. YAPILANDIRMA
    const CFG = {
        ID_BAR: 'news-editor-ai-bar-v11',
        ID_MODAL: 'news-editor-ai-modal-v11',
        MODEL: 'gemini-3-flash-preview', 
        SIGNATURE: 'K.Ş',
        RECTOR: 'Prof. Dr. Musa ALCI'
    };

    // Eski elementleri temizle
    document.getElementById(CFG.ID_BAR)?.remove();
    document.getElementById(CFG.ID_MODAL)?.remove();

    let ttPolicy = null;
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        try { ttPolicy = window.trustedTypes.createPolicy('ne-ext-pro', { createHTML: s => s, createScript: s => s }); } catch (e) {}
    }
    const safeHTML = (html) => ttPolicy ? ttPolicy.createHTML(html) : html;

    // 2. İKONLAR
    const ICONS = {
        BOT_LOGO: `<img src="https://cdn-icons-png.flaticon.com/512/11624/11624197.png" style="width: 24px; height: 24px; object-fit: contain; drop-shadow: 0 2px 4px rgba(0,0,0,0.1);" alt="AI">`,
        NEWS_LOGO: `<img src="https://cdn-icons-png.flaticon.com/512/2965/2965879.png" style="width: 24px; height: 24px; object-fit: contain;" alt="News">`,
        DRAG: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`,
        KEY: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`,
        CLOSE: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        MINIMIZE: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
        MAXIMIZE: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
        COPY: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
        MOVE: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="19 9 22 12 19 15"></polyline><polyline points="9 19 12 22 15 19"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>`,
        IMG: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
    };

    // 3. CSS STİLLERİ (FLEX LAYOUT FIX)
    const style = document.createElement('style');
    style.innerHTML = `
        /* YÜZER BAR (Toolbox) */
        #${CFG.ID_BAR} { position: fixed; top: 15vh; right: 20px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 24px; padding: 12px 8px; display: flex; flex-direction: column; align-items: center; gap: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); z-index: 999998; font-family: system-ui, sans-serif; user-select: none; }
        .ne-drag-bar { cursor: grab; padding: 4px; border-radius: 6px; display: flex; align-items: center; opacity: 0.6; transition: 0.2s; margin-bottom: 2px; }
        .ne-drag-bar:hover { opacity: 1; background: #f1f5f9; }
        .ne-sep { width: 24px; height: 1px; background: #e2e8f0; margin: 2px 0; }
        .ne-bar-btn { background: none; border: none; cursor: pointer; padding: 10px; border-radius: 12px; color: #64748b; transition: all 0.2s; display: flex; justify-content: center; outline: none; }
        .ne-bar-btn:hover { background: #f1f5f9; transform: scale(1.05); }
        .ne-bar-btn.active { background: #eff6ff; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15); border: 1px solid #bfdbfe; }
        .ne-bar-btn.close:hover { background: #fef2f2; color: #ef4444; }
        .ne-sig { font-size: 11px; font-weight: 700; color: #cbd5e1; margin-top: 8px; writing-mode: vertical-rl; letter-spacing: 1px; }

        /* YÜZER PENCERE: Ana Taşıyıcı */
        #${CFG.ID_MODAL} { 
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            background: #ffffff; 
            width: 600px; height: 80vh; 
            min-width: 450px; min-height: 500px; 
            max-width: 95vw; max-height: 95vh; 
            border-radius: 16px; 
            box-shadow: 0 25px 60px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05); 
            display: flex; flex-direction: column; /* Dikey Dizilim Önemli */
            z-index: 999999; opacity: 0; pointer-events: none; 
            transition: opacity 0.2s; 
            font-family: system-ui, sans-serif; 
            resize: both; overflow: hidden;
        } 
        
        #${CFG.ID_MODAL}.show { opacity: 1; pointer-events: auto; }
        #${CFG.ID_MODAL}.minimized { height: 60px !important; min-height: 60px !important; resize: none; }
        #${CFG.ID_MODAL}.minimized .ne-body, #${CFG.ID_MODAL}.minimized .ne-footer { display: none; }

        /* 1. KISIM: HEADER (SABİT) */
        .ne-head { 
            height: 60px; padding: 0 20px; 
            border-bottom: 1px solid #f1f5f9; 
            display: flex; justify-content: space-between; align-items: center; 
            background: #ffffff; 
            flex-shrink: 0; /* Küçülme */
            cursor: grab; user-select: none; 
        }
        .ne-head:active { cursor: grabbing; }
        .ne-title { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 16px; color: #0f172a; }
        .ne-head-actions { display: flex; gap: 6px; }
        .ne-action-btn { cursor: pointer; color: #64748b; padding: 6px; border-radius: 8px; transition: 0.2s; background: transparent; border: none; }
        .ne-action-btn:hover { background: #f1f5f9; color: #0f172a; }
        .ne-action-btn.close:hover { background: #fee2e2; color: #ef4444; }

        /* 2. KISIM: BODY (ESNEK & SCROLL EDİLEBİLİR) */
        .ne-body { 
            padding: 20px; 
            flex: 1; /* Kalan tüm alanı kapla */
            overflow-y: auto; /* Sadece burası kaydırılır */
            overflow-x: hidden;
            background: #ffffff; 
            display: flex; flex-direction: column;
        }
        
        /* Body Scrollbar */
        .ne-body::-webkit-scrollbar { width: 8px; }
        .ne-body::-webkit-scrollbar-track { background: transparent; }
        .ne-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #ffffff; }
        .ne-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* 3. KISIM: FOOTER (SABİT) */
        .ne-footer { 
            padding: 16px 20px; 
            border-top: 1px solid #f1f5f9; 
            display: flex; justify-content: flex-end; gap: 12px; 
            background: #fafafa; 
            flex-shrink: 0; /* Asla küçülme veya kaybolma */
            z-index: 10;
            position: relative;
        }
        /* Resize handle icon'u engellemesin diye */
        .ne-footer::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; cursor: se-resize; pointer-events: none; }

        /* Form Elemanları */
        .ne-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 8px; }
        .ne-input { width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; margin-bottom: 20px; font-family: inherit; box-sizing: border-box; transition: 0.2s; outline: none; background: #f8fafc; color: #0f172a; }
        .ne-input:focus { border-color: #3b82f6; background: #ffffff; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        textarea.ne-input { resize: vertical; min-height: 100px; line-height: 1.5; }
        
        .ne-img-area { position: relative; border: 2px dashed #93c5fd; border-radius: 10px; text-align: center; color: #64748b; cursor: pointer; transition: 0.2s; margin-bottom: 10px; background: #eff6ff; box-sizing: border-box; width: 100%; height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .ne-img-area:hover { border-color: #3b82f6; background: #e0f2fe; }
        .ne-img-text { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 13px; color: #3b82f6; font-weight: 500; }
        .ne-img-preview { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; background: #f8fafc; display: none; z-index: 1; }
        .ne-img-remove { position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; z-index: 2; display: none; transition: 0.2s; }
        .ne-img-remove:hover { background: #ef4444; transform: scale(1.1); }
        
        .ne-btn { padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; transition: 0.2s; display: flex; align-items: center; gap: 8px; justify-content: center; }
        .ne-btn-sec { background: #f1f5f9; color: #475569; }
        .ne-btn-sec:hover { background: #e2e8f0; color: #0f172a; }
        .ne-btn-pri { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25); }
        .ne-btn-pri:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35); }
        .ne-btn-pri:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; transform: none; }
        
        .ne-fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .ne-prog-wrap { width: 100%; height: 6px; background: #f1f5f9; border-radius: 6px; overflow: hidden; margin-top: 30px; }
        .ne-prog-bar { width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); transition: width 0.3s ease; border-radius: 6px; }
        
        /* SONUÇ KUTUSU */
        .ne-res { font-size: 14.5px; color: #1e293b; line-height: 1.7; user-select: text; word-break: break-word; overflow-wrap: break-word; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: justify; margin-bottom: 2px; }
        .ne-res h1 { font-size: 1.4em; color: #0f172a; margin-top: 0; margin-bottom: 0.8em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; text-align: left; }
        .ne-res h2 { font-size: 1.15em; color: #0f172a; margin-top: 1.2em; margin-bottom: 0.6em; text-align: left; }
        .ne-res p { margin-bottom: 1.2em; margin-top: 0; }
        .ne-res p:last-child { margin-bottom: 0; }
        .ne-res strong { color: #0f172a; font-weight: 700; }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    `;
    document.head.appendChild(style);

    // 4. ARAYÜZ OLUŞTURMA
    const bar = document.createElement('div');
    bar.id = CFG.ID_BAR;
    bar.innerHTML = safeHTML(`
        <div class="ne-drag-bar" title="Sürükle">${ICONS.DRAG}</div>
        <div title="Haber Asistanı" style="margin-bottom: 4px;">${ICONS.BOT_LOGO}</div>
        <div class="ne-sep"></div>
        <button class="ne-bar-btn" id="ne-btn-key" title="API Anahtarı">${ICONS.KEY}</button>
        <button class="ne-bar-btn active" id="ne-btn-open" title="Haberi Yaz">${ICONS.NEWS_LOGO}</button>
        <div class="ne-sep"></div>
        <button class="ne-bar-btn close" id="ne-btn-close" title="Kapat">${ICONS.CLOSE}</button>
        <div class="ne-sig">${CFG.SIGNATURE}</div>
    `);
    document.body.appendChild(bar);

    const modal = document.createElement('div');
    modal.id = CFG.ID_MODAL;
    modal.innerHTML = safeHTML(`
        <div class="ne-head" id="ne-modal-head">
            <div class="ne-title">${ICONS.BOT_LOGO} Haber Asistanı</div>
            <div class="ne-drag-hint" title="Sürükle">${ICONS.MOVE}</div>
            <div class="ne-head-actions">
                <button class="ne-action-btn" id="ne-btn-minimize" title="Arka Plana Al (Minimize)">${ICONS.MINIMIZE}</button>
                <button class="ne-action-btn close" id="ne-btn-modal-close" title="Kapat">${ICONS.CLOSE}</button>
            </div>
        </div>
        
        <div class="ne-body">
            <!-- Adım 1: Form -->
            <div id="ne-s1" class="ne-fade-in">
                <label class="ne-label">Haber Ham Metni (Zorunlu)</label>
                <textarea id="ne-raw-text" class="ne-input" placeholder="Etkinlik detayları, notlar, katılımcılar..."></textarea>
                
                <label class="ne-label">Örnek Haber URL (Opsiyonel)</label>
                <input type="text" id="ne-url" class="ne-input" placeholder="https://egeajans.ege.edu.tr/...">
                
                <label class="ne-label">Fotoğraf Ekle (Opsiyonel)</label>
                <div id="ne-img-area" class="ne-img-area">
                    <div id="ne-img-text" class="ne-img-text">
                        ${ICONS.IMG}
                        <span>Tıklayın ve CTRL+V ile yapıştırın</span>
                    </div>
                    <img id="ne-img-preview" class="ne-img-preview" src="">
                    <div id="ne-img-remove" class="ne-img-remove" title="Resmi Kaldır">✕</div>
                </div>
            </div>
            
            <!-- Adım 2: Yükleniyor -->
            <div id="ne-s2" style="display:none; text-align:center; padding-top:40px;">
                <div style="font-size:48px; animation:spin 2s infinite linear; color:#3b82f6; display:inline-block;">⚙️</div>
                <h2 style="color:#0f172a; margin:24px 0 8px 0; font-size:18px;">Haber Uzmanı Çalışıyor...</h2>
                <p style="color:#64748b; font-size:13px; margin:0; animation:pulse 2s infinite;">Haber metni profesyonel dilde ve formatta oluşturuluyor.</p>
                <div class="ne-prog-wrap"><div class="ne-prog-bar" id="ne-prog"></div></div>
            </div>
            
            <!-- Adım 3: Sonuç (Scroll sadece burada olur) -->
            <div id="ne-s3" style="display:none;"></div>
        </div>

        <div class="ne-footer">
            <button class="ne-btn ne-btn-sec" id="ne-cancel">İptal</button>
            <button class="ne-btn ne-btn-sec" id="ne-copy" style="display:none; color:#10b981; background:#ecfdf5; border:1px solid #a7f3d0;">${ICONS.COPY} Kopyala</button>
            <button class="ne-btn ne-btn-pri" id="ne-solve">Haberi Oluştur</button>
        </div>
    `);
    document.body.appendChild(modal);

    // 5. DOM REFERANSLARI
    const els = {
        rawText: document.getElementById('ne-raw-text'), url: document.getElementById('ne-url'),
        imgArea: document.getElementById('ne-img-area'), imgText: document.getElementById('ne-img-text'), 
        imgPreview: document.getElementById('ne-img-preview'), imgRemove: document.getElementById('ne-img-remove'),
        s1: document.getElementById('ne-s1'), s2: document.getElementById('ne-s2'), s3: document.getElementById('ne-s3'),
        prog: document.getElementById('ne-prog'), solve: document.getElementById('ne-solve'), 
        cancel: document.getElementById('ne-cancel'), copy: document.getElementById('ne-copy'),
        modalHead: document.getElementById('ne-modal-head'),
        minBtn: document.getElementById('ne-btn-minimize')
    };
    let currentBase64 = '';

    // 6. SÜRÜKLE BIRAK MANTIĞI
    function makeDraggable(element, handle) {
        let isDragging = false, offset = {x:0, y:0};
        
        handle.addEventListener('mousedown', (e) => {
            if (e.target.closest('button') || e.target.closest('.ne-action-btn')) return;
            isDragging = true;
            
            if(element.id === CFG.ID_MODAL) {
                const rect = element.getBoundingClientRect();
                element.classList.add('dragging');
                // Drag başlarken position değerleri güncellenir
            }
            const rect = element.getBoundingClientRect();
            offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            let newX = e.clientX - offset.x;
            let newY = e.clientY - offset.y;

            newX = Math.max(0, Math.min(newX, window.innerWidth - element.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - element.offsetHeight));

            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
            element.style.transform = 'none'; // Transform'u kaldır, absolute pozisyon kullan
            if(element.id === CFG.ID_BAR) element.style.right = 'auto'; 
        });

        window.addEventListener('mouseup', () => { isDragging = false; });
    }

    makeDraggable(bar, bar.querySelector('.ne-drag-bar'));
    makeDraggable(modal, els.modalHead);

    const openModal = () => { 
        modal.classList.add('show'); 
        modal.classList.remove('minimized');
        els.minBtn.innerHTML = ICONS.MINIMIZE;
        if(!modal.classList.contains('dragging')){
            modal.style.left = '50%'; modal.style.top = '50%';
            modal.style.transform = 'translate(-50%, -50%)'; // İlk açılışta ortala
        }
    };
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            els.s1.style.display='block'; els.s1.classList.add('ne-fade-in');
            els.s2.style.display='none'; els.s2.className = '';
            els.s3.style.display='none'; els.s3.className = '';
            els.solve.style.display='flex'; els.solve.disabled = false;
            els.copy.style.display='none'; els.cancel.innerHTML='İptal';
            els.prog.style.width='0%';
            // Scroll sıfırla
            document.querySelector('.ne-body').scrollTop = 0;
            removeImage();
        }, 300);
    };

    els.minBtn.onclick = () => {
        modal.classList.toggle('minimized');
        if(modal.classList.contains('minimized')) {
            els.minBtn.innerHTML = ICONS.MAXIMIZE; els.minBtn.title = "Büyüt";
        } else {
            els.minBtn.innerHTML = ICONS.MINIMIZE; els.minBtn.title = "Arka Plana Al (Minimize)";
        }
    };

    document.getElementById('ne-btn-modal-close').onclick = closeModal;
    els.cancel.onclick = closeModal;
    document.getElementById('ne-btn-open').onclick = openModal;
    document.getElementById('ne-btn-close').onclick = () => { bar.style.display = 'none'; };

    document.getElementById('ne-btn-key').onclick = () => {
        chrome.storage.local.get(['geminiNewsKey'], function(result) {
            const savedKey = result.geminiNewsKey || '';
            const k = prompt('Gemini API Anahtarınızı Girin:', savedKey);
            if(k !== null && k.trim() !== "") { 
                chrome.storage.local.set({geminiNewsKey: k.trim()}, () => { alert('✅ Anahtar kaydedildi.'); });
            }
        });
    };

    const handleImage = (blob) => {
        const r = new FileReader();
        r.onload = e => {
            currentBase64 = e.target.result;
            els.imgPreview.src = currentBase64;
            els.imgPreview.style.display = 'block';
            els.imgRemove.style.display = 'flex';
            els.imgText.style.display = 'none';
            els.imgArea.style.borderStyle = 'solid';
        };
        r.readAsDataURL(blob);
    };

    const removeImage = () => {
        currentBase64 = ''; els.imgPreview.src = ''; els.imgPreview.style.display = 'none';
        els.imgRemove.style.display = 'none'; els.imgText.style.display = 'flex';
        els.imgArea.style.borderStyle = 'dashed';
    };

    els.imgRemove.onclick = (e) => { e.stopPropagation(); removeImage(); };

    els.imgArea.addEventListener('click', async () => {
        if(currentBase64) return;
        try {
            const items = await navigator.clipboard.read();
            let found = false;
            for(const i of items) {
                if(i.types.includes('image/png') || i.types.includes('image/jpeg')) { 
                    handleImage(await i.getType(i.types.includes('image/png') ? 'image/png' : 'image/jpeg')); 
                    found=true; break; 
                }
            }
            if(!found) alert('Panoda resim bulunamadı.');
        } catch(e) { alert('İzin verilmedi. Kutuya tıklayıp CTRL+V yapın.'); }
    });

    window.addEventListener('paste', e => {
        if(!modal.classList.contains('show') || modal.classList.contains('minimized')) return;
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for(let i=0; i<items.length; i++) {
            if(items[i].type.indexOf('image')===0) { 
                e.preventDefault(); handleImage(items[i].getAsFile()); return; 
            }
        }
    });

    els.copy.onclick = () => {
        const textToCopy = els.s3.innerText; 
        navigator.clipboard.writeText(textToCopy).then(() => {
            els.copy.innerHTML = '✅ Kopyalandı!';
            setTimeout(() => els.copy.innerHTML = `${ICONS.COPY} Kopyala`, 2000);
        });
    };

    els.solve.onclick = () => {
        const rawText = els.rawText.value.trim();
        if(!rawText) { 
            els.rawText.style.borderColor = '#ef4444'; 
            setTimeout(()=>els.rawText.style.borderColor = '#cbd5e1', 2000);
            return; 
        }

        chrome.storage.local.get(['geminiNewsKey'], async function(result) {
            const apiKey = result.geminiNewsKey;
            if(!apiKey) { alert('⚠️ Lütfen önce Anahtar ikonuna tıklayarak API Key giriniz.'); return; }
            
            els.s1.style.display='none'; els.s2.style.display='block'; els.s2.className = 'ne-fade-in';
            els.solve.disabled = true; els.copy.style.display='none';
            
            let p=0; const t = setInterval(() => { if(p<90){ p+=Math.random()*15; els.prog.style.width=p+'%'; } }, 250);

            try {
                let urlContext = "Ek referans URL verilmedi.";
                const urlInput = els.url.value.trim();
                if(urlInput && urlInput.startsWith('http')) {
                    try {
                        const res = await fetch(urlInput);
                        const text = await res.text();
                        urlContext = text.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 1500); 
                    } catch(err) { urlContext = `Referans URL güvenlik politikası (CORS) nedeniyle okunamadı.`; }
                }

                const promptText = `
Sen Ege Üniversitesi'nin haber ajansı olan Ege Ajans (euegeajans.com) için çalışan, son derece deneyimli, uzman bir haber muhabiri, yazar ve editörsün. Rolün profesyonel bir haber yazmaktır.
Görevin, sana verilen ham metin, fotoğraf (varsa) ve referansları kullanarak profesyonel, akıcı ve doğrudan yayınlanmaya hazır, kusursuz bir haber metni oluşturmaktır.

Lütfen aşağıdaki kurallara ve formata harfiyen uy:

1. Referans Site: Haber formatı, dil ve üslup için 'https://www.euegeajans.com' adresindeki haberleri referans al.
2. Dil ve Üslup: Haberin konusuna göre (geçmiş olay, gelecek duyurusu vb.) doğru zaman kipini kullan. Metin akıcı, anlaşılır, kurumsal, pozitif ve çok detaylı olmalı.
3. Kişi Konuşmaları (Alıntılar): Kişilerin konuşmalarını her zaman doğrudan tırnak içinde ver ve cümlenin sonunu mutlaka "... dedi", "... ifadelerini kullandı" veya "... diye konuştu" şeklinde bağla.
4. Haber Yapısı ve Format:
   - Haber girişine HER ZAMAN "İzmir (Ege Ajans)-" ekleyerek başla.
   - Ana Başlık: Haberin en çarpıcı ve özetleyici cümlesi. (Markdown formatında '# Başlık' şeklinde ver)
   - Üst Başlık (Spot): Ana başlığı destekleyen, habere dair merak uyandıran bir veya iki cümlelik özet. (Markdown formatında '**Kalın Yazı**' şeklinde ver)
   - Ana Metin: Haberin tüm detaylarının anlatıldığı, paragraflara bölünmüş bölüm.
   - Rektörün Görüşü: Ana metnin giriş paragrafından hemen sonra, Ege Üniversitesi Rektörü ${CFG.RECTOR}'nın konuyla ilgili bir demecine mutlaka yer ver. Bu demeci, verdiğim bilgilere ve haberin ruhuna uygun şekilde profesyonelce sen kurgulayacaksın.
   - Ara Başlık(lar): Uzun metinlerde, konuyu bölümlere ayırmak için anlamlı ara başlıklar kullan. (Markdown formatında '## Ara Başlık' şeklinde ver)
5. Çıktı Formatı: Çıktıyı doğrudan ve sadece Markdown formatında üret. Ekstradan sohbet cümlesi (örneğin "İşte haberiniz:") kullanma. Tüm metni iki yana yaslanmış okumaya uygun bir paragraf düzeninde ver.

Aşağıdaki örnek şablonu incele ve formatı buna benzet:

# EÜ’nün Teknopark Ortaklı Projesine TÜBİTAK’tan Destek
**EÜ Su Ürünleri Fakültesinin “TÜBİTAK 2209-B” kapsamında 2025 yılında kabul edilen ilk ve tek projesi**

**İzmir (Ege Ajans)-** Ege Üniversitesi Su Ürünleri Fakültesi ile Ege Teknopark iş birliğinde... (Giriş paragrafı)

Proje ekibini makamında ağırlayan Ege Üniversitesi Rektörü Prof. Dr. Musa ALCI, “Ege Üniversitesinde öğrencilerin araştırma-geliştirme ve proje kültürü kazanmaları amacıyla hayata geçirilen ekosistem meyvelerini vermeye devam ediyor. Tüm akademisyenlerimizi tebrik ediyorum” dedi.

## "Fakültenin ilk projesi"
(Haberin devamı...)

---
Referans URL İçeriği (Varsa):
${urlContext}

İşlenecek Ham Metin:
${rawText}
                `;

                const contents = [];
                const parts = [{ text: promptText }];
                
                if(currentBase64) {
                    const cleanData = currentBase64.split(',')[1];
                    parts.push({ text: "\n\nEklenen şu fotoğrafı da dikkatlice analiz et, haberle ilişkilendir ve görselin içeriğini uygun şekilde metne doğal bir akışla yedir." });
                    parts.push({ inline_data: { mime_type: "image/jpeg", data: cleanData } });
                }
                
                contents.push({ parts: parts });

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${CFG.MODEL}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ contents: contents, generationConfig: { temperature: 0.7, top_p: 1 } })
                });

                clearInterval(t); els.prog.style.width='100%';

                if(!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error?.message || response.statusText);
                }
                
                const json = await response.json();
                const rawResult = json.candidates?.[0]?.content?.parts?.[0]?.text;

                setTimeout(() => {
                    els.s2.style.display='none'; els.s3.style.display='block'; els.s3.classList.add('ne-fade-in');
                    els.s3.innerHTML = `<div class="ne-res">${safeHTML(formatMarkdown(rawResult))}</div>`;
                    els.solve.style.display='none'; els.copy.style.display='flex'; els.cancel.innerHTML='Kapat';
                    // Scroll'u yukarı al (Gövdenin scroll'unu)
                    document.querySelector('.ne-body').scrollTop = 0;
                }, 500);

            } catch(e) {
                clearInterval(t);
                els.s2.innerHTML = `<div style="color:#ef4444; font-weight:600; padding:20px; font-size:14px; line-height:1.5;">Hata Oluştu:<br><br>${e.message}</div>`;
                els.solve.disabled = false;
            }
        });
    };

    function formatMarkdown(text) {
        if(!text) return "";
        let clean = text
            .replace(/### (.*?)\n/g, '<h3>$1</h3>')
            .replace(/## (.*?)\n/g, '<h2>$1</h2>')
            .replace(/# (.*?)\n/g, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/- (.*?)\n/g, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        return `<p>${clean}</p>`;
    }
})();