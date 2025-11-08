// Sample data structure for washing machines
let machines = [
    { id: 1, status: 'available', timeRemaining: 0 },
    { id: 2, status: 'in-use', timeRemaining: 25 },
    { id: 3, status: 'available', timeRemaining: 0 },
    { id: 4, status: 'in-use', timeRemaining: 15 },
    { id: 5, status: 'available', timeRemaining: 0 },
    { id: 6, status: 'in-use', timeRemaining: 40 },
];

function renderMachines() {
    const grid = document.getElementById('machines-grid');
    grid.innerHTML = '';

    let availableCount = 0;
    let inUseCount = 0;

    machines.forEach(machine => {
        const card = document.createElement('div');
        card.className = 'machine-card';

        const statusClass = machine.status === 'available' ? 'status-available' : 'status-in-use';
        const statusText = machine.status === 'available' ? 'Available' : 'In Use';
        
        if (machine.status === 'available') {
            availableCount++;
        } else {
            inUseCount++;
        }

        card.innerHTML = `
            <div class="machine-icon">🧼</div>
            <div class="machine-number">Machine #${machine.id}</div>
            <div class="machine-status ${statusClass}">${statusText}</div>
            ${machine.status === 'in-use' ? `<div class="time-remaining">${machine.timeRemaining} min remaining</div>` : ''}
        `;

        grid.appendChild(card);
    });

    // Update stats
    document.getElementById('available-count').textContent = availableCount;
    document.getElementById('in-use-count').textContent = inUseCount;
}

function refreshStatus() {
    // Simulate fetching updated data
    machines.forEach(machine => {
        if (machine.status === 'in-use' && machine.timeRemaining > 0) {
            machine.timeRemaining -= 1;
            if (machine.timeRemaining <= 0) {
                machine.status = 'available';
                machine.timeRemaining = 0;
            }
        }
    });
    
    renderMachines();
}

// Initialize
renderMachines();

// Set up refresh button
document.getElementById('refresh-btn').addEventListener('click', refreshStatus);

// Auto-refresh every 60 seconds
setInterval(refreshStatus, 60000);
