window.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const inputField = document.getElementById('inputField');
  const executeButton = document.getElementById('executeButton');
  const downloadButton = document.getElementById('downloadButton');
  let executedCode = '';

  function redirectConsoleLog() {
    console.log = function (...args) {
      const logString = args.join(' ');
      output.innerHTML += `<div class="result">${logString}</div>`;
    };
  }

  function executeCode() {
    const code = inputField.value;
    inputField.value = '';

    try {
      let result;
      if (code.includes('console.')) {
        result = eval(code);
      } else {
        result = eval(`(${code})`);
      }

      if (result !== undefined) {
        output.innerHTML += `<div class="command">&gt;&gt; ${code}</div><div class="result">${result}</div>`;
      } else {
        output.innerHTML += `<div class="command">&gt;&gt; ${code}</div>`;
      }

      executedCode += code + '\n';
    } catch (error) {
      output.innerHTML += `<div class="command">&gt;&gt; ${code}</div><div class="error">${error}</div>`;
    }

    output.scrollTop = output.scrollHeight;
  }

  function downloadCode() {
    if (executedCode === '') {
      alert('Нет выполненного кода для скачивания');
      return;
    }

    const blob = new Blob([executedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      executeCode();
    }
  });

  executeButton.addEventListener('click', executeCode);
  downloadButton.addEventListener('click', downloadCode);

  redirectConsoleLog();
});