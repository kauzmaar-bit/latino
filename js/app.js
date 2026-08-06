let currentSortMode = 'tier';
        let currentFilter = 'all';
        let currentCasterCategory = 'vip';
        let selectedPlayers = new Set();
        let chartInstance = null;
        let activeModalPlayer = '';
        let currentAudio = null;
        let activeSpeakingPlayer = null;
        
        const prevDateIdx = 34; // 15-06-2026 (Junio)
        const currDateIdx = 39; // 27-07-2026 (Julio / Actual)
        
        const leagueValues = {
            'leyenda': 6, 'campeón': 5, 'campeon': 5,
            'platino': 4, 'oro': 3, 'plata': 2, 'cobre': 1
        };

        const styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
        function updateSortBtnStyles() {
            styleEl.innerHTML = `
                input[value="${currentSortMode}"]:checked + label {
                    background: #00f2fe; color: #000; box-shadow: 0 0 15px rgba(0,242,254,0.7); font-weight: 900;
                }
            `;
        }
        updateSortBtnStyles();

        // --- SISTEMA DE VOZ DE CASTEO CON AUDIO MP3 NEURONAL (DALIA - NARRADORA IA) ---
        function speakCasterNote(playerName, event) {
            if (event) event.stopPropagation();
            
            // Si ya hay un audio sonando, lo pausamos y reiniciamos su tiempo
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                let oldPlayer = activeSpeakingPlayer;
                currentAudio = null;
                activeSpeakingPlayer = null;
                // Si el usuario presiona el mismo botón del jugador para pausar, nos detenemos aquí
                if (oldPlayer === playerName) return;
            }
            
            // Cargar archivo MP3 en alta fidelidad generado gratis por Azure IA
            let audioPath = `audios-caster/${playerName}.mp3`;
            currentAudio = new Audio(audioPath);
            activeSpeakingPlayer = playerName;
            
            currentAudio.play().catch(err => {
                console.error('Error reproduciendo el audio MP3:', err);
                alert('⚠️ El audio del guerrero está en proceso de carga desde GitHub o no fue encontrado. ¡Intenta de nuevo en unos segundos!');
                currentAudio = null;
                activeSpeakingPlayer = null;
            });
            
            currentAudio.onended = () => {
                currentAudio = null;
                activeSpeakingPlayer = null;
            };
            currentAudio.onerror = () => {
                currentAudio = null;
                activeSpeakingPlayer = null;
            };
        }

        // --- SCROLL TO TOP PARA CELULARES ---
        window.addEventListener('scroll', () => {
            const btn = document.getElementById('scrollTopBtn');
            if (!btn) return;
            if (window.scrollY > 350) {
                btn.classList.remove('opacity-0', 'pointer-events-none');
                btn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                btn.classList.add('opacity-0', 'pointer-events-none');
                btn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        });

        function getScore(row, baseIndex) {
            let tier = parseInt(row[baseIndex]) || 0;
            let oleada = parseInt(row[baseIndex+1]) || 0;
            let reliquias = parseInt(row[baseIndex+2]) || 0;
            let ligaStr = (row[baseIndex+3] || "").toLowerCase();
            let liga = leagueValues[ligaStr] || 0;
            let pos = parseInt(row[baseIndex+4]) || 9999;
            let valid = row[baseIndex] && row[baseIndex] !== '-';
            let ligaRaw = row[baseIndex+3] || '-';
            let posRaw = row[baseIndex+4] || '-';
            return { tier, oleada, reliquias, liga, pos, valid, ligaRaw, posRaw };
        }
        
        function compareScores(a, b, mode) {
            if (mode === 'tier') {
                if (a.tier !== b.tier) return b.tier - a.tier;
                if (a.oleada !== b.oleada) return b.oleada - a.oleada;
                return b.reliquias - a.reliquias;
            } else {
                if (a.liga !== b.liga) return b.liga - a.liga;
                if (a.pos !== b.pos) return a.pos - b.pos; 
                return b.reliquias - a.reliquias;
            }
        }

        function calculateRanks(dateIndex, mode) {
            let validRows = db.rows.map(row => ({
                name: row[0], score: getScore(row, dateIndex)
            })).filter(x => x.score.valid);
            validRows.sort((a, b) => compareScores(a.score, b.score, mode));
            let ranks = new Map();
            validRows.forEach((item, index) => ranks.set(item.name, index + 1));
            return ranks;
        }

        function getBadgeClass(val) {
            let v = String(val).toLowerCase();
            if (v === 'leyenda') return 'bg-gradient-to-r from-red-600 to-red-900 text-white shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-red-400 font-mono text-[10px] sm:text-xs';
            if (v === 'oro') return 'bg-gradient-to-r from-amber-500 to-amber-700 text-black font-extrabold shadow-[0_0_8px_rgba(245,158,11,0.6)] font-mono text-[10px] sm:text-xs';
            if (v === 'platino') return 'bg-gradient-to-r from-sky-400 to-sky-600 text-black font-extrabold shadow-[0_0_8px_rgba(56,189,248,0.6)] font-mono text-[10px] sm:text-xs';
            if (v === 'campeón' || v === 'campeon') return 'bg-gradient-to-r from-purple-500 to-purple-800 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.7)] border border-purple-400 font-mono text-[10px] sm:text-xs';
            if (v === 'plata') return 'bg-gradient-to-r from-slate-300 to-slate-500 text-black font-bold font-mono text-[10px] sm:text-xs';
            if (v === 'cobre') return 'bg-gradient-to-r from-orange-600 to-orange-800 text-white font-mono text-[10px] sm:text-xs';
            return 'bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[10px] sm:text-xs';
        }

        function formatNumber(num) {
            return new Intl.NumberFormat('en-US').format(num);
        }

        function toggleHistory(btn) {
            let card = btn.closest('.player-card');
            if (card.classList.contains('show-history')) {
                card.classList.remove('show-history');
                btn.innerHTML = '👁️ VER HISTORIAL DE JUNIO';
                btn.classList.remove('bg-neonCyan', 'text-black', 'font-black');
                btn.classList.add('bg-slate-800/80', 'text-slate-300');
            } else {
                card.classList.add('show-history');
                btn.innerHTML = '👁️ OCULTAR HISTORIAL';
                btn.classList.remove('bg-slate-800/80', 'text-slate-300');
                btn.classList.add('bg-neonCyan', 'text-black', 'font-black');
            }
        }

        function showModalEl(modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
            modal.querySelector('.transform').classList.remove('scale-95');
        }
        const RadioManager = {
            playlist: [],
            currentIndex: -1,
            audio: new Audio(),
            isPlaying: false,
            init: function() {
                // Construir playlist automaticamente
                if (typeof casterNotes !== 'undefined') {
                    for (let pName in casterNotes) {
                        let note = casterNotes[pName];
                        if (note.anthem && note.anthem.file) {
                            this.playlist.push({ player: pName, title: note.anthem.title, file: note.anthem.file });
                        }
                    }
                }
                this.audio.addEventListener('ended', () => this.next());
                this.audio.addEventListener('play', () => this.updateUI(true));
                this.audio.addEventListener('pause', () => this.updateUI(false));
                this.audio.addEventListener('timeupdate', () => {
                    const bar = document.getElementById('radioProgressBar');
                    const cTimeEl = document.getElementById('radioCurrentTime');
                    const tTimeEl = document.getElementById('radioTotalTime');
                    if (this.audio.duration) {
                        let percent = (this.audio.currentTime / this.audio.duration) * 100;
                        if (bar) {
                            bar.value = percent;
                            bar.style.background = `linear-gradient(to right, #facc15 ${percent}%, #1e293b ${percent}%)`;
                        }
                        if (cTimeEl) cTimeEl.innerText = this.formatTime(this.audio.currentTime);
                        if (tTimeEl) tTimeEl.innerText = this.formatTime(this.audio.duration);
                    }
                });
                
                const volControl = document.getElementById('radioVolume');
                if(volControl) {
                    volControl.addEventListener('input', (e) => { this.audio.volume = e.target.value; });
                }
            },
            formatTime: function(secs) {
                if (isNaN(secs)) return "0:00";
                let min = Math.floor(secs / 60);
                let s = Math.floor(secs % 60);
                return min + ":" + (s < 10 ? "0" + s : s);
            },
            seek: function(percentage) {
                if (this.audio.duration) {
                    this.audio.currentTime = (percentage / 100) * this.audio.duration;
                }
            },
            playTrack: function(index) {
                if(index < 0 || index >= this.playlist.length) return;
                this.currentIndex = index;
                let track = this.playlist[index];
                
                // Detener locutor si esta sonando
                if (typeof currentAudio !== 'undefined' && currentAudio) { currentAudio.pause(); currentAudio = null; if(typeof resetCasterUI === 'function') resetCasterUI(); }
                if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }

                this.audio.src = track.file;
                this.audio.play().catch(e => console.error("Error al reproducir", e));
                this.showPlayer();
            },
            togglePlayerAnthem: function(playerName, event) {
                if (event) event.stopPropagation();
                let idx = this.playlist.findIndex(t => t.player === playerName);
                if (idx === -1) return;

                if (this.currentIndex === idx) {
                    this.togglePlay();
                } else {
                    this.playTrack(idx);
                }
            },
            togglePlay: function() {
                if (this.currentIndex === -1 && this.playlist.length > 0) {
                    this.playTrack(0);
                    return;
                }
                if (this.isPlaying) this.audio.pause();
                else this.audio.play().catch(e => console.error(e));
            },
            next: function() {
                if(this.playlist.length === 0) return;
                let nextIdx = (this.currentIndex + 1) % this.playlist.length;
                this.playTrack(nextIdx);
            },
            prev: function() {
                if(this.playlist.length === 0) return;
                let prevIdx = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
                this.playTrack(prevIdx);
            },
            updateUI: function(playing) {
                this.isPlaying = playing;
                // UI Global
                const iconPlay = document.getElementById('radioIconPlay');
                const iconPause = document.getElementById('radioIconPause');
                const visualizer = document.getElementById('radioVisualizer');
                
                if (iconPlay && iconPause) {
                    if (playing) { iconPlay.classList.add('hidden'); iconPause.classList.remove('hidden'); }
                    else { iconPlay.classList.remove('hidden'); iconPause.classList.add('hidden'); }
                }
                
                if(visualizer) {
                    if(playing) visualizer.classList.remove('hidden');
                    else visualizer.classList.add('hidden');
                }

                if (this.currentIndex !== -1) {
                    let track = this.playlist[this.currentIndex];
                    const trackName = document.getElementById('radioTrackName');
                    const playerName = document.getElementById('radioPlayerName');
                    if(trackName) trackName.innerText = track.title;
                    if(playerName) playerName.innerText = track.player;
                }

                // Sincronizar UI del Modal de perfil
                const btnText = document.getElementById('anthemPlayText');
                const btnIcon = document.getElementById('anthemPlayIcon');
                const box = document.getElementById('modalAnthemBox');
                const isCurrentPlayerModal = (typeof activeModalPlayer !== 'undefined' && this.currentIndex !== -1 && this.playlist[this.currentIndex].player === activeModalPlayer);

                if (btnText && btnIcon) {
                    if (playing && isCurrentPlayerModal) {
                        btnText.innerText = "PAUSA";
                        btnIcon.innerText = "⏸️";
                        if(box) box.classList.add("border-yellow-300", "shadow-[0_0_30px_rgba(250,204,21,0.8)]");
                    } else {
                        btnText.innerText = "PLAY";
                        btnIcon.innerText = "▶️";
                        if(box) box.classList.remove("border-yellow-300", "shadow-[0_0_30px_rgba(250,204,21,0.8)]");
                    }
                }
            },
            showPlayer: function() {
                const player = document.getElementById('radioGlobalPlayer');
                if(player) {
                    player.classList.remove('translate-y-full');
                    document.body.style.paddingBottom = '80px'; 
                }
            },
            hide: function() {
                const player = document.getElementById('radioGlobalPlayer');
                if(player) player.classList.add('translate-y-full');
                document.body.style.paddingBottom = '0';
            },
            stop: function() {
                this.audio.pause();
                this.updateUI(false);
            }
        };

        window.addEventListener('DOMContentLoaded', () => {
            RadioManager.init();
        });

        // Wrapper functions para no romper los HTML inline actuales
        function togglePlayerAnthem(playerName, event) {
            RadioManager.togglePlayerAnthem(playerName, event);
        }
        function stopAnthemAudio() {
            RadioManager.stop();
        }

        function hideModalEl(modal) {
            // Ya no detenemos la radio global al cerrar un modal!
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
                activeSpeakingPlayer = null;
            }
            modal.classList.add('opacity-0');
            modal.querySelector('.transform').classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 250);
        }

        function generatePlayerAchievements(row, sC, sP) {
            let badges = [];
            if (sC.ligaRaw && sC.ligaRaw.toLowerCase() === 'leyenda') {
                badges.push({ 
                    icon: '🌟', 
                    label: 'TITÁN DE LEYENDA', 
                    title: '¡Estatus Deidad: Único en la cima de Liga Leyenda!', 
                    color: 'border border-yellow-300 text-yellow-200 bg-gradient-to-r from-amber-500/35 via-yellow-500/25 to-purple-600/35 shadow-[0_0_12px_rgba(250,204,21,0.7)] font-black animate-pulse' 
                });
            }
            if (sC.reliquias >= 200) {
                badges.push({ icon: '👑', label: '200+ Reliquias', title: 'Rey de las Reliquias (200+)', color: 'border-yellow-500 text-yellow-300 bg-yellow-500/15' });
            } else if (sC.reliquias >= 150) {
                badges.push({ icon: '💎', label: '150+ Reliquias', title: 'Cazador Experto (150+)', color: 'border-cyan-500 text-neonCyan bg-cyan-500/15' });
            }
            if (sC.oleada >= 200) {
                badges.push({ icon: '🌊', label: 'Ola 200+', title: 'Rompe-Oleadas (Ola 200+)', color: 'border-blue-400 text-blue-300 bg-blue-500/15' });
            }
            if (sP.valid && sC.tier > sP.tier) {
                badges.push({ icon: '🔥', label: `+${sC.tier - sP.tier} Tier!`, title: '¡Ascenso de Tier en el mes!', color: 'border-green-400 text-green-300 bg-green-500/20 animate-pulse' });
            }
            if (['campeón', 'campeon'].includes((sC.ligaRaw || '').toLowerCase())) {
                badges.push({ icon: '⚔️', label: 'Élite', title: `Liga máxima: ${sC.ligaRaw}`, color: 'border-purple-400 text-purple-300 bg-purple-500/20' });
            }
            if (row[1] && row[1] !== '-') {
                badges.push({ icon: '🌟', label: 'Veterano', title: 'Miembro Leal (Desde el 19 de enero)', color: 'border-amber-600 text-amber-300 bg-amber-600/15' });
            }
            if (badges.length === 0) {
                badges.push({ icon: '🛡️', label: 'Guerrero', title: 'Miembro activo', color: 'border-slate-700 text-slate-400 bg-slate-800' });
            }

            return badges.map(b => `
                <span title="${b.title}" class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${b.color} cursor-help hover:scale-105 transition-transform shadow-sm flex-shrink-0 font-bold">
                    <span>${b.icon}</span> <span>${b.label}</span>
                </span>
            `).join('');
        }

        // --- SALón de la FAMA: PODIO TOP 3 RESPONSIVO ---
        function renderPodium(currRanks) {}


        function renderTitan() {}


        function switchModalTab(tab) {
            const btnCard = document.getElementById('tabBtnCard');
            const btnChart = document.getElementById('tabBtnChart');
            const contentCard = document.getElementById('tabContentCard');
            const contentChart = document.getElementById('tabContentChart');
            
            if (tab === 'card') {
                btnCard.className = "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold font-mono bg-neonCyan text-black transition-all truncate text-center";
                btnChart.className = "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold font-mono text-slate-400 hover:text-white transition-all truncate text-center";
                contentCard.classList.remove('hidden');
                contentChart.classList.add('hidden');
            } else {
                btnChart.className = "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold font-mono bg-neonCyan text-black transition-all truncate text-center";
                btnCard.className = "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold font-mono text-slate-400 hover:text-white transition-all truncate text-center";
                contentChart.classList.remove('hidden');
                contentCard.classList.add('hidden');
                renderEvolutionChart(activeModalPlayer);
            }
        }

        function renderEvolutionChart(playerName) {
            const row = db.rows.find(r => r[0] === playerName);
            if (!row) return;
            
            const indices = [1, 4, 9, 14, 19, 24, 29, 34, 39];
            const dates = ["19/01", "04/02", "16/02", "01/03", "17/03", "29/03", "26/04", "15/06", "27/07"];
            
            let labels = [];
            let dataReliquias = [];
            let dataTier = [];
            
            for (let i = 0; i < indices.length; i++) {
                let idx = indices[i];
                let s = getScore(row, idx);
                if (s.valid) {
                    labels.push(dates[i]);
                    dataReliquias.push(s.reliquias);
                    dataTier.push(s.tier);
                }
            }

            if (chartInstance) chartInstance.destroy();
            const ctx = document.getElementById('evolutionChart').getContext('2d');
            
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '💎 Reliquias',
                            data: dataReliquias,
                            borderColor: '#00f2fe',
                            backgroundColor: 'rgba(0, 242, 254, 0.15)',
                            borderWidth: 2.5,
                            pointBackgroundColor: '#00f2fe',
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            tension: 0.3,
                            yAxisID: 'y',
                            fill: true
                        },
                        {
                            label: '🏆 Tier',
                            data: dataTier,
                            borderColor: '#ff0844',
                            backgroundColor: 'rgba(255, 8, 68, 0.15)',
                            borderWidth: 2.5,
                            pointBackgroundColor: '#ff0844',
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            tension: 0.2,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { labels: { color: '#e2e8f0', font: { family: 'JetBrains Mono', size: 11 } } },
                        tooltip: { backgroundColor: 'rgba(10, 10, 10, 0.95)', borderColor: '#00f2fe', borderWidth: 1 }
                    },
                    scales: {
                        x: { grid: { color: 'rgba(255, 255, 255, 0.08)' }, ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } } },
                        y: { 
                            type: 'linear', position: 'left',
                            grid: { color: 'rgba(0, 242, 254, 0.1)' }, 
                            ticks: { color: '#00f2fe', font: { family: 'JetBrains Mono', size: 10 } },
                            title: { display: true, text: 'Reliquias', color: '#00f2fe', font: { size: 11 } }
                        },
                        y1: { 
                            type: 'linear', position: 'right',
                            grid: { drawOnChartArea: false },
                            ticks: { color: '#ff0844', font: { family: 'JetBrains Mono', size: 10 }, stepSize: 1 },
                            title: { display: true, text: 'Tier', color: '#ff0844', font: { size: 11 } }
                        }
                    }
                }
            });
        }

        function openModal(playerName) {
            activeModalPlayer = playerName;
            const modal = document.getElementById('profileModal');
            if(!modal) return;
            const nameEl = document.getElementById('modalPlayerName');
            let rObj = typeof db !== 'undefined' ? db.rows.find(r => r[0] === playerName) : null;
            let sObj = (rObj && typeof getScore === 'function' && typeof currDateIdx !== 'undefined') ? getScore(rObj, currDateIdx) : {};
            
            if (sObj && sObj.ligaRaw && sObj.ligaRaw.toLowerCase() === 'leyenda') {
                if (nameEl) nameEl.className = "text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase tracking-wider truncate text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
                if (nameEl) nameEl.innerHTML = `🌟 ${playerName} <span class="text-xs sm:text-sm text-yellow-300 font-mono tracking-widest block sm:inline">[TITÁN DE LEYENDA]</span>`;
            } else {
                if (nameEl) nameEl.className = "text-xl sm:text-3xl md:text-4xl font-mono font-black uppercase text-white tracking-wider truncate";
                if (nameEl) nameEl.innerText = playerName;
            }

            const img = document.getElementById('modalImg');
            if (img) img.src = `Captura-perfiles/${playerName}.png`;
            
            let note = typeof casterNotes !== 'undefined' ? casterNotes[playerName] : null;
            if (note && note.anthem) {
                if(document.getElementById('modalAnthemBox')) document.getElementById('modalAnthemBox').style.display = 'block';
                if(document.getElementById('modalAnthemTitle')) document.getElementById('modalAnthemTitle').innerText = note.anthem.title;
            } else {
                if(document.getElementById('modalAnthemBox')) document.getElementById('modalAnthemBox').style.display = 'none';
            }

            if (note) {
                if(document.getElementById('modalCasterBox')) document.getElementById('modalCasterBox').style.display = 'block';
                if(document.getElementById('modalCasterTitle')) document.getElementById('modalCasterTitle').innerText = note.title;
                if(document.getElementById('modalCasterQuote')) document.getElementById('modalCasterQuote').innerText = `«${note.quote}»`;
                if(document.getElementById('modalCasterText')) document.getElementById('modalCasterText').innerText = note.text;
            } else {
                if(document.getElementById('modalCasterBox')) document.getElementById('modalCasterBox').style.display = 'none';
            }

            switchModalTab('card');
            if (typeof RadioManager !== 'undefined') RadioManager.updateUI(RadioManager.isPlaying);
            showModalEl(modal);
        }

        // --- MODO CASTEO: ESTUDIO DE TRANSMISIÓN OPTIMIZADO ---
        function openCasterStudio() {
            renderCasterGrid(currentCasterCategory);
            showModalEl(document.getElementById('casterModal'));
        }

        // --- CÓDICE TÁCTICO INTERACTIVO: GLOSARIO EN VIVO & ABREVIATURAS ---
        let currentCodexCat = 'all';
        function openInfografiasModal() {
            renderCodex();
            showModalEl(document.getElementById('infografiasModal'));
            const input = document.getElementById('codexSearchInput');
            if (input) { input.value = ''; input.focus(); }
            filterCodex();
        }
        function switchCodexCat(cat, btn) {
            currentCodexCat = cat;
            document.querySelectorAll('.codex-cat-btn').forEach(b => {
                b.className = "codex-cat-btn px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all border bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-emerald-500/60";
            });
            if (btn) {
                btn.className = "codex-cat-btn px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all border bg-emerald-500 text-black border-yellow-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
            }
            filterCodex();
        }
        function filterCodex() {
            const query = (document.getElementById('codexSearchInput')?.value || '').toLowerCase().trim();
            renderCodex(query, currentCodexCat);
        }
        function renderCodex(query = '', category = 'all') {
            const container = document.getElementById('codexContainer');
            if (!container || typeof abbreviationsData === 'undefined') return;
            
            const catNames = {
                'uw': { icon: '💥', label: 'ARMA SUPREMA', color: 'from-purple-900/60 to-slate-900 border-purple-500 text-purple-300' },
                'cards': { icon: '🃏', label: 'CARTA', color: 'from-blue-900/60 to-slate-900 border-blue-500 text-blue-300' },
                'labs': { icon: '🔬', label: 'LAB / TALLER', color: 'from-teal-900/60 to-slate-900 border-teal-500 text-teal-300' },
                'mods': { icon: '🛡️', label: 'MÓDULO', color: 'from-emerald-900/60 to-slate-900 border-emerald-500 text-emerald-300' },
                'slang': { icon: '💬', label: 'JERGA / ESTRATEGIA', color: 'from-amber-900/60 to-slate-900 border-amber-500 text-amber-300' },
                'math': { icon: '🔢', label: 'ESCALA / MAGNITUD', color: 'from-rose-900/60 to-slate-900 border-rose-500 text-rose-300' }
            };

            const filtered = abbreviationsData.filter(item => {
                const matchCat = (category === 'all' || item.cat === category);
                const matchQuery = !query || (
                    item.sigla.toLowerCase().includes(query) ||
                    item.en.toLowerCase().includes(query) ||
                    item.es.toLowerCase().includes(query) ||
                    item.desc.toLowerCase().includes(query)
                );
                return matchCat && matchQuery;
            });

            if (filtered.length === 0) {
                container.innerHTML = `<div class="col-span-full py-12 text-center font-mono text-slate-400">
                    <p class="text-3xl mb-2">👾</p>
                    <p class="text-sm sm:text-base font-bold text-yellow-300">No se encontraron siglas o términos con esa búsqueda.</p>
                    <p class="text-xs text-slate-500 mt-1">¡Prueba con otra palabra en español, inglés o sus iniciales!</p>
                </div>`;
                return;
            }

            container.innerHTML = filtered.map(item => {
                const info = catNames[item.cat] || { icon: '✨', label: item.cat.toUpperCase(), color: 'from-slate-800 to-slate-900 border-slate-600 text-slate-300' };
                return `
                    <div class="bg-gradient-to-br ${info.color.split(' ').slice(0,2).join(' ')} border ${info.color.split(' ')[2]} rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group h-full">
                        <div>
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                                <span class="px-2 py-1 rounded text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-black/80 border border-white/20 ${info.color.split(' ')[3]} flex items-center gap-1 shadow-sm max-w-[100%] sm:max-w-[55%] truncate">
                                    ${info.icon} ${info.label}
                                </span>
                                <span class="text-[11px] sm:text-xs font-mono font-black text-yellow-300 bg-yellow-400/15 px-2.5 py-1 rounded-lg border border-yellow-400/40 shadow-md ml-auto whitespace-normal max-w-[100%]">
                                    ${item.sigla}
                                </span>
                            </div>
                            <h4 class="text-sm sm:text-base font-mono font-black text-white tracking-wide uppercase mb-0.5">
                                ${item.es}
                            </h4>
                            <div class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase italic mb-2.5">
                                [ EN: ${item.en} ]
                            </div>
                            <p class="text-xs font-sans text-slate-200 leading-relaxed">
                                ${item.desc}
                            </p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function openAcademiaModal() {
            showModalEl(document.getElementById('academiaModal'));
        }
        function switchCasterTab(cat, btn) {
            currentCasterCategory = cat;
            let btns = document.querySelectorAll('.caster-btn');
            btns.forEach(b => {
                b.className = "caster-btn px-3 py-1.5 rounded-full text-[11px] sm:text-sm font-mono transition-all bg-slate-900 text-slate-300 border border-slate-700 hover:text-white flex-grow sm:flex-grow-0 text-center font-bold";
            });
            btn.className = "caster-btn active px-3 py-1.5 rounded-full text-[11px] sm:text-sm font-mono font-black transition-all bg-neonPurple text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] flex-grow sm:flex-grow-0 text-center";
            renderCasterGrid(cat);
        }

        function renderCasterGrid(category) {
            if (typeof casterNotes === 'undefined') return;
            const grid = document.getElementById('casterGrid');
            grid.innerHTML = '';
            
            Object.keys(casterNotes).forEach(pName => {
                let note = casterNotes[pName];
                if (note.category !== category) return;
                
                let row = db.rows.find(r => r[0] === pName);
                let score = row ? getScore(row, currDateIdx) : { tier: '-', oleada: '-', reliquias: 0 };
                
                let borderColor = category === 'sleep' ? 'border-amber-500/60 hover:border-amber-400' : (category === 'ninja' ? 'border-cyan-500/60 hover:border-cyan-400' : 'border-purple-500/60 hover:border-purple-400');
                let badgeColor = category === 'sleep' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : (category === 'ninja' ? 'bg-cyan-500/20 text-neonCyan border-cyan-500/50' : 'bg-purple-500/20 text-purple-200 border-purple-500/50');

                let div = document.createElement('div');
                div.className = `bg-black/90 border-2 ${borderColor} rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl relative group`;
                
                div.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between gap-1.5 mb-2.5 pb-2.5 border-b border-slate-800/80 flex-wrap sm:flex-nowrap">
                            <div class="flex items-center gap-2 min-w-0">
                                <span class="text-base sm:text-xl">🎙️</span>
                                <h4 class="font-mono font-black text-base sm:text-xl text-white truncate hover:text-neonCyan cursor-pointer transition-colors" onclick="closeModal('casterModal', event); setTimeout(()=>openModal('${pName}'), 300);">${pName}</h4>
                            </div>
                            <span class="text-[9px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase truncate max-w-[90%] sm:max-w-[55%] ${badgeColor}">${note.title}</span>
                        </div>
                        <div class="text-[11px] sm:text-xs font-mono text-slate-300 mb-2.5 italic bg-slate-950 px-3 py-1.5 rounded-lg border-l-2 border-purple-500 leading-normal">
                            «${note.quote}»
                        </div>
                        <p class="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed mb-4 font-medium">
                            ${note.text}
                        </p>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-800 font-mono text-[10px] sm:text-xs text-slate-400 mt-auto">
                        <span class="truncate">🏆 T<strong class="text-white">${score.tier}</strong> | 🌊 Olas <strong class="text-white">${score.oleada}</strong> | 💎 <strong class="text-neonCyan">${score.reliquias ? formatNumber(score.reliquias) : '-'}</strong></span>
                        <div class="flex items-center gap-1.5 ml-auto sm:ml-0">
                            ${note.anthem ? `
                            <button onclick="togglePlayerAnthem('${pName}', event)" title="Escuchar tema musical oficial: ${note.anthem.title}" class="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black px-2.5 py-1 rounded-lg font-mono font-black transition-all text-[11px] sm:text-xs flex items-center gap-1 shadow-sm border border-yellow-300">
                                <span>🎵</span> <span>TEMA</span>
                            </button>
                            ` : ''}
                            <button onclick="speakCasterNote('${pName}', event)" title="Escuchar narración del caster con voz" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-neonCyan hover:to-cyan-400 text-white hover:text-black px-2.5 py-1 rounded-lg font-mono font-black transition-all text-[11px] sm:text-xs flex items-center gap-1 shadow-sm border border-purple-400/70">
                                <span>🔊</span> <span>VOZ</span>
                            </button>
                            <button onclick="closeModal('casterModal', event); setTimeout(()=>openModal('${pName}'), 300);" class="bg-slate-800 hover:bg-neonCyan text-slate-100 hover:text-black px-2.5 py-1 rounded-lg font-black transition-all text-[11px] sm:text-xs flex items-center gap-1 shadow-sm">
                                👤 VER <span class="hidden sm:inline">PERFIL</span>
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(div);
            });
        }

        function closeModal(modalId, event) {
            hideModalEl(document.getElementById(modalId));
        }

        function handleFilterChange() {
            let val = document.getElementById('searchInput').value.trim();
            document.getElementById('clearBtn').style.display = val ? 'block' : 'none';
            renderCards();
        }

        function clearSearch() {
            document.getElementById('searchInput').value = '';
            document.getElementById('clearBtn').style.display = 'none';
            renderCards();
        }

        function setFilter(filterType, btn) {
            currentFilter = filterType;
            let btns = document.querySelectorAll('.filter-btn');
            btns.forEach(b => b.classList.remove('active', 'bg-neonCyan', 'text-black'));
            btns.forEach(b => {
                b.className = "filter-btn px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:border-slate-500 flex-grow sm:flex-grow-0 text-center shadow-sm";
            });
            btn.className = "filter-btn active px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-black transition-all bg-neonCyan text-black border border-neonCyan flex-grow sm:flex-grow-0 text-center shadow-sm";
            renderCards();
        }
        
        // --- LIMPIEZA DE SELECCIÓN RÁPIDA (MODO BATALLA) ---
        function clearBattleSelection() {
            selectedPlayers.clear();
            document.querySelectorAll('.cyber-checkbox').forEach(cb => cb.checked = false);
            updateBattleBar();
        }

        function updateBattleBar() {
            const battleBar = document.getElementById('battleBar');
            document.getElementById('battleCount').innerText = selectedPlayers.size;
            if (selectedPlayers.size >= 1) {
                battleBar.classList.remove('translate-y-[250%]');
                battleBar.classList.add('translate-y-0');
            } else {
                battleBar.classList.add('translate-y-[250%]');
                battleBar.classList.remove('translate-y-0');
            }
        }

        function handleCheckbox(cb, playerName) {
            if (cb.checked) {
                if (selectedPlayers.size >= 3) {
                    cb.checked = false;
                    alert("⚔️ Solo puedes comparar hasta 3 guerreros de forma simultánea en la Arena.");
                    return;
                }
                selectedPlayers.add(playerName);
            } else {
                selectedPlayers.delete(playerName);
            }
            updateBattleBar();
        }
        
        function openBattleModal() {
            if (selectedPlayers.size < 2) {
                alert("⚔️ ¡Selecciona al menos 2 guerreros con la casilla de verificación (✔) en su tarjeta para iniciar la batalla!");
                return;
            }
            const grid = document.getElementById('battleGrid');
            grid.innerHTML = '';
            
            let playersArray = Array.from(selectedPlayers);
            let rowsToCompare = db.rows.filter(r => playersArray.includes(r[0]));
            
            const colors = ['border-neonCyan shadow-[0_0_20px_rgba(0,242,254,0.25)]', 'border-neonMagenta shadow-[0_0_20px_rgba(255,8,68,0.25)]', 'border-neonLime shadow-[0_0_20px_rgba(163,230,53,0.25)]'];
            const textColors = ['text-neonCyan', 'text-neonMagenta', 'text-neonLime'];
            
            let maxTier = Math.max(...rowsToCompare.map(r => getScore(r, currDateIdx).tier));
            let maxOleada = Math.max(...rowsToCompare.map(r => getScore(r, currDateIdx).oleada));
            let maxRel = Math.max(...rowsToCompare.map(r => getScore(r, currDateIdx).reliquias));
            let maxLiga = Math.max(...rowsToCompare.map(r => getScore(r, currDateIdx).liga));
            
            rowsToCompare.forEach((row, idx) => {
                let pName = row[0];
                let score = getScore(row, currDateIdx);
                let theme = colors[idx % colors.length];
                let tc = textColors[idx % textColors.length];
                
                let winTier = score.tier === maxTier && score.tier > 0 ? `<span class="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">🏆 VENTAJA</span>` : '';
                let winOleada = score.oleada === maxOleada && score.oleada > 0 ? `<span class="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">🏆 VENTAJA</span>` : '';
                let winRel = score.reliquias === maxRel && score.reliquias > 0 ? `<span class="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">🏆 VENTAJA</span>` : '';
                let winLiga = score.liga === maxLiga && score.liga > 0 ? `<span class="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">🏆 VENTAJA</span>` : '';

                let div = document.createElement('div');
                div.className = `bg-black border-2 ${theme} rounded-2xl p-3 sm:p-5 w-full flex flex-col justify-between`;
                
                let badgeHtml = score.ligaRaw !== '-' ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${getBadgeClass(score.ligaRaw)}">${score.ligaRaw}</span>` : '-';
                
                div.innerHTML = `
                    <div>
                        <h3 class="text-lg sm:text-2xl font-mono font-black text-center mb-2.5 ${tc} uppercase tracking-wide truncate">${pName}</h3>
                        <div class="rounded-xl overflow-hidden border border-slate-800 mb-3.5 bg-slate-950 flex items-center justify-center h-48 sm:h-64 p-1">
                            <img src="Captura-perfiles/${pName}.png" onerror="this.src=''" alt="${pName}" class="w-full h-full object-contain opacity-95 hover:opacity-100 transition-opacity">
                        </div>
                        <div class="space-y-2 font-mono text-xs sm:text-sm">
                            <div class="flex justify-between items-center pb-1.5 border-b border-slate-800">
                                <span class="text-slate-400">🏆 TIER</span> 
                                <div class="flex items-center"><span class="font-bold text-white text-sm sm:text-base">${score.tier || '-'}</span> ${winTier}</div>
                            </div>
                            <div class="flex justify-between items-center pb-1.5 border-b border-slate-800">
                                <span class="text-slate-400">🌊 OLEADA</span> 
                                <div class="flex items-center"><span class="font-bold text-white text-sm sm:text-base">${score.oleada || '-'}</span> ${winOleada}</div>
                            </div>
                            <div class="flex justify-between items-center pb-1.5 border-b border-slate-800">
                                <span class="text-slate-400">💎 RELIQUIAS</span> 
                                <div class="flex items-center"><span class="font-bold text-neonCyan text-sm sm:text-base">${score.reliquias ? formatNumber(score.reliquias) : '-'}</span> ${winRel}</div>
                            </div>
                            <div class="flex justify-between items-center pb-1.5 border-b border-slate-800">
                                <span class="text-slate-400">🛡️ LIGA</span> 
                                <div class="flex items-center">${badgeHtml} ${winLiga}</div>
                            </div>
                            <div class="flex justify-between items-center pb-1.5 border-b border-slate-800">
                                <span class="text-slate-400">📍 POS. TORNEO</span> <span class="font-bold text-white text-sm sm:text-base">${score.posRaw}</span>
                            </div>
                        </div>
                    </div>
                `;
                grid.appendChild(div);
            });
            
            let textEl = document.getElementById('tacticalText');
            let p1 = rowsToCompare[0][0];
            let p2 = rowsToCompare[1][0];
            let s1 = getScore(rowsToCompare[0], currDateIdx);
            let s2 = getScore(rowsToCompare[1], currDateIdx);
            
            let winnerTier = s1.tier > s2.tier ? p1 : (s2.tier > s1.tier ? p2 : "Empate en Tier");
            let winnerRel = s1.reliquias > s2.reliquias ? p1 : (s2.reliquias > s1.reliquias ? p2 : "Empate en Reliquias");
            
            textEl.innerHTML = `En esta arena competitiva, <strong class="text-white">${winnerTier}</strong> lidera la jerarquía de nivel en la torre (Tier), mientras que el poder masivo de acumulación de tesoros favorece a <strong class="text-neonCyan">${winnerRel}</strong>. ¡Guerreros dignos de la élite de LATINO!`;
            
            showModalEl(document.getElementById('battleModal'));
        }

        function renderCards() {
    const tbody = document.getElementById('cardsGrid');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const prevRanks = calculateRanks(prevDateIdx, currentSortMode);
    const currRanks = calculateRanks(currDateIdx, currentSortMode);
    
    let displayRows = [...db.rows];
    
    displayRows.sort((a, b) => {
        let scoreA = getScore(a, currDateIdx);
        let scoreB = getScore(b, currDateIdx);
        return compareScores(scoreA, scoreB, currentSortMode);
    });

    let query = document.getElementById('searchInput') ? document.getElementById('searchInput').value.trim().toLowerCase() : '';
    displayRows = displayRows.filter(row => {
        let pName = row[0].toLowerCase();
        let matchesSearch = pName.includes(query);
        
        let scoreC = getScore(row, currDateIdx);
        let scoreP = getScore(row, prevDateIdx);
        let matchesTab = true;

        if (currentFilter === 'elite') {
            matchesTab = ['leyenda', 'campeón', 'campeon'].includes((scoreC.ligaRaw||'').toLowerCase());
        } else if (currentFilter === 'platino') {
            matchesTab = (scoreC.ligaRaw||'').toLowerCase() === 'platino';
        } else if (currentFilter === 'oro') {
            matchesTab = ['oro', 'plata', 'cobre'].includes((scoreC.ligaRaw||'').toLowerCase());
        } else if (currentFilter === 'ascenso') {
            matchesTab = scoreP.valid && ((scoreC.tier > scoreP.tier) || (scoreC.reliquias - scoreP.reliquias >= 30));
        } else if (currentFilter === 'nuevos') {
            matchesTab = !scoreP.valid;
        }

        return matchesSearch && matchesTab;
    });

    if (displayRows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-on-surface-variant font-label-mono">No se encontraron resultados.</td></tr>`;
        return;
    }
    
    displayRows.forEach((row) => {
        let playerName = row[0];
        let cRank = currRanks.get(playerName) || '-';
        let scoreC = getScore(row, currDateIdx);
        let scoreP = getScore(row, prevDateIdx);
        
        let rankColorClass = 'text-on-surface-variant';
        let rankDropShadow = '';
        let borderClass = 'border-outline-variant/30';
        
        if (cRank === 1) {
            rankColorClass = 'text-trophy-gold';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]';
            borderClass = 'border-trophy-gold/50';
        } else if (cRank === 2) {
            rankColorClass = 'text-text-silver';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(226,232,240,0.5)]';
            borderClass = 'border-text-silver/50';
        } else if (cRank === 3) {
            rankColorClass = 'text-[#CD7F32]';
            rankDropShadow = 'drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]';
            borderClass = 'border-[#CD7F32]/50';
        }
        
        let tierLabel = scoreC.ligaRaw || '-';
        let isAscenso = scoreP.valid && scoreC.tier > scoreP.tier;
        let isNuevo = !scoreP.valid;
        
        let trendHtml = '-';
        if (isAscenso) {
            trendHtml = `<span class="inline-flex items-center gap-1 font-label-mono text-[12px] text-streak-red bg-streak-red/10 px-2 py-0.5 rounded"><span class="material-symbols-outlined text-[14px]">local_fire_department</span> En Racha</span>`;
        } else if (isNuevo) {
            trendHtml = `<span class="inline-flex items-center gap-1 font-label-mono text-[12px] text-primary-fixed-dim bg-primary-fixed-dim/10 px-2 py-0.5 rounded"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> Nuevo</span>`;
        }
        
        let tr = document.createElement('tr');
        tr.className = 'table-row-zebra border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors group cursor-pointer';
        tr.onclick = () => openModal(playerName);
        
        tr.innerHTML = `
            <td class="p-4 pl-6 text-center">
                <span class="font-stat-value text-stat-value ${rankColorClass} ${rankDropShadow}">${cRank}</span>
            </td>
            <td class="p-4 font-title-md text-on-surface flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-surface-container-high border ${borderClass}"></div>
                ${playerName}
            </td>
            <td class="p-4"><span class="font-label-mono text-label-mono text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-2 py-0.5 rounded">${tierLabel}</span></td>
            <td class="p-4 pr-6 text-right">
                ${trendHtml}
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}


        function handleSortChange() {
            let radios = document.getElementsByName('sortMode');
            for(let r of radios) {
                if(r.checked) {
                    currentSortMode = r.value;
                    break;
                }
            }
            updateSortBtnStyles();
            renderCards();
        }
        
        window.addEventListener('resize', () => {
            renderPodium(calculateRanks(currDateIdx, currentSortMode));
        });

        renderCards();