#!/usr/bin/env node

const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const configDir = core.getInput('configDir');
    const mode = core.getInput('mode');
    const planOnly = (core.getInput('planOnly') === 'true');
    const subscriptionId = core.getInput('subscriptionId');
    console.log(planOnly);

    await exec.exec(
      '/tmp/sheriff/latest/x86_64/sheriff',
      [
        'apply',
        mode,
        configDir ? '--config-dir' : '',
        configDir,
        '--subscription-id',
        subscriptionId,
        planOnly ? '--plan-only' : '',
      ],
    );
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err.message);
    } else {
      core.setFailed('Unknown error');
    }
  }
}

run();
