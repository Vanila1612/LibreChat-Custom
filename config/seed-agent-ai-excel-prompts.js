const path = require('path');
const mongoose = require('mongoose');
const { AccessRoleIds, PrincipalType, ResourceType } = require('librechat-data-provider');

require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });

const connect = require('./connect');
const { agentAiExcelPrompts } = require('./prompts/agent-ai-excel');
const { grantPermission } = require('~/server/services/PermissionService');
const { Prompt, PromptGroup, User } = require('~/db/models');

function getOption(name) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

async function seedPrompt(item, user, isPublic) {
  const existingGroup = await PromptGroup.findOne({ author: user._id, command: item.command });
  const groupId = existingGroup?._id ?? new mongoose.Types.ObjectId();
  const promptId = existingGroup?.productionId ?? new mongoose.Types.ObjectId();

  await Prompt.updateOne(
    { _id: promptId },
    {
      $set: {
        groupId,
        author: user._id,
        prompt: item.prompt,
        type: 'text',
      },
    },
    { upsert: true },
  );

  await PromptGroup.updateOne(
    { _id: groupId },
    {
      $set: {
        name: item.name,
        command: item.command,
        category: item.category,
        oneliner: item.oneliner,
        productionId: promptId,
        author: user._id,
        authorName: user.name,
      },
      $setOnInsert: { numberOfGenerations: 0 },
    },
    { upsert: true },
  );

  await grantPermission({
    principalType: PrincipalType.USER,
    principalId: user._id,
    resourceType: ResourceType.PROMPTGROUP,
    resourceId: groupId,
    accessRoleId: AccessRoleIds.PROMPTGROUP_OWNER,
    grantedBy: user._id,
  });

  if (isPublic) {
    await grantPermission({
      principalType: PrincipalType.PUBLIC,
      principalId: null,
      resourceType: ResourceType.PROMPTGROUP,
      resourceId: groupId,
      accessRoleId: AccessRoleIds.PROMPTGROUP_VIEWER,
      grantedBy: user._id,
    });
  }

  return existingGroup ? 'updated' : 'created';
}

async function run() {
  const identity = getOption('email') ?? getOption('username');
  const isPublic = process.argv.includes('--public');
  const dryRun = process.argv.includes('--dry-run');

  if (!identity) {
    throw new Error(
      'Usage: npm run seed:agent-ai-excel-prompts -- --email=user@example.com [--public] [--dry-run]',
    );
  }

  await connect();
  const user = await User.findOne({ $or: [{ email: identity }, { username: identity }] });
  if (!user) {
    throw new Error(`User not found: ${identity}`);
  }

  if (dryRun) {
    console.log(`Validated ${agentAiExcelPrompts.length} prompts for ${user.email ?? user.username}.`);
    console.log(`Public sharing: ${isPublic ? 'enabled' : 'disabled'}.`);
    return;
  }

  const counts = { created: 0, updated: 0 };
  for (const item of agentAiExcelPrompts) {
    const result = await seedPrompt(item, user, isPublic);
    counts[result] += 1;
  }

  console.log(
    `Seeded ${agentAiExcelPrompts.length} Agent AI Excel prompts: ${counts.created} created, ${counts.updated} updated.`,
  );
}

run()
  .then(() => mongoose.disconnect())
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
  });
