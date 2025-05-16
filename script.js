
        // Simulated database
        const predictionsDatabase = {
            live: [
                {
                    id: 1,
                    sport: 'football',
                    league: 'Premier League',
                    teams: 'Aston Villa vs Tottenham',
                    prediction: 'Home Win',
                    odds: 1.33,
                    confidence: 'High',
                    status: 'live',
                    startTime: new Date (Date.now() + 3610000 * 2),
                    analysis: 'Aston Villa have won four of their past six league and cup meetings with Tottenham, including a 2-1 FA Cup triumph at Villa Park in February. However, Spurs have won the past two league meetings by an aggregate score of 8-1.   The Lilywhites have eight wins from their previous nine Premier League visits to Villa Park losing the other.'
                },
                {
                    id: 2,
                    sport: 'Football',
                    league: 'Premier League',
                    teams: 'Chelsea vs Manchester United',
                    prediction: 'Home Win',
                    odds: 1.44,
                    confidence: 'Medium',
                    status: 'live',
                    startTime: new Date(),
                    analysis: 'In the last 6 matches, Chelsea Win 1, Draw 3, Lose 2; Manchester United Win 2, Draw 3, Lose 1',
                },
                {
                    id: 3,
                    sport: 'Football',
                    league: 'Saudi-Arabia-Pro League',
                    teams: 'Al-Nassr vs Al Taawon',
                    prediction: 'Home Win',
                    odds: 1.20,
                    confidence: 'High',
                    status: 'live',
                    startTime: new Date(),
                    analysis: 'Al-Awwal Park plays host on Friday as Al-Nassr welcome Al-Taawoun, with the home team knowing that anything short of victory could spell the end of their hopes for continental football next season.'
                }
            ],
            upcoming: [
                {
                    id: 4,
                    sport: 'football',
                    league: 'Egypt-Premier League',
                    teams: 'El Geish vs Enppi',
                    prediction: 'Home win or draw',
                    odds: 1.65,
                    confidence: 'Very High',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3610000 * 2), // 3 hours from now
                    analysis: 'head to head record shows that in the previous 23 meetings, El Geish has won 6 times, ENPPI has won 8 times, and 9 ended in a draw.'
                },
                {
                    id: 5,
                    sport: 'football',
                    league: 'Serie A',
                    teams: 'Juventus vs AC Milan',
                    prediction: 'Juventus Win',
                    odds: 2.10,
                    confidence: 'Medium',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3600000 * 5), // 5 hours from now
                    analysis: 'Juventus has a strong home record against Milan. Milan is missing several key players due to injuries.'
                },
                {
                    id: 6,
                    sport: 'basketball',
                    league: 'Euroleague',
                    teams: 'CSKA Moscow vs Fenerbahce',
                    prediction: 'Over 165.5 Points',
                    odds: 1.95,
                    confidence: 'High',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3600000 * 8), // 8 hours from now
                    analysis: 'Both teams play fast-paced basketball. Last 3 encounters have all gone over this points total.'
                },
                {
                    id: 7,
                    sport: 'tennis',
                    league: 'WTA',
                    teams: 'Swiatek vs Sabalenka',
                    prediction: 'Swiatek -3.5 Games',
                    odds: 1.85,
                    confidence: 'High',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3600000 * 12), // 12 hours from now
                    analysis: 'Swiatek has dominated this matchup recently, winning the last 4 encounters in straight sets.'
                },
                   {
                    id: 8,
                    sport: 'tennis',
                    league: 'WTA',
                    teams: 'Swiatek vs Sabalenka',
                    prediction: 'Swiatek -3.5 Games',
                    odds: 1.85,
                    confidence: 'High',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3600000 * 12), // 12 hours from now
                    analysis: 'Swiatek has dominated this matchup recently, winning the last 4 encounters in straight sets.'
                },

               {
                    id: 9,
                    sport: 'tennis',
                    league: 'WTA',
                    teams: 'Swiatek vs Sabalenka',
                    prediction: 'Swiatek -3.5 Games',
                    odds: 1.85,
                    confidence: 'High',
                    status: 'upcoming',
                    startTime: new Date(Date.now() + 3600000 * 12), // 12 hours from now
                    analysis: 'Swiatek has dominated this matchup recently, winning the last 4 encounters in straight sets.'
                }
            ]
        };

        // DOM Elements
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const overlay = document.querySelector('.overlay');
        const mainContent = document.querySelector('.main-content');
        const livePredictionsContainer = document.getElementById('livePredictionsContainer');
        const upcomingPredictionsContainer = document.getElementById('upcomingPredictionsContainer');
        const refreshBtn = document.getElementById('refreshBtn');
        const filterSportButtons = document.querySelectorAll('.filter-sport');
        const predictionModal = new bootstrap.Modal(document.getElementById('predictionModal'));
        const predictionModalTitle = document.getElementById('predictionModalTitle');
        const predictionModalBody = document.getElementById('predictionModalBody');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function () {
            loadPredictions();

            // Simulate live updates every 30 seconds
            setInterval(updateLivePredictions, 30000);
        });

        // Toggle sidebar
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            mainContent.classList.toggle('active');
        });

        // Close sidebar when clicking on overlay
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            mainContent.classList.remove('active');
        });

        // Refresh predictions
        refreshBtn.addEventListener('click', function () {
            // Show loading state
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Refreshing';
            refreshBtn.disabled = true;

            // Simulate network delay
            setTimeout(function () {
                loadPredictions();
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt me-1"></i> Refresh';
                refreshBtn.disabled = false;

                // Show toast notification
                showToast('Predictions updated successfully!', 'success');
            }, 1000);
        });

        // Filter predictions by sport
        filterSportButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const sport = this.getAttribute('data-sport');
                filterPredictionsBySport(sport);

                // Update active state
                filterSportButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Load predictions
        function loadPredictions() {
            renderLivePredictions(predictionsDatabase.live);
            renderUpcomingPredictions(predictionsDatabase.upcoming);
        }

        // Render live predictions
        function renderLivePredictions(predictions) {
            livePredictionsContainer.innerHTML = '';

            if (predictions.length === 0) {
                livePredictionsContainer.innerHTML = `
                    <div class="col-12 text-center py-4">
                        <i class="fas fa-info-circle fa-2x mb-2 text-muted"></i>
                        <p class="text-muted">No live predictions at the moment. Check back later!</p>
                    </div>
                `;
                return;
            }

            predictions.forEach(prediction => {
                const card = createPredictionCard(prediction, true);
                livePredictionsContainer.appendChild(card);
            });
        }

        // Render upcoming predictions
        function renderUpcomingPredictions(predictions) {
            upcomingPredictionsContainer.innerHTML = '';

            if (predictions.length === 0) {
                upcomingPredictionsContainer.innerHTML = `
                    <div class="col-12 text-center py-4">
                        <i class="fas fa-info-circle fa-2x mb-2 text-muted"></i>
                        <p class="text-muted">No upcoming predictions scheduled. Check back later!</p>
                    </div>
                `;
                return;
            }

            predictions.forEach(prediction => {
                const card = createPredictionCard(prediction, false);
                upcomingPredictionsContainer.appendChild(card);
            });
        }

        // Create prediction card
        function createPredictionCard(prediction, isLive) {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card h-100 prediction-card shadow-sm';
            card.style.cursor = 'pointer';

            // Card header
            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header d-flex justify-content-between align-items-center';
            cardHeader.innerHTML = `
                <div>
                    <span class="badge bg-${getSportBadgeClass(prediction.sport)} me-1">${capitalizeFirstLetter(prediction.sport)}</span>
                    ${isLive ? '<span class="badge bg-danger live-badge">LIVE</span>' : ''}
                </div>
                <small class="text-muted">${formatTime(prediction.startTime)}</small>
            `;

            // Card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardBody.innerHTML = `
                <h6 class="card-title">${prediction.teams}</h6>
                <p class="card-text"><strong>${prediction.league}</strong></p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-primary">${prediction.prediction}</span>
                    <span class="badge bg-success">${prediction.odds.toFixed(2)}</span>
                </div>
                <div class="progress mb-3">
                    <div class="progress-bar bg-${getConfidenceColor(prediction.confidence)}" 
                         role="progressbar" 
                         style="width: ${getConfidenceWidth(prediction.confidence)}%" 
                         aria-valuenow="${getConfidenceWidth(prediction.confidence)}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                    </div>
                </div>
                <p class="small text-muted mb-0">Confidence: <strong>${prediction.confidence}</strong></p>
            `;

            // Card footer
            const cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer bg-transparent border-top-0';
            cardFooter.innerHTML = `
                <button class="btn btn-sm btn-outline-primary w-100 view-details-btn" data-id="${prediction.id}">
                    <i class="fas fa-info-circle me-1"></i> View Details
                </button>
            `;

            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            col.appendChild(card);

            // Add click event to view details
            col.querySelector('.view-details-btn').addEventListener('click', function (e) {
                e.stopPropagation();
                showPredictionDetails(prediction);
            });

            // Add click event to the whole card
            card.addEventListener('click', function () {
                showPredictionDetails(prediction);
            });

            return col;
        }

        // Show prediction details in modal
        function showPredictionDetails(prediction) {
            predictionModalTitle.textContent = `${prediction.teams} - ${prediction.league}`;

            predictionModalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h6>Prediction</h6>
                            <div class="d-flex align-items-center">
                                <span class="badge bg-primary me-2">${prediction.prediction}</span>
                                <span class="badge bg-success">${prediction.odds.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <h6>Confidence</h6>
                            <div class="progress" style="height: 20px;">
                                <div class="progress-bar bg-${getConfidenceColor(prediction.confidence)}" 
                                     role="progressbar" 
                                     style="width: ${getConfidenceWidth(prediction.confidence)}%" 
                                     aria-valuenow="${getConfidenceWidth(prediction.confidence)}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                            </div>
                            <p class="small text-muted mt-1">${prediction.confidence} Confidence</p>
                        </div>
                        
                        <div class="mb-3">
                            <h6>Match Info</h6>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Sport
                                    <span class="badge bg-${getSportBadgeClass(prediction.sport)}">${capitalizeFirstLetter(prediction.sport)}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    League
                                    <span>${prediction.league}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Status
                                    <span class="badge ${prediction.status === 'live' ? 'bg-danger' : 'bg-secondary'}">${capitalizeFirstLetter(prediction.status)}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Start Time
                                    <span>${formatDateTime(prediction.startTime)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h6>Expert Analysis</h6>
                            <div class="card bg-light">
                                <div class="card-body">
                                    <p>${prediction.analysis}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <h6>Recommended Bet</h6>
                            <div class="card bg-light">
                                <div class="card-body">
                                    <p>We recommend betting <strong>2-3%</strong> of your bankroll on this prediction.</p>
                                    <p class="small text-muted">Always gamble responsibly and never bet more than you can afford to lose.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <button class="btn btn-primary me-2">
                                <i class="fas fa-thumbs-up me-1"></i> Like Prediction
                            </button>
                            <button class="btn btn-outline-secondary">
                                <i class="fas fa-bookmark me-1"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            `;

            predictionModal.show();
        }

        // Filter predictions by sport
        function filterPredictionsBySport(sport) {
            if (sport === 'all') {
                renderLivePredictions(predictionsDatabase.live);
                renderUpcomingPredictions(predictionsDatabase.upcoming);
                return;
            }

            const filteredLive = predictionsDatabase.live.filter(p => p.sport === sport);
            const filteredUpcoming = predictionsDatabase.upcoming.filter(p => p.sport === sport);

            renderLivePredictions(filteredLive);
            renderUpcomingPredictions(filteredUpcoming);
        }

        // Update live predictions (simulated)
        function updateLivePredictions() {
            // Simulate new predictions coming in
            if (Math.random() > 0.7) {
                const newPrediction = {
                    id: Date.now(),
                    sport: ['football', 'basketball', 'tennis'][Math.floor(Math.random() * 3)],
                    league: ['Premier League', 'La Liga', 'Serie A', 'NBA', 'Euroleague', 'ATP Masters'][Math.floor(Math.random() * 6)],
                    teams: ['Team A vs Team B', 'Team X vs Team Y', 'Player 1 vs Player 2'][Math.floor(Math.random() * 3)],
                    prediction: ['Over 2.5 Goals', 'Home Win', 'Away Win +1.5', 'Under 3.5 Goals'][Math.floor(Math.random() * 4)],
                    odds: (Math.random() * 2 + 1.5).toFixed(2),
                    confidence: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
                    status: 'live',
                    startTime: new Date(),
                    analysis: 'This is a simulated live update. In a real application, this would be actual live data from the backend.'
                };

                predictionsDatabase.live.unshift(newPrediction);

                // Limit to 5 live predictions
                if (predictionsDatabase.live.length > 5) {
                    predictionsDatabase.live.pop();
                }

                renderLivePredictions(predictionsDatabase.live);

                // Show notification for new prediction
                showToast(`New live prediction added: ${newPrediction.teams}`, 'info');
            }

            // Simulate some predictions ending
            if (Math.random() > 0.8 && predictionsDatabase.live.length > 0) {
                const endedPrediction = predictionsDatabase.live.pop();
                showToast(`Prediction ended: ${endedPrediction.teams}`, 'warning');
                renderLivePredictions(predictionsDatabase.live);
            }
        }

        // Helper functions
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function formatTime(date) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        function formatDateTime(date) {
            return date.toLocaleString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function getSportBadgeClass(sport) {
            switch (sport) {
                case 'football': return 'info';
                case 'basketball': return 'warning';
                case 'tennis': return 'success';
                default: return 'secondary';
            }
        }

        function getConfidenceColor(confidence) {
            switch (confidence.toLowerCase()) {
                case 'very high': return 'success';
                case 'high': return 'info';
                case 'medium': return 'primary';
                case 'low': return 'warning';
                default: return 'secondary';
            }
        }

        function getConfidenceWidth(confidence) {
            switch (confidence.toLowerCase()) {
                case 'very high': return 90;
                case 'high': return 75;
                case 'medium': return 60;
                case 'low': return 40;
                default: return 50;
            }
        }

        function showToast(message, type) {
            const toastContainer = document.createElement('div');
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '1100';

            const toast = document.createElement('div');
            toast.className = `toast show align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'info'} border-0`;
            toast.role = 'alert';
            toast.ariaLive = 'assertive';
            toast.ariaAtomic = 'true';

            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;

            toastContainer.appendChild(toast);
            document.body.appendChild(toastContainer);

            // Auto remove after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toastContainer.remove();
                }, 300);
            }, 5000);

            // Close button
            toast.querySelector('.btn-close').addEventListener('click', function () {
                toast.classList.remove('show');
                setTimeout(() => {
                    toastContainer.remove();
                }, 300);
            });
        }
