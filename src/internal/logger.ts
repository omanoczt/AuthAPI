import chalk from 'chalk';

function getDateTime(): string {
  const hour = String(new Date().getHours()).padStart(2, '0');
  const minute = String(new Date().getMinutes()).padStart(2, '0');
  const seconds = String(new Date().getSeconds()).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const month = String(new Date().getMonth()+1).padStart(2, '0');
  const year = String(new Date().getFullYear()).padStart(2, '0');

  return `${hour}:${minute}:${seconds} - ${day}/${month}/${year}`;
}

export default {
  server: {
    ok: (log: string) => console.log(`[${getDateTime()}] ${chalk.green('SERVER')} ${log}`),
    fail: (log: string) => console.log(`[${getDateTime()}] ${chalk.red('SERVER')} ${log}`)
  },
  database: {
    ok: (log: string) => console.log(`[${getDateTime()}] ${chalk.blue('DATABASE')} ${log}`),
    fail: (log: string) => console.log(`[${getDateTime()}] ${chalk.red('DATABASE')} ${log}`)
  }
}