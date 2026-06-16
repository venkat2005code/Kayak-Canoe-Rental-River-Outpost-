document.addEventListener('DOMContentLoaded', () => {
    // Shared chart options for consistent styling
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: "'Outfit', sans-serif"
                    }
                }
            }
        }
    };

    const primaryColor = '#fb8500';
    const secondaryColor = '#219ebc';
    const accentColor = '#8b5cf6';
    const successColor = '#22c55e';
    const lightColor = '#cbd5e1';

    // --- USER DASHBOARD CHARTS ---

    // 1. Trips per Month (Bar Chart)
    const ctxUserTrips = document.getElementById('userTripsChart');
    if (ctxUserTrips) {
        new Chart(ctxUserTrips, {
            type: 'bar',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Trips',
                    data: [1, 2, 4, 3, 5, 2],
                    backgroundColor: primaryColor,
                    borderRadius: 4
                }]
            },
            options: commonOptions
        });
    }

    // 2. Favorite Equipment (Doughnut Chart)
    const ctxUserEquip = document.getElementById('userEquipChart');
    if (ctxUserEquip) {
        new Chart(ctxUserEquip, {
            type: 'doughnut',
            data: {
                labels: ['Single Kayak', 'Tandem Kayak', 'Canoe', 'Paddleboard'],
                datasets: [{
                    data: [12, 5, 2, 3],
                    backgroundColor: [primaryColor, secondaryColor, accentColor, successColor],
                    borderWidth: 0
                }]
            },
            options: {
                ...commonOptions,
                cutout: '70%'
            }
        });
    }

    // 3. Hours Paddled (Line Chart)
    const ctxUserHours = document.getElementById('userHoursChart');
    if (ctxUserHours) {
        new Chart(ctxUserHours, {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Hours on Water',
                    data: [2, 6, 14, 10, 18, 5],
                    borderColor: secondaryColor,
                    backgroundColor: 'rgba(33, 158, 188, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: commonOptions
        });
    }

    // 4. Spending History (Bar Chart)
    const ctxUserSpend = document.getElementById('userSpendChart');
    if (ctxUserSpend) {
        new Chart(ctxUserSpend, {
            type: 'bar',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Amount Spent ($)',
                    data: [45, 90, 180, 135, 210, 65],
                    backgroundColor: accentColor,
                    borderRadius: 4
                }]
            },
            options: commonOptions
        });
    }

    // --- ADMIN DASHBOARD CHARTS ---

    // 1. Monthly Revenue Trends (Bar Chart)
    const ctxAdminRev = document.getElementById('adminRevChart');
    if (ctxAdminRev) {
        new Chart(ctxAdminRev, {
            type: 'bar',
            data: {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [12000, 18500, 24000, 32000, 28000, 21000],
                    backgroundColor: primaryColor,
                    borderRadius: 4
                }]
            },
            options: commonOptions
        });
    }

    // 2. Bookings by Equipment (Doughnut Chart)
    const ctxAdminEquip = document.getElementById('adminEquipChart');
    if (ctxAdminEquip) {
        new Chart(ctxAdminEquip, {
            type: 'doughnut',
            data: {
                labels: ['Single Kayaks', 'Tandem Kayaks', 'Canoes', 'Paddleboards'],
                datasets: [{
                    data: [45, 25, 15, 15],
                    backgroundColor: [primaryColor, secondaryColor, accentColor, successColor],
                    borderWidth: 0
                }]
            },
            options: {
                ...commonOptions,
                cutout: '70%'
            }
        });
    }

    // 3. Weekly Utilization Rate (Line Chart)
    const ctxAdminUtil = document.getElementById('adminUtilChart');
    if (ctxAdminUtil) {
        new Chart(ctxAdminUtil, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                datasets: [{
                    label: 'Utilization (%)',
                    data: [65, 72, 85, 90, 78],
                    borderColor: accentColor,
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // 4. Customer Demographics (Pie Chart)
    const ctxAdminDemo = document.getElementById('adminDemoChart');
    if (ctxAdminDemo) {
        new Chart(ctxAdminDemo, {
            type: 'pie',
            data: {
                labels: ['First-Time', 'Returning', 'Members', 'Corporate'],
                datasets: [{
                    data: [40, 35, 15, 10],
                    backgroundColor: [primaryColor, secondaryColor, accentColor, lightColor],
                    borderWidth: 0
                }]
            },
            options: commonOptions
        });
    }
});
