document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('incomeForm');
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    const grossIncome = parseFloat(document.getElementById('grossIncome').value) || 0;
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const ageGroup = document.getElementById('ageGroup').value;

    let taxableIncome = grossIncome + extraIncome - deductions;
    let tax = 0;

    if (taxableIncome > 800000) {
      switch (ageGroup) {
        case '<40':
          tax = 0.3 * (taxableIncome - 800000);
          break;
        case '40-59':
          tax = 0.4 * (taxableIncome - 800000);
          break;
        case '>=60':
          tax = 0.1 * (taxableIncome - 800000);
          break;
        default:
          document.getElementById('ageGroup').parentNode.classList.add('error-visible');
          return;
      }
    }

    const netIncome = taxableIncome - tax;
    showResultModal(netIncome);
  }

  function showResultModal(netIncome) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHtml = `
      <div class="modal flex justify-center items-center h-screen">
        <div class="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">Your overall income will be</h2>
          <p class="text-5xl text-indigo-600 mb-3">${netIncome.toLocaleString()}</p>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm mb-6">after tax deductions</p>
          <button class="bg-indigo-500 text-white px-6 py-2 rounded-lg focus:outline-none hover:bg-indigo-600 transition-colors" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
});
