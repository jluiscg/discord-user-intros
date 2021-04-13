const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();

client.on('ready', () => {
    //List connected servers
    console.log('Wrestling intros bot live on:');
    CumbiaBotClient.guilds.cache.forEach((guild) => {
      console.log(`○ ${guild.name}`);
    });
  });

  client.on('voiceStateUpdate', async (oldMemberState, newMemberState) => {
    if(oldMemberState.channel == null && newMemberState.channel != null){
        //user connected to a voice channel (not changed)
        if(newMemberState.member.id == config.CumbiaBotLuisID){
            //that user is el chinito
            voice_channel = newMemberState.channel;
            const voice_connection = await voice_channel.join()
            const dispatcher = voice_connection.play("bin/cumbia.mp3", {seek : 27});
            dispatcher.on('start', () => {
            console.log('cumbia.mp3 is now playing!');
            });
            dispatcher.on('finish', () => {
            console.log('cumbia.mp3 has finished playing!');
            voice_channel.leave();
            });
            dispatcher.on('error', console.error);
        }
    }
});
client.login(config.id);