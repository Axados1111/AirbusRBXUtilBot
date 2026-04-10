module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`❌ Unknown command: ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error('Command error:', err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '❌ Command crashed.',
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: '❌ Command crashed.',
          ephemeral: true
        });
      }
    }
  }
};
