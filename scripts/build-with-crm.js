// scripts/build-with-crm.js
import { writeFileSync } from 'fs';

const siteDomain = process.env.SITE_DOMAIN;
const crmApiUrl = process.env.CRM_API_URL; // LÊ DA VARIÁVEL DE AMBIENTE

if (!siteDomain || !crmApiUrl) {
  console.error('ERRO: SITE_DOMAIN ou CRM_API_URL não definidas.');
  process.exit(1);
}

console.log(`Iniciando build para o domínio: ${siteDomain}`);

// 2. (Aqui você implementa) Faz a chamada para a API do seu CRM
// Exemplo fictício usando fetch:
try {
  const crmResponse = await fetch(`${crmApiUrl}/site-config?domain=${siteDomain}`);
  const siteConfig = await crmResponse.json();

  // 3. Gera um arquivo de configuração que o Astro consegue importar
  // Exemplo: criando um arquivo JSON que será importado pelo Astro
  const configForAstro = {
    theme: siteConfig.theme,
    title: siteConfig.title,
    // ... outras configurações
  };

  writeFileSync('./src/site-config.json', JSON.stringify(configForAstro));
  console.log('Configuração do site gerada com sucesso.');

  // 4. Executa o build original do Astro
  // Importa o módulo 'child_process' para executar comandos shell
  const { execSync } = await import('child_process');
  execSync('astro build', { stdio: 'inherit' });

} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}