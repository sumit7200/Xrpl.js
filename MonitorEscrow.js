// Simulated array of active escrows
const activeEscrows = [
    { id: 1, status: 'pending' },
    { id: 2, status: 'in_progress' },
    { id: 3, status: 'completed' }
  ];
  
  // Function to monitor the status of active escrows
  function monitorEscrowStatus() {
    console.log('Monitoring escrow statuses...');
    
    activeEscrows.forEach(escrow => {
      // Simulate API call or database query to get updated status
      const updatedStatus = simulateGetUpdatedStatus(escrow.id);
      
      if (updatedStatus !== escrow.status) {
        console.log(`Escrow ${escrow.id} status updated: ${escrow.status} -> ${updatedStatus}`);
        escrow.status = updatedStatus;
      }
    });
    
    setTimeout(monitorEscrowStatus, 5000); // Monitor every 5 seconds
  }
  
  // Simulated function to get updated status
  function simulateGetUpdatedStatus(escrowId) {
    // Simulate logic to get updated status (e.g., random changes for demonstration)
    const statuses = ['pending', 'in_progress', 'completed'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
  
  // Start monitoring
  monitorEscrowStatus();
  