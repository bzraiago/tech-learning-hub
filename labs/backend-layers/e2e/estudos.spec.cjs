'use strict';

const { test, expect } = require('@playwright/test');

test('cria estudo pela interface e mostra erro de duplicidade', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Estudos' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('2 estudos encontrados.');

  const criacao = page.waitForResponse((resposta) =>
    resposta.url().endsWith('/api/estudos') && resposta.request().method() === 'POST'
  );
  await page.getByLabel('Título do estudo').fill('CSS');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  expect((await criacao).status()).toBe(201);

  await expect(page.getByRole('status')).toHaveText('Estudo CSS adicionado.');
  await expect(page.getByRole('listitem')).toHaveText(['HTML', 'JavaScript', 'CSS']);

  const duplicidade = page.waitForResponse((resposta) =>
    resposta.url().endsWith('/api/estudos') && resposta.request().method() === 'POST'
  );
  await page.getByLabel('Título do estudo').fill(' css ');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  expect((await duplicidade).status()).toBe(409);

  await expect(page.getByRole('status')).toHaveText(/já existe um estudo com esse título/i);
  await expect(page.getByRole('listitem')).toHaveText(['HTML', 'JavaScript', 'CSS']);
});

test('mostra dados retornados pelo contrato do serviço meteorológico', async ({ page }) => {
  await page.goto('/');
  const consulta = page.waitForResponse((resposta) =>
    resposta.url().includes('/api/previsao?') && resposta.request().method() === 'GET'
  );

  await page.getByRole('button', { name: 'Consultar Open-Meteo' }).click();

  expect((await consulta).status()).toBe(200);
  await expect(page.locator('#resultado-previsao')).toHaveText(
    'Temperatura: 29.4 °C · umidade: 71% · horário: 2026-10-27T10:00 (America/Fortaleza).'
  );
});
