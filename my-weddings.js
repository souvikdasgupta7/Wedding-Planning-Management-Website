// Wedding Management System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const statementsContainer = document.getElementById('statements-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const applyFilterBtn = document.getElementById('apply-filter');
    
    // Pagination
    let currentPage = 1;
    const itemsPerPage = 5;
    let allStatements = [];
    let filteredStatements = [];
    
    // Initialize
    loadStatements();
    
    // Event Listeners
    loadMoreBtn.addEventListener('click', loadMoreStatements);
    applyFilterBtn.addEventListener('click', applyFilters);
    
    // Load Initial Data
    function loadStatements() {
        // Simulated API call - Replace with actual fetch() in production
        setTimeout(() => {
            // Sample data structure
            allStatements = [
                {
                    id: 1,
                    venue: "Grand Paradise Hall",
                    date: "2023-06-15",
                    amount: 2500,
                    status: "paid",
                    services: ["Venue Booking", "Catering", "Photography"]
                },
                {
                    id: 2,
                    venue: "Beachfront Resort",
                    date: "2023-08-22",
                    amount: 3800,
                    status: "pending",
                    services: ["Venue Booking", "Decorations"]
                },
                // Add more sample data...
            ];
            
            filteredStatements = [...allStatements];
            renderStatements();
        }, 500);
    }
    
    // Render Statements
    function renderStatements() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const statementsToShow = filteredStatements.slice(0, endIndex);
        
        statementsContainer.innerHTML = statementsToShow.map(statement => `
            <div class="statement-card">
                <div class="statement-header">
                    <h3>${statement.venue}</h3>
                    <span class="badge badge-${statement.status}">
                        ${statement.status.toUpperCase()}
                    </span>
                </div>
                <div class="statement-details">
                    <p><strong>Date:</strong> ${formatDate(statement.date)}</p>
                    <p><strong>Amount:</strong> $${statement.amount.toFixed(2)}</p>
                    <p><strong>Services:</strong> ${statement.services.join(", ")}</p>
                </div>
                <div class="statement-actions">
                    <button class="download-btn" data-id="${statement.id}">
                        <i class="fas fa-download"></i> Download Statement
                    </button>
                </div>
            </div>
        `).join('');
        
        // Hide load more if all items are shown
        loadMoreBtn.style.display = endIndex >= filteredStatements.length ? 'none' : 'block';
        
        // Add download event listeners
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                downloadStatement(this.dataset.id);
            });
        });
    }
    
    // Filter Functionality
    function applyFilters() {
        const fromDate = document.getElementById('from-date').value;
        const toDate = document.getElementById('to-date').value;
        const status = document.getElementById('status-filter').value;
        
        filteredStatements = allStatements.filter(statement => {
            const dateMatch = (!fromDate || statement.date >= fromDate) && 
                             (!toDate || statement.date <= toDate);
            const statusMatch = status === 'all' || statement.status === status;
            return dateMatch && statusMatch;
        });
        
        currentPage = 1;
        renderStatements();
    }
    
    // Load More
    function loadMoreStatements() {
        currentPage++;
        renderStatements();
    }
    
    // Download Statement
    function downloadStatement(id) {
        const statement = allStatements.find(s => s.id == id);
        if (!statement) return;
        
        // Create a PDF content (simplified)
        const content = `
            WEDDING PLANNER PRO - STATEMENT
            ----------------------------------
            Venue: ${statement.venue}
            Date: ${formatDate(statement.date)}
            Amount: $${statement.amount.toFixed(2)}
            Status: ${statement.status.toUpperCase()}
            Services: ${statement.services.join(", ")}
            
            Generated on: ${new Date().toLocaleDateString()}
        `;
        
        // Create download link
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `statement_${statement.venue.replace(/\s+/g, '_')}_${statement.date}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert(`Statement for ${statement.venue} downloaded!`);
    }
    
    // Helper Functions
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
});