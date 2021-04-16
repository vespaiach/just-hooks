const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:8080/spec/test-fetch.html');
});

test('should call api without error', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_ok();
  });

  expect(apiResult.ok).toBe(true);
  expect(apiResult.data).toEqual({ status: 'ok' });
  expect(apiResult.error).toBe(undefined);
});

test('should return when HTTP status 400', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_400();
  });

  expect(apiResult.ok).toBe(false);
  expect(apiResult.data).toBe(undefined);
  expect(apiResult.error.code).toBe('400');
  expect(apiResult.error.data).toEqual({
    name: 'something wrong with name field',
  });
});

test('should return when HTTP status 401', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_401();
  });

  expect(apiResult.ok).toBe(false);
  expect(apiResult.data).toBe(undefined);
  expect(apiResult.error.code).toBe('401');
});

test('should return when HTTP status 500', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_500();
  });

  expect(apiResult.ok).toBe(false);
  expect(apiResult.data).toBe(undefined);
  expect(apiResult.error.code).toBe('500');
});

test('should return when there is an unexpected error from server', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_unexpected();
  });

  expect(apiResult.ok).toBe(false);
  expect(apiResult.data).toBe(undefined);
});

test('should return when there is cors error from server', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_cors();
  });

  expect(apiResult.ok).toBe(false);
  expect(apiResult.data).toBe(undefined);
});

test('should return when fetching image', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_image();
  });

  expect(apiResult.ok).toBe(true);
  expect(apiResult.data).not.toBe(undefined);
});

test('should return when fetching text', async () => {
  const apiResult = await page.evaluate(async () => {
    return await window.call_text();
  });

  expect(apiResult.ok).toBe(true);
  expect(apiResult.data).toBe("I'm text file");
});

afterAll(async () => {
  await browser.close();
});
