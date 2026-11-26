import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  computeGlideEndpoints,
  computePointerParallax,
  isValidEmail,
  normalizeGitHubRepo,
  normalizeGitHubUser,
  selectResumeDownloadFormat,
  validateContactForm,
} from './portfolioLogic';

test('selectResumeDownloadFormat chooses available honest format without fake links', () => {
  assert.equal(selectResumeDownloadFormat(true, true), 'docx');
  assert.equal(selectResumeDownloadFormat(true, true, 'pdf'), 'pdf');
  assert.equal(selectResumeDownloadFormat(false, true), 'pdf');
  assert.equal(selectResumeDownloadFormat(false, true, 'docx'), 'pdf');
  assert.equal(selectResumeDownloadFormat(false, false), 'modal');
});

test('computePointerParallax maps cursor coordinates symmetrically within max bounds', () => {
  assert.deepEqual(computePointerParallax(720, 450, 1440, 900, 14), { x: 0, y: 0 });
  assert.deepEqual(computePointerParallax(1440, 900, 1440, 900, 14), { x: 14, y: 14 });
  assert.deepEqual(computePointerParallax(0, 0, 1440, 900, 14), { x: -14, y: -14 });
  assert.deepEqual(computePointerParallax(100, 100, 0, 0, 14), { x: 0, y: 0 });
});

test('computeGlideEndpoints computes smooth delta from Hero center to About left slot', () => {
  const endpoints = computeGlideEndpoints(
    { left: 540, top: 180, width: 360, height: 600 },
    { left: 160, top: 1050, width: 340, height: 480 }
  );
  assert.equal(endpoints.startX, 0);
  assert.equal(endpoints.startY, 0);
  assert.equal(endpoints.endX, -390);
  assert.equal(endpoints.endY, 870);
  assert.equal(endpoints.endScale, 0.8);
});

test('validateContactForm rejects empty or invalid inputs and accepts valid submissions', () => {
  const invalid = validateContactForm({ name: 'J', email: 'bad-email', message: 'hi' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Aarav Nair',
    email: 'aarav@example.com',
    message: 'Interested in collaborating on an AI workflow project.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('isValidEmail and buildMailtoUrl format safe mailto links', () => {
  assert.equal(isValidEmail('jerinthomas562@gmail.com'), true);
  assert.equal(isValidEmail('not-an-email'), false);

  const url = buildMailtoUrl('jerinthomas562@gmail.com', {
    name: 'Maya',
    email: 'maya@example.com',
    message: 'Hello Jerin, let us connect.',
  });
  assert.ok(url.startsWith('mailto:jerinthomas562@gmail.com?subject='));
  assert.ok(url.includes('Maya'));
});

test('normalizeGitHubUser and normalizeGitHubRepo preserve honest metadata without fabricating fields', () => {
  const user = normalizeGitHubUser({
    login: 'jerin562',
    name: 'Jerin Thomas Mathew',
    html_url: 'https://github.com/jerin562',
    avatar_url: 'https://avatars.githubusercontent.com/u/90143014?v=4',
    public_repos: 8,
    followers: 1,
    bio: null,
  });
  assert.ok(user);
  assert.equal(user.login, 'jerin562');
  assert.equal(user.publicRepos, 8);
  assert.equal(user.bio, null);

  const repo = normalizeGitHubRepo(
    {
      full_name: 'jerin562/aurel-commerce',
      html_url: 'https://github.com/jerin562/aurel-commerce',
      description: 'shopping website',
      default_branch: 'main',
      language: null,
      size: 0,
    },
    { message: 'This repository is empty.', status: '404' }
  );
  assert.ok(repo);
  assert.equal(repo.description, 'shopping website');
  assert.equal(repo.language, null);
  assert.equal(repo.hasCommittedFiles, false);
});
