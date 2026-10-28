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
